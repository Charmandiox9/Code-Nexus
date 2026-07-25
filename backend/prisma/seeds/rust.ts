import { PrismaClient, LessonType } from '@prisma/client';
import { SeederFunction } from './types';

export const getRustSeed: SeederFunction = async (prisma) => {
  return {
  "slug": "rust",
  "name": "Rust",
  "version": "1.77",
  "sections": [
    {
      "concept": {
        "slug": "basics",
        "title": "Protocol Zero: Initialization",
        "description": "Awaken your systems. Learn the syntax that binds the Rust universe.",
        "orderIndex": 1
      },
      "lessons": [
        {
          "title": "Node BASICS-1: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Protocol Zero: Initialization, you must understand the underlying algorithms. Node 1 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node BASICS-2: Assimilation",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Protocol Zero: Initialization, you must understand the underlying algorithms. Node 2 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node BASICS-3: Assimilation",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Protocol Zero: Initialization, you must understand the underlying algorithms. Node 3 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node BASICS-4: Assimilation",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Protocol Zero: Initialization, you must understand the underlying algorithms. Node 4 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node BASICS-5: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Protocol Zero: Initialization, you must understand the underlying algorithms. Node 5 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISSION 1: Sentinel Breach",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[BOSS ENCOUNTER] The Mainframe's sentinel is blocking the port. You must exploit the vulnerability using your knowledge of Protocol Zero: Initialization.",
            "instructions": "> DESTROY THE SENTINEL. Write a complete subroutine that outputs the destruction sequence code exactly as 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // Your exploit code\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "ownership",
        "title": "The Memory Matrix: Ownership",
        "description": "Hack the heap. Master the strict rules of memory management without garbage collection.",
        "orderIndex": 2
      },
      "lessons": [
        {
          "title": "Node OWNERSHIP-6: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master The Memory Matrix: Ownership, you must understand the underlying algorithms. Node 6 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node OWNERSHIP-7: Assimilation",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master The Memory Matrix: Ownership, you must understand the underlying algorithms. Node 7 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node OWNERSHIP-8: Assimilation",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master The Memory Matrix: Ownership, you must understand the underlying algorithms. Node 8 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node OWNERSHIP-9: Assimilation",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master The Memory Matrix: Ownership, you must understand the underlying algorithms. Node 9 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node OWNERSHIP-10: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master The Memory Matrix: Ownership, you must understand the underlying algorithms. Node 10 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISSION 2: Sentinel Breach",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[BOSS ENCOUNTER] The Mainframe's sentinel is blocking the port. You must exploit the vulnerability using your knowledge of The Memory Matrix: Ownership.",
            "instructions": "> DESTROY THE SENTINEL. Write a complete subroutine that outputs the destruction sequence code exactly as 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // Your exploit code\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        },
        {
          "title": "MISSION 3: Security Clearance",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[WARNING] Intrusion detected. Firewall requires security clearance verification.",
            "instructions": "> ANSWER THE SECURITY QUESTION TO PROCEED. What is the primary directive of this sector?",
            "initialCode": "// Awaiting clearance code...",
            "quizOptions": [
              "Memory leak exploitation",
              "Strict ownership and borrowing",
              "Garbage collected runtime"
            ],
            "correctOptionIndex": 1
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "structs",
        "title": "Cybernetic Organisms: Structs & Traits",
        "description": "Build advanced data structures to model your digital avatars.",
        "orderIndex": 3
      },
      "lessons": [
        {
          "title": "Node STRUCTS-11: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Cybernetic Organisms: Structs & Traits, you must understand the underlying algorithms. Node 11 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node STRUCTS-12: Assimilation",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Cybernetic Organisms: Structs & Traits, you must understand the underlying algorithms. Node 12 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node STRUCTS-13: Assimilation",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Cybernetic Organisms: Structs & Traits, you must understand the underlying algorithms. Node 13 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node STRUCTS-14: Assimilation",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Cybernetic Organisms: Structs & Traits, you must understand the underlying algorithms. Node 14 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node STRUCTS-15: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Cybernetic Organisms: Structs & Traits, you must understand the underlying algorithms. Node 15 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISSION 4: Sentinel Breach",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[BOSS ENCOUNTER] The Mainframe's sentinel is blocking the port. You must exploit the vulnerability using your knowledge of Cybernetic Organisms: Structs & Traits.",
            "instructions": "> DESTROY THE SENTINEL. Write a complete subroutine that outputs the destruction sequence code exactly as 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // Your exploit code\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        },
        {
          "title": "MISSION 5: Sentinel Breach",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[BOSS ENCOUNTER] The Mainframe's sentinel is blocking the port. You must exploit the vulnerability using your knowledge of Cybernetic Organisms: Structs & Traits.",
            "instructions": "> DESTROY THE SENTINEL. Write a complete subroutine that outputs the destruction sequence code exactly as 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // Your exploit code\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "enums",
        "title": "Quantum Branching: Enums & Pattern Matching",
        "description": "Navigate parallel realities using powerful algebraic data types.",
        "orderIndex": 4
      },
      "lessons": [
        {
          "title": "Node ENUMS-16: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Quantum Branching: Enums & Pattern Matching, you must understand the underlying algorithms. Node 16 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node ENUMS-17: Assimilation",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Quantum Branching: Enums & Pattern Matching, you must understand the underlying algorithms. Node 17 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node ENUMS-18: Assimilation",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Quantum Branching: Enums & Pattern Matching, you must understand the underlying algorithms. Node 18 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node ENUMS-19: Assimilation",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Quantum Branching: Enums & Pattern Matching, you must understand the underlying algorithms. Node 19 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node ENUMS-20: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Quantum Branching: Enums & Pattern Matching, you must understand the underlying algorithms. Node 20 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISSION 6: Security Clearance",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[WARNING] Intrusion detected. Firewall requires security clearance verification.",
            "instructions": "> ANSWER THE SECURITY QUESTION TO PROCEED. What is the primary directive of this sector?",
            "initialCode": "// Awaiting clearance code...",
            "quizOptions": [
              "Memory leak exploitation",
              "Strict ownership and borrowing",
              "Garbage collected runtime"
            ],
            "correctOptionIndex": 1
          }
        },
        {
          "title": "MISSION 7: Sentinel Breach",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[BOSS ENCOUNTER] The Mainframe's sentinel is blocking the port. You must exploit the vulnerability using your knowledge of Quantum Branching: Enums & Pattern Matching.",
            "instructions": "> DESTROY THE SENTINEL. Write a complete subroutine that outputs the destruction sequence code exactly as 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // Your exploit code\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "errors",
        "title": "System Failsafes: Error Handling",
        "description": "Prevent catastrophic kernel panics with graceful error recovery.",
        "orderIndex": 5
      },
      "lessons": [
        {
          "title": "Node ERRORS-21: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master System Failsafes: Error Handling, you must understand the underlying algorithms. Node 21 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node ERRORS-22: Assimilation",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master System Failsafes: Error Handling, you must understand the underlying algorithms. Node 22 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node ERRORS-23: Assimilation",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master System Failsafes: Error Handling, you must understand the underlying algorithms. Node 23 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node ERRORS-24: Assimilation",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master System Failsafes: Error Handling, you must understand the underlying algorithms. Node 24 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node ERRORS-25: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master System Failsafes: Error Handling, you must understand the underlying algorithms. Node 25 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISSION 8: Sentinel Breach",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[BOSS ENCOUNTER] The Mainframe's sentinel is blocking the port. You must exploit the vulnerability using your knowledge of System Failsafes: Error Handling.",
            "instructions": "> DESTROY THE SENTINEL. Write a complete subroutine that outputs the destruction sequence code exactly as 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // Your exploit code\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "concurrency",
        "title": "Neural Threads: Concurrency",
        "description": "Execute code simultaneously across multi-core cyber-processors.",
        "orderIndex": 6
      },
      "lessons": [
        {
          "title": "Node CONCURRENCY-26: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Neural Threads: Concurrency, you must understand the underlying algorithms. Node 26 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node CONCURRENCY-27: Assimilation",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Neural Threads: Concurrency, you must understand the underlying algorithms. Node 27 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node CONCURRENCY-28: Assimilation",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Neural Threads: Concurrency, you must understand the underlying algorithms. Node 28 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node CONCURRENCY-29: Assimilation",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Neural Threads: Concurrency, you must understand the underlying algorithms. Node 29 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Node CONCURRENCY-30: Assimilation",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[ENCRYPTED TRANSMISSION] To master Neural Threads: Concurrency, you must understand the underlying algorithms. Node 30 introduces core syntax and rules to interface with the subsystem.",
            "instructions": "> INCOMING SIGNAL... Execute the initialization sequence. Modify the payload to output the exact biometric signature required by the firewall.",
            "initialCode": "fn main() {\n    // Initialize payload here\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISSION 9: Security Clearance",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[WARNING] Intrusion detected. Firewall requires security clearance verification.",
            "instructions": "> ANSWER THE SECURITY QUESTION TO PROCEED. What is the primary directive of this sector?",
            "initialCode": "// Awaiting clearance code...",
            "quizOptions": [
              "Memory leak exploitation",
              "Strict ownership and borrowing",
              "Garbage collected runtime"
            ],
            "correctOptionIndex": 1
          }
        },
        {
          "title": "MISSION 10: Sentinel Breach",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[BOSS ENCOUNTER] The Mainframe's sentinel is blocking the port. You must exploit the vulnerability using your knowledge of Neural Threads: Concurrency.",
            "instructions": "> DESTROY THE SENTINEL. Write a complete subroutine that outputs the destruction sequence code exactly as 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // Your exploit code\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    }
  ]
};
};
