import { PrismaClient, LessonType } from '@prisma/client';
import { SeederFunction, LanguageSeed } from './types';

export const getPythonSeed: SeederFunction = async (prisma) => {
  return {
    slug: 'python',
    name: 'Python',
    version: '3.13.5',
    sections: [
      {
        concept: {
          slug: 'python-basics',
          title: 'La Inicialización',
          description: 'Establece tu conexión con el mainframe. Aprende la sintaxis fundamental y los protocolos de asignación de variables.',
          orderIndex: 1
        },
        lessons: [
          {
            title: 'Conectando a la Red',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Bienvenido a la red, Operador. Python es un lenguaje de programación interpretado, de alto nivel y de propósito general. Su filosofía de diseño enfatiza la legibilidad del código. En nuestras operaciones, Python es la herramienta preferida para prototipado rápido e infiltración de sistemas.',
              instructions: 'Inicializa el sistema imprimiendo la cadena de conexión estándar: System Online',
              initialCode: '# Usa la función print() para mostrar texto\nprint("System Online")\n',
              expectedOutput: 'System Online\n'
            }
          },
          {
            title: 'Asignación de Variables',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'La asignación de memoria es crítica. Las variables en Python se crean en el momento en que les asignas un valor por primera vez. Actúan como etiquetas que referencian datos en la memoria del sistema.',
              instructions: 'Observa cómo se declaran y manipulan las variables. Asigna una ID de sistema a la variable y muéstrala.',
              initialCode: 'system_id = 1042\nprint(system_id)\n',
              expectedOutput: '1042\n'
            }
          },
          {
            title: 'Tipado Dinámico',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Python está tipado dinámicamente. Esto significa que el tipo de una variable se determina en tiempo de ejecución, permitiendo una manipulación fluida de datos durante operaciones en vivo.',
              instructions: 'Reasigna la variable `payload` de un entero a una cadena "Bypass" para evadir el comprobador de tipos, y luego imprímela.',
              initialCode: 'payload = 404\n# Reasigna payload a "Bypass" a continuación\npayload = # TODO: Asigna "Bypass"\n# TODO: Imprime payload\n',
              expectedOutput: 'Bypass\n'
            }
          },
          {
            title: 'Operaciones Matemáticas',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Los operadores aritméticos estándar existen en Python: +, -, *, /. El operador // realiza una división entera, crucial para cálculos de coordenadas basados en enteros.',
              instructions: 'Calcula el ancho de banda total del sector. Multiplica 128 por 4 e imprime el resultado.',
              initialCode: '# Realiza el cálculo e imprime el resultado\n# TODO: Imprime el resultado de 128 * 4\n',
              expectedOutput: '512\n'
            }
          },
          {
            title: 'Manipulación de Cadenas',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'Las cadenas pueden concatenarse usando + o formatearse usando f-strings (f"..."). Los f-strings son más rápidos y legibles al inyectar variables en comandos.',
              instructions: 'Crea un f-string que interpole la variable `target` en la cadena: "Target acquired: [target]". Imprímela.',
              initialCode: 'target = "Mainframe"\n# Imprime el f-string\n# TODO: Imprime "Target acquired: {target}"\n',
              expectedOutput: 'Target acquired: Mainframe\n'
            }
          },
          {
            title: 'Evaluación de Precedencia de Operadores',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Se requiere un profundo entendimiento del orden de las operaciones para prevenir errores de cálculo catastróficos en el campo. Recuerda PEMDAS.',
              instructions: 'Identifica el resultado de la siguiente expresión: 2 + 3 * 4 ** 2',
              initialCode: '',
              quizOptions: ['80', '50', '26', '144'],
              correctOptionIndex: 1
            }
          },
          {
            title: 'Arregla el Script Roto',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Un agente aliado dejó atrás un script roto. Necesitamos que lo repares para extraer las coordenadas finales.',
              instructions: 'Arregla los errores de sintaxis y lógica en el script para que imprima: Agent 007 coordinates: 45',
              initialCode: 'agent = "007"\ncoords_1 = "20"\ncoords_2 = 25\n# Arregla la siguiente línea para que imprima correctamente\nprint("Agent " + agent + " coordinates: " + coords_1 + coords_2)\n',
              expectedOutput: 'Agent 007 coordinates: 45\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'conditional-logic',
          title: 'Lógica Condicional',
          description: 'Controla el flujo de ejecución. Implementa protocolos de ramificación para reaccionar a amenazas de seguridad dinámicas.',
          orderIndex: 2
        },
        lessons: [
          {
            title: 'Álgebra Booleana',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'El núcleo de la toma de decisiones de la máquina es la lógica booleana. En Python, True y False gobiernan la ruta de ejecución. El operador `not` invierte el estado.',
              instructions: 'Imprime un estado True para confirmar tu entendimiento del protocolo.',
              initialCode: '# Imprime True\nprint(True)\n',
              expectedOutput: 'True\n'
            }
          },
          {
            title: 'Rutas de Ramificación',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'La declaración `if` evalúa una condición. Si es verdadera, se ejecuta el bloque de código indentado. La indentación en Python es sintáctica, no solo estilística.',
              instructions: 'Observa el bloque de ejecución.',
              initialCode: 'access_level = 5\nif access_level > 3:\n    print("Access Granted")\n',
              expectedOutput: 'Access Granted\n'
            }
          },
          {
            title: 'Manejo de Rechazo',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Cuando las condiciones fallan, necesitamos mecanismos de respaldo. El bloque `else` captura todo lo que el bloque `if` omite.',
              instructions: 'Completa el bloque else para que imprima "Access Denied".',
              initialCode: 'clearance = 2\nif clearance >= 4:\n    print("Access Granted")\n# TODO: Añade un bloque else que imprima "Access Denied"\n',
              expectedOutput: 'Access Denied\n'
            }
          },
          {
            title: 'Múltiples Contingencias',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'La palabra clave `elif` permite realizar múltiples comprobaciones secuenciales. Significa "else if" y deja de comprobar una vez que encuentra una condición verdadera.',
              instructions: 'Escribe un bloque elif que imprima "Warning" si threat_level es exactamente 3.',
              initialCode: 'threat_level = 3\nif threat_level > 4:\n    print("Evacuate")\n# TODO: Añade un bloque elif para threat_level == 3 que imprima "Warning"\nelse:\n    print("Safe")\n',
              expectedOutput: 'Warning\n'
            }
          },
          {
            title: 'Bomba Lógica Anidada',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'Los bloques lógicos pueden anidarse indefinidamente. Sin embargo, un anidamiento excesivo hace que el código sea difícil de depurar durante escenarios de fuego real.',
              instructions: 'Dentro de la declaración if existente, añade otra declaración if que compruebe si user == "admin". Si es así, imprime "Root Access".',
              initialCode: 'system_active = True\nuser = "admin"\nif system_active:\n    # TODO: Añade un if anidado que compruebe si user es "admin" e imprima "Root Access"\n    pass\n',
              expectedOutput: 'Root Access\n'
            }
          },
          {
            title: 'Cuestionario de Puertas Lógicas',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Comprender declaraciones lógicas complejas usando `and` / `or` es esencial para analizar las reglas de seguridad.',
              instructions: '¿Cuál es la salida de `True and not False or False`?',
              initialCode: '',
              quizOptions: ['True', 'False', 'None', 'SyntaxError'],
              correctOptionIndex: 0
            }
          },
          {
            title: 'Puerta de Autorización de Seguridad',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Necesitamos un script para validar las conexiones entrantes basándonos en credenciales específicas.',
              instructions: 'Escribe la lógica que imprima "Welcome" si role es "admin" Y key es "0x99". De lo contrario, imprime "Intruder".',
              initialCode: 'role = "admin"\nkey = "0x99"\n# TODO: Escribe una condición if/else para verificar si role es "admin" y key es "0x99"\n# Si es correcto, imprime "Welcome". Si no, imprime "Intruder"\n',
              expectedOutput: 'Welcome\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'iteration-protocols',
          title: 'Protocolos de Iteración',
          description: 'Automatiza tareas repetitivas. Explota las estructuras de bucles para aplicar fuerza bruta a las medidas de seguridad.',
          orderIndex: 3
        },
        lessons: [
          {
            title: 'Estructuras de Repetición',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Los bucles permiten que el código se ejecute repetidamente basándose en una condición o en una colección iterable. Son el motor de la automatización.',
              instructions: 'Observa una estructura de bucle simple.',
              initialCode: 'for i in range(3):\n    print(i)\n',
              expectedOutput: '0\n1\n2\n'
            }
          },
          {
            title: 'Bucles While',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'El bucle `while` se ejecuta continuamente mientras su condición siga siendo True. Ten cuidado con los bucles infinitos; colapsarán el sistema.',
              instructions: 'Ejecuta el script para ver cómo el contador disminuye.',
              initialCode: 'countdown = 3\nwhile countdown > 0:\n    print(countdown)\n    countdown -= 1\n',
              expectedOutput: '3\n2\n1\n'
            }
          },
          {
            title: 'Bucles For y Rangos',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'El bucle `for` en Python itera sobre los elementos de cualquier secuencia. La función `range(n)` genera números desde 0 hasta n-1.',
              instructions: 'Modifica el rango para que imprima los números del 0 al 4.',
              initialCode: '# TODO: Modifica el rango para imprimir del 0 al 4\nfor x in range(0):\n    print(x)\n',
              expectedOutput: '0\n1\n2\n3\n4\n'
            }
          },
          {
            title: 'Control de Bucle: Break',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'La declaración `break` termina el bucle actual por completo. Útil cuando encuentras lo que buscas y quieres salir antes de tiempo.',
              instructions: 'Usa una declaración break para detener el bucle cuando i == 2.',
              initialCode: 'for i in range(5):\n    # TODO: Añade una condición que haga un break si i == 2\n    print(i)\n',
              expectedOutput: '0\n1\n'
            }
          },
          {
            title: 'Control de Bucle: Continue',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'La declaración `continue` salta el resto de la iteración actual y pasa a la siguiente iteración del bucle.',
              instructions: 'Usa continue para omitir la impresión del número 2.',
              initialCode: 'for i in range(4):\n    # TODO: Añade una condición que haga continue si i == 2\n    print(i)\n',
              expectedOutput: '0\n1\n3\n'
            }
          },
          {
            title: 'Análisis del Ciclo de Ejecución',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Analiza el comportamiento de los procesos iterativos sin ejecutarlos.',
              instructions: '¿Cuántas veces se imprimirá "ping"? `for i in range(2, 5): print("ping")`',
              initialCode: '',
              quizOptions: ['2', '3', '4', '5'],
              correctOptionIndex: 1
            }
          },
          {
            title: 'Secuencia de Desencriptación',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Hemos interceptado un flujo de datos. Itera a través de los números del 1 al 5 para encontrar anomalías.',
              instructions: 'Imprime los números del 1 al 5 usando un bucle. Si el número es 3, imprime "Anomaly" en lugar del número.',
              initialCode: '# TODO: Itera a través de los números del 1 al 5. Si es 3, imprime "Anomaly", si no, imprime el número.\n',
              expectedOutput: '1\n2\nAnomaly\n4\n5\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'subroutines',
          title: 'Subrutinas',
          description: 'Empaqueta tu lógica en funciones reutilizables. La modularidad es la clave para las operaciones cibernéticas escalables.',
          orderIndex: 4
        },
        lessons: [
          {
            title: 'Código Modular',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Las funciones, declaradas con `def`, te permiten encapsular un bloque de código y reutilizarlo. Esto aísla la lógica operativa.',
              instructions: 'Llama a la función definida para activar la subrutina.',
              initialCode: 'def activate():\n    print("Subroutine Active")\n\nactivate()\n',
              expectedOutput: 'Subroutine Active\n'
            }
          },
          {
            title: 'Definiendo Funciones',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Una función consta de una firma y un cuerpo. El cuerpo debe estar indentado. La ejecución solo ocurre cuando se llama explícitamente.',
              instructions: 'Observa el flujo de ejecución de la función.',
              initialCode: 'def ping():\n    print("Pong")\n\nping()\n',
              expectedOutput: 'Pong\n'
            }
          },
          {
            title: 'Parámetros y Argumentos',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Las funciones pueden aceptar parámetros de entrada, permitiéndoles procesar cargas de datos dinámicas.',
              instructions: 'Define la función greet para que acepte un parámetro `name` e imprima `Hello <name>`.',
              initialCode: 'def greet(name):\n    # TODO: Imprime "Hello " seguido del nombre\n    pass\n\ngreet("Agent")\n',
              expectedOutput: 'Hello Agent\n'
            }
          },
          {
            title: 'Devolver Datos',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'La declaración `return` termina una función y envía los datos de vuelta a quien la llamó.',
              instructions: 'Arregla la función multiply para que devuelva el producto de a y b.',
              initialCode: 'def multiply(a, b):\n    # TODO: Devuelve el producto de a y b\n    pass\n\nresult = multiply(4, 5)\nprint(f"Result: {result}")\n',
              expectedOutput: 'Result: 20\n'
            }
          },
          {
            title: 'Alcance de Variables',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'Las variables creadas dentro de una función son locales a esa función. No se puede acceder a ellas desde el alcance global.',
              instructions: 'Demuestra el alcance de las variables imprimiendo la variable global `secret` dentro de la función.',
              initialCode: 'secret = "GlobalKey"\ndef check_scope():\n    # TODO: Imprime la variable global \'secret\'\n    pass\n\ncheck_scope()\n',
              expectedOutput: 'GlobalKey\n'
            }
          },
          {
            title: 'Módulo de Procesamiento de Datos',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Tu prueba final sobre subrutinas. Procesa los datos de transmisión entrantes con precisión.',
              instructions: 'Escribe una función process_data(n) que devuelva el valor absoluto de (n * 10 - 5). Llámarla con -5 e imprime el resultado.',
              initialCode: '# TODO: Escribe la función process_data(n)\n# TODO: Llama a la función con -5 e imprímelo\n',
              expectedOutput: '55\n'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'data-structures',
          title: 'Estructuras de Datos',
          description: 'Organiza y manipula cargas de datos complejas. Domina las listas y diccionarios para manejar información masiva.',
          orderIndex: 5
        },
        lessons: [
          {
            title: 'Matrices de Memoria (Listas)',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Las listas son colecciones ordenadas y mutables de elementos. Pueden contener tipos de datos mixtos y son fundamentales para almacenar secuencias.',
              instructions: 'Imprime el primer elemento de la lista usando su índice [0].',
              initialCode: 'nodes = ["alpha", "beta", "gamma"]\nprint(nodes[0])\n',
              expectedOutput: 'alpha\n'
            }
          },
          {
            title: 'Operaciones con Listas',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Las listas soportan varios métodos. `.append()` añade al final, `.pop()` elimina del final.',
              instructions: 'Observa la mutación de la lista.',
              initialCode: 'stack = [1, 2]\nstack.append(3)\nprint(stack)\n',
              expectedOutput: '[1, 2, 3]\n'
            }
          },
          {
            title: 'Comprensión de Listas',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Las comprensiones de listas proporcionan una forma concisa de crear listas. Se ejecutan más rápido que los bucles estándar.',
              instructions: 'Usa una comprensión para crear una lista de cuadrados para los números 1, 2, 3.',
              initialCode: '# TODO: Usa una comprensión de lista para crear los cuadrados de 1, 2, 3\nsquares = []\nprint(squares)\n',
              expectedOutput: '[1, 4, 9]\n'
            }
          },
          {
            title: 'Almacenes Clave-Valor (Diccionarios)',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Los diccionarios son colecciones desordenadas y mutables de pares clave-valor que proporcionan tiempos de búsqueda O(1).',
              instructions: 'Añade una nueva clave "status" con el valor "online" al diccionario, y luego imprime el valor.',
              initialCode: 'config = {"ip": "192.168.1.1"}\n# TODO: Añade la clave "status" con el valor "online" a config\n# TODO: Imprime el valor de "status"\n',
              expectedOutput: 'online\n'
            }
          },
          {
            title: 'Tuplas y Conjuntos',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'Las tuplas son listas inmutables. Los conjuntos (sets) son colecciones de elementos únicos, perfectos para intersecciones.',
              instructions: 'Crea un conjunto (set) con los elementos 1, 2, 2, 3 y imprímelo para ver cómo se eliminan los duplicados.',
              initialCode: '# TODO: Crea un conjunto con los elementos 1, 2, 2, 3\nmy_set = None\nprint(sorted(list(my_set)))\n',
              expectedOutput: '[1, 2, 3]\n'
            }
          },
          {
            title: 'El Archivo de Configuración',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Extrae datos específicos de una carga útil de diccionario anidado.',
              instructions: 'Imprime el valor de la clave "port" anidada dentro del diccionario "server".',
              initialCode: 'payload = {"server": {"ip": "10.0.0.1", "port": 8080}}\n# TODO: Imprime el valor de "port"\n',
              expectedOutput: '8080\n'
            }
          },
          {
            title: 'Ordenando la Evidencia',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Procesa una lista de cadenas, filtrando y ordenando datos.',
              instructions: 'Imprime una nueva lista que contenga solo las palabras que comienzan con "c", ordenadas alfabéticamente.',
              initialCode: 'words = ["cat", "dog", "car", "apple", "cable"]\n# TODO: Crea una lista c_words con las palabras que empiezan por "c", ordenadas alfabéticamente\n',
              expectedOutput: "['cable', 'car', 'cat']\n"
            }
          }
        ]
      },
      {
        concept: {
          slug: 'oop-paradigms',
          title: 'Paradigmas Orientados a Objetos',
          description: 'Modela entidades del mundo real. Usa clases para estructurar el estado y el comportamiento complejo de las aplicaciones.',
          orderIndex: 6
        },
        lessons: [
          {
            title: 'El Paradigma de Objetos',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'La Programación Orientada a Objetos (POO) agrupa datos y funciones en planos lógicos llamados Clases.',
              instructions: 'Imprime el tipo de un objeto instanciado.',
              initialCode: 'class Agent:\n    pass\n\nx = Agent()\nprint(type(x).__name__)\n',
              expectedOutput: 'Agent\n'
            }
          },
          {
            title: 'Clases e Instancias',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'El método `__init__` es el constructor. Se ejecuta cuando se crea una nueva instancia. `self` se refiere a la instancia específica.',
              instructions: 'Observa cómo los atributos se vinculan a una instancia.',
              initialCode: 'class Node:\n    def __init__(self, id):\n        self.id = id\n\nn = Node("A1")\nprint(n.id)\n',
              expectedOutput: 'A1\n'
            }
          },
          {
            title: 'Métodos de Instancia',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Los métodos son funciones definidas dentro de una clase. Deben aceptar `self` como su primer parámetro.',
              instructions: 'Añade un método `ping()` a la clase Server que imprima "Pong from Main".',
              initialCode: 'class Server:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Añade un método ping() que imprima "Pong from {self.name}"\n\ns = Server("Main")\ns.ping()\n',
              expectedOutput: 'Pong from Main\n'
            }
          },
          {
            title: 'Herencia',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'La herencia permite que una nueva clase (Hija) herede atributos y métodos de una clase existente (Padre).',
              instructions: 'Crea una clase Admin que herede de User y sobrescriba el __init__ para imprimir "Admin Online".',
              initialCode: 'class User:\n    def __init__(self):\n        print("User Online")\n\n# TODO: Crea la clase Admin que herede de User y cuyo __init__ imprima "Admin Online"\n\nAdmin()\n',
              expectedOutput: 'Admin Online\n'
            }
          },
          {
            title: 'Polimorfismo',
            type: LessonType.EXERCISE_FREE,
            xpReward: 30,
            content: {
              theory: 'El polimorfismo permite a las subclases definir sus propios comportamientos únicos para los métodos compartidos con la clase padre.',
              instructions: 'Sobrescribe el método `execute()` en la clase StealthMode para imprimir "Silent Execution".',
              initialCode: 'class Mode:\n    def execute(self):\n        print("Standard Execution")\n# TODO: Crea la clase StealthMode que herede de Mode y sobrescriba execute() para imprimir "Silent Execution"\n\nStealthMode().execute()\n',
              expectedOutput: 'Silent Execution\n'
            }
          },
          {
            title: 'Construye el Núcleo de IA',
            type: LessonType.BOSS,
            xpReward: 150,
            content: {
              theory: 'Combina tu conocimiento de clases, herencia y atributos para construir una representación funcional de un Núcleo de IA.',
              instructions: 'Crea una clase AI con un __init__ que tome un name. Añade un método status() que imprima "[name] is operational". Instancia AI("HAL") y llama a status().',
              initialCode: '# TODO: Crea la clase AI con un __init__ que tome un nombre.\n# TODO: Añade el método status() que imprima "{nombre} is operational".\n# TODO: Instancia la clase con el nombre "HAL" y llama a status().\n',
              expectedOutput: 'HAL is operational\n'
            }
          }
        ]
      }
    ]
  };
};
