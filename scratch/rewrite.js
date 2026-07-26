const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../backend/prisma/seeds/javascript.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace instructions and initialCode for specific lessons

// 1. Protocolo de Inicialización
content = content.replace(
  `instructions: 'Agente, necesitamos establecer una conexión segura. Inicializa una variable constante llamada \`connectionStatus\` y establécela con la cadena "SECURE". Imprímela.',
              initialCode: '// Inicializa connectionStatus aquí\\n// console.log(connectionStatus);',`,
  `instructions: 'Agente, necesitamos establecer una conexión segura. Sigue los TODOs para inicializar una variable constante llamada \`connectionStatus\` y establécela con la cadena "SECURE". Imprímela.',
              initialCode: '// TODO: Inicializa connectionStatus con "SECURE"\\n\\n// TODO: Imprime connectionStatus',`
);

// 2. Reasignación de Memoria
content = content.replace(
  `instructions: 'El cortafuegos está cambiando dinámicamente. Primero, imprime la \`firewallKey\`. Luego, reasígnala a "BETA-99" y vuelve a imprimirla.',
              initialCode: 'let firewallKey = "ALPHA-01";\\n// Imprime firewallKey\\n\\n// Reasigna a "BETA-99"\\n\\n// Imprime de nuevo',`,
  `instructions: 'El cortafuegos está cambiando dinámicamente. Completa los TODOs: primero imprime la \`firewallKey\`, luego reasígnala a "BETA-99" y vuelve a imprimirla.',
              initialCode: 'let firewallKey = "ALPHA-01";\\n// TODO: Imprime firewallKey\\n\\n// TODO: Reasigna a "BETA-99"\\n\\n// TODO: Imprime de nuevo',`
);

// 3. Interpolación de Cadenas
content = content.replace(
  `instructions: 'Construye un saludo para la computadora central. Combina \`agentName\` y \`clearance\` en un mensaje: "Agent Neo, Clearance Level 5". Imprime el resultado.',
              initialCode: 'const agentName = "Neo";\\nconst clearance = 5;\\n// Crea e imprime el mensaje',`,
  `instructions: 'Construye un saludo para la computadora central. Sigue el TODO para combinar \`agentName\` y \`clearance\` en un mensaje: "Agent Neo, Clearance Level 5". Imprime el resultado.',
              initialCode: 'const agentName = "Neo";\\nconst clearance = 5;\\n// TODO: Crea el mensaje "Agent Neo, Clearance Level 5" e imprímelo usando backticks (\`)',`
);

// 4. El Fallo de la Variable
content = content.replace(
  `instructions: 'Corrige el script para que inicialice correctamente el sistema antes de intentar acceder a las variables.',
              initialCode: 'console.log(systemStatus);\\nlet systemStatus = "ONLINE";',`,
  `instructions: 'Corrige el script para que inicialice correctamente el sistema antes de intentar acceder a las variables.',
              initialCode: '// TODO: El orden es incorrecto. Inicializa la variable ANTES de imprimirla.\\nconsole.log(systemStatus);\\nlet systemStatus = "ONLINE";',`
);

// 5. Rutas de Ramificación
content = content.replace(
  `instructions: 'Escribe una sentencia \`if\` que imprima "ACCESS GRANTED" si \`accessCode\` es exactamente 42.',
              initialCode: 'const accessCode = 42;\\n// Tu lógica aquí',`,
  `instructions: 'Escribe una sentencia \`if\` que imprima "ACCESS GRANTED" si \`accessCode\` es exactamente 42.',
              initialCode: 'const accessCode = 42;\\n// TODO: Escribe un if que compruebe si accessCode es 42 y luego imprima "ACCESS GRANTED"',`
);

// 6. Ciclos de Bucle
content = content.replace(
  `instructions: 'Necesitamos hacer ping a 3 servidores secuencialmente. Escribe un bucle \`for\` que imprima "Ping 1", "Ping 2", "Ping 3".',
              initialCode: '// Escribe un bucle for de 1 a 3\\n',`,
  `instructions: 'Necesitamos hacer ping a 3 servidores secuencialmente. Escribe un bucle \`for\` que imprima "Ping 1", "Ping 2", "Ping 3".',
              initialCode: '// TODO: Escribe un bucle for que empiece en 1 y termine en 3, imprimiendo "Ping " + el número en cada iteración\\n',`
);

