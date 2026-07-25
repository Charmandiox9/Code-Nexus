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
          title: 'El Cyber-Núcleo (Conceptos básicos)',
          description: 'Inicializa el mainframe y domina los constructos fundamentales de los entornos de ejecución de Java 21.',
          orderIndex: 1,
        },
        lessons: [
          {
            title: 'Secuencia de Arranque',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Bienvenido a la Consola Nexus. Java es un lenguaje de programación orientado a objetos y fuertemente tipado. Toda ejecución comienza dentro del método `main` de una clase principal. El Cyber-Núcleo requiere una sintaxis estricta: cada declaración debe terminar con un punto y coma, y los bloques de código están encapsulados en llaves `{}`.',
              instructions: 'Inicializa la secuencia de ejecución principal. Muestra la frase exacta "System Booting..." en la terminal usando `System.out.println`.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Iniciar secuencia de arranque\n    }\n}',
              expectedOutput: 'System Booting...\n'
            }
          },
          {
            title: 'Resumen de Sintaxis',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'La arquitectura subyacente de nuestro entorno cibernético se basa en definiciones de objetos. Normalmente, un archivo contiene una clase pública que coincide con el nombre del archivo. El punto de entrada, `public static void main(String[] args)`, es el nodo singular donde comienza nuestro hilo de ejecución.',
              instructions: 'Observa la estructura de la clase Main. Ejecuta el script proporcionado para verificar la salida de la consola.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Node Connected");\n    }\n}',
              expectedOutput: 'Node Connected\n'
            }
          },
          {
            title: 'Eco de Terminal',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Los protocolos de transmisión ofrecen dos métodos principales para el eco de terminal: `print()` y `println()`. Mientras que `println()` añade un carácter de nueva línea tras la transmisión, `print()` deja el cursor en la línea actual, permitiendo la inyección continua en el flujo.',
              instructions: 'Imprime "Access" y "Granted" en la misma línea usando dos declaraciones `System.out.print`, separadas por un espacio.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.print("Access");\n        // Completar la transmisión\n    }\n}',
              expectedOutput: 'Access Granted'
            }
          },
          {
            title: 'Transmisiones Multilínea',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'Las cargas complejas a menudo requieren formato multilínea para estructurar adecuadamente la interfaz de comandos. Utilizar múltiples llamadas a `println()` asegura una separación clara de los paquetes de datos.',
              instructions: 'Muestra exactamente tres líneas:\nLínea 1: "Uplink Established"\nLínea 2: "Decrypting..."\nLínea 3: "Payload Delivered"',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Uplink Established\nDecrypting...\nPayload Delivered\n'
            }
          },
          {
            title: 'Comentarios Sigilosos',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Al inyectar código en sistemas hostiles, dejar notas para los operativos aliados es crucial. Java proporciona comentarios de una sola línea usando `//` y comentarios multilínea encapsulados entre `/*` y `*/`. El compilador JVM ignora completamente estos bloques.',
              instructions: '¡El código actual ejecuta una secuencia de autodestrucción! Comenta la línea que imprime "Initiating self-destruct" e imprime "System Safe" en su lugar.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Initiating self-destruct");\n        // Imprimir "System Safe" abajo\n    }\n}',
              expectedOutput: 'System Safe\n'
            }
          },
          {
            title: 'Quiz de Inicialización del Mainframe',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'La IA de seguridad está evaluando tus conocimientos fundamentales del Cyber-Núcleo de Java. Responde correctamente para eludir el cortafuegos.',
              instructions: 'Selecciona la afirmación correcta respecto a la ejecución de Java.',
              initialCode: '',
              quizOptions: [
                'La ejecución comienza en la primera línea del archivo',
                'La ejecución requiere un método public static void main',
                'Los comentarios se compilan en bytecode por seguridad',
                'System.out.print siempre añade una nueva línea'
              ],
              correctOptionIndex: 1
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-data-matrices',
          title: 'Matrices de Datos (Variables y Tipos de Datos)',
          description: 'Asigna sectores de memoria y define constructos de datos para almacenar información crítica.',
          orderIndex: 2,
        },
        lessons: [
          {
            title: 'Asignaciones de Memoria',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Las variables actúan como celdas de memoria volátil que contienen cargas de datos. Los tipos primitivos son las unidades más rápidas: `int` para enteros, `double` para decimales de alta precisión y `boolean` para puertas lógicas de verdadero/falso.',
              instructions: 'Declara un `int` llamado `securityLevel` y asígnale el valor `5`. Imprime su valor.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '5\n'
            }
          },
          {
            title: 'Codificación de Caracteres',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Los flujos de texto se codifican utilizando `char` (un solo carácter Unicode de 16 bits, comillas simples) y `String` (una secuencia de caracteres, comillas dobles). Los Strings son objetos de pleno derecho, vitales para el fraseo de comandos.',
              instructions: 'Crea una variable String `agentName` con el valor "Neo" y una variable char `rank` con el valor \'A\'. Imprímelos en líneas separadas.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Neo\nA\n'
            }
          },
          {
            title: 'Constantes Inmutables',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Para evitar la corrupción de datos por parte de entidades hostiles, las variables pueden bloquearse mediante la palabra clave `final`. Una vez que se inicializa una variable final, su carga de datos se vuelve inmutable.',
              instructions: 'Ejecuta el programa para ver cómo se accede a la constante inmutable.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        final double PI = 3.14159;\n        System.out.println("Constant PI: " + PI);\n    }\n}',
              expectedOutput: 'Constant PI: 3.14159\n'
            }
          },
          {
            title: 'Manipulación de Señales',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'Los operadores matemáticos (+, -, *, /, %) permiten manipular cargas numéricas. La concatenación de Strings utiliza el operador + para fusionar nodos de texto con datos.',
              instructions: 'Declara dos enteros, `x` inicializado en 10 e `y` en 20. Imprime su suma concatenándola al String "Sum: ".',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Sum: 30\n'
            }
          },
          {
            title: 'Cálculo de Recursos',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'El mainframe requiere un cálculo preciso del ancho de banda disponible para continuar las operaciones.',
              instructions: 'Escribe un programa que declare `int bandwidth = 500` e `int consumption = 120`. Calcula el ancho de banda restante e imprime "Remaining: " seguido del valor calculado.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Remaining: 380\n'
            }
          },
          {
            title: 'Quiz de Anomalías de Tipos de Datos',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: '¡Un escaneo del sector ha revelado anomalías en los tipos de datos! Asegura la matriz respondiendo correctamente.',
              instructions: 'Identifica el comportamiento correcto de asignación de memoria en el ecosistema Java.',
              initialCode: '',
              quizOptions: [
                'String es un tipo primitivo',
                'boolean puede contener 0 o 1',
                'char usa comillas simples y contiene un solo carácter',
                'double es menos preciso que float'
              ],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-logic-gates',
          title: 'Puertas Lógicas (Control de Flujo)',
          description: 'Implementa protocolos de toma de decisiones para enrutar rutas de ejecución según los niveles de amenaza.',
          orderIndex: 3,
        },
        lessons: [
          {
            title: 'Enrutamiento Condicional',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'A menudo, las rutas de ejecución deben divergir en función de evaluaciones de amenazas en tiempo real. Las declaraciones `if-else` crean rutas lógicas ramificadas, evaluando una expresión booleana para determinar qué bloque de código ejecutar.',
              instructions: 'Comprueba si `clearance` es mayor que 3. Si es verdadero, imprime "Access Granted". De lo contrario, imprime "Denied". La variable `clearance` está establecida en 5.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int clearance = 5;\n        // Escribe tu lógica aquí\n    }\n}',
              expectedOutput: 'Access Granted\n'
            }
          },
          {
            title: 'Anidamiento Profundo',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Las subrutinas pueden requerir múltiples capas de validación. Anidar declaraciones `if` dentro de otros bloques `if` permite realizar comprobaciones de seguridad multinivel complejas.',
              instructions: 'Comprueba si `isActive` es verdadero. Si lo es, comprueba si `level` es 10. Si ambas son verdaderas, imprime "Max Power".',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        boolean isActive = true;\n        int level = 10;\n        // Agregar condiciones anidadas\n    }\n}',
              expectedOutput: 'Max Power\n'
            }
          },
          {
            title: 'Protocolos Switch',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Java 21 introduce expresiones switch mejoradas con sintaxis de estilo lambda (`->`). Esto proporciona una forma más limpia y segura de enrutar la ejecución basándose en el estado de una sola variable, eliminando errores de caída libre (fall-through).',
              instructions: 'Ejecuta esta expresión switch moderna para ver cómo enruta los comandos del protocolo.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int protocol = 2;\n        switch (protocol) {\n            case 1 -> System.out.println("Alpha");\n            case 2 -> System.out.println("Beta");\n            default -> System.out.println("Unknown");\n        }\n    }\n}',
              expectedOutput: 'Beta\n'
            }
          },
          {
            title: 'Anulaciones Ternarias',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'El operador ternario `? :` actúa como un microcondicional, condensando bloques if-else simples en una sola expresión para una rápida asignación de variables.',
              instructions: 'Usa un operador ternario para asignar "High" a `status` si `energy > 50`, si no "Low". La energía (`energy`) es 80. Imprime `status`.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int energy = 80;\n        // String status = ...\n    }\n}',
              expectedOutput: 'High\n'
            }
          },
          {
            title: 'Matrices Lógicas Booleanas',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Combina múltiples métricas de amenaza simultáneamente usando AND Lógico (`&&`), OR Lógico (`||`) y NOT Lógico (`!`).',
              instructions: 'Imprime "Valid" si `x` es mayor que 0 Y `x` es menor que 10. `x` es 5.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        if (/* lógica */) {\n            System.out.println("Valid");\n        }\n    }\n}',
              expectedOutput: 'Valid\n'
            }
          },
          {
            title: 'Derivación del Cortafuegos',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Un cortafuegos seguro está bloqueando el nodo principal. Debes diseñar una anulación lógica precisa.',
              instructions: 'Estás interceptando una secuencia de inicio de sesión. Si `user` es "admin" o "root", Y `pass` es "1234", imprime "Bypass Successful". De lo contrario, imprime "Lockout".',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        String user = "root";\n        String pass = "1234";\n        // Escribe la lógica\n    }\n}',
              expectedOutput: 'Bypass Successful\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-recursive-constructs',
          title: 'Constructos Recursivos (Bucles)',
          description: 'Automatiza el procesamiento de datos a través de conjuntos masivos usando arquitecturas de bucles cíclicos.',
          orderIndex: 4,
        },
        lessons: [
          {
            title: 'Ciclos de Iterador',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Para desplegar flujos de datos repetitivos, los bucles `for` definen expresiones de inicialización, condición e iteración dentro de un solo constructo. Perfecto para conteos de bucle conocidos.',
              instructions: 'Usa un bucle for para imprimir los números 1, 2 y 3 en líneas separadas.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '1\n2\n3\n'
            }
          },
          {
            title: 'Bucles Condicionales',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Cuando se desconoce el volumen de carga, los bucles `while` se ejecutan continuamente mientras una condición booleana siga siendo verdadera. No alterar la condición causará un bucle infinito.',
              instructions: 'Usa un bucle while para imprimir "Ping " 3 veces en la misma línea. Recuerda incrementar tu contador.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int count = 0;\n        // Bucle while aquí\n    }\n}',
              expectedOutput: 'Ping Ping Ping '
            }
          },
          {
            title: 'Ciclos de Ejecución Asegurada',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Un bucle `do-while` garantiza la ejecución del bloque de código al menos una vez antes de evaluar la condición. Útil para conexiones iniciales.',
              instructions: 'Ejecuta este bucle para ver la ejecución garantizada incluso cuando la condición comienza como falsa.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        boolean active = false;\n        do {\n            System.out.println("Initial Ping");\n        } while(active);\n    }\n}',
              expectedOutput: 'Initial Ping\n'
            }
          },
          {
            title: 'Interrupción de Bucle',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: '`break` rompe inmediatamente la estructura del bucle actual, mientras que `continue` aborta la iteración actual y salta a la condición del siguiente ciclo.',
              instructions: 'Escribe un bucle for de 1 a 5. Si la variable del bucle es igual a 3, usa `continue`. Imprime los otros números en líneas separadas.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '1\n2\n4\n5\n'
            }
          },
          {
            title: 'Descifrado por Fuerza Bruta',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'El flujo de datos del enemigo debe descifrarse mediante un escaneo secuencial.',
              instructions: 'Haz un bucle del 1 al 10 (inclusive). Si un número es par, imprímelo en una nueva línea. Debes usar el operador módulo `%`.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '2\n4\n6\n8\n10\n'
            }
          },
          {
            title: 'Quiz de Terminación de Ciclos',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: '¡El sistema ha detectado una amenaza de bucle infinito! Rastrea la vulnerabilidad.',
              instructions: 'Identifica la causa principal de los bucles `while` infinitos no deseados.',
              initialCode: '',
              quizOptions: [
                'Usar la palabra clave break dentro del bucle',
                'Las variables de la condición del bucle nunca se actualizan dentro del bloque del bucle',
                'La variable del bucle comienza en 0 en lugar de 1',
                'Usar un bucle do-while en lugar de while'
              ],
              correctOptionIndex: 1
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-synthetic-arrays',
          title: 'Arrays Sintéticos (Arrays)',
          description: 'Construye bancos de memoria lineales para administrar colecciones por lotes de variables.',
          orderIndex: 5,
        },
        lessons: [
          {
            title: 'Bancos de Memoria Lineales',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Los arrays (arreglos) son estructuras de longitud inmutable que contienen múltiples cargas del mismo tipo de datos. Usan indexación basada en cero, lo que significa que el primer sector está en el índice 0.',
              instructions: 'Declara un array int `codes` con los valores 10, 20, 30. Imprime el primer elemento (índice 0).',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '10\n'
            }
          },
          {
            title: 'Recorrido de Índice',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Los nodos de datos dentro de un array pueden anularse accediendo a su índice específico.',
              instructions: 'Cambia el valor del segundo elemento (índice 1) a 99. Imprime el valor modificado.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] nodes = {5, 10, 15};\n        // Modificar e imprimir\n    }\n}',
              expectedOutput: '99\n'
            }
          },
          {
            title: 'Coordenadas de Cuadrícula',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Los arrays de arrays crean matrices multidimensionales, utilizadas para mapear ciberespacios 2D.',
              instructions: 'Ejecuta para ver cómo se extrae una coordenada de una matriz 2D.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1, 2}, {3, 4}};\n        System.out.println("Target: " + grid[1][0]);\n    }\n}',
              expectedOutput: 'Target: 3\n'
            }
          },
          {
            title: 'Procesamiento por Lotes',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'El bucle `for` mejorado (for-each) itera a través de cada elemento en un array de manera sistemática sin manejo manual de índices.',
              instructions: 'Usa un bucle for-each para iterar a través del array `signals` e imprimir cada valor en una nueva línea.',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] signals = {100, 200, 300};\n        // bucle for-each\n    }\n}',
              expectedOutput: '100\n200\n300\n'
            }
          },
          {
            title: 'La Anomalía Más Alta',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Los escáneres detectaron picos de energía variables en el sector. Debes localizar la amplitud más alta.',
              instructions: 'Dado el array `int[] data = {12, 45, 7, 89, 23};`, escribe la lógica para encontrar e imprimir el valor máximo en el formato "Max: [valor]".',
              initialCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] data = {12, 45, 7, 89, 23};\n        \n    }\n}',
              expectedOutput: 'Max: 89\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-object-blueprints',
          title: 'Planos de Objetos (Clases y Objetos)',
          description: 'Diseña y despliega objetos modulares usando Clases para encapsular estado y comportamiento.',
          orderIndex: 6,
        },
        lessons: [
          {
            title: 'Esquemas de Clases',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Una Clase es el plano de arquitectura fundamental en Java. Define el estado (campos) y comportamientos (métodos) que poseerán los objetos generados a partir de ella.',
              instructions: 'Examina la clase `Agent`. Dentro del main, crea una variable de referencia `Agent` llamada `a1` (no la inicialices con new todavía). Déjala vacía. El código compilará silenciosamente.',
              initialCode: 'class Agent {\n    String name;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Declarar una variable Agent\n    }\n}',
              expectedOutput: ''
            }
          },
          {
            title: 'Instanciación de Objetos',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'La palabra clave `new` asigna memoria en el heap, instanciando un objeto físico a partir del plano de una Clase. Esto devuelve una referencia de memoria.',
              instructions: 'Instancia un objeto `Agent` en `a1` usando `new Agent()`. Establece su campo `name` a "Smith" e imprímelo.',
              initialCode: 'class Agent {\n    String name;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Agent a1 = new Agent();\n        // Establecer name e imprimir\n    }\n}',
              expectedOutput: 'Smith\n'
            }
          },
          {
            title: 'Protocolos de Constructores',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Los constructores son bloques especializados invocados durante la instanciación, utilizados principalmente para inicializar los campos de un objeto. No tienen tipo de retorno y coinciden con el nombre de la Clase.',
              instructions: 'Ejecuta para presenciar la inyección del constructor.',
              initialCode: 'class Module {\n    int id;\n    Module(int newId) {\n        id = newId;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Module m = new Module(77);\n        System.out.println("Module ID: " + m.id);\n    }\n}',
              expectedOutput: 'Module ID: 77\n'
            }
          },
          {
            title: 'Mutación de Estado',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'Múltiples objetos instanciados de la misma clase actúan como instancias independientes. Mudar el estado de uno no afecta a los demás.',
              instructions: 'Crea dos instancias de `Node`. Establece `id` a 1 para la primera, y 2 para la segunda. Imprime ambos `id` en líneas separadas.',
              initialCode: 'class Node {\n    int id;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: '1\n2\n'
            }
          },
          {
            title: 'Ensamblador de Drones',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'El centro de mando necesita una nueva unidad de reconocimiento desplegada inmediatamente.',
              instructions: 'Crea una clase `Drone` con un campo `int` llamado `serial`. En main, instancia un `Drone`, establece `serial` en 999, e imprime "Drone Deployed: 999".',
              initialCode: '// Escribe la clase Drone aquí\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Drone Deployed: 999\n'
            }
          },
          {
            title: 'Quiz de Matriz de Referencia',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Verificación de la arquitectura del sistema. Valida tu comprensión sobre la asignación de memoria en Java.',
              instructions: 'Determina la naturaleza de las referencias de objetos en la JVM.',
              initialCode: '',
              quizOptions: [
                'Los objetos se almacenan directamente en el stack',
                'La palabra clave new asigna memoria en el heap',
                'Los tipos primitivos contienen referencias a memoria',
                'Dos objetos nunca pueden tener el mismo estado'
              ],
              correctOptionIndex: 1
            }
          }
        ]
      },
      {
        concept: {
          slug: 'java-encrypted-modules',
          title: 'Módulos Encriptados (Métodos)',
          description: 'Construye subrutinas aisladas para asegurar la lógica y habilitar la programación modular.',
          orderIndex: 7,
        },
        lessons: [
          {
            title: 'Definición de Subrutina',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Los métodos encapsulan la lógica en bloques reutilizables, reduciendo la duplicación de código y aislando los hilos de ejecución. Los métodos `void` ejecutan acciones pero no devuelven datos.',
              instructions: 'Crea un método static void `triggerAlert()` dentro de Main que imprima "Alert!". Llámalo desde `main()`.',
              initialCode: 'public class Main {\n    // Crea el método triggerAlert aquí\n\n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Alert!\n'
            }
          },
          {
            title: 'Flujos de Retorno de Datos',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 15,
            content: {
              theory: 'Los métodos pueden devolver cargas útiles calculadas al invocador al definir un tipo de retorno (p. ej., `int`) y utilizar la palabra clave `return`.',
              instructions: 'Completa el método `getSecretCode` para devolver el entero `42`. Imprime el resultado en `main`.',
              initialCode: 'public class Main {\n    static int getSecretCode() {\n        // Devolver 42\n    }\n\n    public static void main(String[] args) {\n        System.out.println(getSecretCode());\n    }\n}',
              expectedOutput: '42\n'
            }
          },
          {
            title: 'Inyección de Argumentos',
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: 'Los métodos pueden aceptar datos externos a través de parámetros. Estas variables actúan como entradas locales para el bloque de ejecución del método.',
              instructions: 'Examina cómo los parámetros pasan datos a un método.',
              initialCode: 'public class Main {\n    static void printDouble(int value) {\n        System.out.println(value * 2);\n    }\n\n    public static void main(String[] args) {\n        printDouble(10);\n    }\n}',
              expectedOutput: '20\n'
            }
          },
          {
            title: 'Sobrecarga de Firmas',
            type: LessonType.EXERCISE_FREE,
            xpReward: 20,
            content: {
              theory: 'La sobrecarga de métodos permite que varios métodos compartan el mismo nombre dentro de una clase, siempre que sus listas de parámetros (firmas) difieran.',
              instructions: 'Sobrecarga el método `send`. Uno debe aceptar un `String` e imprimirlo. El otro debe aceptar un `int` e imprimirlo. Llama a ambos desde main: send("Data") y send(5).',
              initialCode: 'public class Main {\n    static void send(String msg) {\n        System.out.println(msg);\n    }\n    // Escribe el método send sobrecargado aquí\n\n    public static void main(String[] args) {\n        send("Data");\n        send(5);\n    }\n}',
              expectedOutput: 'Data\n5\n'
            }
          },
          {
            title: 'Entrega Final de la Carga',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'El último cortafuegos requiere un paquete de carga útil firmado matemáticamente.',
              instructions: 'Escribe un método estático `calculateHash` que tome dos enteros, los multiplique y devuelva el resultado. En el main, llámalo con 7 y 6, e imprime "Hash: [resultado]".',
              initialCode: 'public class Main {\n    \n    public static void main(String[] args) {\n        \n    }\n}',
              expectedOutput: 'Hash: 42\n'
            }
          }
        ]
      }
    ]
  };
};
