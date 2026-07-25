import subprocess, os

print("=== Testing TypeScript ===")
code_ts = 'const x: number = 42;\nconsole.log("TS OK:", x);'
with open('/tmp/t.ts', 'w') as f:
    f.write(code_ts)
r = subprocess.run(
    ['ts-node', '--transpile-only', '--compiler-options', '{"module":"commonjs","target":"es2020"}', '/tmp/t.ts'],
    capture_output=True, text=True, timeout=15
)
print('TS:', r.stdout.strip() if r.returncode == 0 else 'FAIL: ' + r.stderr[:200])

print("\n=== Testing Rust ===")
code_rs = 'fn main() { println!("Rust OK"); }'
with open('/tmp/t.rs', 'w') as f:
    f.write(code_rs)
c = subprocess.run(['rustc', '/tmp/t.rs', '-o', '/tmp/t_rs'], capture_output=True, text=True, timeout=60)
if c.returncode == 0:
    r2 = subprocess.run(['/tmp/t_rs'], capture_output=True, text=True, timeout=10)
    print('Rust:', r2.stdout.strip())
    os.remove('/tmp/t_rs')
else:
    print('Rust FAIL:', c.stderr[:200])
os.remove('/tmp/t.rs')
os.remove('/tmp/t.ts')