// 7. Evitar el Bucle Infinito
content = content.replace(
  `instructions: 'Usa un bucle \`while\` para agotar la batería de 3 hasta 1. Imprime "Battery at X" para cada paso.',
              initialCode: 'let battery = 3;\\n// Tu bucle while aquí',`,
  `instructions: 'Usa un bucle \`while\` para agotar la batería de 3 hasta 1. Imprime "Battery at X" para cada paso.',
              initialCode: 'let battery = 3;\\n// TODO: Escribe un bucle while que imprima "Battery at " + battery y reste 1 a la batería en cada iteración hasta 1',`
);

// 8. Omisión de Seguridad
content = content.replace(
  `instructions: 'Haz un bucle a través de los números del 1 al 5. Si el número es par, imprime "EVEN". Si es impar, imprime "ODD". Debes coincidir con la secuencia requerida para poder omitirla.',
              initialCode: '// Escribe la lógica del bucle\\n',`,
  `instructions: 'Haz un bucle a través de los números del 1 al 5. Si el número es par, imprime "EVEN". Si es impar, imprime "ODD". Debes coincidir con la secuencia requerida para poder omitirla.',
              initialCode: '// TODO: Haz un bucle del 1 al 5. Si el número es par imprime "EVEN", si es impar imprime "ODD"\\n',`
);

// 9. Subrutinas
content = content.replace(
  `instructions: 'Define una función llamada \`decrypt\` que devuelva la cadena "DATA". Llámala e imprime el resultado.',
              initialCode: '// Define decrypt\\n',`,
  `instructions: 'Define una función llamada \`decrypt\` que devuelva la cadena "DATA". Llámala e imprime el resultado.',
              initialCode: '// TODO: Define una función decrypt que retorne "DATA"\\n\\n// TODO: Llama a la función e imprime el resultado',`
);

// 10. Infiltración de Ámbito
content = content.replace(
  `instructions: 'Crea una función \`getSecret\` que devuelva la variable global \`secretData\`. Llámala e imprime el resultado.',
              initialCode: 'const secretData = "CLASSIFIED";\\n// Escribe getSecret',`,
  `instructions: 'Crea una función \`getSecret\` que devuelva la variable global \`secretData\`. Llámala e imprime el resultado.',
              initialCode: 'const secretData = "CLASSIFIED";\\n// TODO: Crea una función getSecret que retorne la variable secretData\\n\\n// TODO: Llama a la función e imprime el resultado',`
);

// 11. Parámetros por Defecto
content = content.replace(
  `instructions: 'Escribe una función \`connect(port = 8080)\` que imprima "Connecting to port " + port. Llámala sin argumentos.',
              initialCode: '// Escribe la función connect\\n',`,
  `instructions: 'Escribe una función \`connect(port = 8080)\` que imprima "Connecting to port " + port. Llámala sin argumentos.',
              initialCode: '// TODO: Escribe una función connect(port = 8080) que imprima "Connecting to port " + port\\n\\n// TODO: Llama a connect() sin argumentos',`
);

// 12. Cifrado de Protocolo
content = content.replace(
  `instructions: 'Escribe una función recursiva \`countdown(n)\` que imprima los números desde \`n\` hasta 1. Llámala con 3.',
              initialCode: '// Escribe countdown(n)\\n',`,
  `instructions: 'Escribe una función recursiva \`countdown(n)\` que imprima los números desde \`n\` hasta 1. Llámala con 3.',
              initialCode: '// TODO: Escribe una función recursiva countdown(n) que imprima de n hasta 1\\n\\n// TODO: Llama a countdown(3)',`
);

// 13. Anulación de Subrutina
content = content.replace(
  `instructions: 'Corrige la función flecha \`calculateTotal\` para que devuelva correctamente la suma. Actualmente le falta una sentencia return o la sintaxis de retorno implícito.',
              initialCode: 'const calculateTotal = (a, b) => { a + b };\\nconsole.log(calculateTotal(10, 20));',`,
  `instructions: 'Corrige la función flecha \`calculateTotal\` para que devuelva correctamente la suma. Actualmente le falta una sentencia return o la sintaxis de retorno implícito.',
              initialCode: '// TODO: Esta función flecha no retorna el valor correctamente. Corrige la sintaxis.\\nconst calculateTotal = (a, b) => { a + b };\\nconsole.log(calculateTotal(10, 20));',`
);

