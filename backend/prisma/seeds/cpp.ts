import { LessonType } from '@prisma/client';
import { SeederFunction } from './types';

export const getCppSeed: SeederFunction = async (prisma) => {
  return {
    slug: 'cpp',
    name: 'C++',
    version: '17',
    sections: [
      {
      concept: { slug: "phase-1-boot-sequence-core-mechanics", title: "Fase 1: Secuencia de Inicio y Mecánicas Principales", description: "Infiltra y domina este sector.", orderIndex: 1 },
      lessons: [
          {
            title: "Protocolo de Inicialización",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "C++ es un lenguaje compilado de alto rendimiento y tipado estático. El punto de entrada de todo programa en C++ es la función `int main()`. Para imprimir texto, usamos `std::cout` de la biblioteca `<iostream>`.",
              instructions: "Operativo, necesitamos verificar la integridad estructural de la terminal. Imprime 'System Online' para confirmar.",
              initialCode: "#include <iostream>\n\nint main() {\n  // Imprime 'System Online'\n  \n  return 0;\n}",
              expectedOutput: "System Online"
            }
          },
          {
            title: "Directivas y Espacios de Nombres",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "`using namespace std;` trae el espacio de nombres de la biblioteca estándar al ámbito global. Aunque es útil para scripts pequeños, puede causar colisiones de nombres en arquitecturas grandes. Las directivas como `#include` son manejadas por el preprocesador antes de la compilación.",
              instructions: "Analiza el script de transmisión proporcionado. Ejecuta el código para observar cómo se puede omitir `std::` cuando se declara el espacio de nombres.",
              initialCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << \"Bypassing security protocols...\";\n  return 0;\n}",
              expectedOutput: "Bypassing security protocols..."
            }
          },
          {
            title: "Variables Primitivas",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Las variables son asignaciones de memoria tipadas. C++ requiere una declaración de tipo explícita: `int` para enteros, `double` para punto flotante, `char` para caracteres individuales, y `bool` para booleanos.",
              instructions: "Tu tarea es completar la inicialización. Declara un `int` llamado `accessCode` y asígnale el valor `404` donde se indica.",
              initialCode: "#include <iostream>\n\nint main() {\n  // TODO: Declara e inicializa accessCode aquí\n  \n  std::cout << accessCode;\n  return 0;\n}",
              expectedOutput: "404"
            }
          },
          {
            title: "El Estándar String",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "A diferencia de los arreglos básicos de `char` (C-strings), el C++ moderno utiliza la clase `std::string` de la biblioteca `<string>` para una manipulación de texto robusta, proporcionando métodos incorporados para concatenar, comparar y medir el tamaño.",
              instructions: "Tu tarea es construir el payload. Crea una variable `std::string` llamada `payload` que contenga \'Trojan_v1\' y luego imprímela.",
              initialCode: "#include <iostream>\n#include <string>\n\nint main() {\n  // TODO: Declara string payload y asigna \'Trojan_v1\'\n  // TODO: Imprime payload en la terminal\n  return 0;\n}",
              expectedOutput: "Trojan_v1"
            }
          },
          {
            title: "Operadores Matemáticos",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "C++ soporta operaciones aritméticas estándar: `+`, `-`, `*`, `/`, y `%`. Ten en cuenta que la división de enteros trunca los decimales. Para obtener un resultado de punto flotante, al menos un operando debe ser float o double.",
              instructions: "Tu tarea es calcular la clave de encriptación. Multiplica 7 por 8, guarda el resultado en una variable `int` llamada `key`, y luego imprímela.",
              initialCode: "#include <iostream>\n\nint main() {\n  // TODO: Calcula 7 * 8 en int key e imprímelo\n  \n  return 0;\n}",
              expectedOutput: "56"
            }
          },
          {
            title: "Jefe: Prueba de Conocimiento - Conceptos Básicos",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Evaluación de la sintaxis fundamental de C++, declaración de variables y operaciones básicas de E/S.",
              instructions: "¿Cuál de las siguientes es la forma correcta de imprimir 'Hacked' en la consola en C++ usando la biblioteca estándar?",
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
      concept: { slug: "phase-2-conditional-branches-data-flow", title: "Fase 2: Ramificaciones Condicionales y Flujo de Datos", description: "Infiltra y domina este sector.", orderIndex: 2 },
      lessons: [
          {
            title: "Sentencias If/Else",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "La ramificación condicional permite que un programa ejecute diferentes bloques de código basándose en evaluaciones booleanas. La sintaxis es `if (condición) { ... } else { ... }`.",
              instructions: "Un cortafuegos está bloqueando nuestro camino. Si `bypass` es verdadero, imprime 'Access Granted'. De lo contrario, imprime 'Access Denied'.",
              initialCode: "#include <iostream>\n\nint main() {\n  bool bypass = true;\n  // Escribe tu sentencia if/else aquí\n  \n  return 0;\n}",
              expectedOutput: "Access Granted"
            }
          },
          {
            title: "Operadores Lógicos",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Múltiples condiciones se pueden combinar usando operadores lógicos: `&&` (Y), `||` (O), y `!` (NO). Aplica la evaluación de cortocircuito.",
              instructions: "Tu tarea es comprobar las condiciones para inyectar. Crea una sentencia `if` que verifique si `isAdmin` y `firewallDown` son verdaderos. Si es así, imprime \'Injecting...\'.",
              initialCode: "#include <iostream>\n\nint main() {\n  bool isAdmin = true;\n  bool firewallDown = true;\n  // TODO: Escribe la sentencia if verificando ambas condiciones y pinta \'Injecting...\'\n  \n  return 0;\n}",
              expectedOutput: "Injecting..."
            }
          },
          {
            title: "La Sentencia Switch",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "Una sentencia `switch` evalúa una única expresión integral contra múltiples etiquetas `case`. Sin una sentencia `break;`, la ejecución 'cae' hacia los casos subsiguientes.",
              instructions: "Ejecuta esta simulación para ver cómo el sistema enruta las solicitudes basándose en la variable `port`.",
              initialCode: "#include <iostream>\n\nint main() {\n  int port = 80;\n  switch (port) {\n    case 80:\n      std::cout << \"HTTP Traffic\";\n      break;\n    case 443:\n      std::cout << \"HTTPS Traffic\";\n      break;\n    default:\n      std::cout << \"Unknown Port\";\n  }\n  return 0;\n}",
              expectedOutput: "HTTP Traffic"
            }
          },
          {
            title: "Bucles While y Do-While",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "Un bucle `while` ejecuta continuamente su bloque siempre que la condición se evalúe como verdadera. Un bucle `do-while` se ejecuta al menos una vez antes de verificar su condición.",
              instructions: "Tu tarea es iniciar la cuenta regresiva. Crea un bucle `while` que cuente hacia atrás desde `count` (3) hasta 1, imprimiendo cada número. Finalmente imprime \'Ignition\'.",
              initialCode: "#include <iostream>\n\nint main() {\n  int count = 3;\n  // TODO: Escribe un bucle while que imprima 3, 2, 1\n  \n  // TODO: Imprime \'Ignition\'\n  return 0;\n}",
              expectedOutput: "321Ignition"
            }
          },
          {
            title: "Bucles For",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "El bucle `for` condensa la inicialización, la verificación de condición y la iteración en una sola sentencia: `for (inicio; condición; incremento)`.",
              instructions: "Tu tarea es iterar exactamente 5 veces. Usa un bucle `for` para imprimir \'Ping\' en cada iteración.",
              initialCode: "#include <iostream>\n\nint main() {\n  // TODO: Escribe un bucle for que itere 5 veces e imprima \'Ping\'\n  \n  return 0;\n}",
              expectedOutput: "PingPingPingPingPing"
            }
          },
          {
            title: "Jefe: Descifrado de Algoritmos",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Sintetizando condicionales y bucles para recorrer y manipular conjuntos de datos.",
              instructions: "Tu tarea final del sector es usar un bucle para iterar del 1 al 10, pero solo imprimir los números pares (2, 4, 6, 8, 10) secuencialmente sin espacios.",
              initialCode: "#include <iostream>\n\nint main() {\n  // TODO: Escribe la lógica para imprimir los números pares del 1 al 10\n  \n  return 0;\n}",
              expectedOutput: "246810"
            }
          }
        ]
      },
      {
      concept: { slug: "phase-3-data-structures-iteration", title: "Fase 3: Estructuras de Datos e Iteración", description: "Infiltra y domina este sector.", orderIndex: 3 },
      lessons: [
          {
            title: "Arreglos Estilo C",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Un arreglo es un bloque de memoria contiguo de tamaño fijo que almacena elementos del mismo tipo. Los índices de los arreglos comienzan en 0. Acceder a índices fuera de los límites provoca un comportamiento indefinido.",
              instructions: "Accede al tercer elemento del arreglo `serverNodes` e imprímelo.",
              initialCode: "#include <iostream>\n\nint main() {\n  int serverNodes[5] = {10, 20, 30, 40, 50};\n  // Imprime el 3er nodo (valor 30)\n  \n  return 0;\n}",
              expectedOutput: "30"
            }
          },
          {
            title: "Iterando Arreglos",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Los bucles se usan comúnmente para recorrer arreglos. La longitud de un arreglo estándar de C no es inherentemente conocida por el propio arreglo, por lo que a menudo se calcula con `sizeof(arreglo) / sizeof(arreglo[0])`.",
              instructions: "Tu tarea es usar un bucle `for` para iterar sobre el arreglo `ports` e imprimir cada uno de sus elementos.",
              initialCode: "#include <iostream>\n\nint main() {\n  int ports[] = {21, 22, 80, 443};\n  int size = sizeof(ports) / sizeof(ports[0]);\n  // TODO: Escribe un bucle for que use \'size\' para iterar e imprimir cada puerto\n  \n  return 0;\n}",
              expectedOutput: "212280443"
            }
          },
          {
            title: "std::array",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "El C++ moderno introdujo `std::array` en `<array>`, proporcionando una alternativa más segura y orientada a objetos a los arreglos estilo C sin sobrecarga de rendimiento. Conoce su propio tamaño mediante `.size()`.",
              instructions: "Ejecuta este script para observar la seguridad y sintaxis de `std::array`.",
              initialCode: "#include <iostream>\n#include <array>\n\nint main() {\n  std::array<int, 3> keys = {101, 202, 303};\n  std::cout << keys.size() << \"-\" << keys.front();\n  return 0;\n}",
              expectedOutput: "3-101"
            }
          },
          {
            title: "std::vector",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "`std::vector` en `<vector>` es un arreglo dinámico. Se redimensiona automáticamente cuando se agregan elementos mediante `.push_back()`. Es el contenedor de secuencias por defecto en C++.",
              instructions: "Tu tarea es inicializar un arreglo dinámico. Incluye `<vector>`, crea un `std::vector<int>` llamado `logs`, agrégale los valores `404` y `500` con `push_back`, e imprime el primer elemento.",
              initialCode: "#include <iostream>\n// TODO: Incluye vector\n\nint main() {\n  // TODO: Crea el vector logs y agrega 404 y 500\n  // TODO: Imprime el primer elemento\n  return 0;\n}",
              expectedOutput: "404"
            }
          },
          {
            title: "Bucles For Basados en Rangos",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "C++11 introdujo los bucles for basados en rangos, que proporcionan una sintaxis más limpia para iterar sobre contenedores como arreglos y vectores: `for (tipo var : contenedor) { ... }`.",
              instructions: "Tu tarea es usar un bucle for basado en rangos (range-based for loop) para recorrer el vector `signatures` e imprimir cada firma.",
              initialCode: "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n  std::vector<std::string> signatures = {\"Worm\", \"Trojan\"};\n  // TODO: Escribe un bucle for basado en rangos e imprime cada firma\n  \n  return 0;\n}",
              expectedOutput: "WormTrojan"
            }
          },
          {
            title: "Jefe: Prueba de Manipulación de Datos",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Comprendiendo la diferencia entre estructuras de datos de tamaño fijo y dinámicas en la gestión de memoria de C++.",
              instructions: "¿Qué contenedor de la STL deberías elegir si necesitas un arreglo que pueda cambiar de tamaño en tiempo de ejecución?",
              initialCode: "",
              quizOptions: [
                "std::list",
                "std::array",
                "Arreglo estilo C",
                "std::vector"
              ],
              correctOptionIndex: 3
            }
          }
        ]
      },
      {
      concept: { slug: "phase-4-modular-subroutines-functions", title: "Fase 4: Subrutinas Modulares (Funciones)", description: "Infiltra y domina este sector.", orderIndex: 4 },
      lessons: [
          {
            title: "Declaración y Definición de Funciones",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Las funciones dividen el código en módulos reutilizables. Una función debe ser declarada antes de ser llamada. La firma incluye el tipo de retorno, el nombre y los parámetros.",
              instructions: "Necesitamos una subrutina para iniciar una anulación. Define una función void `overrideProtocol()` que imprima 'Override'. Llámala desde `main`.",
              initialCode: "#include <iostream>\n\n// Define overrideProtocol aquí\n\nint main() {\n  // Llámala aquí\n  return 0;\n}",
              expectedOutput: "Override"
            }
          },
          {
            title: "Parámetros y Argumentos",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Las funciones aceptan entradas a través de parámetros. Cuando llamas a la función, pasas argumentos. Por defecto, los argumentos se pasan por valor (se hace una copia).",
              instructions: "Tu tarea es completar la función `decrypt`. Haz que sume 10 al parámetro `cipher` y devuelva el resultado.",
              initialCode: "#include <iostream>\n\nint decrypt(int cipher) {\n  // TODO: Devuelve cipher + 10\n}\n\nint main() {\n  std::cout << decrypt(5);\n  return 0;\n}",
              expectedOutput: "15"
            }
          },
          {
            title: "Tipos de Retorno",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "El tipo de retorno especifica qué datos devuelve la función a quien la llama. Si una función no devuelve nada, su tipo es `void`. Cualquier función que no sea void debe tener una sentencia `return` en todas las rutas de código.",
              instructions: "Analiza esta función que comprueba si un puerto es seguro, devolviendo un booleano.",
              initialCode: "#include <iostream>\n\nbool isSecurePort(int port) {\n  return (port == 443 || port == 22);\n}\n\nint main() {\n  if (isSecurePort(80)) std::cout << \"Secure\";\n  else std::cout << \"Vulnerable\";\n  return 0;\n}",
              expectedOutput: "Vulnerable"
            }
          },
          {
            title: "Sobrecarga de Funciones",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "C++ permite la sobrecarga de funciones: definir múltiples funciones con el mismo nombre pero diferentes listas de parámetros (firmas). El compilador determina cuál llamar basándose en los argumentos.",
              instructions: "Tu tarea es crear dos funciones `printData` sobrecargadas. Una debe recibir un `int` e imprimir \'Int\', y la otra un `std::string` e imprimir \'Str\'. Luego llámalas desde main.",
              initialCode: "#include <iostream>\n#include <string>\n\n// TODO: Define printData(int)\n\n// TODO: Define printData(std::string)\n\nint main() {\n  // TODO: Llama a ambas funciones para que la salida sea \'IntStr\'\n  return 0;\n}",
              expectedOutput: "IntStr"
            }
          },
          {
            title: "Jefe: Lógica de Argumentos por Defecto",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Los parámetros pueden tener valores por defecto. Si el llamador omite el argumento, se usa el valor por defecto. Los argumentos por defecto deben ser los parámetros más a la derecha en la lista.",
              instructions: "Tu tarea es agregar un valor por defecto al parámetro `port` de la función `connect` para que sea `80`. Luego llama a `connect(\"192\")` sin el segundo argumento.",
              initialCode: "#include <iostream>\n#include <string>\n\n// TODO: Agrega un argumento por defecto a port (= 80)\nvoid connect(std::string ip, int port) {\n  std::cout << ip << \":\" << port;\n}\n\nint main() {\n  // TODO: Llama a connect(\"192\")\n  return 0;\n}",
              expectedOutput: "192:80"
            }
          },
          {
            title: "Jefe: Arquitectura de Modularidad",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Evaluando firmas de funciones y tipos de retorno.",
              instructions: "¿Cuál es la salida del siguiente fragmento de código?",
              initialCode: "int compute(int x=5) { return x * 2; }\nint main() { cout << compute() << \" \" << compute(3); }",
              quizOptions: [
                "10 6",
                "5 3",
                "10 3",
                "Error: los argumentos por defecto no están permitidos"
              ],
              correctOptionIndex: 0
            }
          }
        ]
      },
      {
      concept: { slug: "phase-5-memory-access-pointers-references", title: "Fase 5: Acceso a Memoria (Punteros y Referencias)", description: "Infiltra y domina este sector.", orderIndex: 5 },
      lessons: [
          {
            title: "Direcciones de Memoria",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Cada variable reside en una dirección de memoria específica en la RAM. Puedes recuperar esta dirección usando el operador de dirección `&`. Típicamente se usan formatos hexadecimales para mostrar direcciones.",
              instructions: "Recupera la dirección de memoria de la variable `core`. (Nota: Como las direcciones cambian en cada ejecución, imprime una dirección ficticia como '0x7ffd' para este ejercicio).",
              initialCode: "#include <iostream>\n\nint main() {\n  int core = 1;\n  // Normalmente imprimirías &core, pero para las pruebas, imprime \"0x7ffd\"\n  std::cout << \"0x7ffd\";\n  return 0;\n}",
              expectedOutput: "0x7ffd"
            }
          },
          {
            title: "Introducción a los Punteros",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Un puntero es una variable que almacena una dirección de memoria. Se declara con `*`, como `int* ptr`. Los punteros son el corazón de C++, permitiendo la manipulación directa del hardware y la memoria.",
              instructions: "Tu tarea es declarar un puntero `int* ptr` y asignarle la dirección de `secretKey`. Luego imprime \'0xabcd\' para simular la dirección.",
              initialCode: "#include <iostream>\n\nint main() {\n  int secretKey = 9934;\n  // TODO: Declara el puntero int* ptr e inicialízalo con la dirección de secretKey\n  \n  std::cout << \"0xabcd\";\n  return 0;\n}",
              expectedOutput: "0xabcd"
            }
          },
          {
            title: "Desreferenciando Punteros",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "Para acceder o modificar el valor en la dirección de memoria que contiene un puntero, usas el operador de desreferencia `*`. Ej., `*ptr = 10;` cambia la variable original.",
              instructions: "Tu tarea es desreferenciar el puntero `ptr` y asignarle el valor `0` para desactivar el cortafuegos, luego imprimir `fireStatus`.",
              initialCode: "#include <iostream>\n\nint main() {\n  int fireStatus = 1;\n  int* ptr = &fireStatus;\n  \n  // TODO: Desreferencia ptr y asigna 0\n  \n  std::cout << fireStatus;\n  return 0;\n}",
              expectedOutput: "0"
            }
          },
          {
            title: "Paso por Referencia",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "C++ introduce las referencias (`&`). Una referencia es un alias de una variable existente. Pasar por referencia a una función permite a la función modificar la variable original sin lidiar con la sintaxis de punteros.",
              instructions: "Observa cómo `hackTerminal` modifica la variable original `attempts` porque la acepta por referencia.",
              initialCode: "#include <iostream>\n\nvoid hackTerminal(int& attemptsRef) {\n  attemptsRef -= 1;\n}\n\nint main() {\n  int attempts = 3;\n  hackTerminal(attempts);\n  std::cout << attempts;\n  return 0;\n}",
              expectedOutput: "2"
            }
          },
          {
            title: "Jefe: Aritmética de Punteros",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Los punteros y los arreglos están profundamente conectados. Los arreglos decaen en punteros a su primer elemento. Puedes sumar a un puntero para recorrer un arreglo.",
              instructions: "Tu tarea es usar aritmética de punteros en `ptr` para desreferenciar e imprimir el segundo elemento de `data`.",
              initialCode: "#include <iostream>\n\nint main() {\n  int data[] = {10, 20, 30};\n  int* ptr = data;\n  // TODO: Imprime el segundo elemento usando *(ptr + 1)\n  \n  return 0;\n}",
              expectedOutput: "20"
            }
          },
          {
            title: "Jefe: Prueba de Fuga de Memoria",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Comprendiendo la asignación dinámica de memoria con `new` y `delete`.",
              instructions: "Cuando asignas memoria en el heap (montículo) usando la palabra clave `new`, ¿qué debes hacer eventualmente para prevenir una fuga de memoria?",
              initialCode: "",
              quizOptions: [
                "Llamar a free()",
                "Esperar al Recolector de Basura (Garbage Collector)",
                "Llamar a delete sobre el puntero",
                "Establecer el puntero a NULL"
              ],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
      concept: { slug: "phase-6-object-oriented-schematics", title: "Fase 6: Esquemas Orientados a Objetos", description: "Infiltra y domina este sector.", orderIndex: 6 },
      lessons: [
          {
            title: "Clases y Objetos",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "C++ es un lenguaje orientado a objetos. Una clase (`class`) es un plano para objetos, que encapsula datos (atributos) y funciones (métodos). Los objetos son instancias de las clases.",
              instructions: "Define una clase `Drone` con un entero público `battery`. En `main`, crea un objeto `Drone`, establece su batería en 100 e imprímelo.",
              initialCode: "#include <iostream>\n\nclass Drone {\npublic:\n  int battery;\n};\n\nint main() {\n  // Crea el objeto y establece la batería\n  \n  return 0;\n}",
              expectedOutput: "100"
            }
          },
          {
            title: "Constructores",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "Un constructor es un método especial de la clase que se invoca automáticamente cuando se instancia un objeto. Comparte el mismo nombre que la clase y no tiene tipo de retorno.",
              instructions: "Tu tarea es añadir un constructor a la clase `Server` que acepte un `int` y lo asigne a `uptime`. Luego en main, crea una instancia `s1` pasando 99 e imprime `s1.uptime`.",
              initialCode: "#include <iostream>\n\nclass Server {\npublic:\n  int uptime;\n  // TODO: Escribe el constructor que tome un int y lo asigne a uptime\n};\n\nint main() {\n  // TODO: Crea s1 con 99 e imprime s1.uptime\n  return 0;\n}",
              expectedOutput: "99"
            }
          },
          {
            title: "Encapsulamiento (Privado y Público)",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "Por defecto, los miembros de la clase son privados (`private`). No se puede acceder a ellos desde fuera de la clase. Usamos métodos getter y setter públicos (`public`) para controlar el acceso a datos privados.",
              instructions: "Observa cómo `encryptionKey` privado está protegido, y solo es accesible a través de `setKey()` y `getKey()`.",
              initialCode: "#include <iostream>\n\nclass Vault {\nprivate:\n  int encryptionKey;\npublic:\n  void setKey(int key) { encryptionKey = key; }\n  int getKey() { return encryptionKey; }\n};\n\nint main() {\n  Vault v;\n  v.setKey(1234);\n  std::cout << v.getKey();\n  return 0;\n}",
              expectedOutput: "1234"
            }
          },
          {
            title: "Herencia",
            
            type: LessonType.EXERCISE_FREE,
            xpReward: 10,
            content: {
              theory: "La herencia permite a una nueva clase (derivada) heredar atributos y métodos de una clase existente (base). Sintaxis: `class Derived : public Base {}`.",
              instructions: "Tu tarea es completar las clases y la herencia. Define `Entity` con el método `scan()`. Luego define `Virus` que herede públicamente de `Entity`. Finalmente, llama a `scan()` desde una instancia de `Virus` en main.",
              initialCode: "#include <iostream>\n\n// TODO: Define la clase base Entity con void scan() { std::cout << \"Scan\"; }\n\n// TODO: Define la clase Virus que herede de Entity\n\nint main() {\n  // TODO: Instancia Virus y llama a scan()\n  \n  return 0;\n}",
              expectedOutput: "Scan"
            }
          },
          {
            title: "Jefe: Prueba de Polimorfismo",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "El polimorfismo permite que los métodos hagan cosas diferentes basándose en el objeto sobre el que actúan, típicamente utilizando funciones virtuales.",
              instructions: "Para permitir que una clase derivada anule (override) un método de la clase base, ¿qué palabra clave debe preceder a la declaración del método en la clase base?",
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
      concept: { slug: "phase-7-advanced-systems-stl", title: "Fase 7: Sistemas Avanzados y STL", description: "Infiltra y domina este sector.", orderIndex: 7 },
      lessons: [
          {
            title: "Plantillas (Templates)",
            
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: "Las plantillas (templates) permiten que las funciones y clases operen con tipos genéricos, evitando la duplicación de código. La sintaxis comienza con `template <typename T>`.",
              instructions: "Tu tarea es crear una función de plantilla (template) `getMax` que tome dos parámetros del mismo tipo genérico y devuelva el mayor. Luego pruébala en main imprimiendo `getMax(5, 10)`.",
              initialCode: "#include <iostream>\n\n// TODO: Define template <typename T> T getMax(T a, T b)\n\nint main() {\n  // TODO: Imprime el resultado de getMax(5, 10)\n  return 0;\n}",
              expectedOutput: "10"
            }
          },
          {
            title: "Mapas y Diccionarios",
            
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 10,
            content: {
              theory: "`std::map` (en `<map>`) almacena pares clave-valor, ordenándolos por clave automáticamente. `std::unordered_map` hace lo mismo pero con un acceso más rápido O(1) a través de hash.",
              instructions: "Tu tarea es usar un mapa. Incluye `<map>`, crea un `std::map<std::string, int>` llamado `credentials`, inserta la clave `\"admin\"` con valor `1234`, e imprime ese valor.",
              initialCode: "#include <iostream>\n// TODO: Incluye map\n#include <string>\n\nint main() {\n  // TODO: Crea el mapa credentials e inserta \"admin\" -> 1234\n  // TODO: Imprime credentials[\"admin\"]\n  return 0;\n}",
              expectedOutput: "1234"
            }
          },
          {
            title: "Structs",
            
            type: LessonType.DEMO,
            xpReward: 10,
            content: {
              theory: "Un `struct` en C++ es casi idéntico a una clase (`class`), pero sus miembros son públicos (`public`) por defecto. Típicamente se usan para agrupar variables de datos simples.",
              instructions: "Ejecuta el código para ver cómo un `struct` agrupa la IP y el estado de un objetivo.",
              initialCode: "#include <iostream>\n#include <string>\n\nstruct Target {\n  std::string ip;\n  bool online;\n};\n\nint main() {\n  Target t1 = {\"192.168.0.1\", true};\n  std::cout << t1.ip << (t1.online ? \"Up\" : \"Down\");\n  return 0;\n}",
              expectedOutput: "192.168.0.1Up"
            }
          },
          {
            title: "Jefe: Examen Final de Algoritmos",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Síntesis exhaustiva de variables, bucles, arreglos y bibliotecas estándar.",
              instructions: "Tu tarea es completar la lógica final: itera del 1 al 5 y, si el número es par, agrégalo a `evens`. Finalmente, imprime el tamaño del vector.",
              initialCode: "#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> evens;\n  // TODO: Itera del 1 al 5 y usa push_back si es par\n  \n  // TODO: Imprime evens.size()\n  return 0;\n}",
              expectedOutput: "2"
            }
          },
          {
            title: "Jefe: La Anulación Definitiva",
            
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              theory: "Evaluación final de compilación, ejecución y memoria en C++.",
              instructions: "¿Qué función de la biblioteca estándar se usa comúnmente para asignar dinámicamente un arreglo en el C++ moderno para evitar punteros crudos?",
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
