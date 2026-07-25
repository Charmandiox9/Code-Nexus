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
          title: "El Protocolo Central",
          description: "Inicializa tu cibermazo. Comprende las primitivas básicas y la E/S estándar de la terminal de C.",
          orderIndex: 1
        },
        lessons: [
          {
            title: "Secuencia de Arranque: Compilador de C",
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Bienvenido a los niveles más bajos del mainframe, Operativo. C es un lenguaje compilado, lo que significa que el código fuente debe transformarse en código máquina antes de la ejecución.",
              instructions: "Inicializa la secuencia de arranque. Completa el código para imprimir 'System Online' para verificar que los flujos de salida estándar son funcionales.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // TODO: Usa printf para imprimir la cadena de activación 'System Online'\n  \n  return 0;\n}",
              expectedOutput: "System Online"
            }
          },
          {
            title: "Primitivas de Datos",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "Las variables en C están estrictamente tipadas. Debes declarar la disposición exacta de memoria requerida: int, float, char, o double.",
              instructions: "Revisa la declaración de tipos primitivos. Ejecuta el archivo para observar la lectura de memoria.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int cycles = 42;\n  float voltage = 3.14;\n  char sector = 'A';\n  printf(\"C: %d, V: %.2f, S: %c\", cycles, voltage, sector);\n  return 0;\n}",
              expectedOutput: "C: 42, V: 3.14, S: A"
            }
          },
          {
            title: "Inicialización de Memoria",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Las variables no inicializadas contienen datos basura de estados de memoria anteriores. Siempre inicializa tus registros.",
              instructions: "Declara una variable entera llamada 'authCode' e inicialízala en 999. Imprímela.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // TODO: Declara e inicializa 'authCode' a 999\n  // TODO: Imprime 'authCode'\n  \n  return 0;\n}",
              expectedOutput: "999"
            }
          },
          {
            title: "Formateo de Flujo",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "El flujo de salida estándar se basa en especificadores de formato como %d para enteros y %s para cadenas para interpolar datos.",
              instructions: "Formatea la salida exactamente como 'Sector: 7, Status: Active'. Se te da la variable entera 'sector'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int sector = 7;\n  // TODO: Escribe la salida formateada usando la variable 'sector'\n  \n  return 0;\n}",
              expectedOutput: "Sector: 7, Status: Active"
            }
          },
          {
            title: "ALU Aritmética",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "La Unidad Aritmético Lógica (ALU) procesa operaciones matemáticas. Los operadores estándar (+, -, *, /) son ejecutados por la CPU.",
              instructions: "Calcula el ancho de banda total multiplicando 'base' por 'multiplier' y sumando 'bonus'. Imprime el resultado.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int base = 100, multiplier = 4, bonus = 50;\n  // TODO: Calcula e imprime el resultado de (base * multiplier) + bonus\n  \n  return 0;\n}",
              expectedOutput: "450"
            }
          },
          {
            title: "Diagnóstico Central",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Misión: Diagnóstico de Sistemas Centrales. Debemos verificar tu comprensión de las primitivas de C antes de otorgar más acceso.",
              instructions: "Identifica el especificador de formato correcto para un solo carácter en C.",
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
          title: "Puertas Lógicas y Flujo",
          description: "Domina las bifurcaciones condicionales y los bucles de iteración para controlar la ruta de ejecución.",
          orderIndex: 2
        },
        lessons: [
          {
            title: "Bifurcación Condicional",
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "La CPU ejecuta instrucciones secuencialmente a menos que se alteren mediante declaraciones de flujo de control como if/else.",
              instructions: "Comprueba si la variable 'breach' es 1. Si es así, imprime 'Alert', de lo contrario imprime 'Secure'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int breach = 1;\n  // TODO: Escribe el condicional if/else para imprimir 'Alert' o 'Secure'\n  \n  return 0;\n}",
              expectedOutput: "Alert"
            }
          },
          {
            title: "Matrices Switch",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "Las declaraciones switch proporcionan una matriz altamente optimizada de rutas de ejecución para valores enteros discretos.",
              instructions: "Observa cómo la declaración switch enruta la ejecución en función de 'opCode'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int opCode = 2;\n  switch(opCode) {\n    case 1: printf(\"Init\"); break;\n    case 2: printf(\"Execute\"); break;\n    default: printf(\"Halt\");\n  }\n  return 0;\n}",
              expectedOutput: "Execute"
            }
          },
          {
            title: "Bucles While",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Un bucle 'while' continúa los ciclos de ejecución mientras su condición se evalúe como verdadera (diferente de cero).",
              instructions: "Crea un bucle while que decremente 'countdown' de 3 a 1, imprimiendo cada número.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int countdown = 3;\n  // TODO: Escribe un bucle while aquí para imprimir y decrementar 'countdown'\n  \n  return 0;\n}",
              expectedOutput: "321"
            }
          },
          {
            title: "Iteradores For",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "El bucle 'for' compacta la inicialización, la comprobación de condición y la iteración en un solo bloque de ejecución.",
              instructions: "Escribe un bucle for que imprima los números pares entre 2 y 6 (inclusive), separados por espacios.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // TODO: Escribe tu bucle for para imprimir '2 4 6 '\n  \n  return 0;\n}",
              expectedOutput: "2 4 6 "
            }
          },
          {
            title: "Interrupciones de Bucle",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "El comando 'break' termina inmediatamente un bucle, mientras que 'continue' salta el resto del ciclo actual.",
              instructions: "Haz un bucle del 1 al 5. Imprime los números. Si el número es 4, usa break para abortar el bucle inmediatamente.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // TODO: Haz un bucle del 1 al 5, imprime el número, y usa break si es 4\n  \n  return 0;\n}",
              expectedOutput: "123"
            }
          },
          {
            title: "Descifra el Código de Acceso",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Misión: Las puertas de seguridad requieren una secuencia numérica específica para desbloquearse.",
              instructions: "Usa un bucle para imprimir los múltiplos de 3, comenzando desde 3 hasta 15, secuencialmente sin espacios.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // TODO: Genera la secuencia '3691215' usando un bucle\n  \n  return 0;\n}",
              expectedOutput: "3691215"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-memory-pointers",
          title: "Direcciones de Memoria",
          description: "Desciende a la capa de memoria física. Usa punteros para manipular la RAM directamente.",
          orderIndex: 3
        },
        lessons: [
          {
            title: "La Matriz de Memoria",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "Cada variable reside en una dirección de hardware física en la RAM. Los punteros son variables que almacenan estas direcciones.",
              instructions: "Usa el operador de dirección (&) para asignar la dirección de 'target' a un puntero 'ptr'. Imprime 'Linked'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int target = 101;\n  // TODO: Declara un puntero a int 'ptr' y asígnale la dirección de 'target'\n  \n  printf(\"Linked\");\n  return 0;\n}",
              expectedOutput: "Linked"
            }
          },
          {
            title: "Protocolos de Desreferenciación",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "Desreferenciar un puntero te permite leer o mutar los datos ubicados en la dirección de memoria de destino.",
              instructions: "Observa cómo se usa el operador asterisco (*) para extraer el valor del puntero.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int node = 99;\n  int *ptr = &node;\n  printf(\"Value: %d\", *ptr);\n  return 0;\n}",
              expectedOutput: "Value: 99"
            }
          },
          {
            title: "Mutación de Puntero",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Mediante la desreferenciación, un puntero puede alterar directamente el estado de su variable objetivo, eludiendo su alcance local.",
              instructions: "Usa el puntero 'p' para disminuir el valor de 'shield' en 50. Imprime 'shield'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int shield = 100;\n  int *p = &shield;\n  // TODO: Disminuye 'shield' en 50 desreferenciando el puntero 'p'\n  \n  printf(\"%d\", shield);\n  return 0;\n}",
              expectedOutput: "50"
            }
          },
          {
            title: "El Vector Nulo",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "Un puntero que no apunta a nada es un puntero NULL. Acceder a un puntero NULL causa un fallo de segmentación.",
              instructions: "Inicializa un puntero a entero 'voidPtr' a NULL. Si es NULL, imprime 'Void'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // TODO: Inicializa el puntero 'voidPtr' a NULL y comprueba si es NULL para imprimir 'Void'\n  \n  return 0;\n}",
              expectedOutput: "Void"
            }
          },
          {
            title: "Suma de Comprobación de Memoria",
            type: LessonType.BOSS,
            xpReward: 40,
            content: {
              theory: "Misión: La verificación del sistema requiere una comprensión profunda de la mecánica de punteros.",
              instructions: "¿Qué símbolo se utiliza para recuperar el valor almacenado en la dirección de memoria de un puntero?",
              initialCode: "",
              quizOptions: ["*", "&", "->", "%"],
              correctOptionIndex: 0
            }
          },
          {
            title: "Intercambio de Direcciones",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Misión: Dos variables centrales tienen sus valores invertidos. Debes intercambiarlos usando solo sus punteros.",
              instructions: "Dadas 'a' y 'b', y sus punteros 'pa' y 'pb', escribe el código para intercambiar sus valores. Imprime a y luego b.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int a = 10, b = 20;\n  int *pa = &a, *pb = &b;\n  int temp;\n  // TODO: Intercambia los valores de 'a' y 'b' usando los punteros 'pa' y 'pb'\n  \n  printf(\"%d %d\", a, b);\n  return 0;\n}",
              expectedOutput: "20 10"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-data-blocks",
          title: "Bloques de Datos y Cadenas",
          description: "Manipula bloques contiguos de memoria. Domina los arrays y las cadenas terminadas en nulo.",
          orderIndex: 4
        },
        lessons: [
          {
            title: "Memoria Contigua",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "Los arrays son bloques contiguos de memoria que contienen elementos del mismo tipo. Los índices de array comienzan en 0.",
              instructions: "Crea un array de enteros 'buffer' con los valores 1, 2, 3. Imprime el segundo elemento.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  // TODO: Declara el array 'buffer' con 1, 2, 3 e imprime el segundo elemento\n  \n  return 0;\n}",
              expectedOutput: "2"
            }
          },
          {
            title: "Arrays Terminados en Nulo",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "En C, las cadenas son simplemente arrays de caracteres que terminan con un terminador nulo especial '\\0'.",
              instructions: "Observa cómo una cadena es solo un array de caracteres. Ejecuta el código.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  char signal[] = {'S', 'O', 'S', '\\0'};\n  printf(\"Signal: %s\", signal);\n  return 0;\n}",
              expectedOutput: "Signal: SOS"
            }
          },
          {
            title: "Recorrido de Array",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Puedes iterar eficientemente a través del bloque de memoria de un array usando bucles.",
              instructions: "Usa un bucle for para imprimir todos los elementos del array 'data' de forma continua sin espacios.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int data[] = {4, 8, 15, 16, 23, 42};\n  // TODO: Escribe el bucle for aquí para imprimir todos los elementos\n  \n  return 0;\n}",
              expectedOutput: "4815162342"
            }
          },
          {
            title: "Aritmética de Punteros",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "El nombre de un array actúa como un puntero a su primer elemento. Sumar 1 a un puntero lo mueve a la dirección del siguiente elemento.",
              instructions: "Usa aritmética de punteros (por ejemplo, *(arr + 1)) para imprimir el tercer elemento del array 'arr'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  int arr[] = {100, 200, 300, 400};\n  // TODO: Imprime el 3er elemento de 'arr' usando aritmética de punteros\n  \n  return 0;\n}",
              expectedOutput: "300"
            }
          },
          {
            title: "Desbordamiento de Búfer",
            type: LessonType.BOSS,
            xpReward: 40,
            content: {
              theory: "Misión: Alerta de seguridad. Escribir más allá de los límites asignados de un array causa corrupción de memoria.",
              instructions: "¿Cómo se llama la vulnerabilidad crítica cuando los datos exceden los límites de un bloque contiguo?",
              initialCode: "",
              quizOptions: ["Fuga de Memoria", "Desbordamiento de Búfer", "Desreferenciación de Puntero Nulo", "Error de Sintaxis"],
              correctOptionIndex: 1
            }
          },
          {
            title: "Descifrado de Código",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Misión: Una cadena corrupta necesita ser parcheada. Reemplaza el carácter corrupto en el índice 2 con 'R'.",
              instructions: "El array cifrado es 'ZEXO'. Parchea el índice 2 para que imprima 'ZERO'.",
              initialCode: "#include <stdio.h>\n\nint main() {\n  char cipher[] = \"ZEXO\";\n  // TODO: Reemplaza el carácter en el índice 2 de 'cipher' con 'R'\n  \n  printf(\"%s\", cipher);\n  return 0;\n}",
              expectedOutput: "ZERO"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-modular-functions",
          title: "Subrutinas Modulares",
          description: "Encapsula la lógica en funciones reutilizables. Domina el paso por valor y el paso por referencia.",
          orderIndex: 5
        },
        lessons: [
          {
            title: "Definiciones de Subrutina",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "Las funciones nos permiten dividir código monolítico en subrutinas modulares. Requieren un tipo de retorno, un nombre y parámetros.",
              instructions: "Llama a la función 'transmit' desde main().",
              initialCode: "#include <stdio.h>\n\nvoid transmit() {\n  printf(\"Beep\");\n}\n\nint main() {\n  // TODO: Llama a la función transmit()\n  \n  return 0;\n}",
              expectedOutput: "Beep"
            }
          },
          {
            title: "Cargas Útiles de Retorno",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "Las funciones pueden calcular datos y devolver una carga útil a la función llamadora utilizando la palabra clave 'return'.",
              instructions: "Examina cómo 'calculateCoreTemp' devuelve una carga útil entera a main.",
              initialCode: "#include <stdio.h>\n\nint calculateCoreTemp(int base) {\n  return base * 2 + 15;\n}\n\nint main() {\n  int temp = calculateCoreTemp(40);\n  printf(\"Temp: %d\", temp);\n  return 0;\n}",
              expectedOutput: "Temp: 95"
            }
          },
          {
            title: "Paso por Valor",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Por defecto, C pasa los argumentos por valor. La función recibe una copia de los datos, por lo que los cambios internos no afectan al original.",
              instructions: "Crea una función 'addTen(int x)' que devuelva x + 10. Llámala con 5 e imprime el resultado.",
              initialCode: "#include <stdio.h>\n\n// TODO: Define la función addTen(int x) aquí\n\nint main() {\n  // TODO: Llama a addTen(5) e imprime el resultado\n  \n  return 0;\n}",
              expectedOutput: "15"
            }
          },
          {
            title: "Paso por Referencia",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "Para modificar variables de otro ámbito, pasa sus direcciones de memoria (punteros) a la función.",
              instructions: "Completa 'upgradeLevel' para sumar 1 al objetivo del puntero a entero. Pásale la dirección de 'level'.",
              initialCode: "#include <stdio.h>\n\nvoid upgradeLevel(int *lvlPtr) {\n  // TODO: Incrementa el valor en la dirección lvlPtr en 1\n  \n}\n\nint main() {\n  int level = 5;\n  // TODO: Llama a upgradeLevel pasándole la dirección de 'level'\n  \n  printf(\"%d\", level);\n  return 0;\n}",
              expectedOutput: "6"
            }
          },
          {
            title: "Análisis de la Pila de Llamadas",
            type: LessonType.BOSS,
            xpReward: 40,
            content: {
              theory: "Misión: Rastreo del sistema. Cuando se llama a una subrutina, ¿dónde se almacena su contexto de ejecución local?",
              instructions: "Identifica la región de memoria utilizada para las llamadas a funciones y las variables locales.",
              initialCode: "",
              quizOptions: ["El Montículo (Heap)", "La Pila (Stack)", "El Segmento BSS", "El Segmento de Código"],
              correctOptionIndex: 1
            }
          },
          {
            title: "Subrutina de Suma de Comprobación",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Misión: Necesitamos un módulo reutilizable para calcular sumas de comprobación factoriales.",
              instructions: "Escribe una función recursiva o iterativa 'factorial(int n)' que devuelva n!. Llámala con 5 e imprime el resultado.",
              initialCode: "#include <stdio.h>\n\n// TODO: Escribe la función factorial(int n)\n\nint main() {\n  // TODO: Llama a factorial(5) e imprime el resultado\n  \n  return 0;\n}",
              expectedOutput: "120"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-complex-constructs",
          title: "Esquemas de Datos Complejos",
          description: "Agrupa múltiples tipos de datos en entidades lógicas únicas usando structs.",
          orderIndex: 6
        },
        lessons: [
          {
            title: "Esquemas Personalizados (Structs)",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "Los structs te permiten crear tipos de datos personalizados agrupando múltiples primitivas básicas en un solo bloque de memoria.",
              instructions: "Define un struct 'Drone' con un int 'id' y un float 'battery'. Crea uno, establece id=1, battery=99.5. Imprime ambos.",
              initialCode: "#include <stdio.h>\n\nstruct Drone {\n  int id;\n  float battery;\n};\n\nint main() {\n  // TODO: Crea una instancia de Drone, establece id=1, battery=99.5, e imprime\n  \n  return 0;\n}",
              expectedOutput: "1 99.50"
            }
          },
          {
            title: "Alias de Tipos",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "La palabra clave 'typedef' crea un alias para un tipo, eliminando la necesidad de escribir repetidamente la palabra clave 'struct'.",
              instructions: "Observa cómo 'typedef' simplifica el uso de structs.",
              initialCode: "#include <stdio.h>\n\ntypedef struct {\n  int x;\n  int y;\n} Vector2D;\n\nint main() {\n  Vector2D v1 = {10, 20};\n  printf(\"X:%d Y:%d\", v1.x, v1.y);\n  return 0;\n}",
              expectedOutput: "X:10 Y:20"
            }
          },
          {
            title: "Punteros a Structs",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Al acceder a un struct a través de un puntero, usa el operador de flecha (->) en lugar del operador de punto (.).",
              instructions: "Dado un puntero 'p' a un struct User, usa '->' para establecer su 'accessLevel' a 5. Imprímelo.",
              initialCode: "#include <stdio.h>\n\ntypedef struct {\n  int accessLevel;\n} User;\n\nint main() {\n  User u;\n  User *p = &u;\n  // TODO: Establece accessLevel a 5 usando el puntero 'p' (p->)\n  \n  printf(\"%d\", u.accessLevel);\n  return 0;\n}",
              expectedOutput: "5"
            }
          },
          {
            title: "Array de Esquemas",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "Los structs se pueden almacenar en arrays para manejar bases de datos masivas de información estructurada.",
              instructions: "Crea un array de dos structs 'Node'. Establece el 'active' del primer nodo a 1 y el del segundo a 0. Imprímelos.",
              initialCode: "#include <stdio.h>\n\ntypedef struct {\n  int active;\n} Node;\n\nint main() {\n  // TODO: Crea un array de 2 Nodes, inicializa 'active' a 1 y 0 respectivamente, e imprime\n  \n  return 0;\n}",
              expectedOutput: "1 0"
            }
          },
          {
            title: "Actualización de Base de Datos",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Misión: La entrada de la base de datos del mainframe para el sector 7 requiere una anulación manual a través de la manipulación de punteros.",
              instructions: "Escribe una función 'updateStatus(Sector *s)' que establezca el 'status' del Sector en 9. Llámala desde main.",
              initialCode: "#include <stdio.h>\n\ntypedef struct {\n  int id;\n  int status;\n} Sector;\n\n// TODO: Escribe la función updateStatus(Sector *s)\n\nint main() {\n  Sector sec = {7, 0};\n  // TODO: Llama a updateStatus pasándole la dirección de sec e imprime el nuevo status\n  \n  return 0;\n}",
              expectedOutput: "9"
            }
          }
        ]
      },
      {
        concept: {
          slug: "c-dynamic-memory",
          title: "El Vacío (Memoria Dinámica)",
          description: "Rompe los límites de la pila. Gestiona la memoria raw del montículo (heap) utilizando malloc, calloc y free.",
          orderIndex: 7
        },
        lessons: [
          {
            title: "Asignación del Montículo (Heap)",
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: "La memoria dinámica reside en el Montículo (Heap). Usa 'malloc(size)' para solicitar un bloque de bytes crudos durante el tiempo de ejecución.",
              instructions: "Asigna un entero en el montículo usando malloc. Establece su valor a 77, imprímelo y retorna.",
              initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  // TODO: Asigna un int usando malloc, establece el valor a 77, e imprímelo\n  \n  return 0;\n}",
              expectedOutput: "77"
            }
          },
          {
            title: "Asignación Puesta a Cero",
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: "A diferencia de malloc, 'calloc(num, size)' asigna memoria para un array e inicializa todos los bytes a cero.",
              instructions: "Ejecuta el código para ver cómo calloc evita que datos basura corrompan tus estructuras.",
              initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  int *arr = calloc(3, sizeof(int));\n  printf(\"%d %d %d\", arr[0], arr[1], arr[2]);\n  free(arr);\n  return 0;\n}",
              expectedOutput: "0 0 0"
            }
          },
          {
            title: "Desasignación de Memoria",
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: "Cada bloque asignado vía malloc/calloc debe devolverse manualmente al sistema usando 'free(pointer)'.",
              instructions: "Asigna un puntero a carácter 'secret' con malloc(1). Libéralo después. Imprime 'Freed'.",
              initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  char *secret = malloc(1);\n  // TODO: Libera la memoria asignada a 'secret'\n  \n  printf(\"Freed\");\n  return 0;\n}",
              expectedOutput: "Freed"
            }
          },
          {
            title: "Redimensionamiento Dinámico",
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: "La función 'realloc(ptr, new_size)' expande o reduce un bloque de montículo existente, preservando los datos originales.",
              instructions: "Redimensiona 'block' para contener 2 enteros en lugar de 1. Establece el segundo entero a 88 e imprímelo.",
              initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  int *block = malloc(sizeof(int));\n  block[0] = 44;\n  // TODO: Usa realloc para redimensionar 'block' a contener 2 enteros y establece block[1] a 88\n  \n  printf(\"%d\", block[1]);\n  return 0;\n}",
              expectedOutput: "88"
            }
          },
          {
            title: "Fuga de Memoria",
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: "Misión: La estabilidad del sistema está cayendo. La memoria del montículo no liberada se acumula, causando Fugas de Memoria.",
              instructions: "¿Qué sucede si un programa usa continuamente malloc sin usar nunca free?",
              initialCode: "",
              quizOptions: ["Sobrecalentamiento de la CPU", "Error de Sintaxis", "Fuga de Memoria / OOM", "Desbordamiento de Pila"],
              correctOptionIndex: 2
            }
          }
        ]
      }
    ]
  };
};
