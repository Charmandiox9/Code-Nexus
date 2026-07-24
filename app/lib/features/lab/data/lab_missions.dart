final List<Map<String, dynamic>> allLabMissions = [
  // --- PYTHON FUNDAMENTALS ---
  
  // Debugging
  {
    'id': 'py_debug_1',
    'title': 'Debugging: Error de Sintaxis',
    'desc': 'Este código tiene un error. Encuéntralo y corrígelo para que retorne la suma de la lista.',
    'rewardXp': 150,
    'rewardCrystals': 30,
    'language': 'python',
    'difficulty': 'Díficil',
    'reqLessons': 0,
    'initialCode': 'def sumar_lista(lista):\n    total = 0\n    for n in lista\n        total += n\n    return total\n\nprint(sumar_lista([1, 2, 3]))',
    'expectedOutput': '6'
  },
  // Fundamento: Quiz Kahoot Style
  {
    'id': 'py_quiz_1',
    'title': 'Quiz: ¿Cuál es el output?',
    'desc': 'Lee el código y selecciona la salida correcta. (Kahoot style)',
    'rewardXp': 50,
    'rewardCrystals': 10,
    'language': 'python',
    'difficulty': 'Fácil',
    'reqLessons': 0,
    'initialCode': 'def misterio(x):\n    return x * 2 if x > 5 else x + 2\n\nprint(misterio(4))\nprint(misterio(6))',
    'quizOptions': [
      '8 y 8',
      '6 y 12',
      '8 y 12',
      'Error'
    ],
    'correctOptionIndex': 1
  },

  {
    'id': 'js_quiz_1',
    'title': 'Quiz JS: Contexto',
    'desc': '¿Qué imprimirá el siguiente código en la consola? (Kahoot style)',
    'rewardXp': 100,
    'rewardCrystals': 20,
    'language': 'javascript',
    'difficulty': 'Intermedio',
    'reqLessons': 0,
    'initialCode': 'const obj = {\n  val: 42,\n  getVal: function() {\n    return this.val;\n  }\n};\nconst func = obj.getVal;\nconsole.log(func());',
    'quizOptions': [
      '42',
      'undefined',
      'TypeError',
      'null'
    ],
    'correctOptionIndex': 1
  },

  // Fundamento: Variables
  {
    'id': 'py_var_1',
    'title': 'Variables: Intercambio',
    'desc': 'Intercambia el valor de las variables a y b sin usar una tercera variable temporal.',
    'rewardXp': 50,
    'rewardCrystals': 10,
    'language': 'python',
    'difficulty': 'Fácil',
    'reqLessons': 0,
    'initialCode': 'def intercambio(a, b):\n    # Tu código aquí. Retorna a, b\n    pass\n\nprint(intercambio(10, 5))',
    'expectedOutput': '(5, 10)'
  },
  {
    'id': 'py_var_2',
    'title': 'Variables: Formateo',
    'desc': r'Dado el nombre, la edad y el saldo, retorna un f-string: "Hola {nombre}, tienes {edad} años y ${saldo}".',
    'rewardXp': 100,
    'rewardCrystals': 20,
    'language': 'python',
    'difficulty': 'Intermedio',
    'reqLessons': 0,
    'initialCode': 'def formatear(nombre, edad, saldo):\n    # Tu código aquí\n    pass\n\nprint(formatear("Ana", 25, 100.5))',
    'expectedOutput': r'Hola Ana, tienes 25 años y $100.5'
  },

  // Fundamento: Condicionales
  {
    'id': 'py_cond_1',
    'title': 'Condicionales: Par o Impar',
    'desc': 'Crea una función que retorne "Par" si el número es par, o "Impar" si no lo es.',
    'rewardXp': 50,
    'rewardCrystals': 10,
    'language': 'python',
    'difficulty': 'Fácil',
    'reqLessons': 1,
    'initialCode': 'def par_impar(n):\n    # Tu código aquí\n    pass\n\nprint(par_impar(4))\nprint(par_impar(7))',
    'expectedOutput': 'Par\nImpar'
  },
  {
    'id': 'py_cond_2',
    'title': 'Condicionales: Año Bisiesto',
    'desc': 'Un año es bisiesto si es divisible por 4, excepto si es divisible por 100 pero no por 400. Retorna True o False.',
    'rewardXp': 100,
    'rewardCrystals': 20,
    'language': 'python',
    'difficulty': 'Intermedio',
    'reqLessons': 1,
    'initialCode': 'def bisiesto(anio):\n    # Tu código aquí\n    pass\n\nprint(bisiesto(2024))\nprint(bisiesto(1900))',
    'expectedOutput': 'True\nFalse'
  },

  // Fundamento: Bucles
  {
    'id': 'py_loop_1',
    'title': 'Bucles: Suma N',
    'desc': 'Usa un bucle para sumar todos los números desde 1 hasta n (inclusive) y retorna el total.',
    'rewardXp': 50,
    'rewardCrystals': 10,
    'language': 'python',
    'difficulty': 'Fácil',
    'reqLessons': 2,
    'initialCode': 'def suma_n(n):\n    # Tu código aquí\n    pass\n\nprint(suma_n(5))',
    'expectedOutput': '15'
  },
  {
    'id': 'py_loop_2',
    'title': 'Bucles: Primo',
    'desc': 'Verifica si un número n es primo usando un bucle. Retorna True o False.',
    'rewardXp': 100,
    'rewardCrystals': 20,
    'language': 'python',
    'difficulty': 'Intermedio',
    'reqLessons': 2,
    'initialCode': 'def es_primo(n):\n    # Tu código aquí\n    pass\n\nprint(es_primo(7))\nprint(es_primo(10))',
    'expectedOutput': 'True\nFalse'
  },

  // Fundamento: Listas
  {
    'id': 'py_list_1',
    'title': 'Listas: Elemento Mayor',
    'desc': 'Encuentra y retorna el número mayor de una lista sin usar max().',
    'rewardXp': 50,
    'rewardCrystals': 10,
    'language': 'python',
    'difficulty': 'Fácil',
    'reqLessons': 3,
    'initialCode': 'def maximo(lista):\n    # Tu código aquí\n    pass\n\nprint(maximo([3, 8, 2, 10, 5]))',
    'expectedOutput': '10'
  },
  {
    'id': 'py_list_2',
    'title': 'Listas: Eliminar Duplicados',
    'desc': 'Retorna una nueva lista preservando el orden original pero eliminando elementos duplicados.',
    'rewardXp': 100,
    'rewardCrystals': 20,
    'language': 'python',
    'difficulty': 'Intermedio',
    'reqLessons': 3,
    'initialCode': 'def sin_duplicados(lista):\n    # Tu código aquí\n    pass\n\nprint(sin_duplicados([1, 2, 2, 3, 1, 4]))',
    'expectedOutput': '[1, 2, 3, 4]'
  },

  // --- JAVASCRIPT FUNDAMENTALS ---
  
  // Fundamento: Variables
  {
    'id': 'js_var_1',
    'title': 'Variables: Destructuración',
    'desc': 'Dado un objeto con {x, y, z}, usa destructuración para retornar la suma de x + y + z.',
    'rewardXp': 50,
    'rewardCrystals': 10,
    'language': 'javascript',
    'difficulty': 'Fácil',
    'reqLessons': 0,
    'initialCode': 'function sumaObjeto(obj) {\n  // Tu código aquí\n}\n\nconsole.log(sumaObjeto({x: 1, y: 2, z: 3}));',
    'expectedOutput': '6'
  },
  {
    'id': 'js_var_2',
    'title': 'Variables: Let vs Const',
    'desc': 'Crea un arreglo constante y agrégale el número 4 usando .push(), luego retorna el arreglo modificado.',
    'rewardXp': 100,
    'rewardCrystals': 20,
    'language': 'javascript',
    'difficulty': 'Intermedio',
    'reqLessons': 0,
    'initialCode': 'function modificarConstante() {\n  const arr = [1, 2, 3];\n  // Tu código aquí\n  return arr;\n}\n\nconsole.log(modificarConstante());',
    'expectedOutput': '[ 1, 2, 3, 4 ]'
  },

  // Fundamento: Funciones Flecha
  {
    'id': 'js_func_1',
    'title': 'Funciones: Doblar',
    'desc': 'Usa una función flecha y el método .map() para duplicar cada elemento del arreglo.',
    'rewardXp': 50,
    'rewardCrystals': 10,
    'language': 'javascript',
    'difficulty': 'Fácil',
    'reqLessons': 1,
    'initialCode': 'const doblar = (arr) => {\n  // Tu código aquí\n};\n\nconsole.log(doblar([1, 2, 3]));',
    'expectedOutput': '[ 2, 4, 6 ]'
  },
  {
    'id': 'js_func_2',
    'title': 'Funciones: Filtrar y Reducir',
    'desc': 'Filtra los números pares de un arreglo y luego súmalos usando .filter() y .reduce().',
    'rewardXp': 100,
    'rewardCrystals': 20,
    'language': 'javascript',
    'difficulty': 'Intermedio',
    'reqLessons': 1,
    'initialCode': 'const sumaPares = (arr) => {\n  // Tu código aquí\n};\n\nconsole.log(sumaPares([1, 2, 3, 4, 5, 6]));',
    'expectedOutput': '12'
  },

  // Fundamento: Promesas / Async
  {
    'id': 'js_async_1',
    'title': 'Async: Promesa Simple',
    'desc': 'Retorna una Promesa que se resuelva con "Hola" después de 50ms.',
    'rewardXp': 50,
    'rewardCrystals': 10,
    'language': 'javascript',
    'difficulty': 'Fácil',
    'reqLessons': 2,
    'initialCode': 'function decirHola() {\n  // Tu código aquí\n}\n\ndecirHola().then(console.log);',
    'expectedOutput': 'Hola'
  },
  {
    'id': 'js_async_2',
    'title': 'Async: Manejo de Errores',
    'desc': 'Llama a fetchData(). Si falla, retorna "Error capturado". Usa try/catch y async/await.',
    'rewardXp': 100,
    'rewardCrystals': 20,
    'language': 'javascript',
    'difficulty': 'Intermedio',
    'reqLessons': 2,
    'initialCode': 'function fetchData() { return Promise.reject("Fallo"); }\n\nasync function seguraFetch() {\n  // Tu código aquí\n}\n\nseguraFetch().then(console.log);',
    'expectedOutput': 'Error capturado'
  }
];
