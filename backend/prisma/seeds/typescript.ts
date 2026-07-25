import { PrismaClient, LessonType } from '@prisma/client';
import { SeederFunction, LanguageSeed } from './types';

export const getTypescriptSeed: SeederFunction = async (prisma) => {
  return {
    slug: 'typescript',
    name: 'TypeScript',
    version: '7.0',
    sections: [
      {
        concept: { slug: 'initiation', title: 'Initiation: The Typed Grid', description: 'Enter the Grid. Learn the foundational types and survive the static compiler.', orderIndex: 1 },
        lessons: [
          {
            title: 'Welcome to the Grid',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Welcome to the Grid, operative. JavaScript is anarchic, a sprawling wasteland of undefined behavior. TypeScript introduces the Law of Types, a strict compiler-level protocol that enforces data structures before execution. It compiles down to standard JavaScript but ensures your logic is bulletproof during development.',
              instructions: 'Initialize your console sequence. Declare a constant variable with your operative ID and output it to the standard stream.',
              initialCode: 'const operativeId: string = "Agent-007";\nconsole.log(operativeId);',
              expectedOutput: 'Agent-007'
            }
          },
          {
            title: 'Basic Types: Neon Strings & Data Integers',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Every node in the network requires a strict classification. Primitives include `string`, `number`, and `boolean`. By locking variables to these primitives, we prevent rogue data injections.',
              instructions: 'Observe the basic types being assigned to security variables. Execute the module to verify system integrity.',
              initialCode: 'let secLevel: number = 5;\nlet isLocked: boolean = true;\nconsole.log(secLevel);',
              expectedOutput: '5'
            }
          },
          {
            title: 'Annotations: Tagging the Constructs',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Implicit typing leaves the system vulnerable to runtime mutations. Explicit annotations bind a variable to a strict type, sealing it against unauthorized data coercion.',
              instructions: 'Add a `string` annotation to the password variable to fortify it.',
              initialCode: 'let pass: string = "hunter2";\nconsole.log(pass);',
              expectedOutput: 'hunter2'
            }
          },
          {
            title: 'Memory Banks: Arrays',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Collections of data must be homogeneous to prevent corruption. Arrays in TypeScript restrict their elements to a single unified type, ensuring predictable iteration.',
              instructions: 'Construct an array of numbers representing the active system ports. Log the first port in the sequence.',
              initialCode: 'let ports: number[] = [80, 443, 8080];\nconsole.log(ports[0]);',
              expectedOutput: '80'
            }
          },
          {
            title: 'Fix the Protocol',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'The firewall is breached. Only your knowledge of the compiler can save us. You must rapidly identify vulnerabilities in the type system to patch the exploit.',
              instructions: 'Identify the correct behavior of the `any` type when applied to a variable.',
              initialCode: '// Analyze the breach and provide the correct protocol response.',
              quizOptions: [
                'It makes the variable strictly typed and immutable.',
                'It disables type checking for that variable, allowing any operation.',
                'It forcefully converts the variable to a string stream.',
                'It throws a runtime error upon compilation.'
              ],
              correctOptionIndex: 1
            }
          },
          {
            title: 'Defend the Node',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Inbound malicious traffic is overwhelming the mainframe. We need a typed algorithmic defense to parse incoming threat vectors and neutralize them based on their health levels.',
              instructions: 'Write a strictly typed function `calcHealth` that calculates the total node health given an array of health values. Return the total sum.',
              initialCode: 'function calcHealth(nodes: number[]): number {\n  return nodes.reduce((a, b) => a + b, 0);\n}\nconsole.log(calcHealth([50, 50, 50]));',
              expectedOutput: '150'
            }
          }
        ]
      },
      {
        concept: { slug: 'tactical-functions', title: 'Tactical Functions', description: 'Deploy robust I/O streams using advanced function typing.', orderIndex: 2 },
        lessons: [
          {
            title: 'I/O Streams: Parameters and Returns',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Functions act as the I/O streams of the grid. Typing input parameters and predicting return values guarantees that misaligned data routing never crashes the main execution thread.',
              instructions: 'Review the typed function signature and execute it to ping the local network.',
              initialCode: 'function ping(ip: string): string {\n  return "Pong " + ip;\n}\nconsole.log(ping("192.168.1.1"));',
              expectedOutput: 'Pong 192.168.1.1'
            }
          },
          {
            title: 'Failsafes: Optional Parameters',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Not all incoming data is guaranteed to exist. Optional parameters, denoted by the `?` symbol, act as failsafes when data packets are dropped during transmission.',
              instructions: 'Execute the failsafe function without arguments and observe its fallback protocol.',
              initialCode: 'function scan(target?: string): string {\n  return target ? "Scanning " + target : "Scanning all";\n}\nconsole.log(scan());',
              expectedOutput: 'Scanning all'
            }
          },
          {
            title: 'Laser Pointers: Arrow Functions',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Arrow functions provide a sleek, lexical scoping mechanism. Typing them requires defining the parameter signature and the return type efficiently in a single line of defense.',
              instructions: 'Define an arrow function that accepts a numeric key and returns an encrypted string hash.',
              initialCode: 'const encrypt = (key: number): string => "hash_" + key;\nconsole.log(encrypt(42));',
              expectedOutput: 'hash_42'
            }
          },
          {
            title: 'Hybrid Modules: Union Types',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Sometimes a variable must hold multiple potential states. Union types using the `|` operator allow a variable to safely be one of several designated types, creating flexible hybrid modules.',
              instructions: 'Initialize a hybrid variable that can accept either a string or a number. Assign it an integer and output its value.',
              initialCode: 'let hybrid: string | number = 99;\nconsole.log(hybrid);',
              expectedOutput: '99'
            }
          },
          {
            title: 'Override Security',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'A manual system override sequence has been initiated by a rogue operative. You must answer the security prompt correctly to regain control over the hybrid modules.',
              instructions: 'Which symbol denotes a Union Type in TypeScript?',
              initialCode: '// Awaiting override input...',
              quizOptions: [
                '&',
                '|',
                '?',
                '!'
              ],
              correctOptionIndex: 1
            }
          },
          {
            title: 'Calibrate the Engine',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'The hyper-engine requires precise numeric calibration data, but the sensors might transmit it as either a string or a number due to signal degradation.',
              instructions: 'Construct a function that receives a union type and reliably returns a calibrated numeric value.',
              initialCode: 'function calibrate(input: string | number): number {\n  return typeof input === "string" ? parseInt(input) : input;\n}\nconsole.log(calibrate("100"));',
              expectedOutput: '100'
            }
          }
        ]
      },
      {
        concept: { slug: 'structural-integrity', title: 'Structural Integrity', description: 'Architect complex data structures with interfaces and classes.', orderIndex: 3 },
        lessons: [
          {
            title: 'Blueprints: Interfaces',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Interfaces define the exact blueprints of our cybernetic constructs. They dictate the structural shape of object literals, ensuring no extraneous or missing parts compromise the system.',
              instructions: 'Instantiate an object adhering to the Unit interface and log its model designation.',
              initialCode: 'interface Unit {\n  model: string;\n  status: boolean;\n}\nconst drone: Unit = { model: "X-1", status: true };\nconsole.log(drone.model);',
              expectedOutput: 'X-1'
            }
          },
          {
            title: 'Modular Upgrades: Extending',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Interfaces can inherit from one another. This extension mechanism allows us to build complex hierarchies of data structures by bolting modular upgrades onto core signatures.',
              instructions: 'Deploy an extended interface object and verify its inherited properties.',
              initialCode: 'interface Weapon { damage: number; }\ninterface PlasmaRifle extends Weapon { battery: number; }\nconst rifle: PlasmaRifle = { damage: 50, battery: 100 };\nconsole.log(rifle.damage);',
              expectedOutput: '50'
            }
          },
          {
            title: 'Shield Generators: Classes',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Classes encapsulate both state and behavior. Access modifiers (`public`, `private`, `protected`) act as cryptographic shield generators, restricting unauthorized access to internal memory banks.',
              instructions: 'Instantiate a class and securely access its private internal temperature via a public method.',
              initialCode: 'class Core {\n  private temp = 90;\n  public getTemp() { return this.temp; }\n}\nconst c = new Core();\nconsole.log(c.getTemp());',
              expectedOutput: '90'
            }
          },
          {
            title: 'Design Patterns: Type Aliases',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'While interfaces define object shapes, Type Aliases offer a different design pattern. They can represent primitives, tuples, and unions, providing extreme versatility in schema definitions.',
              instructions: 'Define a tuple type for neural coordinates and extract the first dimensional value.',
              initialCode: 'type Coordinate = [number, number];\nconst loc: Coordinate = [45, 90];\nconsole.log(loc[0]);',
              expectedOutput: '45'
            }
          },
          {
            title: 'Immutable Ledgers: Readonly',
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: 'The `readonly` modifier locks an object property permanently after initialization. It turns volatile memory into an immutable ledger, preventing any subsequent scripts from corrupting the core identifier.',
              instructions: 'Execute the module to read the hardware-locked ID. Do not attempt to modify it.',
              initialCode: 'interface Config { readonly id: number; }\nconst sys: Config = { id: 777 };\nconsole.log(sys.id);',
              expectedOutput: '777'
            }
          },
          {
            title: 'Architect the Cyber-Drone',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'We must infiltrate the corporate mainframe, but our drones are getting intercepted because their internal logic is weakly typed. We need a robust class architecture.',
              instructions: 'Implement the Drone class equipped with a private identifier and a public scanning method that reveals it.',
              initialCode: 'class Drone {\n  private id: string;\n  constructor(id: string) { this.id = id; }\n  public scan() { return this.id; }\n}\nconst d = new Drone("Alpha");\nconsole.log(d.scan());',
              expectedOutput: 'Alpha'
            }
          }
        ]
      },
      {
        concept: { slug: 'quantum-generics', title: 'Quantum Generics', description: 'Unlock polymorphic programming to write highly reusable code.', orderIndex: 4 },
        lessons: [
          {
            title: 'Polymorphic Core: Intro to Generics',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Generics empower us to construct polymorphic cores—components that adapt to operate over a wide variety of types rather than being hardcoded to a single, rigid signature.',
              instructions: 'Execute the generic identity function with a string payload.',
              initialCode: 'function identity<T>(arg: T): T {\n  return arg;\n}\nconsole.log(identity<string>("Nexus"));',
              expectedOutput: 'Nexus'
            }
          },
          {
            title: 'Adaptable Routines: Generic Interfaces',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Generics can be fused with interfaces, forging highly adaptable data routines that elegantly wrap any underlying payload type injected into them.',
              instructions: 'Observe a generic payload container carrying an error code integer.',
              initialCode: 'interface Payload<T> { data: T; }\nconst p: Payload<number> = { data: 404 };\nconsole.log(p.data);',
              expectedOutput: '404'
            }
          },
          {
            title: 'Secure Bounds: Generic Constraints',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Unbounded generics are dangerously unpredictable. Constraints using the `extends` keyword enforce secure boundaries, ensuring the generic type possesses required properties.',
              instructions: 'Enforce a constraint that guarantees the passed argument has a `length` property.',
              initialCode: 'function logLength<T extends { length: number }>(arg: T) {\n  console.log(arg.length);\n}\nlogLength("password");',
              expectedOutput: '8'
            }
          },
          {
            title: 'Universal Containers: Generic Classes',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Classes can harness the power of generics to serve as universal data containers, managing data streams of any type without compromising type safety during extraction.',
              instructions: 'Instantiate a generic storage unit formatted for string data and retrieve its value.',
              initialCode: 'class Storage<T> {\n  value: T;\n  constructor(val: T) { this.value = val; }\n}\nconst s = new Storage<string>("Encrypted");\nconsole.log(s.value);',
              expectedOutput: 'Encrypted'
            }
          },
          {
            title: 'Data Mutators: Utility Types',
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: 'Utility types such as `Partial` and `Pick` act as genetic mutators. They rapidly reshape existing interface blueprints, allowing for fractional data updates without redefining the schema.',
              instructions: 'Deploy a Partial utility type to selectively update a user profile.',
              initialCode: 'interface User { name: string; age: number; }\nconst update: Partial<User> = { age: 30 };\nconsole.log(update.age);',
              expectedOutput: '30'
            }
          },
          {
            title: 'Decrypt the Multi-dimensional Array',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'The target intel is buried deep within layers of generic arrays. A standard function cannot pierce the varying types of arrays encountered on the grid.',
              instructions: 'Write a generic extraction function that securely retrieves the first element from any given array.',
              initialCode: 'function getFirst<T>(arr: T[]): T {\n  return arr[0];\n}\nconsole.log(getFirst<number>([7, 8, 9]));',
              expectedOutput: '7'
            }
          }
        ]
      },
      {
        concept: { slug: 'advanced-threats', title: 'Advanced Threat Vectors', description: 'Defend against unpredictable data with sophisticated type guards.', orderIndex: 5 },
        lessons: [
          {
            title: 'State Codes: Enums',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Enums statically map numeric or string values to readable constants. They are the ideal construct for defining rigid, unalterable system state codes within the kernel.',
              instructions: 'Log the current active network state via the defined Enum.',
              initialCode: 'enum State { IDLE, ACTIVE, OFFLINE }\nconsole.log(State.ACTIVE);',
              expectedOutput: '1'
            }
          },
          {
            title: 'Precision Targeting: Literal Types',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Literal types lock a variable down to a specific, exact value. When combined with union types, they provide pinpoint precision targeting for configuration parameters.',
              instructions: 'Ensure the directional vector is locked strictly to a literal string value.',
              initialCode: 'type Direction = "North" | "South";\nlet dir: Direction = "North";\nconsole.log(dir);',
              expectedOutput: 'North'
            }
          },
          {
            title: 'Security Scanners: Type Guards',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'When processing unstable, heterogeneous data, type guards dynamically scan the variable at runtime. This assures the static compiler of the variable\'s true structure before manipulation.',
              instructions: 'Utilize a type guard to process the input stream intelligently.',
              initialCode: 'function process(data: string | number) {\n  if (typeof data === "string") { console.log("String"); }\n  else { console.log("Number"); }\n}\nprocess("Test");',
              expectedOutput: 'String'
            }
          },
          {
            title: 'The Void: Unknown and Never',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Rogue functions that never terminate return `never`. When ingesting alien data, `unknown` forces mandatory type checking, acting as a much safer alternative to the lawless `any` type.',
              instructions: 'Cast an unknown alien data fragment into a readable string and log it.',
              initialCode: 'let alien: unknown = "Data";\nconsole.log(alien as string);',
              expectedOutput: 'Data'
            }
          },
          {
            title: 'Neural Network Quiz',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'An aggressive audit of your advanced threat comprehension is underway. Only absolute certainty will allow you to bypass the neural evaluation.',
              instructions: 'Identify the specific utility type that transforms all properties of a given interface into optional fields.',
              initialCode: '// Awaiting neural input',
              quizOptions: [
                'Omit',
                'Pick',
                'Partial',
                'Record'
              ],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
        concept: { slug: 'async-ops', title: 'Asynchronous Operations', description: 'Master asynchronous flow control and Promise typing.', orderIndex: 6 },
        lessons: [
          {
            title: 'Future Commits: Promises',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Promises represent future commits in the chronological execution timeline. They cleanly encapsulate asynchronous tasks, essential for establishing non-blocking uplinks to external APIs.',
              instructions: 'Observe the typed Promise resolving a network handshake.',
              initialCode: 'const p: Promise<string> = Promise.resolve("Uplink complete");\np.then(res => console.log(res));',
              expectedOutput: 'Uplink complete'
            }
          },
          {
            title: 'Synchronizing Reality: Async/Await',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The Async/Await syntax forces asynchronous execution flows to read like sequential, synchronous code, while rigorously maintaining the underlying type safety of the resolved data.',
              instructions: 'Trigger the async synchronization routine.',
              initialCode: 'async function sync() {\n  return "Synced";\n}\nsync().then(console.log);',
              expectedOutput: 'Synced'
            }
          },
          {
            title: 'Data Extraction: Typed Fetches',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'When extracting external network data, strict typing of the expected JSON payload is mandatory. Failure to type the extraction can result in a fatal runtime system shock.',
              instructions: 'Enforce a rigid interface on the awaited extraction result.',
              initialCode: 'async function fetchUser(): Promise<{name: string}> {\n  return { name: "Neo" };\n}\nfetchUser().then(u => console.log(u.name));',
              expectedOutput: 'Neo'
            }
          },
          {
            title: 'Parallel Hacking: Promise.all',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: '`Promise.all` allows the simultaneous execution of multiple asynchronous network breaches. TypeScript automatically infers the exact tuple type structure of the fully resolved combination array.',
              instructions: 'Launch parallel async operations and output the total count of resolved nodes.',
              initialCode: 'Promise.all([Promise.resolve(1), Promise.resolve("two")])\n  .then(res => console.log(res.length));',
              expectedOutput: '2'
            }
          },
          {
            title: 'Extracting the Core: Awaited',
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: 'The `Awaited` utility type acts as a deep scanner, piercing through the asynchronous wrapper of a Promise to extract and reveal the true, inner core data type that will eventually resolve.',
              instructions: 'Inspect the Awaited extraction mechanism in action.',
              initialCode: 'type Core = Awaited<Promise<string>>;\nconst data: Core = "Extracted Core";\nconsole.log(data);',
              expectedOutput: 'Extracted Core'
            }
          },
          {
            title: 'Hack the Mainframe',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'The central mainframe requires a highly secure, correctly typed asynchronous connection sequence. Any synchronous blocking operations will trigger the alarm systems instantly.',
              instructions: 'Write an asynchronous function that simulates a network delay and ultimately resolves with the string "Access Granted".',
              initialCode: 'async function hack(): Promise<string> {\n  return Promise.resolve("Access Granted");\n}\nhack().then(console.log);',
              expectedOutput: 'Access Granted'
            }
          }
        ]
      },
      {
        concept: { slug: 'system-architecture', title: 'System Architecture', description: 'Build scalable architectures with advanced configuration strategies.', orderIndex: 7 },
        lessons: [
          {
            title: 'Uplinking: Modules',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Massive codebases must be modularized into distinct sectors. Exporting and importing interfaces and classes forms the vital uplink network that connects isolated files into a cohesive application.',
              instructions: 'Simulate a module export by bringing the module status online.',
              initialCode: 'const moduleStatus = "Online";\nconsole.log(moduleStatus);',
              expectedOutput: 'Online'
            }
          },
          {
            title: 'Failsafe Routing: Optional Chaining',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Optional chaining (`?.`) and nullish coalescing (`??`) are essential failsafe routing protocols. They navigate deep object structures safely, returning fallbacks instead of crashing when network nodes are completely offline.',
              instructions: 'Observe the routing mechanism dynamically falling back when it encounters a dead node.',
              initialCode: 'const network: any = {};\nconsole.log(network?.node?.ip ?? "Offline");',
              expectedOutput: 'Offline'
            }
          },
          {
            title: 'Data Morphing: Mapped Types',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Mapped types provide the power to programmatically iterate over existing object structures and forge entirely new type schemas on the fly. This enables massive, automated data morphing without manual re-typing.',
              instructions: 'Utilize a custom mapped type to convert an object into a ReadOnly configuration and log its primary identifier.',
              initialCode: 'type ReadOnlyMap<T> = { readonly [P in keyof T]: T[P] };\nconst m: ReadOnlyMap<{id: number}> = { id: 1 };\nconsole.log(m.id);',
              expectedOutput: '1'
            }
          },
          {
            title: 'Final Exam: The Keyof Operator',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Your intense training protocol is nearly complete. This final conceptual exam tests your architectural comprehension regarding advanced type introspection.',
              instructions: 'What exactly does the `keyof` operator yield when applied to an interface?',
              initialCode: '// Awaiting final evaluation...',
              quizOptions: [
                'It instantiates a brand new interface based on runtime values.',
                'It constructs a union type consisting of the object\'s property keys.',
                'It recursively deletes all keys from a targeted object literal.',
                'It iterates over the elements of a strictly typed array.'
              ],
              correctOptionIndex: 1
            }
          },
          {
            title: 'Omni-System Initialization',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'The time has come to initialize the Omni-System. You must seamlessly weave Generics, Interfaces, and Asynchronous operations into a single, masterful, typed boot sequence.',
              instructions: 'Draft a highly flexible, generic async initialization function that accepts any configuration interface and safely returns it asynchronously.',
              initialCode: 'async function initSystem<T>(config: T): Promise<T> {\n  return config;\n}\ninitSystem({ status: "Omni-Active" }).then(c => console.log(c.status));',
              expectedOutput: 'Omni-Active'
            }
          }
        ]
      }
    ]
  };
};
