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
        "title": "Protocolo Cero: Inicialización",
        "description": "Despierta tus sistemas. Aprende la sintaxis que une el universo de Rust.",
        "orderIndex": 1
      },
      "lessons": [
        {
          "title": "Nodo BASICS-1: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar el Protocolo Cero: Inicialización, debes comprender los algoritmos subyacentes. El Nodo 1 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo BASICS-2: Asimilación",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar el Protocolo Cero: Inicialización, debes comprender los algoritmos subyacentes. El Nodo 2 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo BASICS-3: Asimilación",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar el Protocolo Cero: Inicialización, debes comprender los algoritmos subyacentes. El Nodo 3 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo BASICS-4: Asimilación",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar el Protocolo Cero: Inicialización, debes comprender los algoritmos subyacentes. El Nodo 4 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo BASICS-5: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar el Protocolo Cero: Inicialización, debes comprender los algoritmos subyacentes. El Nodo 5 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISIÓN 1: Brecha del Centinela",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ENCUENTRO DE JEFE] El centinela del Mainframe está bloqueando el puerto. Debes explotar la vulnerabilidad usando tu conocimiento del Protocolo Cero: Inicialización.",
            "instructions": "> DESTRUYE AL CENTINELA. Completa la subrutina para que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // TODO: Escribe tu exploit aquí para imprimir el código de anulación\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "ownership",
        "title": "La Matriz de Memoria: Propiedad",
        "description": "Hackea el heap. Domina las estrictas reglas de gestión de memoria sin recolección de basura.",
        "orderIndex": 2
      },
      "lessons": [
        {
          "title": "Nodo OWNERSHIP-6: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar La Matriz de Memoria: Propiedad, debes comprender los algoritmos subyacentes. El Nodo 6 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo OWNERSHIP-7: Asimilación",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar La Matriz de Memoria: Propiedad, debes comprender los algoritmos subyacentes. El Nodo 7 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo OWNERSHIP-8: Asimilación",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar La Matriz de Memoria: Propiedad, debes comprender los algoritmos subyacentes. El Nodo 8 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo OWNERSHIP-9: Asimilación",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar La Matriz de Memoria: Propiedad, debes comprender los algoritmos subyacentes. El Nodo 9 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo OWNERSHIP-10: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar La Matriz de Memoria: Propiedad, debes comprender los algoritmos subyacentes. El Nodo 10 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISIÓN 2: Brecha del Centinela",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ENCUENTRO DE JEFE] El centinela del Mainframe está bloqueando el puerto. Debes explotar la vulnerabilidad usando tu conocimiento de La Matriz de Memoria: Propiedad.",
            "instructions": "> DESTRUYE AL CENTINELA. Completa la subrutina para que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // TODO: Escribe tu exploit aquí para imprimir el código de anulación\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        },
        {
          "title": "MISIÓN 3: Autorización de Seguridad",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ADVERTENCIA] Intrusión detectada. El firewall requiere verificación de autorización de seguridad.",
            "instructions": "> DESTRUYE AL CENTINELA. Completa la subrutina para que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // TODO: Escribe tu exploit aquí para imprimir el código de anulación\n}",
            "quizOptions": [
              "Explotación de fugas de memoria",
              "Propiedad y préstamo estrictos",
              "Tiempo de ejecución con recolector de basura"
            ],
            "correctOptionIndex": 1
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "structs",
        "title": "Organismos Cibernéticos: Structs y Traits",
        "description": "Construye estructuras de datos avanzadas para modelar tus avatares digitales.",
        "orderIndex": 3
      },
      "lessons": [
        {
          "title": "Nodo STRUCTS-11: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Organismos Cibernéticos: Structs y Traits, debes comprender los algoritmos subyacentes. El Nodo 11 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo STRUCTS-12: Asimilación",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Organismos Cibernéticos: Structs y Traits, debes comprender los algoritmos subyacentes. El Nodo 12 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo STRUCTS-13: Asimilación",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Organismos Cibernéticos: Structs y Traits, debes comprender los algoritmos subyacentes. El Nodo 13 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo STRUCTS-14: Asimilación",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Organismos Cibernéticos: Structs y Traits, debes comprender los algoritmos subyacentes. El Nodo 14 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo STRUCTS-15: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Organismos Cibernéticos: Structs y Traits, debes comprender los algoritmos subyacentes. El Nodo 15 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISIÓN 4: Brecha del Centinela",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ENCUENTRO DE JEFE] El centinela del Mainframe está bloqueando el puerto. Debes explotar la vulnerabilidad usando tu conocimiento de Organismos Cibernéticos: Structs y Traits.",
            "instructions": "> DESTRUYE AL CENTINELA. Completa la subrutina para que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // TODO: Escribe tu exploit aquí para imprimir el código de anulación\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        },
        {
          "title": "MISIÓN 5: Brecha del Centinela",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ENCUENTRO DE JEFE] El centinela del Mainframe está bloqueando el puerto. Debes explotar la vulnerabilidad usando tu conocimiento de Organismos Cibernéticos: Structs y Traits.",
            "instructions": "> DESTRUYE AL CENTINELA. Completa la subrutina para que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // TODO: Escribe tu exploit aquí para imprimir el código de anulación\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "enums",
        "title": "Ramificación Cuántica: Enums y Coincidencia de Patrones",
        "description": "Navega por realidades paralelas usando potentes tipos de datos algebraicos.",
        "orderIndex": 4
      },
      "lessons": [
        {
          "title": "Nodo ENUMS-16: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Ramificación Cuántica: Enums y Coincidencia de Patrones, debes comprender los algoritmos subyacentes. El Nodo 16 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo ENUMS-17: Asimilación",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Ramificación Cuántica: Enums y Coincidencia de Patrones, debes comprender los algoritmos subyacentes. El Nodo 17 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo ENUMS-18: Asimilación",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Ramificación Cuántica: Enums y Coincidencia de Patrones, debes comprender los algoritmos subyacentes. El Nodo 18 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo ENUMS-19: Asimilación",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Ramificación Cuántica: Enums y Coincidencia de Patrones, debes comprender los algoritmos subyacentes. El Nodo 19 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo ENUMS-20: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Ramificación Cuántica: Enums y Coincidencia de Patrones, debes comprender los algoritmos subyacentes. El Nodo 20 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISIÓN 6: Autorización de Seguridad",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ADVERTENCIA] Intrusión detectada. El firewall requiere verificación de autorización de seguridad.",
            "instructions": "> DESTRUYE AL CENTINELA. Completa la subrutina para que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // TODO: Escribe tu exploit aquí para imprimir el código de anulación\n}",
            "quizOptions": [
              "Explotación de fugas de memoria",
              "Propiedad y préstamo estrictos",
              "Tiempo de ejecución con recolector de basura"
            ],
            "correctOptionIndex": 1
          }
        },
        {
          "title": "MISIÓN 7: Brecha del Centinela",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ENCUENTRO DE JEFE] El centinela del Mainframe está bloqueando el puerto. Debes explotar la vulnerabilidad usando tu conocimiento de Ramificación Cuántica: Enums y Coincidencia de Patrones.",
            "instructions": "> DESTRUYE AL CENTINELA. Escribe una subrutina completa que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // Tu código de exploit\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "errors",
        "title": "Mecanismos de Seguridad del Sistema: Manejo de Errores",
        "description": "Evita kernel panics catastróficos con una recuperación de errores elegante.",
        "orderIndex": 5
      },
      "lessons": [
        {
          "title": "Nodo ERRORS-21: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Mecanismos de Seguridad del Sistema: Manejo de Errores, debes comprender los algoritmos subyacentes. El Nodo 21 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo ERRORS-22: Asimilación",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Mecanismos de Seguridad del Sistema: Manejo de Errores, debes comprender los algoritmos subyacentes. El Nodo 22 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo ERRORS-23: Asimilación",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Mecanismos de Seguridad del Sistema: Manejo de Errores, debes comprender los algoritmos subyacentes. El Nodo 23 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo ERRORS-24: Asimilación",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Mecanismos de Seguridad del Sistema: Manejo de Errores, debes comprender los algoritmos subyacentes. El Nodo 24 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo ERRORS-25: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Mecanismos de Seguridad del Sistema: Manejo de Errores, debes comprender los algoritmos subyacentes. El Nodo 25 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISIÓN 8: Brecha del Centinela",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ENCUENTRO DE JEFE] El centinela del Mainframe está bloqueando el puerto. Debes explotar la vulnerabilidad usando tu conocimiento de Mecanismos de Seguridad del Sistema: Manejo de Errores.",
            "instructions": "> DESTRUYE AL CENTINELA. Completa la subrutina para que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // TODO: Escribe tu exploit aquí para imprimir el código de anulación\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    },
    {
      "concept": {
        "slug": "concurrency",
        "title": "Hilos Neuronales: Concurrencia",
        "description": "Ejecuta código simultáneamente a través de ciber-procesadores de múltiples núcleos.",
        "orderIndex": 6
      },
      "lessons": [
        {
          "title": "Nodo CONCURRENCY-26: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 10,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Hilos Neuronales: Concurrencia, debes comprender los algoritmos subyacentes. El Nodo 26 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo CONCURRENCY-27: Asimilación",
          "type": LessonType.DEMO,
          "xpReward": 15,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Hilos Neuronales: Concurrencia, debes comprender los algoritmos subyacentes. El Nodo 27 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo CONCURRENCY-28: Asimilación",
          "type": LessonType.EXERCISE_GUIDED,
          "xpReward": 20,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Hilos Neuronales: Concurrencia, debes comprender los algoritmos subyacentes. El Nodo 28 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo CONCURRENCY-29: Asimilación",
          "type": LessonType.EXERCISE_FREE,
          "xpReward": 25,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Hilos Neuronales: Concurrencia, debes comprender los algoritmos subyacentes. El Nodo 29 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Completa el código para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // TODO: Imprime el estado correspondiente aquí\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "Nodo CONCURRENCY-30: Asimilación",
          "type": LessonType.INTRO,
          "xpReward": 30,
          "content": {
            "theory": "[TRANSMISIÓN ENCRIPTADA] Para dominar Hilos Neuronales: Concurrencia, debes comprender los algoritmos subyacentes. El Nodo 30 introduce la sintaxis principal y las reglas para interactuar con el subsistema.",
            "instructions": "> SEÑAL ENTRANTE... Ejecuta la secuencia de inicialización. Modifica el payload para emitir la firma biométrica exacta requerida por el firewall.",
            "initialCode": "fn main() {\n    // Inicializa el payload aquí\n    println!(\"Status: READY\");\n}",
            "expectedOutput": "Status: READY"
          }
        },
        {
          "title": "MISIÓN 9: Autorización de Seguridad",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ADVERTENCIA] Intrusión detectada. El firewall requiere verificación de autorización de seguridad.",
            "instructions": "> DESTRUYE AL CENTINELA. Completa la subrutina para que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // TODO: Escribe tu exploit aquí para imprimir el código de anulación\n}",
            "quizOptions": [
              "Explotación de fugas de memoria",
              "Propiedad y préstamo estrictos",
              "Tiempo de ejecución con recolector de basura"
            ],
            "correctOptionIndex": 1
          }
        },
        {
          "title": "MISIÓN 10: Brecha del Centinela",
          "type": LessonType.BOSS,
          "xpReward": 50,
          "content": {
            "theory": "[ENCUENTRO DE JEFE] El centinela del Mainframe está bloqueando el puerto. Debes explotar la vulnerabilidad usando tu conocimiento de Hilos Neuronales: Concurrencia.",
            "instructions": "> DESTRUYE AL CENTINELA. Escribe una subrutina completa que emita el código de la secuencia de destrucción exactamente como 'OVERRIDE_ACCEPTED'.",
            "initialCode": "fn main() {\n    // Tu código de exploit\n}",
            "expectedOutput": "OVERRIDE_ACCEPTED"
          }
        }
      ]
    }
  ]
};
};
