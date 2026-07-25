import pika
import json
import subprocess
import os
import sys
import traceback
import tempfile

RABBITMQ_URL = os.environ.get("RABBITMQ_URL", "amqp://nexus:nexus_password@localhost:5672/")
QUEUE_NAME = "execution_jobs_queue"

def execute_code(code_str, timeout_seconds=5):
    # Crear un archivo temporal para ejecutar el código
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as temp_script:
        temp_script.write(code_str)
        script_path = temp_script.name

    result = {
        "stdout": "",
        "stderr": "",
        "status": "SUCCESS",
        "executionTimeMs": 0,
        "memory_trace": []
    }

    # Wrapper script para inyectar sys.settrace
    wrapper_code = f"""
import sys
import json
import traceback

trace_data = []

def trace_calls(frame, event, arg):
    if event == 'line' and frame.f_code.co_filename == {repr(script_path)}:
        # Extraer variables locales (simplificado para tipos básicos)
        locals_copy = {{}}
        for k, v in frame.f_locals.items():
            if not k.startswith('__') and not str(type(v)).startswith("<class 'module'>") and not str(type(v)).startswith("<class 'function'>"):
                try:
                    # Intentar serializar o tomar repr
                    json.dumps(v)
                    locals_copy[k] = v
                except:
                    locals_copy[k] = repr(v)
                    
        trace_data.append({{
            'line': frame.f_lineno,
            'locals': locals_copy
        }})
    return trace_calls

try:
    sys.settrace(trace_calls)
    with open({repr(script_path)}, 'r') as f:
        code = f.read()
    exec(compile(code, {repr(script_path)}, 'exec'), {{}}, {{}})
except Exception as e:
    sys.stderr.write(traceback.format_exc())
    has_error = True
finally:
    sys.settrace(None)
    # Output the trace data via a specific file or stdout marker
    with open({repr(script_path + '.trace')}, 'w') as f:
        json.dump(trace_data, f)
    if 'has_error' in locals() and has_error:
        sys.exit(1)
"""
    
    wrapper_path = script_path + '_wrapper.py'
    with open(wrapper_path, 'w') as f:
        f.write(wrapper_code)

    try:
        # Ejecutar en el subproceso usando el wrapper
        process = subprocess.run(
            [sys.executable, wrapper_path],
            capture_output=True,
            text=True,
            timeout=timeout_seconds
        )
        
        result["stdout"] = process.stdout
        result["stderr"] = process.stderr
        if process.returncode != 0:
            result["status"] = "ERROR"
            
        # Leer el trace_data
        try:
            with open(script_path + '.trace', 'r') as f:
                result["memory_trace"] = json.load(f)
            os.remove(script_path + '.trace')
        except:
            pass

    except subprocess.TimeoutExpired:
        result["status"] = "TIMEOUT"
        result["stderr"] = "Execution timed out."
    except Exception as e:
        result["status"] = "ERROR"
        result["stderr"] = traceback.format_exc()
    finally:
        os.remove(script_path)
        if os.path.exists(wrapper_path):
            os.remove(wrapper_path)

    return result

def execute_javascript(code_str, timeout_seconds=5):
    with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as temp_script:
        temp_script.write(code_str)
        script_path = temp_script.name

    result = {"stdout": "", "stderr": "", "status": "SUCCESS", "executionTimeMs": 0, "memory_trace": []}
    try:
        process = subprocess.run(['node', script_path], capture_output=True, text=True, timeout=timeout_seconds)
        result["stdout"] = process.stdout
        result["stderr"] = process.stderr
        if process.returncode != 0: result["status"] = "ERROR"
    except subprocess.TimeoutExpired:
        result["status"], result["stderr"] = "TIMEOUT", "Execution timed out."
    except Exception as e:
        result["status"], result["stderr"] = "ERROR", traceback.format_exc()
    finally:
        os.remove(script_path)
    return result

