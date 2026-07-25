import { PrismaClient, LessonType } from '@prisma/client';
import { SeederFunction, LanguageSeed } from './types';

export const getTypescriptSeed: SeederFunction = async (prisma) => {
  return {
    slug: 'typescript',
    name: 'TypeScript',
    version: '7.0',
    sections: [
      {
        concept: { slug: 'initiation', title: 'Iniciación: La Red Tipada', description: 'Entra a la Red. Aprende los tipos fundamentales y sobrevive al compilador estático.', orderIndex: 1 },
        lessons: [
          {
            title: 'Bienvenido a la Red',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Bienvenido a la Red, agente. JavaScript es anárquico, un páramo expansivo de comportamiento indefinido. TypeScript introduce la Ley de Tipos, un estricto protocolo a nivel de compilador que impone estructuras de datos antes de la ejecución. Se compila a JavaScript estándar pero asegura que tu lógica sea a prueba de balas durante el desarrollo.',
              instructions: 'Inicializa tu secuencia de consola. Declara una variable constante con tu ID de agente y envíala al flujo estándar (standard stream).',
              initialCode: 'const operativeId: string = "Agent-007";\nconsole.log(operativeId);',
              expectedOutput: 'Agent-007'
            }
          },
          {
            title: 'Tipos Básicos: Cadenas de Neón y Enteros de Datos',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Cada nodo en la red requiere una clasificación estricta. Las primitivas incluyen `string`, `number`, y `boolean`. Al bloquear las variables a estas primitivas, prevenimos inyecciones de datos maliciosos.',
              instructions: 'Observa los tipos básicos siendo asignados a variables de seguridad. Ejecuta el módulo para verificar la integridad del sistema.',
              initialCode: 'let secLevel: number = 5;\nlet isLocked: boolean = true;\nconsole.log(secLevel);',
              expectedOutput: '5'
            }
          },
          {
            title: 'Anotaciones: Etiquetando los Constructos',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'El tipado implícito deja el sistema vulnerable a mutaciones en tiempo de ejecución. Las anotaciones explícitas vinculan una variable a un tipo estricto, sellándola contra la coerción de datos no autorizada.',
              instructions: 'Agrega una anotación `string` a la variable `pass` para fortificarla. Luego, imprímela en consola.',
              initialCode: '// TODO: Declara la variable pass con el tipo string y asígnale el valor "hunter2"\n\nconsole.log(pass);',
              expectedOutput: 'hunter2'
            }
          },
          {
            title: 'Bancos de Memoria: Arreglos',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Las colecciones de datos deben ser homogéneas para prevenir la corrupción. Los arreglos en TypeScript restringen sus elementos a un único tipo unificado, asegurando una iteración predecible.',
              instructions: 'Construye un arreglo de números llamado `ports` representando los puertos activos del sistema (80, 443, 8080). Registra el primer puerto en la secuencia.',
              initialCode: '// TODO: Declara un arreglo de números llamado ports con los valores 80, 443, 8080\n\nconsole.log(ports[0]);',
              expectedOutput: '80'
            }
          },
          {
            title: 'Arregla el Protocolo',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'El cortafuegos (firewall) ha sido vulnerado. Solo tu conocimiento del compilador puede salvarnos. Debes identificar rápidamente las vulnerabilidades en el sistema de tipos para parchear el exploit.',
              instructions: 'Identifica el comportamiento correcto del tipo `any` cuando se aplica a una variable.',
              initialCode: '// Analiza la vulnerabilidad y proporciona la respuesta correcta del protocolo.',
              quizOptions: [
                'Hace que la variable sea de tipo estricto e inmutable.',
                'Desactiva la comprobación de tipos para esa variable, permitiendo cualquier operación.',
                'Fuerza la conversión de la variable a un flujo de cadenas.',
                'Lanza un error de tiempo de ejecución al compilar.'
              ],
              correctOptionIndex: 1
            }
          },
          {
            title: 'Defiende el Nodo',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'El tráfico malicioso entrante está sobrecargando el sistema central (mainframe). Necesitamos una defensa algorítmica tipada para analizar los vectores de amenaza entrantes y neutralizarlos según sus niveles de salud.',
              instructions: 'Escribe una función estrictamente tipada `calcHealth` que calcule la salud total del nodo dado un arreglo de valores numéricos de salud. Devuelve la suma total.',
              initialCode: 'function calcHealth(nodes: number[]): number {\n  // TODO: Retorna la suma total de los valores del arreglo\n}\nconsole.log(calcHealth([50, 50, 50]));',
              expectedOutput: '150'
            }
          }
        ]
      },
      {
        concept: { slug: 'tactical-functions', title: 'Funciones Tácticas', description: 'Despliega flujos de E/S (I/O) robustos usando el tipado avanzado de funciones.', orderIndex: 2 },
        lessons: [
          {
            title: 'Flujos de E/S: Parámetros y Retornos',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Las funciones actúan como los flujos de Entrada/Salida de la red. Tipar los parámetros de entrada y predecir los valores de retorno garantiza que un enrutamiento de datos mal alineado nunca bloquee el hilo de ejecución principal.',
              instructions: 'Revisa la firma tipada de la función y ejecútala para hacer ping a la red local.',
              initialCode: 'function ping(ip: string): string {\n  return "Pong " + ip;\n}\nconsole.log(ping("192.168.1.1"));',
              expectedOutput: 'Pong 192.168.1.1'
            }
          },
          {
            title: 'Sistemas de Seguridad (Failsafes): Parámetros Opcionales',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'No todos los datos entrantes tienen la garantía de existir. Los parámetros opcionales, indicados con el símbolo `?`, actúan como sistemas de seguridad (failsafes) cuando se pierden paquetes de datos durante la transmisión.',
              instructions: 'Ejecuta la función del sistema de seguridad sin argumentos y observa su protocolo de respaldo.',
              initialCode: 'function scan(target?: string): string {\n  return target ? "Scanning " + target : "Scanning all";\n}\nconsole.log(scan());',
              expectedOutput: 'Scanning all'
            }
          },
          {
            title: 'Punteros Láser: Funciones Flecha (Arrow Functions)',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Las funciones flecha proporcionan un mecanismo elegante de alcance léxico (lexical scoping). Tiparlas requiere definir la firma del parámetro y el tipo de retorno eficientemente en una sola línea de defensa.',
              instructions: 'Define una función flecha `encrypt` que acepte una clave numérica (`key`) y devuelva un hash de cadena encriptado ("hash_" concatenado con la clave).',
              initialCode: '// TODO: Crea la función flecha encrypt que acepte un número y devuelva un string\n\nconsole.log(encrypt(42));',
              expectedOutput: 'hash_42'
            }
          },
          {
            title: 'Módulos Híbridos: Tipos de Unión',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'A veces una variable debe albergar múltiples estados potenciales. Los tipos de unión utilizando el operador `|` permiten que una variable sea de forma segura uno de varios tipos designados, creando módulos híbridos flexibles.',
              instructions: 'Inicializa una variable `hybrid` que pueda aceptar tanto un `string` como un `number`. Asígnale un número entero (99) e imprime su valor.',
              initialCode: '// TODO: Declara la variable hybrid usando tipos de unión (string o number) e igual a 99\n\nconsole.log(hybrid);',
              expectedOutput: '99'
            }
          },
          {
            title: 'Anular Seguridad',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Una secuencia de anulación manual del sistema ha sido iniciada por un agente renegado. Debes responder correctamente al prompt de seguridad para recuperar el control sobre los módulos híbridos.',
              instructions: '¿Qué símbolo denota un Tipo de Unión (Union Type) en TypeScript?',
              initialCode: '// Esperando la entrada de anulación...',
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
            title: 'Calibrar el Motor',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'El hiper-motor requiere datos de calibración numéricos precisos, pero los sensores podrían transmitirlos como una cadena (string) o un número debido a la degradación de la señal.',
              instructions: 'Construye una función `calibrate` que reciba un tipo de unión (string | number) y devuelva de manera confiable un valor numérico. Si es cadena, conviértela usando `parseInt`.',
              initialCode: 'function calibrate(input: string | number): number {\n  // TODO: Implementa la lógica para devolver siempre un número\n}\nconsole.log(calibrate("100"));',
              expectedOutput: '100'
            }
          }
        ]
      },
      {
        concept: { slug: 'structural-integrity', title: 'Integridad Estructural', description: 'Diseña estructuras de datos complejas con interfaces y clases.', orderIndex: 3 },
        lessons: [
          {
            title: 'Planos: Interfaces',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Las interfaces definen los planos exactos de nuestros constructos cibernéticos. Dictan la forma estructural de los objetos literales, asegurando que no falten partes ni haya partes superfluas que comprometan el sistema.',
              instructions: 'Instancia un objeto que se adhiera a la interfaz Unit y registra la designación de su modelo.',
              initialCode: 'interface Unit {\n  model: string;\n  status: boolean;\n}\nconst drone: Unit = { model: "X-1", status: true };\nconsole.log(drone.model);',
              expectedOutput: 'X-1'
            }
          },
          {
            title: 'Mejoras Modulares: Extensión (Extending)',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Las interfaces pueden heredar unas de otras. Este mecanismo de extensión nos permite construir jerarquías complejas de estructuras de datos acoplando mejoras modulares a las firmas centrales.',
              instructions: 'Despliega un objeto de interfaz extendida y verifica sus propiedades heredadas.',
              initialCode: 'interface Weapon { damage: number; }\ninterface PlasmaRifle extends Weapon { battery: number; }\nconst rifle: PlasmaRifle = { damage: 50, battery: 100 };\nconsole.log(rifle.damage);',
              expectedOutput: '50'
            }
          },
          {
            title: 'Generadores de Escudos: Clases',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Las clases encapsulan tanto el estado como el comportamiento. Los modificadores de acceso (`public`, `private`, `protected`) actúan como generadores de escudos criptográficos, restringiendo el acceso no autorizado a los bancos de memoria interna.',
              instructions: 'Instancia la clase `Core` en una constante `c` y accede de manera segura a su temperatura interna privada a través de su método público `getTemp()`.',
              initialCode: 'class Core {\n  private temp = 90;\n  public getTemp() { return this.temp; }\n}\n// TODO: Crea una instancia de Core e imprime su temperatura usando getTemp()\n',
              expectedOutput: '90'
            }
          },
          {
            title: 'Patrones de Diseño: Alias de Tipos (Type Aliases)',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Mientras que las interfaces definen formas de objetos, los Alias de Tipos ofrecen un patrón de diseño diferente. Pueden representar primitivas, tuplas y uniones, proporcionando extrema versatilidad en las definiciones de esquemas.',
              instructions: 'Define un alias de tipo de tupla llamado `Coordinate` para dos números. Luego, declara `loc` con ese tipo y asígnale `[45, 90]`. Imprime el primer valor.',
              initialCode: '// TODO: Define el alias de tipo Coordinate para [number, number]\n\n// TODO: Declara loc con el tipo Coordinate y los valores [45, 90]\n\nconsole.log(loc[0]);',
              expectedOutput: '45'
            }
          },
          {
            title: 'Libros de Registro Inmutables: Solo Lectura (Readonly)',
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: 'El modificador `readonly` bloquea una propiedad de objeto permanentemente tras su inicialización. Convierte la memoria volátil en un registro inmutable, impidiendo que cualquier script posterior corrompa el identificador central.',
              instructions: 'Ejecuta el módulo para leer el ID bloqueado por hardware. No intentes modificarlo.',
              initialCode: 'interface Config { readonly id: number; }\nconst sys: Config = { id: 777 };\nconsole.log(sys.id);',
              expectedOutput: '777'
            }
          },
          {
            title: 'Diseña el Ciber-Dron',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Debemos infiltrarnos en el sistema central (mainframe) corporativo, pero nuestros drones están siendo interceptados porque su lógica interna está débilmente tipada. Necesitamos una arquitectura de clases robusta.',
              instructions: 'Implementa la clase `Drone` equipada con una propiedad privada `id` (string), un constructor que la inicialice y un método público `scan()` que devuelva dicho ID.',
              initialCode: 'class Drone {\n  // TODO: Define la propiedad privada id de tipo string\n\n  constructor(id: string) {\n    // TODO: Inicializa el id\n  }\n\n  public scan() {\n    // TODO: Devuelve el id\n  }\n}\nconst d = new Drone("Alpha");\nconsole.log(d.scan());',
              expectedOutput: 'Alpha'
            }
          }
        ]
      },
      {
        concept: { slug: 'quantum-generics', title: 'Genéricos Cuánticos', description: 'Desbloquea la programación polimórfica para escribir código altamente reutilizable.', orderIndex: 4 },
        lessons: [
          {
            title: 'Núcleo Polimórfico: Intro a Genéricos',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Los genéricos nos facultan para construir núcleos polimórficos—componentes que se adaptan para operar sobre una amplia variedad de tipos en lugar de estar programados a fuego (hardcoded) para una firma rígida única.',
              instructions: 'Ejecuta la función genérica de identidad con una carga útil (payload) de cadena.',
              initialCode: 'function identity<T>(arg: T): T {\n  return arg;\n}\nconsole.log(identity<string>("Nexus"));',
              expectedOutput: 'Nexus'
            }
          },
          {
            title: 'Rutinas Adaptables: Interfaces Genéricas',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Los genéricos pueden fusionarse con las interfaces, forjando rutinas de datos altamente adaptables que envuelven elegantemente cualquier tipo de carga útil subyacente que se les inyecte.',
              instructions: 'Observa un contenedor de carga genérico que transporta un entero de código de error.',
              initialCode: 'interface Payload<T> { data: T; }\nconst p: Payload<number> = { data: 404 };\nconsole.log(p.data);',
              expectedOutput: '404'
            }
          },
          {
            title: 'Límites Seguros: Restricciones Genéricas',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Los genéricos sin restricciones son peligrosamente impredecibles. Las restricciones usando la palabra clave `extends` imponen límites seguros, asegurando que el tipo genérico posea las propiedades requeridas.',
              instructions: 'Impón una restricción genérica a la función `logLength` para garantizar que el argumento pasado tenga una propiedad `length` de tipo `number`.',
              initialCode: 'function logLength<T /* TODO: Agrega restricción genérica usando extends para que T tenga { length: number } */ >(arg: T) {\n  console.log(arg.length);\n}\nlogLength("password");',
              expectedOutput: '8'
            }
          },
          {
            title: 'Contenedores Universales: Clases Genéricas',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Las clases pueden aprovechar el poder de los genéricos para servir como contenedores universales de datos, manejando flujos de datos de cualquier tipo sin comprometer la seguridad de tipos durante la extracción.',
              instructions: 'Instancia una unidad de almacenamiento `Storage` genérica formateada para datos de tipo `string` y el valor "Encrypted", en una variable `s`. Recupera y registra su valor.',
              initialCode: 'class Storage<T> {\n  value: T;\n  constructor(val: T) { this.value = val; }\n}\n// TODO: Instancia Storage con tipo string y asígnale "Encrypted" a la variable s\n\nconsole.log(s.value);',
              expectedOutput: 'Encrypted'
            }
          },
          {
            title: 'Mutadores de Datos: Tipos de Utilidad',
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: 'Los tipos de utilidad como `Partial` y `Pick` actúan como mutadores genéticos. Remodelan rápidamente los planos de las interfaces existentes, permitiendo actualizaciones de datos fraccionales sin redefinir el esquema.',
              instructions: 'Despliega el tipo de utilidad Partial para actualizar selectivamente el perfil de un usuario.',
              initialCode: 'interface User { name: string; age: number; }\nconst update: Partial<User> = { age: 30 };\nconsole.log(update.age);',
              expectedOutput: '30'
            }
          },
          {
            title: 'Descifra el Arreglo Multidimensional',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'La información del objetivo está enterrada a gran profundidad bajo capas de arreglos genéricos. Una función estándar no puede perforar la variedad de tipos de arreglos encontrados en la red.',
              instructions: 'Escribe una función de extracción genérica `getFirst` que recupere de manera segura el primer elemento de cualquier arreglo `arr` de tipo genérico `T[]`.',
              initialCode: 'function getFirst<T>(arr: T[]): T {\n  // TODO: Devuelve el primer elemento del arreglo\n}\nconsole.log(getFirst<number>([7, 8, 9]));',
              expectedOutput: '7'
            }
          }
        ]
      },
      {
        concept: { slug: 'advanced-threats', title: 'Vectores de Amenaza Avanzados', description: 'Defiéndete contra datos impredecibles con protectores de tipos (type guards) sofisticados.', orderIndex: 5 },
        lessons: [
          {
            title: 'Códigos de Estado: Enums',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Los Enums asignan estáticamente valores numéricos o cadenas a constantes legibles. Son el constructo ideal para definir códigos de estado del sistema rígidos e inalterables dentro del kernel.',
              instructions: 'Imprime el estado activo actual de la red a través del Enum definido.',
              initialCode: 'enum State { IDLE, ACTIVE, OFFLINE }\nconsole.log(State.ACTIVE);',
              expectedOutput: '1'
            }
          },
          {
            title: 'Orientación de Precisión: Tipos Literales',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Los tipos literales bloquean una variable en un valor específico y exacto. Cuando se combinan con tipos de unión, proporcionan precisión de alta exactitud para apuntar a los parámetros de configuración.',
              instructions: 'Asegúrate de que el vector direccional esté bloqueado estrictamente a un valor de cadena literal.',
              initialCode: 'type Direction = "North" | "South";\nlet dir: Direction = "North";\nconsole.log(dir);',
              expectedOutput: 'North'
            }
          },
          {
            title: 'Escáneres de Seguridad: Protectores de Tipos (Type Guards)',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Cuando se procesan datos inestables y heterogéneos, los protectores de tipos (type guards) escanean dinámicamente la variable en tiempo de ejecución. Esto garantiza al compilador estático cuál es la verdadera estructura de la variable antes de ser manipulada.',
              instructions: 'Utiliza un type guard (`typeof`) en la función `process` para imprimir "String" si la data es cadena, o "Number" si es número.',
              initialCode: 'function process(data: string | number) {\n  // TODO: Usa typeof para verificar si data es "string" e imprime "String". Si no, imprime "Number"\n}\nprocess("Test");',
              expectedOutput: 'String'
            }
          },
          {
            title: 'El Vacío: Unknown y Never',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Las funciones rebeldes que nunca terminan devuelven `never`. Al absorber datos alienígenas, `unknown` fuerza comprobaciones de tipo obligatorias, actuando como una alternativa mucho más segura al anárquico tipo `any`.',
              instructions: 'Convierte un fragmento de datos alienígenos de tipo `unknown` a una cadena explícitamente y envíalo a consola.',
              initialCode: 'let alien: unknown = "Data";\n// TODO: Imprime la variable alien asumiendo (casteando) que es un string usando el operador "as"\n',
              expectedOutput: 'Data'
            }
          },
          {
            title: 'Quiz de la Red Neuronal',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Se está llevando a cabo una auditoría agresiva a tu comprensión sobre las amenazas avanzadas. Solo la certeza absoluta te permitirá evadir la evaluación neuronal.',
              instructions: 'Identifica el tipo de utilidad específico que transforma todas las propiedades de una interfaz dada en campos opcionales.',
              initialCode: '// Esperando entrada neuronal',
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
        concept: { slug: 'async-ops', title: 'Operaciones Asíncronas', description: 'Domina el control de flujo asíncrono y el tipado de Promesas.', orderIndex: 6 },
        lessons: [
          {
            title: 'Commits del Futuro: Promesas',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Las Promesas representan commits (entregas) futuras en la línea de tiempo cronológica de ejecución. Encapsulan limpiamente tareas asíncronas, algo esencial para establecer conexiones sin bloqueo hacia APIs externas.',
              instructions: 'Observa la Promesa tipada que resuelve un saludo o negociación en la red.',
              initialCode: 'const p: Promise<string> = Promise.resolve("Uplink complete");\np.then(res => console.log(res));',
              expectedOutput: 'Uplink complete'
            }
          },
          {
            title: 'Sincronizando la Realidad: Async/Await',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'La sintaxis Async/Await obliga a los flujos de ejecución asíncronos a leerse como un código síncrono y secuencial, mientras que mantiene rigurosamente la seguridad de tipos subyacente de los datos resueltos.',
              instructions: 'Inicia la rutina de sincronización asíncrona.',
              initialCode: 'async function sync() {\n  return "Synced";\n}\nsync().then(console.log);',
              expectedOutput: 'Synced'
            }
          },
          {
            title: 'Extracción de Datos: Peticiones (Fetches) Tipadas',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Al extraer datos de redes externas, es obligatorio un tipado estricto de la carga JSON esperada. No tipar la extracción puede resultar en un choque fatal del sistema en tiempo de ejecución.',
              instructions: 'Impón una interfaz rígida sobre el resultado de extracción esperado. Tipa el valor de retorno de `fetchUser` como una Promesa que resuelve a un objeto con `{name: string}`.',
              initialCode: '// TODO: Especifica el tipo de retorno de la Promesa para que resuelva con un objeto {name: string}\nasync function fetchUser() {\n  return { name: "Neo" };\n}\nfetchUser().then(u => console.log(u.name));',
              expectedOutput: 'Neo'
            }
          },
          {
            title: 'Hackeo en Paralelo: Promise.all',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: '`Promise.all` permite la ejecución simultánea de múltiples brechas de red asíncronas. TypeScript infiere automáticamente la estructura de tupla exacta del arreglo con todas las combinaciones resueltas.',
              instructions: 'Lanza operaciones asíncronas en paralelo usando `Promise.all` pasándole un arreglo con `Promise.resolve(1)` y `Promise.resolve("two")`. Imprime la cantidad (length) de promesas resueltas.',
              initialCode: '// TODO: Usa Promise.all con [Promise.resolve(1), Promise.resolve("two")] e imprime el tamaño (length) del arreglo de resultados\n',
              expectedOutput: '2'
            }
          },
          {
            title: 'Extrayendo el Núcleo: Awaited',
            type: LessonType.INTRO,
            xpReward: 15,
            content: {
              theory: 'El tipo de utilidad `Awaited` actúa como un escáner profundo, atravesando la envoltura asíncrona de una Promesa para extraer y revelar el verdadero núcleo interno de datos que se resolverá eventualmente.',
              instructions: 'Inspecciona en acción el mecanismo de extracción Awaited.',
              initialCode: 'type Core = Awaited<Promise<string>>;\nconst data: Core = "Extracted Core";\nconsole.log(data);',
              expectedOutput: 'Extracted Core'
            }
          },
          {
            title: 'Hackea el Mainframe',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'El sistema central (mainframe) requiere de una secuencia de conexión asíncrona altamente segura y tipada correctamente. Cualquier operación bloqueante o síncrona disparará los sistemas de alarma al instante.',
              instructions: 'Escribe una función asíncrona `hack` que simule un retraso en la red y resuelva devolviendo la cadena "Access Granted".',
              initialCode: 'async function hack(): Promise<string> {\n  // TODO: Retorna la promesa resuelta con "Access Granted" usando Promise.resolve()\n}\nhack().then(console.log);',
              expectedOutput: 'Access Granted'
            }
          }
        ]
      },
      {
        concept: { slug: 'system-architecture', title: 'Arquitectura del Sistema', description: 'Construye arquitecturas escalables utilizando estrategias de configuración avanzadas.', orderIndex: 7 },
        lessons: [
          {
            title: 'Enlace (Uplinking): Módulos',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Las bases de código masivas deben modularizarse en sectores distintivos. La exportación e importación de interfaces y clases conforma la red de enlace vital que conecta archivos aislados formando una aplicación cohesiva.',
              instructions: 'Simula la exportación de un módulo poniendo el estado del módulo en línea.',
              initialCode: 'const moduleStatus = "Online";\nconsole.log(moduleStatus);',
              expectedOutput: 'Online'
            }
          },
          {
            title: 'Enrutamiento de Emergencia (Failsafe): Encadenamiento Opcional (Optional Chaining)',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'El encadenamiento opcional (`?.`) y la coalescencia nula (`??`) son protocolos de enrutamiento a prueba de fallos esenciales. Navegan a través de estructuras profundas de objetos con seguridad y devuelven respuestas de repuesto (fallbacks) en lugar de colapsar cuando los nodos de la red están completamente fuera de línea.',
              instructions: 'Observa el mecanismo de enrutamiento recaer dinámicamente en su comportamiento de respaldo al encontrar un nodo sin vida.',
              initialCode: 'const network: any = {};\nconsole.log(network?.node?.ip ?? "Offline");',
              expectedOutput: 'Offline'
            }
          },
          {
            title: 'Transformación de Datos: Tipos Mapeados (Mapped Types)',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Los tipos mapeados otorgan el poder de iterar programáticamente sobre las estructuras de objetos existentes y de forjar esquemas de tipos completamente nuevos sobre la marcha. Esto posibilita la transformación automatizada y masiva de datos sin requerir re-tipado manual.',
              instructions: 'Emplea el tipo mapeado `ReadOnlyMap` para convertir un objeto `{id: number}` en una configuración de solo lectura `m` con id 1. Muestra en el registro su identificador.',
              initialCode: 'type ReadOnlyMap<T> = { readonly [P in keyof T]: T[P] };\n// TODO: Declara m de tipo ReadOnlyMap<{id: number}> y asígnale { id: 1 }\n\nconsole.log(m.id);',
              expectedOutput: '1'
            }
          },
          {
            title: 'Examen Final: El Operador Keyof',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Tu intenso protocolo de entrenamiento casi ha terminado. Este examen conceptual final pone a prueba tu comprensión de diseño sobre la introspección de tipos avanzados.',
              instructions: '¿Qué produce exactamente el operador `keyof` cuando se aplica a una interfaz?',
              initialCode: '// Esperando evaluación final...',
              quizOptions: [
                'Instancia una nueva interfaz completamente nueva basada en los valores en tiempo de ejecución.',
                'Construye un tipo de unión formado por las claves de las propiedades del objeto.',
                'Elimina de forma recursiva todas las claves de un objeto literal apuntado.',
                'Itera sobre los elementos de un arreglo rígidamente tipado.'
              ],
              correctOptionIndex: 1
            }
          },
          {
            title: 'Inicialización del Omni-Sistema',
            type: LessonType.BOSS,
            xpReward: 100,
            content: {
              theory: 'Ha llegado el momento de inicializar el Omni-Sistema. Debes entrelazar sin fisuras Genéricos, Interfaces y operaciones Asíncronas dentro de una única y magistral secuencia de arranque tipada.',
              instructions: 'Redacta una función de inicialización asíncrona genérica `initSystem`, que reciba una configuración de tipo `T` y la retorne de manera asíncrona y segura.',
              initialCode: '// TODO: Define la función asíncrona genérica initSystem\n\ninitSystem({ status: "Omni-Active" }).then(c => console.log(c.status));',
              expectedOutput: 'Omni-Active'
            }
          }
        ]
      }
    ]
  };
};
