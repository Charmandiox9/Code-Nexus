import { PrismaClient, LessonType } from '@prisma/client';
import { SeederFunction, LanguageSeed } from './types';

export const getCSeed: SeederFunction = async (prisma: PrismaClient): Promise<LanguageSeed> => {
  return {
    slug: "c",
    name: "C",
    version: "11",
    sections: [
      {
        concept: {
          slug: "c-core-protocol",
          title: "The Core Protocol",
          description: "Initialize your cyber-deck. Understand the basic primitives and standard I/O of the C terminal.",
          orderIndex: 1
        },
        lessons: [
          {
            title: "Boot Sequence: C Compiler",
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Welcome to the lowest levels of the mainframe, Operative. C is a compiled language, meaning source code must be transformed into machine code before execution.",
              instructions: "Initialize the boot sequence. Output 'System Online' to verify standard output streams are functional.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // Print the activation string\n  \n  return 0;\n}",
              expectedOutput: "System Online"
            }
          },
          {
            title: "Data Primitives",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "Variables in C are strictly typed. You must declare the exact memory layout required: int, float, char, or double.",
              instructions: "Review the declaration of primitive types. Run the executable to observe the memory readout.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int cycles = 42;\n  float voltage = 3.14;\n  char sector = 'A';\n  printf(\"C: %d, V: %.2f, S: %c\", cycles, voltage, sector);\n  return 0;\n}",
              expectedOutput: "C: 42, V: 3.14, S: A"
            }
          },
          {
            title: "Memory Initialization",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Uninitialized variables contain garbage data from previous memory states. Always initialize your registers.",
              instructions: "Declare an integer variable named 'authCode' and initialize it to 999. Print it.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // Declare and initialize authCode\n  \n  return 0;\n}",
              expectedOutput: "999"
            }
          },
          {
            title: "Stream Formatting",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "The standard output stream relies on format specifiers like %d for integers and %s for strings to interpolate data.",
              instructions: "Format the output exactly as 'Sector: 7, Status: Active'. You are given the integer variable 'sector'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int sector = 7;\n  // Write the formatted output\n  \n  return 0;\n}",
              expectedOutput: "Sector: 7, Status: Active"
            }
          },
          {
            title: "Arithmetic ALU",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "The Arithmetic Logic Unit (ALU) processes mathematical operations. Standard operators (+, -, *, /) are executed by the CPU.",
              instructions: "Calculate the total bandwidth by multiplying 'base' by 'multiplier' and adding 'bonus'. Print the result.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int base = 100, multiplier = 4, bonus = 50;\n  // Calculate and print\n  \n  return 0;\n}",
              expectedOutput: "450"
            }
          },
          {
            title: "Core Diagnostic",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Mission: Core Systems Diagnostic. We must verify your understanding of the C primitives before granting further access.",
              instructions: "Identify the correct format specifier for a single character in C.",
              initialCode: "",
              quizOptions: ["%c", "%char", "%s", "%d"],
              correctOptionIndex: 0
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-logic-gates",
          title: "Logic Gates & Flow",
          description: "Master conditional branching and iteration loops to control the execution path.",
          orderIndex: 2
        },
        lessons: [
          {
            title: "Conditional Branching",
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "The CPU executes instructions sequentially unless altered by control flow statements like if/else.",
              instructions: "Check if the variable 'breach' is 1. If so, print 'Alert', otherwise print 'Secure'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int breach = 1;\n  // Write the conditional\n  \n  return 0;\n}",
              expectedOutput: "Alert"
            }
          },
          {
            title: "Switch Matrices",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "Switch statements provide a highly optimized matrix of execution paths for discrete integer values.",
              instructions: "Observe how the switch statement routes execution based on the 'opCode'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int opCode = 2;\n  switch(opCode) {\n    case 1: printf(\"Init\"); break;\n    case 2: printf(\"Execute\"); break;\n    default: printf(\"Halt\");\n  }\n  return 0;\n}",
              expectedOutput: "Execute"
            }
          },
          {
            title: "While Loops",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "A 'while' loop continues execution cycles as long as its condition evaluates to true (non-zero).",
              instructions: "Create a while loop that decrements 'countdown' from 3 down to 1, printing each number.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int countdown = 3;\n  // Write while loop here\n  \n  return 0;\n}",
              expectedOutput: "321"
            }
          },
          {
            title: "For Iterators",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "The 'for' loop compacts initialization, condition checking, and iteration into a single execution block.",
              instructions: "Write a for loop that prints the even numbers between 2 and 6 (inclusive), separated by spaces.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // Write your for loop\n  \n  return 0;\n}",
              expectedOutput: "2 4 6 "
            }
          },
          {
            title: "Loop Interrupts",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "The 'break' command immediately terminates a loop, while 'continue' skips the rest of the current cycle.",
              instructions: "Loop from 1 to 5. Print the numbers. If the number is 4, use break to abort the loop immediately.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // Loop and break at 4\n  \n  return 0;\n}",
              expectedOutput: "123"
            }
          },
          {
            title: "Crack the Passcode",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Mission: The security gates require a specific numerical sequence to unlock.",
              instructions: "Use a loop to print the multiples of 3, starting from 3 up to 15, sequentially without spaces.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // Generate the sequence\n  \n  return 0;\n}",
              expectedOutput: "3691215"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-memory-pointers",
          title: "Memory Addresses",
          description: "Descend into the physical memory layer. Use pointers to manipulate RAM directly.",
          orderIndex: 3
        },
        lessons: [
          {
            title: "The Memory Matrix",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "Every variable resides at a physical hardware address in RAM. Pointers are variables that store these addresses.",
              instructions: "Use the address-of operator (&) to assign the address of 'target' to a pointer 'ptr'. Print 'Linked'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int target = 101;\n  // Declare ptr and assign it the address of target\n  \n  printf(\"Linked\");\n  return 0;\n}",
              expectedOutput: "Linked"
            }
          },
          {
            title: "Dereferencing Protocols",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "Dereferencing a pointer allows you to read or mutate the data located at the target memory address.",
              instructions: "Observe how the asterisk (*) operator is used to extract the value from the pointer.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int node = 99;\n  int *ptr = &node;\n  printf(\"Value: %d\", *ptr);\n  return 0;\n}",
              expectedOutput: "Value: 99"
            }
          },
          {
            title: "Pointer Mutation",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Through dereferencing, a pointer can directly alter the state of its target variable, bypassing its local scope.",
              instructions: "Use the pointer 'p' to decrease the value of 'shield' by 50. Print 'shield'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int shield = 100;\n  int *p = &shield;\n  // Decrease shield via p\n  \n  printf(\"%d\", shield);\n  return 0;\n}",
              expectedOutput: "50"
            }
          },
          {
            title: "The Null Vector",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "A pointer that points to nothing is a NULL pointer. Accessing a NULL pointer causes a segmentation fault.",
              instructions: "Initialize an integer pointer 'voidPtr' to NULL. If it is NULL, print 'Void'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // Initialize voidPtr\n  \n  return 0;\n}",
              expectedOutput: "Void"
            }
          },
          {
            title: "Memory Checksum",
            type: LessonType.BOSS,
            xpReward: 40,
            content: {
              theory: "Mission: System verification requires deep understanding of pointer mechanics.",
              instructions: "Which symbol is used to retrieve the value stored at a pointer's memory address?",
              initialCode: "",
              quizOptions: ["*", "&", "->", "%"],
              correctOptionIndex: 0
            }
          },
          {
            title: "Address Swap",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Mission: Two core variables have their values inverted. You must swap them using only their pointers.",
              instructions: "Given 'a' and 'b', and their pointers 'pa' and 'pb', write the code to swap their values. Print a then b.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int a = 10, b = 20;\n  int *pa = &a, *pb = &b;\n  int temp;\n  // Swap the values using pointers\n  \n  printf(\"%d %d\", a, b);\n  return 0;\n}",
              expectedOutput: "20 10"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-data-blocks",
          title: "Data Blocks & Strings",
          description: "Manipulate contiguous blocks of memory. Master arrays and null-terminated strings.",
          orderIndex: 4
        },
        lessons: [
          {
            title: "Contiguous Memory",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "Arrays are contiguous blocks of memory holding elements of the same type. Array indices start at 0.",
              instructions: "Create an integer array 'buffer' with values 1, 2, 3. Print the second element.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // Declare array and print\n  \n  return 0;\n}",
              expectedOutput: "2"
            }
          },
          {
            title: "Null-Terminated Arrays",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "In C, strings are simply character arrays that end with a special null terminator '\\0'.",
              instructions: "Observe how a string is just an array of chars. Run the code.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  char signal[] = {'S', 'O', 'S', '\\0'};\n  printf(\"Signal: %s\", signal);\n  return 0;\n}",
              expectedOutput: "Signal: SOS"
            }
          },
          {
            title: "Array Traversal",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "You can iterate through an array's memory block efficiently using loops.",
              instructions: "Use a for loop to print all elements in the 'data' array back-to-back without spaces.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int data[] = {4, 8, 15, 16, 23, 42};\n  // Write loop here\n  \n  return 0;\n}",
              expectedOutput: "4815162342"
            }
          },
          {
            title: "Pointer Arithmetic",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "An array's name acts as a pointer to its first element. Adding 1 to a pointer moves it to the next element's address.",
              instructions: "Use pointer arithmetic (e.g., *(arr + 1)) to print the third element of the array 'arr'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int arr[] = {100, 200, 300, 400};\n  // Print the 3rd element using pointer arithmetic\n  \n  return 0;\n}",
              expectedOutput: "300"
            }
          },
          {
            title: "Buffer Overflow",
            type: LessonType.BOSS,
            xpReward: 40,
            content: {
              theory: "Mission: Security alert. Writing beyond an array's allocated boundaries causes memory corruption.",
              instructions: "What is the critical vulnerability called when data exceeds the bounds of a contiguous block?",
              initialCode: "",
              quizOptions: ["Memory Leak", "Buffer Overflow", "Null Pointer Dereference", "Syntax Error"],
              correctOptionIndex: 1
            }
          },
          {
            title: "Cipher Decryption",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Mission: A corrupted string needs to be patched. Replace the corrupted character at index 2 with 'R'.",
              instructions: "The cipher array is 'ZEXO'. Patch index 2 so it prints 'ZERO'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  char cipher[] = \"ZEXO\";\n  // Patch the cipher\n  \n  printf(\"%s\", cipher);\n  return 0;\n}",
              expectedOutput: "ZERO"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-modular-functions",
          title: "Modular Subroutines",
          description: "Encapsulate logic into reusable functions. Master pass-by-value and pass-by-reference.",
          orderIndex: 5
        },
        lessons: [
          {
            title: "Subroutine Definitions",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "Functions allow us to break monolithic code into modular subroutines. They require a return type, name, and parameters.",
              instructions: "Call the 'transmit' function from main().",
              initialCode: "#include <stdio.h>\n\nvoid transmit() {\n  printf(\"Beep\");\n}\n\nint main() {\n  // Call transmit\n  \n  return 0;\n}",
              expectedOutput: "Beep"
            }
          },
          {
            title: "Return Payloads",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "Functions can compute data and return a payload back to the calling function using the 'return' keyword.",
              instructions: "Examine how 'calculateCoreTemp' returns an integer payload to main.",
              initialCode: "#include <stdio.h>\n\nint calculateCoreTemp(int base) {\n  return base * 2 + 15;\n}\n\nint main() {\n  int temp = calculateCoreTemp(40);\n  printf(\"Temp: %d\", temp);\n  return 0;\n}",
              expectedOutput: "Temp: 95"
            }
          },
          {
            title: "Pass by Value",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "By default, C passes arguments by value. The function receives a copy of the data, so changes inside don't affect the original.",
              instructions: "Create a function 'addTen(int x)' that returns x + 10. Call it with 5 and print the result.",
              initialCode: "#include <stdio.h>\n\n// Define addTen here\n\nint main() {\n  // Call and print\n  \n  return 0;\n}",
              expectedOutput: "15"
            }
          },
          {
            title: "Pass by Reference",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "To modify variables from another scope, pass their memory addresses (pointers) to the function.",
              instructions: "Complete 'upgradeLevel' to add 1 to the integer pointer's target. Pass the address of 'level' to it.",
              initialCode: "#include <stdio.h>\n\nvoid upgradeLevel(int *lvlPtr) {\n  // Increment the target value\n  \n}\n\nint main() {\n  int level = 5;\n  // Call upgradeLevel\n  \n  printf(\"%d\", level);\n  return 0;\n}",
              expectedOutput: "6"
            }
          },
          {
            title: "Call Stack Analysis",
            type: LessonType.BOSS,
            xpReward: 40,
            content: {
              theory: "Mission: System trace. When a subroutine is called, where is its local execution context stored?",
              instructions: "Identify the memory region used for function calls and local variables.",
              initialCode: "",
              quizOptions: ["The Heap", "The Stack", "The BSS Segment", "The Code Segment"],
              correctOptionIndex: 1
            }
          },
          {
            title: "Checksum Subroutine",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Mission: We need a reusable module to calculate factorial checksums.",
              instructions: "Write a recursive or iterative function 'factorial(int n)' that returns n!. Call it with 5 and print.",
              initialCode: "#include <stdio.h>\n\n// Write factorial function\n\nint main() {\n  // Call factorial(5) and print\n  \n  return 0;\n}",
              expectedOutput: "120"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-complex-constructs",
          title: "Complex Data Schemas",
          description: "Aggregate multiple data types into single logical entities using structs.",
          orderIndex: 6
        },
        lessons: [
          {
            title: "Custom Schemas (Structs)",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "Structs allow you to create custom data types by aggregating multiple basic primitives into one block of memory.",
              instructions: "Define a struct 'Drone' with an int 'id' and float 'battery'. Create one, set id=1, battery=99.5. Print both.",
              initialCode: "#include <stdio.h>\n\nstruct Drone {\n  int id;\n  float battery;\n};\n\nint main() {\n  // Create a Drone and print\n  \n  return 0;\n}",
              expectedOutput: "1 99.50"
            }
          },
          {
            title: "Type Aliasing",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "The 'typedef' keyword creates an alias for a type, eliminating the need to repeatedly type the 'struct' keyword.",
              instructions: "Observe how 'typedef' simplifies struct usage.",
              initialCode: "#include <stdio.h>\n\ntypedef struct {\n  int x;\n  int y;\n} Vector2D;\n\nint main() {\n  Vector2D v1 = {10, 20};\n  printf(\"X:%d Y:%d\", v1.x, v1.y);\n  return 0;\n}",
              expectedOutput: "X:10 Y:20"
            }
          },
          {
            title: "Pointers to Structs",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "When accessing a struct via a pointer, use the arrow operator (->) instead of the dot (.) operator.",
              instructions: "Given a pointer 'p' to a User struct, use '->' to set its 'accessLevel' to 5. Print it.",
              initialCode: "#include <stdio.h>\n\ntypedef struct {\n  int accessLevel;\n} User;\n\nint main() {\n  User u;\n  User *p = &u;\n  // Set accessLevel to 5 using p\n  \n  printf(\"%d\", u.accessLevel);\n  return 0;\n}",
              expectedOutput: "5"
            }
          },
          {
            title: "Array of Schemas",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "Structs can be stored in arrays to handle massive databases of structured information.",
              instructions: "Create an array of two 'Node' structs. Set the first node's 'active' to 1 and the second's to 0. Print them.",
              initialCode: "#include <stdio.h>\n\ntypedef struct {\n  int active;\n} Node;\n\nint main() {\n  // Create array and print\n  \n  return 0;\n}",
              expectedOutput: "1 0"
            }
          },
          {
            title: "Database Update",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Mission: The mainframe database entry for sector 7 requires a manual override via pointer manipulation.",
              instructions: "Write a function 'updateStatus(Sector *s)' that sets the Sector's 'status' to 9. Call it from main.",
              initialCode: "#include <stdio.h>\n\ntypedef struct {\n  int id;\n  int status;\n} Sector;\n\n// Write updateStatus\n\nint main() {\n  Sector sec = {7, 0};\n  // Call function and print status\n  \n  return 0;\n}",
              expectedOutput: "9"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-dynamic-memory",
          title: "The Void (Dynamic Memory)",
          description: "Break the limits of the stack. Manage raw heap memory using malloc, calloc, and free.",
          orderIndex: 7
        },
        lessons: [
          {
            title: "Heap Allocation",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "Dynamic memory resides in the Heap. Use 'malloc(size)' to request a block of raw bytes during runtime.",
              instructions: "Allocate an integer on the heap using malloc. Set its value to 77, print it, and return.",
              initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  // Allocate int using malloc\n  \n  return 0;\n}",
              expectedOutput: "77"
            }
          },
          {
            title: "Zeroed Allocation",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "Unlike malloc, 'calloc(num, size)' allocates memory for an array and initializes all bytes to zero.",
              instructions: "Run the code to see how calloc prevents garbage data from corrupting your structures.",
              initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  int *arr = calloc(3, sizeof(int));\n  printf(\"%d %d %d\", arr[0], arr[1], arr[2]);\n  free(arr);\n  return 0;\n}",
              expectedOutput: "0 0 0"
            }
          },
          {
            title: "Memory Deallocation",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Every block allocated via malloc/calloc must be manually returned to the system using 'free(pointer)'.",
              instructions: "Allocate a char pointer 'secret' with malloc(1). Free it afterwards. Print 'Freed'.",
              initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  char *secret = malloc(1);\n  // Free it\n  \n  printf(\"Freed\");\n  return 0;\n}",
              expectedOutput: "Freed"
            }
          },
          {
            title: "Dynamic Resizing",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "The 'realloc(ptr, new_size)' function expands or shrinks an existing heap block, preserving the original data.",
              instructions: "Reallocate 'block' to hold 2 integers instead of 1. Set the second integer to 88 and print it.",
              initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  int *block = malloc(sizeof(int));\n  block[0] = 44;\n  // Reallocate block\n  \n  printf(\"%d\", block[1]);\n  return 0;\n}",
              expectedOutput: "88"
            }
          },
          {
            title: "Memory Leak",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Mission: System stability is dropping. Unfreed heap memory accumulates, causing Memory Leaks.",
              instructions: "What happens if a program continuously uses malloc without ever using free?",
              initialCode: "",
              quizOptions: ["CPU Overheating", "Syntax Error", "Memory Leak / OOM", "Stack Overflow"],
              correctOptionIndex: 2
            }
          }
        ]
      }
    ]
  };
};