def execute_typescript(code_str, timeout_seconds=10):
    with tempfile.NamedTemporaryFile(mode='w', suffix='.ts', delete=False) as temp_script:
        temp_script.write(code_str)
        script_path = temp_script.name

    result = {"stdout": "", "stderr": "", "status": "SUCCESS", "executionTimeMs": 0, "memory_trace": []}
    try:
        # TS_NODE_SKIP_PROJECT=true está seteado en el ENV del contenedor (Dockerfile)
        # así ts-node no busca tsconfig.json y funciona en el filesystem read-only
        process = subprocess.run(
            ['ts-node', '--transpile-only', script_path],
            capture_output=True, text=True, timeout=timeout_seconds
        )
        result["stdout"] = process.stdout
        result["stderr"] = process.stderr
        if process.returncode != 0: result["status"] = "ERROR"
    except FileNotFoundError:
        result["status"], result["stderr"] = "ERROR", "Error: 'ts-node' no encontrado en el contenedor. Contacta al soporte."
    except subprocess.TimeoutExpired:
        result["status"], result["stderr"] = "TIMEOUT", "Execution timed out."
    except Exception as e:
        result["status"], result["stderr"] = "ERROR", traceback.format_exc()
    finally:
        if os.path.exists(script_path): os.remove(script_path)
    return result

def execute_cpp(code_str, timeout_seconds=15):
    with tempfile.NamedTemporaryFile(mode='w', suffix='.cpp', delete=False) as temp_script:
        temp_script.write(code_str)
        script_path = temp_script.name
    out_path = script_path + ".out"

    result = {"stdout": "", "stderr": "", "status": "SUCCESS", "executionTimeMs": 0, "memory_trace": []}
    try:
        comp = subprocess.run(['g++', '-std=c++17', script_path, '-o', out_path], capture_output=True, text=True, timeout=30)
        if comp.returncode != 0:
            result["status"], result["stderr"] = "ERROR", comp.stderr
            return result
        process = subprocess.run([out_path], capture_output=True, text=True, timeout=timeout_seconds)
        result["stdout"] = process.stdout
        result["stderr"] = process.stderr
        if process.returncode != 0: result["status"] = "ERROR"
    except FileNotFoundError:
        result["status"], result["stderr"] = "ERROR", "Error: Compilador 'g++' no encontrado en el contenedor."
    except subprocess.TimeoutExpired:
        result["status"], result["stderr"] = "TIMEOUT", "Execution timed out."
    except Exception as e:
        result["status"], result["stderr"] = "ERROR", traceback.format_exc()
    finally:
        if os.path.exists(script_path): os.remove(script_path)
        if os.path.exists(out_path): os.remove(out_path)
    return result

def execute_java(code_str, timeout_seconds=5):
    # Java requiere que el archivo se llame como la clase pública, usaremos Main
    dir_path = tempfile.mkdtemp()
    script_path = os.path.join(dir_path, "Main.java")
    with open(script_path, 'w') as f:
        f.write(code_str)

    result = {"stdout": "", "stderr": "", "status": "SUCCESS", "executionTimeMs": 0, "memory_trace": []}
    try:
        comp = subprocess.run(['javac', script_path], capture_output=True, text=True, timeout=timeout_seconds)
        if comp.returncode != 0:
            result["status"], result["stderr"] = "ERROR", comp.stderr
            return result
        process = subprocess.run(['java', '-cp', dir_path, 'Main'], capture_output=True, text=True, timeout=timeout_seconds)
        result["stdout"] = process.stdout
        result["stderr"] = process.stderr
        if process.returncode != 0: result["status"] = "ERROR"
    except subprocess.TimeoutExpired:
        result["status"], result["stderr"] = "TIMEOUT", "Execution timed out."
    except Exception as e:
        result["status"], result["stderr"] = "ERROR", traceback.format_exc()
    finally:
        for f in os.listdir(dir_path): os.remove(os.path.join(dir_path, f))
        os.rmdir(dir_path)
    return result

