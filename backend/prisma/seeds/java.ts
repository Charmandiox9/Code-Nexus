import { PrismaClient, LessonType } from '@prisma/client';
import { SeederFunction } from './types';

export const getJavaSeed: SeederFunction = async (prisma) => {
  return {
    slug: 'java',
    name: 'Java',
    version: '21',
    sections: [
      {
        concept: {
          slug: 'java-cyber-core',
          title: 'The Cyber-Core (Basics)',
          description: 'Initialize the mainframe and master the fundamental constructs of Java 21 execution environments.',
          orderIndex: 1,
        },
        lessons: [
          {
            title: 'Boot Sequence',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Welcome to the Nexus Console. Java is a strongly typed, object-oriented programming language. All execution begins within the `main` method of a primary class. The Cyber-Core requires strict syntax: every statement must terminate with a semicolon, and code blocks are encapsulated in braces `{}`.',
              instructions: 'Initialize the primary execution sequence. Output the exact phrase "System Booting..." to the terminal using `System.out.println`.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Initiate boot sequence\n    }\n}',
              expectedOutput: 'System Booting...\n'
            }
          },
          {
            title: 'Syntax Overview',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'The underlying architecture of our cyber environment relies on object definitions. A file typically contains one public class matching the filename. The entry point, `public static void main(String[] args)`, is the singular node where our execution thread begins.',
              instructions: 'Observe the structure of the Main class. Execute the provided script to verify the console output.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Node Connected");\n    }\n}',
              expectedOutput: 'Node Connected\n'
            }
          },
          {
            title: 'Terminal Echo',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Transmission protocols offer two primary methods for terminal echoing: `print()` and `println()`. While `println()` appends a newline character post-transmission, `print()` leaves the cursor on the current line, allowing for continuous stream injection.',
              instructions: 'Output "Access" and "Granted" on the same line using two `System.out.print` statements, separated by a space.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.print("Access");\n        // Complete the transmission\n    }\n}',
              expectedOutput: 'Access Granted'
            }
          },
          {
            title: 'Multi-line Transmissions',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'Complex payloads often require multi-line formatting to properly structure the command interface. Utilizing multiple `println()` calls ensures clear separation of data packets.',
              instructions: 'Output exactly three lines:\nLine 1: "Uplink Established"\nLine 2: "Decrypting..."\nLine 3: "Payload Delivered"',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Uplink Established\nDecrypting...\nPayload Delivered\n'
            }
          },
          {
            title: 'Stealth Comments',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'When injecting code into hostile systems, leaving notes for allied operatives is crucial. Java provides single-line comments using `//` and multi-line comments encapsulated between `/*` and `*/`. These blocks are completely ignored by the JVM compiler.',
              instructions: 'The code currently executes a self-destruct sequence! Comment out the line printing "Initiating self-destruct" and print "System Safe" instead.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Initiating self-destruct");\n        // Print "System Safe" below\n    }\n}',
              expectedOutput: 'System Safe\n'
            }
          },
          {
            title: 'Mainframe Initialization Quiz',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'The security AI is testing your fundamental knowledge of the Java Cyber-Core. Answer correctly to bypass the firewall.',
              instructions: 'Select the correct statement regarding Java execution.',
              initialCode: '',
              quizOptions: [
                'Execution begins at the first line of the file',
                'Execution requires a public static void main method',
                'Comments are compiled into bytecode for security',
                'System.out.print always adds a newline'
              ],
              correctOptionIndex: 1
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-data-matrices',
          title: 'Data Matrices (Variables & Data Types)',
          description: 'Allocate memory sectors and define data constructs to store critical information.',
          orderIndex: 2,
        },
        lessons: [
          {
            title: 'Memory Allocations',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Variables act as volatile memory cells holding data payloads. Primitive types are the fastest units: `int` for integers, `double` for high-precision decimals, and `boolean` for true/false logic gates.',
              instructions: 'Declare an `int` named `securityLevel` and assign it the value `5`. Print its value.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '5\n'
            }
          },
          {
            title: 'Character Encoding',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Text streams are encoded using `char` (a single 16-bit Unicode character, single quotes) and `String` (a sequence of characters, double quotes). Strings are full-fledged objects, vital for command phrasing.',
              instructions: 'Create a String variable `agentName` with the value "Neo" and a char variable `rank` with value \'A\'. Print them on separate lines.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Neo\nA\n'
            }
          },
          {
            title: 'Immutable Constants',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'To prevent data corruption from hostile entities, variables can be locked using the `final` keyword. Once a final variable is initialized, its data payload becomes immutable.',
              instructions: 'Run the program to see the immutable constant being accessed.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        final double PI = 3.14159;\n        System.out.println("Constant PI: " + PI);\n    }\n}',
              expectedOutput: 'Constant PI: 3.14159\n'
            }
          },
          {
            title: 'Signal Manipulation',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'Mathematical operators (+, -, *, /, %) allow for manipulation of numeric payloads. String concatenation uses the + operator to merge text nodes with data.',
              instructions: 'Declare two integers, `x` initialized to 10 and `y` to 20. Output their sum by concatenating it to the String "Sum: ".',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Sum: 30\n'
            }
          },
          {
            title: 'Resource Calculation',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'The mainframe requires a precise calculation of available bandwidth to continue operations.',
              instructions: 'Write a program that declares `int bandwidth = 500` and `int consumption = 120`. Calculate the remaining bandwidth and print "Remaining: " followed by the calculated value.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Remaining: 380\n'
            }
          },
          {
            title: 'Datatype Anomalies Quiz',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'A sector scan has revealed datatype anomalies. Secure the matrix by answering correctly.',
              instructions: 'Identify the correct memory allocation behavior in the Java ecosystem.',
              initialCode: '',
              quizOptions: [
                'String is a primitive type',
                'boolean can hold 0 or 1',
                'char uses single quotes and holds one character',
                'double is less precise than float'
              ],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-logic-gates',
          title: 'Logic Gates (Control Flow)',
          description: 'Implement decision-making protocols to route execution paths based on threat levels.',
          orderIndex: 3,
        },
        lessons: [
          {
            title: 'Conditional Routing',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Execution paths must often diverge based on real-time threat assessments. `if-else` statements create branching logic paths, evaluating a boolean expression to determine which code block to execute.',
              instructions: 'Check if `clearance` is greater than 3. If true, print "Access Granted". Else, print "Denied". Variable `clearance` is set to 5.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int clearance = 5;\n        // Write your logic here\n    }\n}',
              expectedOutput: 'Access Granted\n'
            }
          },
          {
            title: 'Deep Nesting',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Sub-routines may require multiple layers of validation. Nesting `if` statements inside other `if` blocks allows complex multi-tier security checks.',
              instructions: 'Check if `isActive` is true. If it is, check if `level` is 10. If both are true, print "Max Power".',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        boolean isActive = true;\n        int level = 10;\n        // Add nested conditions\n    }\n}',
              expectedOutput: 'Max Power\n'
            }
          },
          {
            title: 'Switch Protocols',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Java 21 introduces enhanced switch expressions with lambda-style syntax (`->`). This provides a cleaner, safer way to route execution based on a single variable\'s state, eliminating fall-through bugs.',
              instructions: 'Execute this modern switch expression to see how it routes protocol commands.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int protocol = 2;\n        switch (protocol) {\n            case 1 -> System.out.println("Alpha");\n            case 2 -> System.out.println("Beta");\n            default -> System.out.println("Unknown");\n        }\n    }\n}',
              expectedOutput: 'Beta\n'
            }
          },
          {
            title: 'Ternary Overrides',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'The ternary operator `? :` acts as a micro-conditional, condensing simple if-else blocks into a single expression for rapid variable assignment.',
              instructions: 'Use a ternary operator to assign "High" to `status` if `energy > 50`, else "Low". The `energy` is 80. Print `status`.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int energy = 80;\n        // String status = ...\n    }\n}',
              expectedOutput: 'High\n'
            }
          },
          {
            title: 'Boolean Logic Matrices',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Combine multiple threat metrics simultaneously using Logical AND (`&&`), Logical OR (`||`), and Logical NOT (`!`).',
              instructions: 'Print "Valid" if `x` is greater than 0 AND `x` is less than 10. `x` is 5.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        if (/* logic */) {\n            System.out.println("Valid");\n        }\n    }\n}',
              expectedOutput: 'Valid\n'
            }
          },
          {
            title: 'Firewall Bypass',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'A secure firewall is blocking the main node. You must craft a precise logical override.',
              instructions: 'You are intercepting a login sequence. If `user` is "admin" or "root", AND `pass` is "1234", print "Bypass Successful". Else, print "Lockout".',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        String user = "root";\n        String pass = "1234";\n        // Write logic\n    }\n}',
              expectedOutput: 'Bypass Successful\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-recursive-constructs',
          title: 'Recursive Constructs (Loops)',
          description: 'Automate data processing across massive sets using cyclical loop architectures.',
          orderIndex: 4,
        },
        lessons: [
          {
            title: 'Iterator Cycles',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'To deploy repetitive data streams, `for` loops define initialization, condition, and iteration expressions within a single construct. Perfect for known loop counts.',
              instructions: 'Use a for loop to print the numbers 1, 2, and 3 on separate lines.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '1\n2\n3\n'
            }
          },
          {
            title: 'Condition Loops',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'When the payload volume is unknown, `while` loops run continuously as long as a boolean condition remains true. Failure to alter the condition will cause an infinite loop.',
              instructions: 'Use a while loop to print "Ping " 3 times on the same line. Remember to increment your counter.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int count = 0;\n        // while loop here\n    }\n}',
              expectedOutput: 'Ping Ping Ping '
            }
          },
          {
            title: 'Execution Assured Cycles',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'A `do-while` loop guarantees execution of the code block at least once before evaluating the condition. Useful for initial connections.',
              instructions: 'Run this loop to see guaranteed execution even when the condition starts false.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        boolean active = false;\n        do {\n            System.out.println("Initial Ping");\n        } while(active);\n    }\n}',
              expectedOutput: 'Initial Ping\n'
            }
          },
          {
            title: 'Loop Interruption',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: '`break` immediately shatters the current loop structure, while `continue` aborts the current iteration and jumps to the next cycle condition.',
              instructions: 'Write a for loop from 1 to 5. If the loop variable equals 3, use `continue`. Print the other numbers on separate lines.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '1\n2\n4\n5\n'
            }
          },
          {
            title: 'Brute-Force Decryption',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'The enemy data stream must be decrypted using sequential scanning.',
              instructions: 'Loop from 1 to 10 (inclusive). If a number is even, print it on a new line. You must use the modulus operator `%`.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '2\n4\n6\n8\n10\n'
            }
          },
          {
            title: 'Cycle Termination Quiz',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'The system has detected an infinite loop threat! Trace the vulnerability.',
              instructions: 'Identify the primary cause of unintended infinite `while` loops.',
              initialCode: '',
              quizOptions: [
                'Using the break keyword inside the loop',
                'The loop condition variables are never updated inside the loop block',
                'The loop variable starts at 0 instead of 1',
                'Using a do-while loop instead of while'
              ],
              correctOptionIndex: 1
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-synthetic-arrays',
          title: 'Synthetic Arrays (Arrays)',
          description: 'Construct linear memory banks to manage batched collections of variables.',
          orderIndex: 5,
        },
        lessons: [
          {
            title: 'Linear Memory Banks',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Arrays are immutable-length structures holding multiple payloads of the same datatype. They use zero-based indexing, meaning the first sector is at index 0.',
              instructions: 'Declare an int array `codes` with values 10, 20, 30. Print the first element (index 0).',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '10\n'
            }
          },
          {
            title: 'Index Traversal',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Data nodes within an array can be overridden by accessing their specific index.',
              instructions: 'Change the value of the second element (index 1) to 99. Print the modified value.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] nodes = {5, 10, 15};\n        // Modify and print\n    }\n}',
              expectedOutput: '99\n'
            }
          },
          {
            title: 'Grid Coordinates',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Arrays of arrays create multi-dimensional matrices, used for mapping 2D cyber-spaces.',
              instructions: 'Execute to see a coordinate extracted from a 2D matrix.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1, 2}, {3, 4}};\n        System.out.println("Target: " + grid[1][0]);\n    }\n}',
              expectedOutput: 'Target: 3\n'
            }
          },
          {
            title: 'Batch Processing',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'The enhanced `for` loop (for-each) iterates through every element in an array systematically without manual index management.',
              instructions: 'Use a for-each loop to iterate through the `signals` array and print each value on a new line.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] signals = {100, 200, 300};\n        // for-each loop\n    }\n}',
              expectedOutput: '100\n200\n300\n'
            }
          },
          {
            title: 'The Highest Anomaly',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Scanners detected varying energy spikes in the sector. You must locate the highest amplitude.',
              instructions: 'Given the array `int[] data = {12, 45, 7, 89, 23};`, write logic to find and print the maximum value in the format "Max: [value]".',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] data = {12, 45, 7, 89, 23};\n        \n    }\n}',
              expectedOutput: 'Max: 89\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-object-blueprints',
          title: 'Object Blueprints (Classes & Objects)',
          description: 'Design and deploy modular objects using Classes to encapsulate state and behavior.',
          orderIndex: 6,
        },
        lessons: [
          {
            title: 'Class Schematics',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'A Class is the fundamental architecture blueprint in Java. It defines the state (fields) and behaviors (methods) that objects spawned from it will possess.',
              instructions: 'Examine the `Agent` class. Inside main, create an `Agent` reference variable named `a1` (do not initialize it with new yet). Leave it empty. The code will compile silently.',
              initialCode: 'class Agent {\n    String name;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Declare an Agent variable\n    }\n}',
              expectedOutput: ''
            }
          },
          {
            title: 'Object Instantiation',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'The `new` keyword allocates memory in the heap, instantiating a physical object from a Class blueprint. This returns a memory reference.',
              instructions: 'Instantiate an `Agent` object into `a1` using `new Agent()`. Set its `name` field to "Smith" and print it.',
              initialCode: 'class Agent {\n    String name;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Agent a1 = new Agent();\n        // Set name and print\n    }\n}',
              expectedOutput: 'Smith\n'
            }
          },
          {
            title: 'Constructor Protocols',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Constructors are specialized blocks invoked during instantiation, primarily used to initialize an object\'s fields. They have no return type and match the Class name.',
              instructions: 'Run to witness constructor injection.',
              initialCode: 'class Module {\n    int id;\n    Module(int newId) {\n        id = newId;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Module m = new Module(77);\n        System.out.println("Module ID: " + m.id);\n    }\n}',
              expectedOutput: 'Module ID: 77\n'
            }
          },
          {
            title: 'State Mutation',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'Multiple objects instantiated from the same class act as independent instances. Mutating the state of one does not affect the others.',
              instructions: 'Create two instances of `Node`. Set `id` to 1 for the first, and 2 for the second. Print both `id`s on separate lines.',
              initialCode: 'class Node {\n    int id;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '1\n2\n'
            }
          },
          {
            title: 'Drone Assembler',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'The command center needs a new recon unit deployed immediately.',
              instructions: 'Create a class `Drone` with an `int` field `serial`. In main, instantiate a `Drone`, set `serial` to 999, and print "Drone Deployed: 999".',
              initialCode: '// Write Drone class here\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Drone Deployed: 999\n'
            }
          },
          {
            title: 'Reference Matrix Quiz',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'System architecture check. Validate your understanding of Java memory allocation.',
              instructions: 'Determine the nature of object references in the JVM.',
              initialCode: '',
              quizOptions: [
                'Objects are stored directly on the stack',
                'The new keyword allocates memory on the heap',
                'Primitive types hold references to memory',
                'Two objects can never have the same state'
              ],
              correctOptionIndex: 1
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-encrypted-modules',
          title: 'Encrypted Modules (Methods)',
          description: 'Build isolated subroutines to secure logic and enable modular programming.',
          orderIndex: 7,
        },
        lessons: [
          {
            title: 'Subroutine Definition',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Methods encapsulate logic into reusable blocks, reducing code duplication and isolating execution threads. `void` methods execute actions but return no data.',
              instructions: 'Create a static void method `triggerAlert()` inside Main that prints "Alert!". Call it from `main()`.',
              initialCode: 'public class Main {\n    // Create triggerAlert method here\n\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Alert!\n'
            }
          },
          {
            title: 'Data Return Streams',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Methods can return computed payloads back to the caller by defining a return type (e.g., `int`) and utilizing the `return` keyword.',
              instructions: 'Complete the `getSecretCode` method to return the integer `42`. Print the result in `main`.',
              initialCode: 'public class Main {\n    static int getSecretCode() {\n        // Return 42\n    }\n\n    public static void main(String[] args) {\n        System.out.println(getSecretCode());\n    }\n}',
              expectedOutput: '42\n'
            }
          },
          {
            title: 'Argument Injection',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Methods can accept external data via parameters. These variables act as local inputs for the method\'s execution block.',
              instructions: 'Examine how parameters pass data into a method.',
              initialCode: 'public class Main {\n    static void printDouble(int value) {\n        System.out.println(value * 2);\n    }\n\n    public static void main(String[] args) {\n        printDouble(10);\n    }\n}',
              expectedOutput: '20\n'
            }
          },
          {
            title: 'Signature Overloading',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'Method overloading allows multiple methods to share the same name within a class, provided their parameter lists (signatures) differ.',
              instructions: 'Overload the `send` method. One should accept a `String` and print it. The other should accept an `int` and print it. Call both from main: send("Data") and send(5).',
              initialCode: 'public class Main {\n    static void send(String msg) {\n        System.out.println(msg);\n    }\n    // Write the overloaded send method here\n\n    public static void main(String[] args) {\n        send("Data");\n        send(5);\n    }\n}',
              expectedOutput: 'Data\n5\n'
            }
          },
          {
            title: 'Final Payload Delivery',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'The final firewall requires a mathematically signed payload packet.',
              instructions: 'Write a static method `calculateHash` that takes two integers, multiplies them, and returns the result. In main, call it with 7 and 6, and print "Hash: [result]".',
              initialCode: 'public class Main {\n    \n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Hash: 42\n'
            }
          }
        ]
      }
    ]
  };
};
