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
          title: 'La Matriz Principal: Conceptos Básicos',
          description: 'Establece tu enlace neuronal y aprende las primitivas de datos fundamentales.',
          orderIndex: 1,
        },
        lessons: [
          {
            title: 'Protocolo de Inicialización',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'En la vasta extensión del entorno de ejecución de JavaScript, los datos deben almacenarse y referenciarse para tener alguna utilidad. Las palabras clave `let` y `const` sirven como directivas de asignación de memoria, permitiéndonos vincular valores a identificadores en el ámbito léxico actual.',
              instructions: 'Agente, necesitamos establecer una conexión segura. Inicializa una variable constante llamada `connectionStatus` y establécela con la cadena "SECURE". Imprímela.',
              initialCode: '// Inicializa connectionStatus aquí\n// console.log(connectionStatus);',
              expectedOutput: 'SECURE'
            }
          },
          {
            title: 'Nodos Primitivos',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'Las primitivas son la implementación de datos de más bajo nivel en JS. Son inmutables y no son objetos. Los tipos fundamentales incluyen string, number, boolean, null, undefined, symbol y bigint. Al comprender las primitivas, dominas el tejido de la realidad en este reino digital.',
              instructions: 'Observa cómo asignamos y verificamos el typeof de diferentes primitivas. Ejecuta la secuencia para verificar los tipos de salida.',
              initialCode: 'const signal = 10101;\nconst isActive = true;\nconsole.log(typeof signal, typeof isActive);',
              expectedOutput: 'number boolean'
            }
          },
          {
            title: 'Reasignación de Memoria',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'A diferencia de las constantes, las variables inicializadas con `let` son referencias mutables. Esto es crítico para los estados que evolucionan, como una clave de cifrado cambiante o un nivel de energía fluctuante.',
              instructions: 'El cortafuegos está cambiando dinámicamente. Primero, imprime la `firewallKey`. Luego, reasígnala a "BETA-99" y vuelve a imprimirla.',
              initialCode: 'let firewallKey = "ALPHA-01";\n// Imprime firewallKey\n\n// Reasigna a "BETA-99"\n\n// Imprime de nuevo',
              expectedOutput: 'ALPHA-01\nBETA-99'
            }
          },
          {
            title: 'Interpolación de Cadenas',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'Las plantillas literales (template literals), demarcadas por comillas invertidas (`), permiten expresiones incrustadas mediante la sintaxis `${expression}`. Esto evita la concatenación torpe de cadenas y es esencial para ensamblar dinámicamente cargas útiles complejas.',
              instructions: 'Construye un saludo para la computadora central. Combina `agentName` y `clearance` en un mensaje: "Agent Neo, Clearance Level 5". Imprime el resultado.',
              initialCode: 'const agentName = "Neo";\nconst clearance = 5;\n// Crea e imprime el mensaje',
              expectedOutput: 'Agent Neo, Clearance Level 5'
            }
          },
          {
            title: 'El Fallo de la Variable',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Un sector crítico está arrojando un ReferenceError. La zona muerta temporal (TDZ) dicta que `let` y `const` no pueden ser accedidas antes de su inicialización.',
              instructions: 'Corrige el script para que inicialice correctamente el sistema antes de intentar acceder a las variables.',
              initialCode: 'console.log(systemStatus);\nlet systemStatus = "ONLINE";',
              expectedOutput: 'ONLINE'
            }
          },
          {
            title: 'Cortafuegos de la Matriz Principal',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'El sistema hará una pregunta fundamental con respecto a los límites de las primitivas. Fallar significa desconexión.',
              instructions: '¿Cuál de los siguientes NO es un tipo primitivo en JavaScript?',
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
          title: 'Navegando el Flujo',
          description: 'Controla la ruta de ejecución de tus scripts para construir algoritmos inteligentes.',
          orderIndex: 2,
        },
        lessons: [
          {
            title: 'Rutas de Ramificación',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'Las sentencias condicionales dictan la ruta de ejecución en función de evaluaciones booleanas. El bloque `if...else` actúa como un guardián lógico, ejecutando bloques de código solo cuando se cumplen las condiciones.',
              instructions: 'Escribe una sentencia `if` que imprima "ACCESS GRANTED" si `accessCode` es exactamente 42.',
              initialCode: 'const accessCode = 42;\n// Tu lógica aquí',
              expectedOutput: 'ACCESS GRANTED'
            }
          },
          {
            title: 'El Cuadro de Distribución',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'Cuando múltiples valores discretos dictan la ramificación, las sentencias `switch` proporcionan una alternativa más limpia a los bloques encadenados de `if...else`. Utilizan comprobaciones de igualdad estricta (`===`) internamente.',
              instructions: 'Observa el algoritmo de enrutamiento. Ejecuta el código para ver cómo se enruta la señal.',
              initialCode: 'const route = "B";\nswitch(route) {\n  case "A": console.log("Sector A"); break;\n  case "B": console.log("Sector B"); break;\n  default: console.log("Unknown");\n}',
              expectedOutput: 'Sector B'
            }
          },
          {
            title: 'Ciclos de Bucle',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'El bucle `for` es ideal para iteraciones deterministas donde el número de ciclos se conoce de antemano. Encapsula la inicialización, la condición y el incremento en una sola línea.',
              instructions: 'Necesitamos hacer ping a 3 servidores secuencialmente. Escribe un bucle `for` que imprima "Ping 1", "Ping 2", "Ping 3".',
              initialCode: '// Escribe un bucle for de 1 a 3\n',
              expectedOutput: 'Ping 1\nPing 2\nPing 3'
            }
          },
          {
            title: 'Evitar el Bucle Infinito',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'El bucle `while` itera mientras su condición siga siendo verdadera. Sin una lógica de terminación adecuada, consumirá todos los recursos del sistema, causando un bucle infinito.',
              instructions: 'Usa un bucle `while` para agotar la batería de 3 hasta 1. Imprime "Battery at X" para cada paso.',
              initialCode: 'let battery = 3;\n// Tu bucle while aquí',
              expectedOutput: 'Battery at 3\nBattery at 2\nBattery at 1'
            }
          },
          {
            title: 'Omisión de Seguridad',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Una bóveda encriptada requiere una combinación específica generada por un algoritmo lógico.',
              instructions: 'Haz un bucle a través de los números del 1 al 5. Si el número es par, imprime "EVEN". Si es impar, imprime "ODD". Debes coincidir con la secuencia requerida para poder omitirla.',
              initialCode: '// Escribe la lógica del bucle\n',
              expectedOutput: 'ODD\nEVEN\nODD\nEVEN\nODD'
            }
          },
          {
            title: 'Cuestionario de Puerta Lógica',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'El Guardián del Flujo de Control exige un sacrificio de conocimiento.',
              instructions: '¿Qué hace la palabra clave `break` dentro de un bucle o switch?',
              initialCode: '',
              quizOptions: ['Pausa la ejecución', 'Reinicia el bucle', 'Sale del bucle o bloque switch inmediatamente', 'Arroja un error'],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
        concept: {
          slug: 'functions',
          title: 'Protocolos Encapsulados',
          description: 'Modulariza el código en funciones reutilizables con ámbito para construir arquitecturas complejas.',
          orderIndex: 3,
        },
        lessons: [
          {
            title: 'Subrutinas',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'Las funciones son objetos de primera clase en JavaScript. La declaración `function` crea un bloque de código izado (hoisted) y reutilizable que mapea entradas (argumentos) a salidas (retornos).',
              instructions: 'Define una función llamada `decrypt` que devuelva la cadena "DATA". Llámala e imprime el resultado.',
              initialCode: '// Define decrypt\n',
              expectedOutput: 'DATA'
            }
          },
          {
            title: 'Sintaxis de Flecha',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'Las funciones flecha (`=>`) proporcionan una sintaxis concisa y vinculan léxicamente `this`. Son perfectas para funciones anónimas y callbacks.',
              instructions: 'Ejecuta la función flecha para ver cómo devuelve un valor implícitamente cuando se omiten las llaves.',
              initialCode: 'const multiply = (x, y) => x * y;\nconsole.log(multiply(4, 5));',
              expectedOutput: '20'
            }
          },
          {
            title: 'Infiltración de Ámbito',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'El ámbito léxico dicta que una función tiene acceso a las variables definidas en sus ámbitos externos. Este acceso jerárquico es fundamental para la arquitectura JS.',
              instructions: 'Crea una función `getSecret` que devuelva la variable global `secretData`. Llámala e imprime el resultado.',
              initialCode: 'const secretData = "CLASSIFIED";\n// Escribe getSecret',
              expectedOutput: 'CLASSIFIED'
            }
          },
          {
            title: 'Parámetros por Defecto',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'Las funciones pueden asignar valores por defecto a los parámetros si se pasa `undefined`. Esto evita errores de NaN o undefined durante la ejecución.',
              instructions: 'Escribe una función `connect(port = 8080)` que imprima "Connecting to port " + port. Llámala sin argumentos.',
              initialCode: '// Escribe la función connect\n',
              expectedOutput: 'Connecting to port 8080'
            }
          },
          {
            title: 'Cifrado de Protocolo',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'La recursividad ocurre cuando una función se llama a sí misma. Es un patrón poderoso para navegar por árboles o directorios profundamente anidados.',
              instructions: 'Escribe una función recursiva `countdown(n)` que imprima los números desde `n` hasta 1. Llámala con 3.',
              initialCode: '// Escribe countdown(n)\n',
              expectedOutput: '3\n2\n1'
            }
          },
          {
            title: 'Anulación de Subrutina',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Una subrutina infectada está devolviendo undefined en lugar de la carga útil esperada.',
              instructions: 'Corrige la función flecha `calculateTotal` para que devuelva correctamente la suma. Actualmente le falta una sentencia return o la sintaxis de retorno implícito.',
              initialCode: 'const calculateTotal = (a, b) => { a + b };\nconsole.log(calculateTotal(10, 20));',
              expectedOutput: '30'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'arrays',
          title: 'Arreglos de Datos',
          description: 'Procesa y manipula flujos de datos secuenciales usando métodos avanzados de arreglos.',
          orderIndex: 4,
        },
        lessons: [
          {
            title: 'Bloques de Memoria',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'Los arreglos (arrays) son objetos tipo lista cuyo prototipo tiene métodos para realizar operaciones de recorrido y mutación. Tienen índice cero y un tamaño dinámico.',
              instructions: 'Crea un arreglo llamado `nodes` que contenga "Alpha", "Beta", "Gamma". Imprime el segundo elemento (Beta).',
              initialCode: '// Crea el arreglo nodes\n',
              expectedOutput: 'Beta'
            }
          },
          {
            title: 'Iteración de Arreglos',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'El método `.forEach()` ejecuta una función proporcionada una vez por cada elemento del arreglo. Es la contraparte declarativa del bucle `for` para arreglos.',
              instructions: 'Ejecuta este escáner para ver cómo itera a través de todos los dispositivos conectados.',
              initialCode: 'const devices = ["Router", "Switch", "Hub"];\ndevices.forEach(d => console.log(d));',
              expectedOutput: 'Router\nSwitch\nHub'
            }
          },
          {
            title: 'Mapear la Red',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'El método `.map()` crea un NUEVO arreglo con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos. No es mutante.',
              instructions: 'Necesitamos cifrar estos IDs. Usa `.map()` para multiplicar cada número en `ids` por 2. Imprime los elementos del nuevo arreglo separados por un espacio usando .join(" ").',
              initialCode: 'const ids = [1, 2, 3];\n// mapped = ...\n// console.log(mapped.join(" "));',
              expectedOutput: '2 4 6'
            }
          },
          {
            title: 'Filtrar el Ruido',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'El método `.filter()` crea una copia superficial de una parte de un arreglo dado, filtrada a solo los elementos que pasan la prueba implementada por la función proporcionada.',
              instructions: 'Filtra los servidores desconectados (offline). Imprime solo los servidores con estado "online" extrayendo sus nombres y uniéndolos con un espacio.',
              initialCode: 'const servers = [\n {name: "A", status: "online"},\n {name: "B", status: "offline"},\n {name: "C", status: "online"}\n];\n// filtra e imprime',
              expectedOutput: 'A C'
            }
          },
          {
            title: 'Reducir la Carga Útil',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'El método `.reduce()` ejecuta una función reductora sobre cada elemento, pasando el valor de retorno del cálculo del elemento anterior, culminando en un único valor de salida.',
              instructions: 'Calcula el tamaño total del archivo. Usa `.reduce()` para sumar el arreglo `sizes` e imprime el total.',
              initialCode: 'const sizes = [10, 20, 30, 40];\n// reduce e imprime',
              expectedOutput: '100'
            }
          },
          {
            title: 'Anomalía de Ordenamiento de Arreglos',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Por defecto, `.sort()` convierte los elementos en cadenas y compara sus valores UTF-16. Para ordenar números numéricamente, debes proporcionar una función de comparación (comparator function).',
              instructions: 'Ordena el arreglo `threatLevels` en orden numérico ascendente e imprímelo como una cadena separada por espacios.',
              initialCode: 'const threatLevels = [100, 2, 45, 9];\n// ordena e imprime',
              expectedOutput: '2 9 45 100'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'objects',
          title: 'Constructos Orientados a Objetos',
          description: 'Modela entidades conceptuales y del mundo real usando Objetos de JavaScript.',
          orderIndex: 5,
        },
        lessons: [
          {
            title: 'Estructuras de Datos',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'Los objetos en JavaScript son colecciones de pares clave-valor. Las claves son cadenas (o Symbols), y los valores pueden ser de cualquier tipo de dato, permitiendo estructuras anidadas complejas.',
              instructions: 'Construye un objeto `user` con las propiedades `handle` ("Neo") y `rank` (99). Imprime `user.handle`.',
              initialCode: '// Crea user\n',
              expectedOutput: 'Neo'
            }
          },
          {
            title: 'Invocaciones de Métodos',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'Cuando una función se almacena como una propiedad de un objeto, se le llama método. Los métodos pueden acceder a los datos de su objeto padre usando la palabra clave `this`.',
              instructions: 'Ejecuta este protocolo para ver el método del objeto en acción.',
              initialCode: 'const drone = {\n id: 7,\n ping() { console.log("Drone " + this.id + " active"); }\n};\ndrone.ping();',
              expectedOutput: 'Drone 7 active'
            }
          },
          {
            title: 'Acceso por Desestructuración',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'La asignación por desestructuración (destructuring) nos permite desempacar valores de arreglos, o propiedades de objetos, en variables distintas de forma elegante.',
              instructions: 'Extrae `cpu` y `ram` del objeto `system` usando la desestructuración. Imprímelos separados por un espacio.',
              initialCode: 'const system = { cpu: "Quantum", ram: "1TB", disk: "2PB" };\n// desestructura\n',
              expectedOutput: 'Quantum 1TB'
            }
          },
          {
            title: 'Operador de Propagación',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'La sintaxis de propagación (spread operator) `...` permite que un iterable o una expresión de objeto se expanda en lugares donde se esperan cero o más argumentos o pares clave-valor. Es excelente para actualizaciones inmutables.',
              instructions: 'Combina `baseConfig` y `userConfig` en un nuevo objeto `finalConfig` usando el operador de propagación. Imprime `finalConfig.theme`.',
              initialCode: 'const baseConfig = { theme: "light", port: 80 };\nconst userConfig = { theme: "dark" };\n// combina e imprime',
              expectedOutput: 'dark'
            }
          },
          {
            title: 'Cuestionario de Mutación de Objetos',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Los objetos declarados con `const` todavía pueden tener sus propiedades mutadas. El `const` solo evita la reasignación del identificador de la variable misma.',
              instructions: '¿Es posible cambiar una propiedad de un objeto declarado con `const`?',
              initialCode: '',
              quizOptions: ['Sí, siempre', 'No, nunca', 'Solo si se usa el modo estricto (strict mode)', 'Solo para propiedades primitivas'],
              correctOptionIndex: 0
            }
          }
        ]
      },
      {
        concept: {
          slug: 'advanced',
          title: 'Ejecución Avanzada',
          description: 'Profundiza en los aspectos internos del motor: Closures (Clausuras), Hoisting (Izamiento) y Contextos de Ejecución.',
          orderIndex: 6,
        },
        lessons: [
          {
            title: 'Contexto de Ejecución',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'El Contexto de Ejecución es el entorno abstracto donde se evalúa y ejecuta el código JS. La Pila de Llamadas (Call Stack) gestiona estos contextos, apilándolos y desapilándolos conforme las funciones son invocadas y retornan.',
              instructions: 'Observa el orden de ejecución. Escribe código que imprima "1", luego llame a una función que imprima "2", luego imprima "3".',
              initialCode: '// Escribe la lógica\n',
              expectedOutput: '1\n2\n3'
            }
          },
          {
            title: 'Clausuras (Closures)',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'Una clausura (closure) es la combinación de una función empaquetada (encerrada) junto con referencias a su estado circundante (entorno léxico). Da a una función acceso a su ámbito externo incluso después de que la función externa haya retornado.',
              instructions: 'Ejecuta el closure para ver cómo se preserva el estado a través de las llamadas a funciones.',
              initialCode: 'function createCounter() {\n let count = 0;\n return () => { count++; console.log(count); };\n}\nconst counter = createCounter();\ncounter();\ncounter();',
              expectedOutput: '1\n2'
            }
          },
          {
            title: 'Mecánicas de Hoisting',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'El izamiento (hoisting) es el comportamiento de JS de mover las declaraciones a la parte superior del ámbito actual antes de la ejecución. Las declaraciones de funciones son izadas por completo, mientras que `var` es izada pero indefinida, y `let`/`const` permanecen en la Zona Muerta Temporal.',
              instructions: 'Llama a `activateSystem()` ANTES de que esté definida en el código. Imprime "System Active" dentro de la función.',
              initialCode: '// Llama a activateSystem aquí\n\nfunction activateSystem() {\n  // Imprímelo\n}',
              expectedOutput: 'System Active'
            }
          },
          {
            title: 'La Palabra Clave \'this\'',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'El valor de `this` se determina por cómo se llama a una función, no dónde se define. Actúa como un vínculo dinámico para el contexto de ejecución.',
              instructions: 'Corrige el código para que `this` apunte al objeto usando `.bind()` o una función flecha, imprimiendo "Secure".',
              initialCode: 'const module = {\n status: "Secure",\n getStatus() { return this.status; }\n};\nconst unboundGetStatus = module.getStatus;\n// Corrige e imprime el resultado',
              expectedOutput: 'Secure'
            }
          },
          {
            title: 'Prototipos',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'Los objetos JS heredan características de otros objetos a través de la cadena de prototipos. Si una propiedad no se encuentra en el objeto, el motor recorre hacia arriba en la cadena de prototipos.',
              instructions: 'Añade un método `greet` a `String.prototype` que devuelva "Hello " + this. Imprime `"Agent".greet()`. (¡Úsalo con cuidado en código real!)',
              initialCode: '// Añade a String.prototype\n\nconsole.log("Agent".greet());',
              expectedOutput: 'Hello Agent'
            }
          },
          {
            title: 'Trampa del Closure',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Clásico error de closure en un bucle: usar `var` dentro de un bucle con callbacks asíncronos hace que todos los callbacks referencien al valor final de la variable del bucle.',
              instructions: 'Corrige el bucle para usar alcance de bloque (`let`) para que imprima 0, 1, 2 secuencialmente. (Elimina la IIFE y usa un bucle let simple).',
              initialCode: 'for (var i = 0; i < 3; i++) {\n  ((i) => console.log(i))(i);\n}',
              expectedOutput: '0\n1\n2'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'async',
          title: 'Sistemas Asíncronos',
          description: 'Domina el bucle de eventos, las Promesas (Promises) y las arquitecturas de I/O no bloqueantes.',
          orderIndex: 7,
        },
        lessons: [
          {
            title: 'El Bucle de Eventos (Event Loop)',
            type: LessonType.INTRO,
            xpReward: 50,
            content: {
              theory: 'JavaScript es de un solo hilo. El Bucle de Eventos gestiona operaciones asíncronas descargándolas a Web APIs (o APIs de C++ en Node.js) y colocando sus callbacks en una cola de tareas para ser ejecutadas cuando la pila de llamadas esté vacía.',
              instructions: 'Imprime "A", luego usa `setTimeout` con 0ms para imprimir "C", luego imprime "B". Observa el orden.',
              initialCode: '// Tu lógica asíncrona aquí\n',
              expectedOutput: 'A\nB\nC'
            }
          },
          {
            title: 'Cadenas de Promesas',
            type: LessonType.DEMO,
            xpReward: 50,
            content: {
              theory: 'Una Promesa representa la finalización eventual (o el fracaso) de una operación asíncrona. Previenen el "callback hell" a través del encadenamiento `.then()` y `.catch()`.',
              instructions: 'Ejecuta la cadena de promesas para ver la resolución y mutación de datos asíncronos.',
              initialCode: 'Promise.resolve(10)\n .then(val => val * 2)\n .then(val => console.log(val));',
              expectedOutput: '20'
            }
          },
          {
            title: 'Sintaxis Async/Await',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 100,
            content: {
              theory: 'Introducido en ES2017, `async/await` es azúcar sintáctico sobre las Promesas, permitiendo que el código asíncrono se escriba y se razone de una manera síncrona y descendente.',
              instructions: 'Crea una función `async` `fetchData` que haga `await` de un `Promise.resolve("Data Loaded")`. Imprime el resultado.',
              initialCode: '// Escribe la función asíncrona fetchData\n',
              expectedOutput: 'Data Loaded'
            }
          },
          {
            title: 'Manejo de Errores',
            type: LessonType.EXERCISE_FREE,
            xpReward: 100,
            content: {
              theory: 'Al usar `async/await`, envolvemos las operaciones en bloques `try...catch` para manejar con gracia las Promesas rechazadas, evitando que la aplicación se bloquee.',
              instructions: 'Escribe un bloque `try...catch`. Lanza (throw) un error con el mensaje "Network Failure", captúralo (catch), e imprime el mensaje de error.',
              initialCode: 'try {\n // lanza el error\n} catch(err) {\n // imprime err.message\n}',
              expectedOutput: 'Network Failure'
            }
          },
          {
            title: 'La Brecha Asíncrona',
            type: LessonType.BOSS,
            xpReward: 200,
            content: {
              theory: 'Para penetrar en el último cortafuegos, debes sincronizar múltiples operaciones asíncronas.',
              instructions: 'Usa `Promise.all()` para esperar a ambos, `p1` (resuelve con "Access") y `p2` (resuelve con "Granted"). Imprime el arreglo resultante separado por un espacio usando .join(" ").',
              initialCode: 'const p1 = Promise.resolve("Access");\nconst p2 = Promise.resolve("Granted");\n// Escribe la lógica de Promise.all\n',
              expectedOutput: 'Access Granted'
            }
          }
        ]
      }
    ]
  };
};