def execute_rust(code_str, timeout_seconds=15):
    with tempfile.NamedTemporaryFile(mode='w', suffix='.rs', delete=False) as temp_script:
        temp_script.write(code_str)
        script_path = temp_script.name
    out_path = script_path[:-3]  # Remover .rs

    result = {"stdout": "", "stderr": "", "status": "SUCCESS", "executionTimeMs": 0, "memory_trace": []}
    try:
        comp = subprocess.run(['rustc', script_path, '-o', out_path], capture_output=True, text=True, timeout=60)
        if comp.returncode != 0:
            result["status"], result["stderr"] = "ERROR", comp.stderr
            return result
        process = subprocess.run([out_path], capture_output=True, text=True, timeout=timeout_seconds)
        result["stdout"] = process.stdout
        result["stderr"] = process.stderr
        if process.returncode != 0: result["status"] = "ERROR"
    except FileNotFoundError:
        result["status"], result["stderr"] = "ERROR", "Error: Compilador 'rustc' no encontrado en el contenedor."
    except subprocess.TimeoutExpired:
        result["status"], result["stderr"] = "TIMEOUT", "Compilation/Execution timed out. Rust puede tardar más en compilar la primera vez."
    except Exception as e:
        result["status"], result["stderr"] = "ERROR", traceback.format_exc()
    finally:
        if os.path.exists(script_path): os.remove(script_path)
        if os.path.exists(out_path): os.remove(out_path)
    return result

def execute_sql(code_str, timeout_seconds=10):
    result = {"stdout": "", "stderr": "", "status": "SUCCESS", "executionTimeMs": 0, "memory_trace": []}
    try:
        # Usamos --csv para que la salida sea CSV fácil de comparar
        # -A: unaligned, -F '|': separador |, -t: sin encabezados de conteo
        process = subprocess.run(
            ['psql', 'postgresql://sandbox:sandbox_password@sandbox-db:5432/pagila',
             '--csv', '-c', code_str],
            capture_output=True, text=True, timeout=timeout_seconds
        )
        result["stdout"] = process.stdout
        result["stderr"] = process.stderr
        if process.returncode != 0:
            result["status"] = "ERROR"
    except FileNotFoundError:
        result["status"], result["stderr"] = "ERROR", "Error: 'psql' no encontrado en el contenedor."
    except subprocess.TimeoutExpired:
        result["status"], result["stderr"] = "TIMEOUT", "SQL query timed out."
    except Exception as e:
        result["status"], result["stderr"] = "ERROR", traceback.format_exc()
    return result


def on_request(ch, method, props, body):
    payload = json.loads(body.decode("utf-8"))
    lang = payload.get("data", {}).get("language", "python")
    print(f"[*] Received execution request in {lang}")

    # TODO: Integrar el Visual Debugger hook aquí
    code = payload.get("data", {}).get("code", "")
    
    if lang == "javascript":
        execution_result = execute_javascript(code)
    elif lang == "typescript":
        execution_result = execute_typescript(code)
    elif lang == "java":
        execution_result = execute_java(code)
    elif lang == "cpp":
        execution_result = execute_cpp(code)
    elif lang == "rust":
        execution_result = execute_rust(code)
    elif lang == "sql":
        execution_result = execute_sql(code)
    else:
        execution_result = execute_code(code)

    response_payload = json.dumps(execution_result)
    
    ch.basic_publish(
        exchange="",
        routing_key=props.reply_to,
        properties=pika.BasicProperties(correlation_id=props.correlation_id),
        body=response_payload
    )
    ch.basic_ack(delivery_tag=method.delivery_tag)
    print(f"[*] Sent response: {execution_result['status']}")

def main():
    connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
    channel = connection.channel()
    
    channel.queue_declare(queue=QUEUE_NAME, durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=QUEUE_NAME, on_message_callback=on_request)

    print(f"[*] Awaiting RPC requests on {QUEUE_NAME}...")
    channel.start_consuming()

if __name__ == "__main__":
    main()
