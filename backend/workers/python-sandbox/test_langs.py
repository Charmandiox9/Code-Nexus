import subprocess, os

print("=" * 50)
print("CodeNexus Sandbox - Full Language Test")
print("=" * 50)

# TypeScript
print("\n[1/4] TypeScript (tsx)")
code_ts = 'interface Person { name: string; age: number; }\nconst p: Person = { name: "CodeNexus", age: 1 };\nconsole.log(`Hello from ${p.name}!`);'
with open('/tmp/t.ts', 'w') as f:
    f.write(code_ts)
r = subprocess.run(['tsx', '/tmp/t.ts'], capture_output=True, text=True, timeout=15)
print('  OK:', r.stdout.strip()) if r.returncode == 0 else print('  FAIL:', r.stderr[:200])
os.remove('/tmp/t.ts')

# Rust
print("\n[2/4] Rust (rustc)")
code_rs = 'fn main() {\n    let v: Vec<i32> = vec![1, 2, 3];\n    println!("Rust sum: {}", v.iter().sum::<i32>());\n}'
with open('/tmp/t.rs', 'w') as f:
    f.write(code_rs)
c = subprocess.run(['rustc', '/tmp/t.rs', '-o', '/tmp/t_rs'], capture_output=True, text=True, timeout=60)
if c.returncode == 0:
    r2 = subprocess.run(['/tmp/t_rs'], capture_output=True, text=True, timeout=10)
    print('  OK:', r2.stdout.strip()) if r2.returncode == 0 else print('  FAIL:', r2.stderr[:200])
    os.remove('/tmp/t_rs')
else:
    print('  COMPILE FAIL:', c.stderr[:200])
os.remove('/tmp/t.rs')

# C++
print("\n[3/4] C++ (g++ -std=c++17)")
code_cpp = '#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> v = {1, 2, 3};\n    int sum = 0;\n    for (auto& x : v) sum += x;\n    std::cout << "C++ sum: " << sum << std::endl;\n}'
with open('/tmp/t.cpp', 'w') as f:
    f.write(code_cpp)
c2 = subprocess.run(['g++', '-std=c++17', '/tmp/t.cpp', '-o', '/tmp/t_cpp'], capture_output=True, text=True, timeout=30)
if c2.returncode == 0:
    r3 = subprocess.run(['/tmp/t_cpp'], capture_output=True, text=True, timeout=10)
    print('  OK:', r3.stdout.strip()) if r3.returncode == 0 else print('  FAIL:', r3.stderr[:200])
    os.remove('/tmp/t_cpp')
else:
    print('  COMPILE FAIL:', c2.stderr[:200])
os.remove('/tmp/t.cpp')

# SQL (pagila)
print("\n[4/4] SQL (psql --csv against pagila)")
r4 = subprocess.run(
    ['psql', 'postgresql://sandbox:sandbox_password@sandbox-db:5432/pagila', '--csv', '-c',
     'SELECT first_name, last_name FROM actor ORDER BY actor_id LIMIT 3;'],
    capture_output=True, text=True, timeout=10
)
print('  OK:\n  ' + r4.stdout.strip().replace('\n', '\n  ')) if r4.returncode == 0 else print('  FAIL:', r4.stderr[:200])

print("\n" + "=" * 50)
print("All tests done!")