// 14. Bloques de Memoria
content = content.replace(
  `instructions: 'Crea un arreglo llamado \`nodes\` que contenga "Alpha", "Beta", "Gamma". Imprime el segundo elemento (Beta).',
              initialCode: '// Crea el arreglo nodes\\n',`,
  `instructions: 'Crea un arreglo llamado \`nodes\` que contenga "Alpha", "Beta", "Gamma". Imprime el segundo elemento (Beta).',
              initialCode: '// TODO: Crea un arreglo llamado nodes que contenga "Alpha", "Beta", "Gamma"\\n\\n// TODO: Imprime el segundo elemento (Beta)',`
);

// 15. Mapear la Red
content = content.replace(
  `instructions: 'Necesitamos cifrar estos IDs. Usa \`.map()\` para multiplicar cada número en \`ids\` por 2. Imprime los elementos del nuevo arreglo separados por un espacio usando .join(" ").',
              initialCode: 'const ids = [1, 2, 3];\\n// mapped = ...\\n// console.log(mapped.join(" "));',`,
  `instructions: 'Necesitamos cifrar estos IDs. Usa \`.map()\` para multiplicar cada número en \`ids\` por 2. Imprime los elementos del nuevo arreglo separados por un espacio usando .join(" ").',
              initialCode: 'const ids = [1, 2, 3];\\n// TODO: Usa ids.map() para multiplicar cada elemento por 2 y guárdalo en mapped\\nconst mapped = [];\\n// TODO: Imprime mapped.join(" ")',`
);

// 16. Filtrar el Ruido
content = content.replace(
  `instructions: 'Filtra los servidores desconectados (offline). Imprime solo los servidores con estado "online" extrayendo sus nombres y uniéndolos con un espacio.',
              initialCode: 'const servers = [\\n {name: "A", status: "online"},\\n {name: "B", status: "offline"},\\n {name: "C", status: "online"}\\n];\\n// filtra e imprime',`,
  `instructions: 'Filtra los servidores desconectados (offline). Imprime solo los servidores con estado "online" extrayendo sus nombres y uniéndolos con un espacio.',
              initialCode: 'const servers = [\\n {name: "A", status: "online"},\\n {name: "B", status: "offline"},\\n {name: "C", status: "online"}\\n];\\n// TODO: Usa .filter() para obtener los servidores online, luego .map() para obtener sus nombres, y luego join(" ") e imprímelo',`
);

// 17. Reducir la Carga Útil
content = content.replace(
  `instructions: 'Calcula el tamaño total del archivo. Usa \`.reduce()\` para sumar el arreglo \`sizes\` e imprime el total.',
              initialCode: 'const sizes = [10, 20, 30, 40];\\n// reduce e imprime',`,
  `instructions: 'Calcula el tamaño total del archivo. Usa \`.reduce()\` para sumar el arreglo \`sizes\` e imprime el total.',
              initialCode: 'const sizes = [10, 20, 30, 40];\\n// TODO: Usa .reduce() para sumar todos los números en sizes e imprime el total',`
);

// 18. Anomalía de Ordenamiento de Arreglos
content = content.replace(
  `instructions: 'Ordena el arreglo \`threatLevels\` en orden numérico ascendente e imprímelo como una cadena separada por espacios.',
              initialCode: 'const threatLevels = [100, 2, 45, 9];\\n// ordena e imprime',`,
  `instructions: 'Ordena el arreglo \`threatLevels\` en orden numérico ascendente e imprímelo como una cadena separada por espacios.',
              initialCode: 'const threatLevels = [100, 2, 45, 9];\\n// TODO: Usa .sort() con una función de comparación para ordenar los números numéricamente y luego imprímelos separados por un espacio',`
);

// 19. Estructuras de Datos
content = content.replace(
  `instructions: 'Construye un objeto \`user\` con las propiedades \`handle\` ("Neo") y \`rank\` (99). Imprime \`user.handle\`.',
              initialCode: '// Crea user\\n',`,
  `instructions: 'Construye un objeto \`user\` con las propiedades \`handle\` ("Neo") y \`rank\` (99). Imprime \`user.handle\`.',
              initialCode: '// TODO: Construye un objeto user con handle ("Neo") y rank (99)\\n\\n// TODO: Imprime user.handle',`
);

