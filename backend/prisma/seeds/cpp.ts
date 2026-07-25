import { LessonType } from '@prisma/client';
import { SeederFunction } from './types';

export const getCppSeed: SeederFunction = async (prisma) => {
  return {
    slug: 'cpp',
    name: 'C++',
    version: '17',
    sections: [
      {
      concept: { slug: "phase-1-boot-sequence-core-mechanics", title: "Phase 1: Boot Sequence & Core Mechanics", description: "Infiltrate and master this sector.", orderIndex: 1 },
      lessons: [
          {
            title: "Initialization Protocol",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "C++ is a high-performance, statically-typed compiled language. The entry point of every C++ program is the `int main()` function. To output text, we use `std::cout` from the `<iostream>` library.",
              instructions: "Operative, we need to verify the terminal's structural integrity. Output 'System Online' to confirm.",
              initialCode: "#include <iostream>\n\nint main() {\n  // Output 'System Online'\n  \n  return 0;\n}",
              expectedOutput: "System Online"
            }
          },
          {
            title: "Directives and Namespaces",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "`using namespace std;` brings the standard library namespace into the global scope. While useful for small scripts, it can cause name collisions in large architectures. Directives like `#include` are handled by the preprocessor before compilation.",
              instructions: "Analyze the provided transmission script. Run the code to observe how `std::` can be omitted when the namespace is declared.",
              initialCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << \"Bypassing security protocols...\";\n  return 0;\n}",
              expectedOutput: "Bypassing security protocols..."
            }
          },
          {
            title: "Primitive Variables",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Variables are typed memory allocations. C++ requires explicit type declaration: `int` for integers, `double` for floating-point, `char` for single characters, and `bool` for booleans.",
              instructions: "We need to store the target server's access code. Declare an `int` named `accessCode` and assign it the value `404`.",
              initialCode: "#include <iostream>\n\nint main() {\n  // Declare and initialize accessCode here\n  \n  std::cout << accessCode;\n  return 0;\n}",
              expectedOutput: "404"
            }
          },
          {
            title: "The String Standard",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "Unlike basic `char` arrays (C-strings), modern C++ utilizes the `std::string` class from the `<string>` library for robust text manipulation, providing built-in methods for appending, comparing, and sizing.",
              instructions: "Construct a `std::string` variable named `payload` containing 'Trojan_v1'. Output it to the terminal.",
              initialCode: "#include <iostream>\n#include <string>\n\nint main() {\n  \n  return 0;\n}",
              expectedOutput: "Trojan_v1"
            }
          },
          {
            title: "Mathematical Operators",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "C++ supports standard arithmetic operations: `+`, `-`, `*`, `/`, and `%`. Note that integer division truncates decimals. To get a floating-point result, at least one operand must be a float or double.",
              instructions: "Calculate the encryption key multiplier. Multiply 7 by 8 and store it in an `int` variable called `key`. Output the result.",
              initialCode: "#include <iostream>\n\nint main() {\n  \n  return 0;\n}",
              expectedOutput: "56"
            }
          },
          {
            title: "Boss: Knowledge Check - Basics",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Assessment of fundamental C++ syntax, variable declaration, and basic I/O operations.",
              instructions: "Which of the following is the correct way to output 'Hacked' to the console in C++ using the standard library?",
              initialCode: "",
              quizOptions: [
                "console.log('Hacked');",
                "System.out.println('Hacked');",
                "std::cout << \"Hacked\";",
                "print(\"Hacked\")"
              ],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
      concept: { slug: "phase-2-conditional-branches-data-flow", title: "Phase 2: Conditional Branches & Data Flow", description: "Infiltrate and master this sector.", orderIndex: 2 },
      lessons: [
          {
            title: "If/Else Statements",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Conditional branching allows a program to execute different code blocks based on boolean evaluations. The syntax is `if (condition) { ... } else { ... }`.",
              instructions: "A firewall is blocking our path. If `bypass` is true, output 'Access Granted'. Otherwise, output 'Access Denied'.",
              initialCode: "#include <iostream>\n\nint main() {\n  bool bypass = true;\n  // Write your if/else statement here\n  \n  return 0;\n}",
              expectedOutput: "Access Granted"
            }
          },
          {
            title: "Logical Operators",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Multiple conditions can be combined using logical operators: `&&` (AND), `||` (OR), and `!` (NOT). Short-circuit evaluation applies.",
              instructions: "We can only inject the payload if `isAdmin` is true AND `firewallDown` is true. Create an if statement to check this, outputting 'Injecting...' if successful.",
              initialCode: "#include <iostream>\n\nint main() {\n  bool isAdmin = true;\n  bool firewallDown = true;\n  // Check conditions here\n  \n  return 0;\n}",
              expectedOutput: "Injecting..."
            }
          },
          {
            title: "The Switch Statement",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "A `switch` statement evaluates a single integral expression against multiple `case` labels. Without a `break;` statement, execution 'falls through' to subsequent cases.",
              instructions: "Run this simulation to see how the system routes requests based on the `port` variable.",
              initialCode: "#include <iostream>\n\nint main() {\n  int port = 80;\n  switch (port) {\n    case 80:\n      std::cout << \"HTTP Traffic\";\n      break;\n    case 443:\n      std::cout << \"HTTPS Traffic\";\n      break;\n    default:\n      std::cout << \"Unknown Port\";\n  }\n  return 0;\n}",
              expectedOutput: "HTTP Traffic"
            }
          },
          {
            title: "While & Do-While Loops",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "A `while` loop continuously executes its block as long as the condition evaluates to true. A `do-while` loop executes at least once before checking its condition.",
              instructions: "Create a `while` loop that counts down from 3 to 1, outputting each number, then output 'Ignition'.",
              initialCode: "#include <iostream>\n\nint main() {\n  int count = 3;\n  \n  return 0;\n}",
              expectedOutput: "321Ignition"
            }
          },
          {
            title: "For Loops",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "The `for` loop condenses initialization, condition checking, and iteration into a single statement: `for (init; condition; increment)`.",
              instructions: "Use a `for` loop to iterate exactly 5 times, outputting 'Ping' each time.",
              initialCode: "#include <iostream>\n\nint main() {\n  // Write your for loop here\n  \n  return 0;\n}",
              expectedOutput: "PingPingPingPingPing"
            }
          },
          {
            title: "Boss: Algorithm Decryption",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Synthesizing conditionals and loops to traverse and manipulate data sets.",
              instructions: "Write a program that uses a loop to output all even numbers between 1 and 10, sequentially with no spaces.",
              initialCode: "#include <iostream>\n\nint main() {\n  \n  return 0;\n}",
              expectedOutput: "246810"
            }
          }
        ]
      },
      {
      concept: { slug: "phase-3-data-structures-iteration", title: "Phase 3: Data Structures & Iteration", description: "Infiltrate and master this sector.", orderIndex: 3 },
      lessons: [
          {
            title: "C-Style Arrays",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "An array is a fixed-size contiguous block of memory storing elements of the same type. Array indices start at 0. Accessing out-of-bounds indices leads to undefined behavior.",
              instructions: "Access the third element of the `serverNodes` array and output it.",
              initialCode: "#include <iostream>\n\nint main() {\n  int serverNodes[5] = {10, 20, 30, 40, 50};\n  // Output the 3rd node (value 30)\n  \n  return 0;\n}",
              expectedOutput: "30"
            }
          },
          {
            title: "Iterating Arrays",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Loops are commonly used to traverse arrays. The length of a standard C-array isn't inherently known by the array itself, so you often calculate it with `sizeof(array) / sizeof(array[0])`.",
              instructions: "Use a `for` loop to print every element in the `ports` array.",
              initialCode: "#include <iostream>\n\nint main() {\n  int ports[] = {21, 22, 80, 443};\n  int size = sizeof(ports) / sizeof(ports[0]);\n  \n  return 0;\n}",
              expectedOutput: "212280443"
            }
          },
          {
            title: "std::array",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "Modern C++ introduced `std::array` in `<array>`, providing a safer, object-oriented alternative to C-style arrays without performance overhead. It knows its own size via `.size()`.",
              instructions: "Run this script to observe the safety and syntax of `std::array`.",
              initialCode: "#include <iostream>\n#include <array>\n\nint main() {\n  std::array<int, 3> keys = {101, 202, 303};\n  std::cout << keys.size() << \"-\" << keys.front();\n  return 0;\n}",
              expectedOutput: "3-101"
            }
          },
          {
            title: "std::vector",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "`std::vector` in `<vector>` is a dynamic array. It automatically resizes itself when elements are added via `.push_back()`. It is the default sequence container in C++.",
              instructions: "Include `<vector>`. Create a `std::vector<int>` named `logs`. Push the values `404` and `500` into it. Output the first element.",
              initialCode: "#include <iostream>\n\nint main() {\n  \n  return 0;\n}",
              expectedOutput: "404"
            }
          },
          {
            title: "Range-Based For Loops",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "C++11 introduced range-based for loops, which provide a cleaner syntax for iterating over containers like arrays and vectors: `for (type var : container) { ... }`.",
              instructions: "Use a range-based for loop to iterate through the `signatures` vector and print each.",
              initialCode: "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n  std::vector<std::string> signatures = {\"Worm\", \"Trojan\"};\n  \n  return 0;\n}",
              expectedOutput: "WormTrojan"
            }
          },
          {
            title: "Boss: Data Manipulation Quiz",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Understanding the difference between fixed-size and dynamic data structures in C++ memory management.",
              instructions: "Which STL container should you choose if you need an array that can change size at runtime?",
              initialCode: "",
              quizOptions: [
                "std::list",
                "std::array",
                "C-style array",
                "std::vector"
              ],
              correctOptionIndex: 3
            }
          }
        ]
      },
      {
      concept: { slug: "phase-4-modular-subroutines-functions", title: "Phase 4: Modular Subroutines (Functions)", description: "Infiltrate and master this sector.", orderIndex: 4 },
      lessons: [
          {
            title: "Function Declaration & Definition",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Functions break code into reusable modules. A function must be declared before it is called. The signature includes the return type, name, and parameters.",
              instructions: "We need a subroutine to initiate an override. Define a void function `overrideProtocol()` that outputs 'Override'. Call it from `main`.",
              initialCode: "#include <iostream>\n\n// Define overrideProtocol here\n\nint main() {\n  // Call it here\n  return 0;\n}",
              expectedOutput: "Override"
            }
          },
          {
            title: "Parameters & Arguments",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Functions accept inputs via parameters. When you call the function, you pass arguments. By default, arguments are passed by value (a copy is made).",
              instructions: "Complete the `decrypt` function so it takes an `int` parameter `cipher`, adds 10 to it, and returns the result. Output the result for `cipher = 5`.",
              initialCode: "#include <iostream>\n\nint decrypt(int cipher) {\n  // Return cipher + 10\n}\n\nint main() {\n  std::cout << decrypt(5);\n  return 0;\n}",
              expectedOutput: "15"
            }
          },
          {
            title: "Return Types",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "The return type specifies what data the function sends back to the caller. If a function returns nothing, its type is `void`. Any non-void function must have a `return` statement in all code paths.",
              instructions: "Analyze this function that checks if a port is secure, returning a boolean.",
              initialCode: "#include <iostream>\n\nbool isSecurePort(int port) {\n  return (port == 443 || port == 22);\n}\n\nint main() {\n  if (isSecurePort(80)) std::cout << \"Secure\";\n  else std::cout << \"Vulnerable\";\n  return 0;\n}",
              expectedOutput: "Vulnerable"
            }
          },
          {
            title: "Function Overloading",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "C++ allows function overloading: defining multiple functions with the same name but different parameter lists (signatures). The compiler determines which one to call based on the arguments.",
              instructions: "Create two `printData` functions. One takes an `int` and outputs 'Int', the other takes a `std::string` and outputs 'Str'. Call both from main.",
              initialCode: "#include <iostream>\n#include <string>\n\n// Create overloads here\n\nint main() {\n  \n  return 0;\n}",
              expectedOutput: "IntStr"
            }
          },
          {
            title: "Boss: Default Arguments Logic",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Parameters can have default values. If the caller omits the argument, the default is used. Default arguments must be the right-most parameters in the list.",
              instructions: "Modify the `connect` function so that the `port` parameter defaults to `80`. Call `connect(\"192\")` without the second argument.",
              initialCode: "#include <iostream>\n#include <string>\n\n// Add default argument to port\nvoid connect(std::string ip, int port) {\n  std::cout << ip << \":\" << port;\n}\n\nint main() {\n  connect(\"192\");\n  return 0;\n}",
              expectedOutput: "192:80"
            }
          },
          {
            title: "Boss: Modularity Architecture",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Evaluating function signatures and return types.",
              instructions: "What is the output of the following code snippet?",
              initialCode: "int compute(int x=5) { return x * 2; }\nint main() { cout << compute() << \" \" << compute(3); }",
              quizOptions: [
                "10 6",
                "5 3",
                "10 3",
                "Error: default arguments are not allowed"
              ],
              correctOptionIndex: 0
            }
          }
        ]
      },
      {
      concept: { slug: "phase-5-memory-access-pointers-references", title: "Phase 5: Memory Access (Pointers & References)", description: "Infiltrate and master this sector.", orderIndex: 5 },
      lessons: [
          {
            title: "Memory Addresses",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Every variable resides at a specific memory address in RAM. You can retrieve this address using the address-of operator `&`. Hexadecimal formats are typically used to display addresses.",
              instructions: "Retrieve the memory address of the `core` variable. (Note: Since addresses change every run, output a dummy address like '0x7ffd' for this exercise).",
              initialCode: "#include <iostream>\n\nint main() {\n  int core = 1;\n  // Normally you'd print &core, but for testing, output \"0x7ffd\"\n  std::cout << \"0x7ffd\";\n  return 0;\n}",
              expectedOutput: "0x7ffd"
            }
          },
          {
            title: "Introduction to Pointers",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "A pointer is a variable that stores a memory address. Declared with `*`, such as `int* ptr`. Pointers are the heart of C++, allowing direct manipulation of hardware and memory.",
              instructions: "Declare a pointer `int* ptr` and assign it the address of `secretKey`. Then output '0xabcd' to represent it.",
              initialCode: "#include <iostream>\n\nint main() {\n  int secretKey = 9934;\n  // Declare pointer here\n  \n  std::cout << \"0xabcd\";\n  return 0;\n}",
              expectedOutput: "0xabcd"
            }
          },
          {
            title: "Dereferencing Pointers",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "To access or modify the value at the memory address a pointer holds, you use the dereference operator `*`. E.g., `*ptr = 10;` changes the original variable.",
              instructions: "We have intercepted a pointer to the main security firewall switch. Dereference `ptr` and change its value to `0` to disable it. Output `fireStatus`.",
              initialCode: "#include <iostream>\n\nint main() {\n  int fireStatus = 1;\n  int* ptr = &fireStatus;\n  \n  // Dereference and change to 0\n  \n  std::cout << fireStatus;\n  return 0;\n}",
              expectedOutput: "0"
            }
          },
          {
            title: "Pass by Reference",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "C++ introduces references (`&`). A reference is an alias to an existing variable. Passing by reference to a function allows the function to modify the original variable without dealing with pointer syntax.",
              instructions: "Observe how `hackTerminal` modifies the original `attempts` variable because it accepts it by reference.",
              initialCode: "#include <iostream>\n\nvoid hackTerminal(int& attemptsRef) {\n  attemptsRef -= 1;\n}\n\nint main() {\n  int attempts = 3;\n  hackTerminal(attempts);\n  std::cout << attempts;\n  return 0;\n}",
              expectedOutput: "2"
            }
          },
          {
            title: "Boss: Pointer Arithmetic",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Pointers and arrays are deeply connected. Arrays decay into pointers to their first element. You can add to a pointer to traverse an array.",
              instructions: "We have an array `int data[] = {10, 20, 30}`. Using a pointer initialized to `data`, dereference `ptr + 1` to output the second element.",
              initialCode: "#include <iostream>\n\nint main() {\n  int data[] = {10, 20, 30};\n  int* ptr = data;\n  // Output the second element using pointer arithmetic\n  \n  return 0;\n}",
              expectedOutput: "20"
            }
          },
          {
            title: "Boss: Memory Leak Quiz",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Understanding dynamic memory allocation with `new` and `delete`.",
              instructions: "When you allocate memory on the heap using the `new` keyword, what must you eventually do to prevent a memory leak?",
              initialCode: "",
              quizOptions: [
                "Call free()",
                "Wait for the Garbage Collector",
                "Call delete on the pointer",
                "Set the pointer to NULL"
              ],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
      concept: { slug: "phase-6-object-oriented-schematics", title: "Phase 6: Object-Oriented Schematics", description: "Infiltrate and master this sector.", orderIndex: 6 },
      lessons: [
          {
            title: "Classes & Objects",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "C++ is an Object-Oriented language. A `class` is a blueprint for objects, encapsulating data (attributes) and functions (methods). Objects are instances of classes.",
              instructions: "Define a class `Drone` with a public integer `battery`. In `main`, create a `Drone` object, set its battery to 100, and print it.",
              initialCode: "#include <iostream>\n\nclass Drone {\npublic:\n  int battery;\n};\n\nint main() {\n  // Create object and set battery\n  \n  return 0;\n}",
              expectedOutput: "100"
            }
          },
          {
            title: "Constructors",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "A constructor is a special class method invoked automatically when an object is instantiated. It shares the same name as the class and has no return type.",
              instructions: "Add a constructor to the `Server` class that takes an `int` and initializes the `uptime` attribute. Instantiate a Server with uptime 99 and print it.",
              initialCode: "#include <iostream>\n\nclass Server {\npublic:\n  int uptime;\n  // Write constructor here\n};\n\nint main() {\n  Server s1(99);\n  std::cout << s1.uptime;\n  return 0;\n}",
              expectedOutput: "99"
            }
          },
          {
            title: "Encapsulation (Private & Public)",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "By default, class members are `private`. They cannot be accessed outside the class. We use `public` getter and setter methods to control access to private data.",
              instructions: "Observe how the private `encryptionKey` is protected, and only accessible via `setKey()` and `getKey()`.",
              initialCode: "#include <iostream>\n\nclass Vault {\nprivate:\n  int encryptionKey;\npublic:\n  void setKey(int key) { encryptionKey = key; }\n  int getKey() { return encryptionKey; }\n};\n\nint main() {\n  Vault v;\n  v.setKey(1234);\n  std::cout << v.getKey();\n  return 0;\n}",
              expectedOutput: "1234"
            }
          },
          {
            title: "Inheritance",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "Inheritance allows a new class (derived) to inherit attributes and methods from an existing class (base). Syntax: `class Derived : public Base {}`.",
              instructions: "Create a base class `Entity` with a public method `void scan() { std::cout << \"Scan\"; }`. Create a `Virus` class inheriting `Entity`. In `main`, call `scan()` on a `Virus` object.",
              initialCode: "#include <iostream>\n\n// Define Entity\n\n// Define Virus inheriting from Entity\n\nint main() {\n  \n  return 0;\n}",
              expectedOutput: "Scan"
            }
          },
          {
            title: "Boss: Polymorphism Quiz",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Polymorphism allows methods to do different things based on the object it is acting upon, typically utilizing virtual functions.",
              instructions: "To allow a derived class to override a base class method, what keyword must precede the base class method declaration?",
              initialCode: "",
              quizOptions: [
                "override",
                "virtual",
                "static",
                "abstract"
              ],
              correctOptionIndex: 1
            }
          }
        ]
      },
      {
      concept: { slug: "phase-7-advanced-systems-stl", title: "Phase 7: Advanced Systems & STL", description: "Infiltrate and master this sector.", orderIndex: 7 },
      lessons: [
          {
            title: "Templates",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Templates allow functions and classes to operate with generic types, preventing code duplication. Syntax starts with `template <typename T>`.",
              instructions: "Create a template function `getMax` that takes two parameters of type `T` and returns the larger one using the ternary operator `(a > b) ? a : b`. Call it with 5 and 10.",
              initialCode: "#include <iostream>\n\n// Define template getMax here\n\nint main() {\n  std::cout << getMax(5, 10);\n  return 0;\n}",
              expectedOutput: "10"
            }
          },
          {
            title: "Maps & Dictionaries",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "`std::map` (in `<map>`) stores key-value pairs, sorting them by key automatically. `std::unordered_map` does the same but with faster O(1) access via hashing.",
              instructions: "Include `<map>`. Create a `std::map<std::string, int>` called `credentials`. Insert `\"admin\"` with value `1234`. Output the value for `\"admin\"`.",
              initialCode: "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n  // Create map and insert pair\n  \n  return 0;\n}",
              expectedOutput: "1234"
            }
          },
          {
            title: "Structs",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "A `struct` in C++ is nearly identical to a `class`, but its members are `public` by default. They are typically used for grouping simple data variables.",
              instructions: "Run the code to see how a `struct` groups a target's IP and status.",
              initialCode: "#include <iostream>\n#include <string>\n\nstruct Target {\n  std::string ip;\n  bool online;\n};\n\nint main() {\n  Target t1 = {\"192.168.0.1\", true};\n  std::cout << t1.ip << (t1.online ? \"Up\" : \"Down\");\n  return 0;\n}",
              expectedOutput: "192.168.0.1Up"
            }
          },
          {
            title: "Boss: Final Algorithm Exam",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Comprehensive synthesis of variables, loops, arrays, and standard libraries.",
              instructions: "Write a program that iterates from 1 to 5. If the number is even, push it into a `std::vector<int>`. After the loop, output the size of the vector.",
              initialCode: "#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> evens;\n  // Write loop logic here\n  \n  // Output size\n  return 0;\n}",
              expectedOutput: "2"
            }
          },
          {
            title: "Boss: The Ultimate Override",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Final evaluation of C++ compilation, execution, and memory.",
              instructions: "Which standard library function is commonly used to dynamically allocate an array in modern C++ to avoid raw pointers?",
              initialCode: "",
              quizOptions: [
                "malloc()",
                "std::make_unique<T[]>()",
                "new T[]",
                "calloc()"
              ],
              correctOptionIndex: 1
            }
          }
        ]
      }
    ]
  };
};
