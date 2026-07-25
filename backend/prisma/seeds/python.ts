import { PrismaClient, LessonType } from '@prisma/client';
import { SeederFunction, LanguageSeed } from './types';

export const getPythonSeed: SeederFunction = async (prisma) => {
  return {
    slug: 'python',
    name: 'Python',
    version: '3.13.5',
    sections: [
      {
        concept: {
          slug: 'python-basics',
          title: 'The Initialization',
          description: 'Establish your connection to the mainframe. Learn fundamental syntax and variable assignment protocols.',
          orderIndex: 1
        },
        lessons: [
          {
            title: 'Connecting to the Grid',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Welcome to the grid, Operator. Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability. In our operations, Python is the tool of choice for rapid prototyping and system infiltration.',
              instructions: 'Initialize the system by printing the standard connection string: System Online',
              initialCode: '# Use the print() function to output text\nprint("System Online")\n',
              expectedOutput: 'System Online\n'
            }
          },
          {
            title: 'Variable Allocation',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Memory allocation is critical. Variables in Python are created the moment you first assign a value to them. They act as labels referencing data in the system memory.',
              instructions: 'Observe how variables are declared and manipulated. Assign a system ID to the variable and output it.',
              initialCode: 'system_id = 1042\nprint(system_id)\n',
              expectedOutput: '1042\n'
            }
          },
          {
            title: 'Dynamic Typing',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Python is dynamically typed. This means the type of a variable is determined at runtime, allowing for fluid data manipulation during live operations.',
              instructions: 'Reassign the variable `payload` from an integer to a string "Bypass" to evade the type-checker, then print it.',
              initialCode: 'payload = 404\n# Reassign payload to "Bypass" below\npayload = "Bypass"\nprint(payload)\n',
              expectedOutput: 'Bypass\n'
            }
          },
          {
            title: 'Mathematical Operations',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Standard arithmetic operators exist in Python: +, -, *, /. The // operator performs floor division, crucial for integer-based coordinate calculations.',
              instructions: 'Calculate the total sector bandwidth. Multiply 128 by 4 and print the result.',
              initialCode: '# Perform the calculation and print the result\nprint(128 * 4)\n',
              expectedOutput: '512\n'
            }
          },
          {
            title: 'String Manipulation',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'Strings can be concatenated using + or formatted using f-strings (f"..."). F-strings are faster and more readable when injecting variables into commands.',
              instructions: 'Create an f-string that interpolates the variable `target` into the string: "Target acquired: [target]". Print it.',
              initialCode: 'target = "Mainframe"\n# Print the f-string\nprint(f"Target acquired: {target}")\n',
              expectedOutput: 'Target acquired: Mainframe\n'
            }
          },
          {
            title: 'Operator Precedence Assessment',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'A deep understanding of order of operations is required to prevent catastrophic miscalculations in the field. Remember PEMDAS.',
              instructions: 'Identify the result of the following expression: 2 + 3 * 4 ** 2',
              initialCode: '',
              quizOptions: ['80', '50', '26', '144'],
              correctOptionIndex: 1
            }
          },
          {
            title: 'Fix the Broken Script',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'An allied agent left a broken script behind. We need you to patch it up to extract the final coordinates.',
              instructions: 'Fix the syntax and logical errors in the script so it outputs: Agent 007 coordinates: 45',
              initialCode: 'agent = "007"\ncoords_1 = "20"\ncoords_2 = 25\n# Fix the next line to output correctly\nprint("Agent " + agent + " coordinates: " + str(int(coords_1) + coords_2))\n',
              expectedOutput: 'Agent 007 coordinates: 45\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'conditional-logic',
          title: 'Conditional Logic',
          description: 'Control the flow of execution. Implement branching protocols to react to dynamic security threats.',
          orderIndex: 2
        },
        lessons: [
          {
            title: 'Boolean Algebra',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'The core of machine decision-making is Boolean logic. In Python, True and False govern the execution path. The `not` operator inverts state.',
              instructions: 'Output a True state to confirm protocol understanding.',
              initialCode: '# Print True\nprint(True)\n',
              expectedOutput: 'True\n'
            }
          },
          {
            title: 'Branching Paths',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The `if` statement evaluates a condition. If it is truthy, the indented code block executes. Indentation in Python is syntactic, not just stylistic.',
              instructions: 'Observe the execution block.',
              initialCode: 'access_level = 5\nif access_level > 3:\n    print("Access Granted")\n',
              expectedOutput: 'Access Granted\n'
            }
          },
          {
            title: 'Handling Rejection',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'When conditions fail, we need fallback mechanisms. The `else` block catches anything that the `if` block misses.',
              instructions: 'Complete the else block to print "Access Denied".',
              initialCode: 'clearance = 2\nif clearance >= 4:\n    print("Access Granted")\nelse:\n    print("Access Denied")\n',
              expectedOutput: 'Access Denied\n'
            }
          },
          {
            title: 'Multiple Contingencies',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'The `elif` keyword allows for multiple sequential checks. It stands for "else if" and stops checking once a truthy condition is found.',
              instructions: 'Write an elif block that prints "Warning" if threat_level is exactly 3.',
              initialCode: 'threat_level = 3\nif threat_level > 4:\n    print("Evacuate")\nelif threat_level == 3:\n    print("Warning")\nelse:\n    print("Safe")\n',
              expectedOutput: 'Warning\n'
            }
          },
          {
            title: 'Nested Logic Bomb',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'Logic blocks can be nested indefinitely. However, excessive nesting makes the code difficult to debug during live fire scenarios.',
              instructions: 'Inside the existing if statement, add another if statement checking if user == "admin". If so, print "Root Access".',
              initialCode: 'system_active = True\nuser = "admin"\nif system_active:\n    if user == "admin":\n        print("Root Access")\n',
              expectedOutput: 'Root Access\n'
            }
          },
          {
            title: 'Logic Gate Quiz',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Understanding complex logical statements using `and` / `or` is essential for parsing security rules.',
              instructions: 'What is the output of `True and not False or False`?',
              initialCode: '',
              quizOptions: ['True', 'False', 'None', 'SyntaxError'],
              correctOptionIndex: 0
            }
          },
          {
            title: 'Security Clearance Gate',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'We need a script to validate incoming connections based on specific credentials.',
              instructions: 'Write logic that prints "Welcome" if role is "admin" AND key is "0x99". Otherwise, print "Intruder".',
              initialCode: 'role = "admin"\nkey = "0x99"\nif role == "admin" and key == "0x99":\n    print("Welcome")\nelse:\n    print("Intruder")\n',
              expectedOutput: 'Welcome\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'iteration-protocols',
          title: 'Iteration Protocols',
          description: 'Automate repetitive tasks. Exploit loop structures to brute-force security measures.',
          orderIndex: 3
        },
        lessons: [
          {
            title: 'Repetition Structures',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Loops allow code to be executed repeatedly based on a condition or an iterable collection. They are the engine of automation.',
              instructions: 'Observe a simple loop structure.',
              initialCode: 'for i in range(3):\n    print(i)\n',
              expectedOutput: '0\n1\n2\n'
            }
          },
          {
            title: 'While Loops',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The `while` loop runs continuously as long as its condition remains True. Beware of infinite loops; they will crash the system.',
              instructions: 'Run the script to watch the counter decrement.',
              initialCode: 'countdown = 3\nwhile countdown > 0:\n    print(countdown)\n    countdown -= 1\n',
              expectedOutput: '3\n2\n1\n'
            }
          },
          {
            title: 'For Loops and Ranges',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'The `for` loop in Python iterates over the items of any sequence. The `range(n)` function generates numbers from 0 up to n-1.',
              instructions: 'Modify the range to print numbers 0 through 4.',
              initialCode: 'for x in range(5):\n    print(x)\n',
              expectedOutput: '0\n1\n2\n3\n4\n'
            }
          },
          {
            title: 'Loop Control: Break',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'The `break` statement terminates the current loop entirely. Useful when you find what you are looking for and want to exit early.',
              instructions: 'Use a break statement to stop the loop when i == 2.',
              initialCode: 'for i in range(5):\n    if i == 2:\n        break\n    print(i)\n',
              expectedOutput: '0\n1\n'
            }
          },
          {
            title: 'Loop Control: Continue',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'The `continue` statement skips the rest of the current iteration and jumps to the next iteration of the loop.',
              instructions: 'Use continue to skip printing the number 2.',
              initialCode: 'for i in range(4):\n    if i == 2:\n        continue\n    print(i)\n',
              expectedOutput: '0\n1\n3\n'
            }
          },
          {
            title: 'Execution Cycle Analysis',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Analyze the behavior of iterative processes without executing them.',
              instructions: 'How many times will "ping" be printed? `for i in range(2, 5): print("ping")`',
              initialCode: '',
              quizOptions: ['2', '3', '4', '5'],
              correctOptionIndex: 1
            }
          },
          {
            title: 'Decryption Sequence',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'We have intercepted a data stream. Iterate through numbers 1 to 5 to find anomalies.',
              instructions: 'Print numbers 1 to 5 using a loop. If the number is 3, print "Anomaly" instead of the number.',
              initialCode: 'for i in range(1, 6):\n    if i == 3:\n        print("Anomaly")\n    else:\n        print(i)\n',
              expectedOutput: '1\n2\nAnomaly\n4\n5\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'subroutines',
          title: 'Subroutines',
          description: 'Package your logic into reusable functions. Modularity is the key to scalable cyber operations.',
          orderIndex: 4
        },
        lessons: [
          {
            title: 'Modular Code',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Functions, declared with `def`, allow you to encapsulate a block of code and reuse it. This isolates operational logic.',
              instructions: 'Call the defined function to activate the subroutine.',
              initialCode: 'def activate():\n    print("Subroutine Active")\n\nactivate()\n',
              expectedOutput: 'Subroutine Active\n'
            }
          },
          {
            title: 'Defining Functions',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'A function consists of a signature and a body. The body must be indented. Execution only happens when explicitly called.',
              instructions: 'Observe function execution flow.',
              initialCode: 'def ping():\n    print("Pong")\n\nping()\n',
              expectedOutput: 'Pong\n'
            }
          },
          {
            title: 'Parameters & Arguments',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Functions can accept input parameters, allowing them to process dynamic data payloads.',
              instructions: 'Define the function greet to accept a parameter `name` and print `Hello <name>`.',
              initialCode: 'def greet(name):\n    print(f"Hello {name}")\n\ngreet("Agent")\n',
              expectedOutput: 'Hello Agent\n'
            }
          },
          {
            title: 'Return Data',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'The `return` statement terminates a function and sends data back to the caller.',
              instructions: 'Fix the multiply function so it returns the product of a and b.',
              initialCode: 'def multiply(a, b):\n    return a * b\n\nresult = multiply(4, 5)\nprint(f"Result: {result}")\n',
              expectedOutput: 'Result: 20\n'
            }
          },
          {
            title: 'Variable Scope',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'Variables created inside a function are local to that function. They cannot be accessed from the global scope.',
              instructions: 'Demonstrate variable scope by printing the global `secret` variable inside the function.',
              initialCode: 'secret = "GlobalKey"\ndef check_scope():\n    print(secret)\n\ncheck_scope()\n',
              expectedOutput: 'GlobalKey\n'
            }
          },
          {
            title: 'Data Processing Module',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Your final test for subroutines. Process incoming transmission data accurately.',
              instructions: 'Write a function process_data(n) that returns absolute value of (n * 10 - 5). Call it with -5 and print the result.',
              initialCode: 'def process_data(n):\n    return abs(n * 10 - 5)\n\nprint(process_data(-5))\n',
              expectedOutput: '55\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'data-structures',
          title: 'Data Structures',
          description: 'Organize and manipulate complex data payloads. Master lists and dictionaries to handle bulk information.',
          orderIndex: 5
        },
        lessons: [
          {
            title: 'Memory Arrays (Lists)',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Lists are ordered, mutable collections of items. They can hold mixed data types and are fundamental for storing sequences.',
              instructions: 'Print the first item in the list using its index [0].',
              initialCode: 'nodes = ["alpha", "beta", "gamma"]\nprint(nodes[0])\n',
              expectedOutput: 'alpha\n'
            }
          },
          {
            title: 'List Operations',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Lists support various methods. `.append()` adds to the end, `.pop()` removes from the end.',
              instructions: 'Observe list mutation.',
              initialCode: 'stack = [1, 2]\nstack.append(3)\nprint(stack)\n',
              expectedOutput: '[1, 2, 3]\n'
            }
          },
          {
            title: 'List Comprehensions',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'List comprehensions provide a concise way to create lists. They execute faster than standard loops.',
              instructions: 'Use a comprehension to create a list of squares for numbers 1, 2, 3.',
              initialCode: 'squares = [x*x for x in [1, 2, 3]]\nprint(squares)\n',
              expectedOutput: '[1, 4, 9]\n'
            }
          },
          {
            title: 'Key-Value Stores (Dictionaries)',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Dictionaries are unordered, mutable collections of key-value pairs providing O(1) lookup times.',
              instructions: 'Add a new key "status" with value "online" to the dictionary, then print the value.',
              initialCode: 'config = {"ip": "192.168.1.1"}\nconfig["status"] = "online"\nprint(config["status"])\n',
              expectedOutput: 'online\n'
            }
          },
          {
            title: 'Tuples & Sets',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'Tuples are immutable lists. Sets are collections of unique elements, perfect for intersections.',
              instructions: 'Create a set with elements 1, 2, 2, 3 and print it to see the duplicates removed.',
              initialCode: 'my_set = set([1, 2, 2, 3])\nprint(sorted(list(my_set)))\n',
              expectedOutput: '[1, 2, 3]\n'
            }
          },
          {
            title: 'The Configuration File',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Extract specific data from a nested dictionary payload.',
              instructions: 'Print the value of the "port" key nested inside the "server" dictionary.',
              initialCode: 'payload = {"server": {"ip": "10.0.0.1", "port": 8080}}\nprint(payload["server"]["port"])\n',
              expectedOutput: '8080\n'
            }
          },
          {
            title: 'Sorting the Evidence',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Process a list of strings, filtering and sorting data.',
              instructions: 'Print a new list containing only words that start with "c", sorted alphabetically.',
              initialCode: 'words = ["cat", "dog", "car", "apple", "cable"]\nc_words = sorted([w for w in words if w.startswith("c")])\nprint(c_words)\n',
              expectedOutput: "['cable', 'car', 'cat']\n"
            }
          }
        ]
      },
      {
        concept: {
          slug: 'oop-paradigms',
          title: 'Object-Oriented Paradigms',
          description: 'Model real-world entities. Use classes to structure complex application state and behavior.',
          orderIndex: 6
        },
        lessons: [
          {
            title: 'The Object Paradigm',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Object-Oriented Programming (OOP) groups data and functions into logical blueprints called Classes.',
              instructions: 'Print the type of an instantiated object.',
              initialCode: 'class Agent:\n    pass\n\nx = Agent()\nprint(type(x).__name__)\n',
              expectedOutput: 'Agent\n'
            }
          },
          {
            title: 'Classes and Instances',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The `__init__` method is the constructor. It runs when a new instance is created. `self` refers to the specific instance.',
              instructions: 'Observe how attributes are bound to an instance.',
              initialCode: 'class Node:\n    def __init__(self, id):\n        self.id = id\n\nn = Node("A1")\nprint(n.id)\n',
              expectedOutput: 'A1\n'
            }
          },
          {
            title: 'Instance Methods',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Methods are functions defined inside a class. They must accept `self` as their first parameter.',
              instructions: 'Add a method `ping()` to the Server class that prints "Pong from Main".',
              initialCode: 'class Server:\n    def __init__(self, name):\n        self.name = name\n    def ping(self):\n        print(f"Pong from {self.name}")\n\ns = Server("Main")\ns.ping()\n',
              expectedOutput: 'Pong from Main\n'
            }
          },
          {
            title: 'Inheritance',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Inheritance allows a new class (Child) to inherit attributes and methods from an existing class (Parent).',
              instructions: 'Create a class Admin that inherits from User and overrides the __init__ to print "Admin Online".',
              initialCode: 'class User:\n    def __init__(self):\n        print("User Online")\n\nclass Admin(User):\n    def __init__(self):\n        print("Admin Online")\n\nAdmin()\n',
              expectedOutput: 'Admin Online\n'
            }
          },
          {
            title: 'Polymorphism',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'Polymorphism allows subclasses to define their own unique behaviors for methods shared with the parent class.',
              instructions: 'Override the `execute()` method in the StealthMode class to print "Silent Execution".',
              initialCode: 'class Mode:\n    def execute(self):\n        print("Standard Execution")\nclass StealthMode(Mode):\n    def execute(self):\n        print("Silent Execution")\n\nStealthMode().execute()\n',
              expectedOutput: 'Silent Execution\n'
            }
          },
          {
            title: 'Construct the AI Core',
            type: LessonType.BOSS,
            xpReward: 150,
            content: {
              theory: 'Combine your knowledge of classes, inheritance, and attributes to construct a functional AI Core representation.',
              instructions: 'Create a class AI with an __init__ that takes name. Add a method status() that prints "[name] is operational". Instantiate AI("HAL") and call status().',
              initialCode: 'class AI:\n    def __init__(self, name):\n        self.name = name\n    def status(self):\n        print(f"{self.name} is operational")\n\nAI("HAL").status()\n',
              expectedOutput: 'HAL is operational\n'
            }
          }
        ]
      }
    ]
  };
};