// 20. Acceso por Desestructuración
content = content.replace(
  `instructions: 'Extrae \`cpu\` y \`ram\` del objeto \`system\` usando la desestructuración. Imprímelos separados por un espacio.',
              initialCode: 'const system = { cpu: "Quantum", ram: "1TB", disk: "2PB" };\\n// desestructura\\n',`,
  `instructions: 'Extrae \`cpu\` y \`ram\` del objeto \`system\` usando la desestructuración. Imprímelos separados por un espacio.',
              initialCode: 'const system = { cpu: "Quantum", ram: "1TB", disk: "2PB" };\\n// TODO: Desestructura cpu y ram de system\\n\\n// TODO: Imprime cpu y ram separados por un espacio',`
);

// 21. Operador de Propagación
content = content.replace(
  `instructions: 'Combina \`baseConfig\` y \`userConfig\` en un nuevo objeto \`finalConfig\` usando el operador de propagación. Imprime \`finalConfig.theme\`.',
              initialCode: 'const baseConfig = { theme: "light", port: 80 };\\nconst userConfig = { theme: "dark" };\\n// combina e imprime',`,
  `instructions: 'Combina \`baseConfig\` y \`userConfig\` en un nuevo objeto \`finalConfig\` usando el operador de propagación. Imprime \`finalConfig.theme\`.',
              initialCode: 'const baseConfig = { theme: "light", port: 80 };\\nconst userConfig = { theme: "dark" };\\n// TODO: Usa el operador de propagación (...) para combinar baseConfig y userConfig en finalConfig\\nconst finalConfig = {};\\n// TODO: Imprime finalConfig.theme',`
);

// 22. Contexto de Ejecución
content = content.replace(
  `instructions: 'Observa el orden de ejecución. Escribe código que imprima "1", luego llame a una función que imprima "2", luego imprima "3".',
              initialCode: '// Escribe la lógica\\n',`,
  `instructions: 'Observa el orden de ejecución. Escribe código que imprima "1", luego llame a una función que imprima "2", luego imprima "3".',
              initialCode: '// TODO: Imprime "1"\\n// TODO: Crea una función que imprima "2" y llámala aquí\\n// TODO: Imprime "3"',`
);

// 23. Mecánicas de Hoisting
content = content.replace(
  `instructions: 'Llama a \`activateSystem()\` ANTES de que esté definida en el código. Imprime "System Active" dentro de la función.',
              initialCode: '// Llama a activateSystem aquí\\n\\nfunction activateSystem() {\\n  // Imprímelo\\n}',`,
  `instructions: 'Llama a \`activateSystem()\` ANTES de que esté definida en el código. Imprime "System Active" dentro de la función.',
              initialCode: '// TODO: Llama a activateSystem() aquí (antes de su definición)\\n\\nfunction activateSystem() {\\n  // TODO: Imprime "System Active"\\n}',`
);

// 24. La Palabra Clave 'this'
content = content.replace(
  `instructions: 'Corrige el código para que \`this\` apunte al objeto usando \`.bind()\` o una función flecha, imprimiendo "Secure".',
              initialCode: 'const module = {\\n status: "Secure",\\n getStatus() { return this.status; }\\n};\\nconst unboundGetStatus = module.getStatus;\\n// Corrige e imprime el resultado',`,
  `instructions: 'Corrige el código para que \`this\` apunte al objeto usando \`.bind()\` o una función flecha, imprimiendo "Secure".',
              initialCode: 'const module = {\\n status: "Secure",\\n getStatus() { return this.status; }\\n};\\n// TODO: unboundGetStatus pierde el contexto de "this". Usa .bind(module) al asignarlo.\\nconst unboundGetStatus = module.getStatus;\\nconsole.log(unboundGetStatus());',`
);

