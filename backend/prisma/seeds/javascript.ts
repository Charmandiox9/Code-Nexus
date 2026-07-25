import { SeederFunction } from './types';
import { LessonType } from '@prisma/client';

export const getJavascriptSeed: SeederFunction = async (prisma) => {
  return {
    slug: 'javascript',
    name: 'JavaScript',
    version: '20.20',
    sections: [
      {
        concept: {
          slug: 'basics',
          title: 'The Core Matrix: Basics',
          description: 'Establish your neural link and learn the fundamental data primitives.',
          orderIndex: 1,
        },
        lessons: [
          {
            title: 'Initialization Protocol',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'In the vast expanse of the JavaScript runtime environment, data must be stored and referenced to have any utility. The `let` and `const` keywords serve as memory allocation directives, allowing us to bind values to identifiers in the current lexical scope.',
              instructions: 'Agent, we need to establish a secure connection. Initialize a constant variable named `connectionStatus` and set it to the string "SECURE". Output it.',
              initialCode: '// Initialize connectionStatus here\n// console.log(connectionStatus);',
              expectedOutput: 'SECURE'
            }
          },
          {
            title: 'Primitive Nodes',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'Primitives are the lowest-level implementation of data in JS. They are immutable and not objects. The fundamental types include string, number, boolean, null, undefined, symbol, and bigint. By understanding primitives, you master the fabric of reality in this digital realm.',
              instructions: 'Observe how we assign and check the typeof different primitives. Run the sequence to verify the output types.',
              initialCode: 'const signal = 10101;\nconst isActive = true;\nconsole.log(typeof signal, typeof isActive);',
              expectedOutput: 'number boolean'
            }
          },
          {
            title: 'Reassigning Memory',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'Unlike constants, variables initialized with `let` are mutable references. This is critical for states that evolve, such as a changing encryption key or a fluctuating energy level.',
              instructions: 'The firewall is dynamically shifting. First, log the `firewallKey`. Then, reassign it to "BETA-99" and log it again.',
              initialCode: 'let firewallKey = "ALPHA-01";\n// Log firewallKey\n\n// Reassign to "BETA-99"\n\n// Log again',
              expectedOutput: 'ALPHA-01\nBETA-99'
            }
          },
          {
            title: 'String Interpolation',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'Template literals, demarcated by backticks (`), allow embedded expressions through the `${expression}` syntax. This avoids clunky string concatenation and is essential for dynamically assembling complex payloads.',
              instructions: 'Construct a greeting for the mainframe. Combine `agentName` and `clearance` into a message: "Agent Neo, Clearance Level 5". Log the result.',
              initialCode: 'const agentName = "Neo";\nconst clearance = 5;\n// Create and log the message',
              expectedOutput: 'Agent Neo, Clearance Level 5'
            }
          },
          {
            title: 'The Variable Glitch',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'A critical sector is throwing a ReferenceError. The temporal dead zone (TDZ) dictates that `let` and `const` cannot be accessed before their initialization.',
              instructions: 'Fix the script so it correctly initializes the system before trying to access the variables.',
              initialCode: 'console.log(systemStatus);\nlet systemStatus = "ONLINE";',
              expectedOutput: 'ONLINE'
            }
          },
          {
            title: 'Core Matrix Firewall',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'The system will ask a fundamental question regarding primitive boundaries. Failure means disconnection.',
              instructions: 'Which of the following is NOT a primitive type in JavaScript?',
              initialCode: '',
              quizOptions: ['string', 'boolean', 'object', 'undefined'],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
        concept: {
          slug: 'control-flow',
          title: 'Navigating the Flow',
          description: 'Control the execution path of your scripts to build intelligent algorithms.',
          orderIndex: 2,
        },
        lessons: [
          {
            title: 'Branching Paths',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'Conditional statements dictate the execution path based on boolean evaluations. The `if...else` block acts as a logical gatekeeper, executing code blocks only when conditions are met.',
              instructions: 'Write an `if` statement that logs "ACCESS GRANTED" if `accessCode` is exactly 42.',
              initialCode: 'const accessCode = 42;\n// Your logic here',
              expectedOutput: 'ACCESS GRANTED'
            }
          },
          {
            title: 'The Switchboard',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'When multiple discrete values dictate branching, `switch` statements provide a cleaner alternative to chained `if...else` blocks. They use strict equality checks (`===`) under the hood.',
              instructions: 'Observe the routing algorithm. Run the code to see how the signal is routed.',
              initialCode: 'const route = "B";\nswitch(route) {\n  case "A": console.log("Sector A"); break;\n  case "B": console.log("Sector B"); break;\n  default: console.log("Unknown");\n}',
              expectedOutput: 'Sector B'
            }
          },
          {
            title: 'Loop Cycles',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'The `for` loop is ideal for deterministic iterations where the number of cycles is known beforehand. It encapsulates initialization, condition, and increment into a single line.',
              instructions: 'We need to ping 3 servers sequentially. Write a `for` loop that logs "Ping 1", "Ping 2", "Ping 3".',
              initialCode: '// Write a for loop from 1 to 3\n',
              expectedOutput: 'Ping 1\nPing 2\nPing 3'
            }
          },
          {
            title: 'Infinite Loop Avoidance',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'The `while` loop iterates as long as its condition remains true. Without proper termination logic, it will consume all system resources, causing an infinite loop.',
              instructions: 'Use a `while` loop to drain the battery from 3 down to 1. Log "Battery at X" for each step.',
              initialCode: 'let battery = 3;\n// Your while loop here',
              expectedOutput: 'Battery at 3\nBattery at 2\nBattery at 1'
            }
          },
          {
            title: 'Security Bypass',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'An encrypted vault requires a specific combination generated by a logic algorithm.',
              instructions: 'Loop through numbers 1 to 5. If the number is even, log "EVEN". If odd, log "ODD". You must match the required sequence to bypass.',
              initialCode: '// Write the loop logic\n',
              expectedOutput: 'ODD\nEVEN\nODD\nEVEN\nODD'
            }
          },
          {
            title: 'Logic Gate Quiz',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'The Guardian of the Control Flow demands a sacrifice of knowledge.',
              instructions: 'What does the `break` keyword do inside a loop or switch?',
              initialCode: '',
              quizOptions: ['Pauses execution', 'Restarts the loop', 'Exits the loop or switch block immediately', 'Throws an error'],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
        concept: {
          slug: 'functions',
          title: 'Encapsulated Protocols',
          description: 'Modularize code into reusable, scoped functions to build complex architectures.',
          orderIndex: 3,
        },
        lessons: [
          {
            title: 'Subroutines',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'Functions are first-class objects in JavaScript. The `function` declaration creates a hoisted, reusable block of code that maps inputs (arguments) to outputs (returns).',
              instructions: 'Define a function named `decrypt` that returns the string "DATA". Call it and log the result.',
              initialCode: '// Define decrypt\n',
              expectedOutput: 'DATA'
            }
          },
          {
            title: 'Arrow Syntax',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'Arrow functions (`=>`) provide a concise syntax and lexically bind `this`. They are perfect for anonymous functions and callbacks.',
              instructions: 'Run the arrow function to see how it implicitly returns a value when braces are omitted.',
              initialCode: 'const multiply = (x, y) => x * y;\nconsole.log(multiply(4, 5));',
              expectedOutput: '20'
            }
          },
          {
            title: 'Scope Infiltration',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'Lexical scoping dictates that a function has access to variables defined in its outer scopes. This hierarchical access is fundamental to JS architecture.',
              instructions: 'Create a function `getSecret` that returns the global variable `secretData`. Call it and log the output.',
              initialCode: 'const secretData = "CLASSIFIED";\n// Write getSecret',
              expectedOutput: 'CLASSIFIED'
            }
          },
          {
            title: 'Default Parameters',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'Functions can assign default values to parameters if `undefined` is passed. This prevents NaN or undefined errors during execution.',
              instructions: 'Write a function `connect(port = 8080)` that logs "Connecting to port " + port. Call it without arguments.',
              initialCode: '// Write connect function\n',
              expectedOutput: 'Connecting to port 8080'
            }
          },
          {
            title: 'Protocol Encryption',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Recursion is when a function calls itself. It is a powerful pattern for navigating deeply nested directories or trees.',
              instructions: 'Write a recursive function `countdown(n)` that logs numbers from `n` down to 1. Call it with 3.',
              initialCode: '// Write countdown(n)\n',
              expectedOutput: '3\n2\n1'
            }
          },
          {
            title: 'Subroutine Override',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'An infected subroutine is returning undefined instead of the expected payload.',
              instructions: 'Fix the `calculateTotal` arrow function so it correctly returns the sum. It is currently missing a return statement or implicit return syntax.',
              initialCode: 'const calculateTotal = (a, b) => { a + b };\nconsole.log(calculateTotal(10, 20));',
              expectedOutput: '30'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'arrays',
          title: 'Data Arrays',
          description: 'Process and manipulate sequential data streams using advanced array methods.',
          orderIndex: 4,
        },
        lessons: [
          {
            title: 'Memory Blocks',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'Arrays are list-like objects whose prototype has methods to perform traversal and mutation operations. They are zero-indexed and dynamically sized.',
              instructions: 'Create an array named `nodes` containing "Alpha", "Beta", "Gamma". Log the second element (Beta).',
              initialCode: '// Create nodes array\n',
              expectedOutput: 'Beta'
            }
          },
          {
            title: 'Array Iteration',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'The `.forEach()` method executes a provided function once for each array element. It is the declarative counterpart to the `for` loop for arrays.',
              instructions: 'Run this scanner to see how it iterates through all connected devices.',
              initialCode: 'const devices = ["Router", "Switch", "Hub"];\ndevices.forEach(d => console.log(d));',
              expectedOutput: 'Router\nSwitch\nHub'
            }
          },
          {
            title: 'Map the Network',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'The `.map()` method creates a NEW array populated with the results of calling a provided function on every element in the calling array. It is non-mutating.',
              instructions: 'We need to encrypt these IDs. Use `.map()` to multiply each number in `ids` by 2. Log the new array elements separated by space using .join(" ").',
              initialCode: 'const ids = [1, 2, 3];\n// mapped = ...\n// console.log(mapped.join(" "));',
              expectedOutput: '2 4 6'
            }
          },
          {
            title: 'Filter the Noise',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'The `.filter()` method creates a shallow copy of a portion of a given array, filtered down to just the elements that pass the test implemented by the provided function.',
              instructions: 'Filter out the offline servers. Log only the servers with status "online" by extracting their names and joining them with a space.',
              initialCode: 'const servers = [\n {name: "A", status: "online"},\n {name: "B", status: "offline"},\n {name: "C", status: "online"}\n];\n// filter and log',
              expectedOutput: 'A C'
            }
          },
          {
            title: 'Reduce the Payload',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'The `.reduce()` method executes a reducer callback function on each element, passing in the return value from the calculation on the preceding element, culminating in a single output value.',
              instructions: 'Calculate the total file size. Use `.reduce()` to sum the `sizes` array and log the total.',
              initialCode: 'const sizes = [10, 20, 30, 40];\n// reduce and log',
              expectedOutput: '100'
            }
          },
          {
            title: 'Array Sorting Anomaly',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'By default, `.sort()` converts elements to strings and compares their UTF-16 code units. To sort numbers numerically, you must provide a comparator function.',
              instructions: 'Sort the `threatLevels` array in ascending numerical order and log it as a space-separated string.',
              initialCode: 'const threatLevels = [100, 2, 45, 9];\n// sort and log',
              expectedOutput: '2 9 45 100'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'objects',
          title: 'Object Oriented Constructs',
          description: 'Model real-world and conceptual entities using JavaScript Objects.',
          orderIndex: 5,
        },
        lessons: [
          {
            title: 'Data Structures',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'Objects in JavaScript are collections of key-value pairs. Keys are strings (or Symbols), and values can be any data type, allowing for complex nested structures.',
              instructions: 'Construct an object `user` with properties `handle` ("Neo") and `rank` (99). Log `user.handle`.',
              initialCode: '// Create user\n',
              expectedOutput: 'Neo'
            }
          },
          {
            title: 'Method Invocations',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'When a function is stored as an object property, it is called a method. Methods can access their parent object data using the `this` keyword.',
              instructions: 'Run this protocol to see the object method in action.',
              initialCode: 'const drone = {\n id: 7,\n ping() { console.log("Drone " + this.id + " active"); }\n};\ndrone.ping();',
              expectedOutput: 'Drone 7 active'
            }
          },
          {
            title: 'Destructuring Access',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'Destructuring assignment allows us to unpack values from arrays, or properties from objects, into distinct variables elegantly.',
              instructions: 'Extract `cpu` and `ram` from the `system` object using destructuring. Log them separated by a space.',
              initialCode: 'const system = { cpu: "Quantum", ram: "1TB", disk: "2PB" };\n// destructure\n',
              expectedOutput: 'Quantum 1TB'
            }
          },
          {
            title: 'Spread Operator',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'The spread syntax `...` allows an iterable or an object expression to be expanded in places where zero or more arguments or key-value pairs are expected. It is excellent for immutable updates.',
              instructions: 'Merge `baseConfig` and `userConfig` into a new object `finalConfig` using the spread operator. Log `finalConfig.theme`.',
              initialCode: 'const baseConfig = { theme: "light", port: 80 };\nconst userConfig = { theme: "dark" };\n// merge and log',
              expectedOutput: 'dark'
            }
          },
          {
            title: 'Object Mutation Quiz',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Objects declared with `const` can still have their properties mutated. The `const` only prevents reassignment of the variable identifier itself.',
              instructions: 'Is it possible to change a property of an object declared with `const`?',
              initialCode: '',
              quizOptions: ['Yes, always', 'No, never', 'Only if using strict mode', 'Only for primitive properties'],
              correctOptionIndex: 0
            }
          }
        ]
      },
      {
        concept: {
          slug: 'advanced',
          title: 'Advanced Execution',
          description: 'Delve into the engine internals: Closures, Hoisting, and Execution Contexts.',
          orderIndex: 6,
        },
        lessons: [
          {
            title: 'Execution Context',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'The Execution Context is the abstract environment where JS code is evaluated and executed. The Call Stack manages these contexts, pushing and popping them as functions are invoked and return.',
              instructions: 'Observe the execution order. Write code that logs "1", then calls a function that logs "2", then logs "3".',
              initialCode: '// Write logic\n',
              expectedOutput: '1\n2\n3'
            }
          },
          {
            title: 'Closures',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment). It gives a function access to its outer scope even after the outer function has returned.',
              instructions: 'Run the closure to see how state is preserved across function calls.',
              initialCode: 'function createCounter() {\n let count = 0;\n return () => { count++; console.log(count); };\n}\nconst counter = createCounter();\ncounter();\ncounter();',
              expectedOutput: '1\n2'
            }
          },
          {
            title: 'Hoisting Mechanics',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'Hoisting is JS behavior of moving declarations to the top of the current scope before execution. Function declarations are fully hoisted, while `var` is hoisted but undefined, and `let`/`const` remain in the Temporal Dead Zone.',
              instructions: 'Call `activateSystem()` BEFORE it is defined in the code. Log "System Active" inside the function.',
              initialCode: '// Call activateSystem here\n\nfunction activateSystem() {\n  // Log it\n}',
              expectedOutput: 'System Active'
            }
          },
          {
            title: 'The \'this\' Keyword',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'The value of `this` is determined by how a function is called, not where it is defined. It acts as a dynamic binding for the execution context.',
              instructions: 'Fix the code so `this` points to the object using `.bind()` or an arrow function, logging "Secure".',
              initialCode: 'const module = {\n status: "Secure",\n getStatus() { return this.status; }\n};\nconst unboundGetStatus = module.getStatus;\n// Fix it and log the result',
              expectedOutput: 'Secure'
            }
          },
          {
            title: 'Prototypes',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'JS objects inherit features from one another via the prototype chain. If a property isn\'t found on the object, the engine traverses up the prototype chain.',
              instructions: 'Add a `greet` method to `String.prototype` that returns "Hello " + this. Log `"Agent".greet()`. (Use carefully in real code!)',
              initialCode: '// Add to String.prototype\n\nconsole.log("Agent".greet());',
              expectedOutput: 'Hello Agent'
            }
          },
          {
            title: 'Closure Trap',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Classic loop closure bug: using `var` inside a loop with asynchronous callbacks causes all callbacks to reference the final value of the loop variable.',
              instructions: 'Fix the loop to use block scoping (`let`) so it logs 0, 1, 2 sequentially. (Remove the IIFE and use a simple let loop).',
              initialCode: 'for (var i = 0; i < 3; i++) {\n  ((i) => console.log(i))(i);\n}',
              expectedOutput: '0\n1\n2'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'async',
          title: 'Asynchronous Systems',
          description: 'Master the event loop, Promises, and non-blocking I/O architectures.',
          orderIndex: 7,
        },
        lessons: [
          {
            title: 'The Event Loop',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'JavaScript is single-threaded. The Event Loop manages async operations by offloading them to Web APIs (or C++ APIs in Node.js) and placing their callbacks into a task queue to be executed when the call stack is empty.',
              instructions: 'Log "A", then use `setTimeout` with 0ms to log "C", then log "B". Observe the order.',
              initialCode: '// Your async logic here\n',
              expectedOutput: 'A\nB\nC'
            }
          },
          {
            title: 'Promise Chains',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'A Promise represents the eventual completion (or failure) of an asynchronous operation. They prevent "callback hell" through chaining `.then()` and `.catch()`.',
              instructions: 'Run the promise chain to see resolution and mutation of async data.',
              initialCode: 'Promise.resolve(10)\n .then(val => val * 2)\n .then(val => console.log(val));',
              expectedOutput: '20'
            }
          },
          {
            title: 'Async/Await Syntax',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'Introduced in ES2017, `async/await` is syntactic sugar over Promises, allowing asynchronous code to be written and reasoned about in a synchronous, top-down manner.',
              instructions: 'Create an `async` function `fetchData` that `await`s a `Promise.resolve("Data Loaded")`. Log the result.',
              initialCode: '// Write async fetchData function\n',
              expectedOutput: 'Data Loaded'
            }
          },
          {
            title: 'Error Handling',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'When using `async/await`, we wrap operations in `try...catch` blocks to gracefully handle rejected Promises, preventing the application from crashing.',
              instructions: 'Write a `try...catch` block. Throw an error with message "Network Failure", catch it, and log the error message.',
              initialCode: 'try {\n // throw error\n} catch(err) {\n // log err.message\n}',
              expectedOutput: 'Network Failure'
            }
          },
          {
            title: 'The Async Breach',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'To penetrate the final firewall, you must synchronize multiple asynchronous operations.',
              instructions: 'Use `Promise.all()` to wait for both `p1` (resolves to "Access") and `p2` (resolves to "Granted"). Log the resulting array separated by a space using .join(" ").',
              initialCode: 'const p1 = Promise.resolve("Access");\nconst p2 = Promise.resolve("Granted");\n// Write Promise.all logic\n',
              expectedOutput: 'Access Granted'
            }
          }
        ]
      }
    ]
  };
};