// 25. Prototipos
content = content.replace(
  `instructions: 'Añade un método \`greet\` a \`String.prototype\` que devuelva "Hello " + this. Imprime \`"Agent".greet()\`. (¡Úsalo con cuidado en código real!)',
              initialCode: '// Añade a String.prototype\\n\\nconsole.log("Agent".greet());',`,
  `instructions: 'Añade un método \`greet\` a \`String.prototype\` que devuelva "Hello " + this. Imprime \`"Agent".greet()\`. (¡Úsalo con cuidado en código real!)',
              initialCode: '// TODO: Añade el método greet a String.prototype para que retorne "Hello " + this\\n\\nconsole.log("Agent".greet());',`
);

// 26. Trampa del Closure
content = content.replace(
  `instructions: 'Corrige el bucle para usar alcance de bloque (\`let\`) para que imprima 0, 1, 2 secuencialmente. (Elimina la IIFE y usa un bucle let simple).',
              initialCode: 'for (var i = 0; i < 3; i++) {\\n  ((i) => console.log(i))(i);\\n}',`,
  `instructions: 'Corrige el bucle para usar alcance de bloque (\`let\`) para que imprima 0, 1, 2 secuencialmente. (Elimina la IIFE y usa un bucle let simple).',
              initialCode: '// TODO: El bucle usa var, lo que causa problemas con closures. Cambia el bucle a let y simplifica a console.log(i).\\nfor (var i = 0; i < 3; i++) {\\n  ((i) => console.log(i))(i);\\n}',`
);

// 27. El Bucle de Eventos
content = content.replace(
  `instructions: 'Imprime "A", luego usa \`setTimeout\` con 0ms para imprimir "C", luego imprime "B". Observa el orden.',
              initialCode: '// Tu lógica asíncrona aquí\\n',`,
  `instructions: 'Imprime "A", luego usa \`setTimeout\` con 0ms para imprimir "C", luego imprime "B". Observa el orden.',
              initialCode: '// TODO: Imprime "A"\\n// TODO: Usa setTimeout para imprimir "C" con 0ms de retraso\\n// TODO: Imprime "B"',`
);

// 28. Sintaxis Async/Await
content = content.replace(
  `instructions: 'Crea una función \`async\` \`fetchData\` que haga \`await\` de un \`Promise.resolve("Data Loaded")\`. Imprime el resultado.',
              initialCode: '// Escribe la función asíncrona fetchData\\n',`,
  `instructions: 'Crea una función \`async\` \`fetchData\` que haga \`await\` de un \`Promise.resolve("Data Loaded")\`. Imprime el resultado.',
              initialCode: '// TODO: Crea una función asíncrona fetchData\\n// TODO: Dentro de fetchData, haz await de Promise.resolve("Data Loaded") e imprime el resultado\\n// TODO: Llama a fetchData()',`
);

// 29. Manejo de Errores
content = content.replace(
  `instructions: 'Escribe un bloque \`try...catch\`. Lanza (throw) un error con el mensaje "Network Failure", captúralo (catch), e imprime el mensaje de error.',
              initialCode: 'try {\\n // lanza el error\\n} catch(err) {\\n // imprime err.message\\n}',`,
  `instructions: 'Escribe un bloque \`try...catch\`. Lanza (throw) un error con el mensaje "Network Failure", captúralo (catch), e imprime el mensaje de error.',
              initialCode: '// TODO: Usa un bloque try...catch. Lanza (throw) un new Error("Network Failure"), captúralo, e imprime err.message\\ntry {\\n\\n} catch(err) {\\n\\n}',`
);

// 30. La Brecha Asíncrona
content = content.replace(
  `instructions: 'Usa \`Promise.all()\` para esperar a ambos, \`p1\` (resuelve con "Access") y \`p2\` (resuelve con "Granted"). Imprime el arreglo resultante separado por un espacio usando .join(" ").',
              initialCode: 'const p1 = Promise.resolve("Access");\\nconst p2 = Promise.resolve("Granted");\\n// Escribe la lógica de Promise.all\\n',`,
  `instructions: 'Usa \`Promise.all()\` para esperar a ambos, \`p1\` (resuelve con "Access") y \`p2\` (resuelve con "Granted"). Imprime el arreglo resultante separado por un espacio usando .join(" ").',
              initialCode: 'const p1 = Promise.resolve("Access");\\nconst p2 = Promise.resolve("Granted");\\n// TODO: Usa Promise.all([p1, p2]) y luego imprime el resultado unido por un espacio\\n',`
);

fs.writeFileSync(filePath, content);
console.log('Done replacement');
