import { PrismaClient, LessonType } from '@prisma/client';
import { SeederFunction, LanguageSeed } from './types';

export const getSqlSeed: SeederFunction = async (prisma) => {
  return {
    slug: 'sql',
    name: 'SQL',
    version: '15',
    sections: [
      {
        concept: {
          slug: 'sql-basics',
          title: 'Conceptos Básicos de SQL',
          description: 'Aprende los fundamentos para consultar bases de datos con SQL.',
          orderIndex: 1,
        },
        lessons: [
          {
            title: 'Introducción a las Bases de Datos',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'SQL (Structured Query Language) es el lenguaje estándar para consultar bases de datos relacionales. En este curso, usaremos una base de datos de muestra llamada **Pagila**, que representa un videoclub.',
              instructions: 'Ejecuta la consulta a continuación para probar tu conexión a la base de datos.',
              initialCode: 'SELECT 1 AS result;',
              expectedOutput: 'result\n1'
            }
          },
          {
            title: 'Tu Primera Consulta',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'La sentencia `SELECT` se usa para obtener datos de una base de datos. La cláusula `FROM` especifica la tabla. Por ejemplo: `SELECT * FROM actor;` obtiene todas las columnas.',
              instructions: 'Ejecuta la consulta para obtener los nombres y apellidos de los dos primeros actores en la base de datos.',
              initialCode: 'SELECT first_name, last_name FROM actor ORDER BY actor_id ASC LIMIT 2;',
              expectedOutput: 'first_name,last_name\nPENELOPE,GUINESS\nNICK,WAHLBERG'
            }
          },
          {
            title: 'Seleccionando Columnas Específicas',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'En lugar de usar `*` para seleccionar todas las columnas, es una buena práctica especificar exactamente qué columnas quieres.',
              instructions: 'Escribe una consulta para seleccionar el `title` y `release_year` de la tabla `film`. Ordena por `film_id` de forma ascendente y limita a 2 resultados.',
              initialCode: '-- Selecciona title y release_year de la tabla film\n',
              expectedOutput: 'title,release_year\nACADEMY DINOSAUR,2006\nACE GOLDFINGER,2006'
            }
          },
          {
            title: 'Filtrando con WHERE',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'La cláusula `WHERE` se usa para filtrar registros. Extrae solo aquellos registros que cumplen una condición especificada.',
              instructions: 'Selecciona el `first_name` del actor con `actor_id = 5`.',
              initialCode: '-- Escribe tu consulta aquí\n',
              expectedOutput: 'first_name\nJOHNNY'
            }
          },
          {
            title: 'Misión: Obtener Información de un Actor',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: '¡Tu primera misión como analista de bases de datos!',
              instructions: 'Encuentra el `first_name` y `last_name` del actor cuyo `actor_id` es 10.',
              initialCode: '-- Encuentra al actor 10\n',
              expectedOutput: 'first_name,last_name\nCHRISTIAN,GABLE'
            }
          },
          {
            title: 'Prueba de Conocimiento: Conceptos Básicos de SQL',
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              instructions: '¿Qué cláusula SQL se utiliza para filtrar registros basados en una condición específica?',
              initialCode: '',
              quizOptions: ['SELECT', 'WHERE', 'FROM', 'FILTER'],
              correctOptionIndex: 1
            }
          }
        ]
      },
      {
        concept: {
          slug: 'sorting-pagination',
          title: 'Ordenamiento y Paginación',
          description: 'Controla el orden y la cantidad de datos devueltos por tus consultas.',
          orderIndex: 2,
        },
        lessons: [
          {
            title: 'Orden de Operaciones',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'En SQL, las consultas devuelven los datos en un orden impredecible a menos que se ordenen explícitamente. Además, la paginación te permite manejar grandes conjuntos de datos de manera efectiva.',
              instructions: 'Ejecuta la consulta para continuar.',
              initialCode: "SELECT 'Sorting' AS topic;",
              expectedOutput: 'topic\nSorting'
            }
          },
          {
            title: 'Ordenando con ORDER BY',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'La palabra clave `ORDER BY` se utiliza para ordenar el conjunto de resultados en orden ascendente (`ASC`) o descendente (`DESC`).',
              instructions: 'Ejecuta esta consulta para ver cómo la base de datos ordena los nombres de forma descendente.',
              initialCode: 'SELECT actor_id, first_name FROM actor ORDER BY actor_id DESC LIMIT 2;',
              expectedOutput: 'actor_id,first_name\n200,THORA\n199,JULIA'
            }
          },
          {
            title: 'Eliminando Duplicados con DISTINCT',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'La sentencia `SELECT DISTINCT` se usa para devolver solo valores distintos (diferentes).',
              instructions: 'Escribe una consulta para seleccionar todos los valores distintos de `release_year` de la tabla `film`.',
              initialCode: '-- Selecciona años de lanzamiento distintos\n',
              expectedOutput: 'release_year\n2006'
            }
          },
          {
            title: 'Ordenando por Múltiples Columnas',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Puedes ordenar por múltiples columnas. La base de datos ordena por la primera columna, y si hay un empate, ordena por la segunda.',
              instructions: 'Selecciona `first_name` y `last_name` de `actor`. Ordena por `first_name` de forma descendente, y `last_name` de forma descendente. Limita a 2 resultados.',
              initialCode: '-- Escribe tu consulta aquí\n',
              expectedOutput: 'first_name,last_name\nZERO,SUVARI\nZERO,CAGE'
            }
          },
          {
            title: 'Paginación con LIMIT y OFFSET',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: '`LIMIT` restringe el número de filas devueltas. `OFFSET` omite un número especificado de filas antes de comenzar a devolver filas.',
              instructions: 'Selecciona `actor_id` de `actor` ordenado por `actor_id` de forma ascendente. Limita a 2 filas, y omite las primeras 2 filas (Offset 2).',
              initialCode: '-- Usa LIMIT y OFFSET\n',
              expectedOutput: 'actor_id\n3\n4'
            }
          },
          {
            title: 'Misión: Mejores Películas',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'El gerente de la tienda necesita saber qué películas son las más caras de alquilar.',
              instructions: 'Selecciona el `title` y `rental_rate` de la tabla `film`. Ordénalos por `rental_rate` de forma descendente, luego por `title` de forma ascendente. Limita a 3 resultados.',
              initialCode: '-- Encuentra los alquileres más altos\n',
              expectedOutput: 'title,rental_rate\nACE GOLDFINGER,4.99\nAFFAIR PREJUDICE,4.99\nAFRICAN EGG,4.99'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'pattern-matching',
          title: 'Coincidencia de Patrones y Valores Nulos',
          description: 'Aprende a filtrar texto de manera flexible y a manejar datos faltantes.',
          orderIndex: 3,
        },
        lessons: [
          {
            title: 'Trabajando con Texto',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'SQL proporciona herramientas poderosas para filtrar y manipular datos de texto, como comodines y funciones de cadena.',
              instructions: 'Ejecuta la consulta de marcador de posición.',
              initialCode: "SELECT 'Text processing' AS category;",
              expectedOutput: 'category\nText processing'
            }
          },
          {
            title: 'Coincidencia de Patrones con LIKE',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'El operador `LIKE` se usa en una cláusula `WHERE` para buscar un patrón específico en una columna. El símbolo `%` representa cero, uno o múltiples caracteres.',
              instructions: 'Ejecuta la consulta para encontrar películas que comiencen con "AL".',
              initialCode: "SELECT title FROM film WHERE title LIKE 'AL%' ORDER BY title ASC LIMIT 2;",
              expectedOutput: 'title\nALABAMA DEVIL\nALADDIN CALENDAR'
            }
          },
          {
            title: 'Funciones de Cadena',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Funciones como `UPPER()`, `LOWER()` y `LENGTH()` pueden manipular datos de cadena directamente en tu consulta.',
              instructions: 'Selecciona el `first_name` en minúsculas utilizando la función `LOWER()` de la tabla `actor` donde el `actor_id` es 1.',
              initialCode: '-- Selecciona first_name en minúsculas\n',
              expectedOutput: 'lower\npenelope'
            }
          },
          {
            title: 'Manejando Datos Faltantes con IS NULL',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Un campo con un valor NULL es un campo sin valor. Usa `IS NULL` o `IS NOT NULL` para comprobarlo.',
              instructions: 'Escribe una consulta que seleccione `1 AS result` donde `NULL IS NULL`.',
              initialCode: 'SELECT 1 AS result WHERE NULL IS NULL;',
              expectedOutput: 'result\n1'
            }
          },
          {
            title: 'Múltiples Valores con IN y BETWEEN',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'El operador `IN` te permite especificar múltiples valores en una cláusula `WHERE`. `BETWEEN` selecciona valores dentro de un rango dado.',
              instructions: 'Selecciona `actor_id` de `actor` donde el `actor_id` esté entre 10 y 11. Ordena por `actor_id` de forma ascendente.',
              initialCode: '-- Usa BETWEEN\n',
              expectedOutput: 'actor_id\n10\n11'
            }
          },
          {
            title: 'Misión: Encuentra los Datos Faltantes',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Se te ha encomendado auditar la base de datos para rangos específicos.',
              instructions: 'Selecciona `film_id` de `film` donde `film_id` esté IN (1, 3). Ordena por `film_id` de forma ascendente.',
              initialCode: '-- Encuentra las películas 1 y 3\n',
              expectedOutput: 'film_id\n1\n3'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'joins',
          title: 'Uniones (Joins)',
          description: 'Combina datos de múltiples tablas usando relaciones.',
          orderIndex: 4,
        },
        lessons: [
          {
            title: 'Introducción a Datos Relacionales',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Una base de datos relacional almacena datos en múltiples tablas. Las uniones (Joins) nos permiten combinar filas de dos o más tablas basándose en una columna relacionada entre ellas.',
              instructions: 'Ejecuta la consulta.',
              initialCode: "SELECT 'Joins' AS topic;",
              expectedOutput: 'topic\nJoins'
            }
          },
          {
            title: 'Combinando Datos con INNER JOIN',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'La palabra clave `INNER JOIN` selecciona registros que tienen valores coincidentes en ambas tablas.',
              instructions: 'Ejecuta la consulta para ver cómo los actores y sus IDs de películas están vinculados.',
              initialCode: 'SELECT a.actor_id, a.first_name, fa.film_id FROM actor a INNER JOIN film_actor fa ON a.actor_id = fa.actor_id ORDER BY a.actor_id ASC, fa.film_id ASC LIMIT 2;',
              expectedOutput: 'actor_id,first_name,film_id\n1,PENELOPE,1\n1,PENELOPE,23'
            }
          },
          {
            title: 'Incluyendo Registros No Coincidentes con LEFT JOIN',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'La palabra clave `LEFT JOIN` devuelve todos los registros de la tabla izquierda, y los registros coincidentes de la tabla derecha. Los registros del lado derecho sin coincidencia serán NULL.',
              instructions: 'Selecciona `c.customer_id` y `r.rental_id` usando un LEFT JOIN de `customer c` a `rental r`. Ordena por `c.customer_id` ASC y `r.rental_id` ASC. Limita a 1 resultado.',
              initialCode: '-- Escribe tu consulta con LEFT JOIN\n',
              expectedOutput: 'customer_id,rental_id\n1,76'
            }
          },
          {
            title: 'Uniendo Múltiples Tablas',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'Puedes encadenar múltiples uniones en una sola consulta para conectar datos a través de muchas tablas.',
              instructions: 'Une `actor`, `film_actor` y `film` para encontrar el `title` de las películas donde actúa el `actor_id` = 1. Selecciona `a.first_name` y `f.title`. Ordena por `f.title` ASC y limita a 2.',
              initialCode: '-- Encadena múltiples uniones\n',
              expectedOutput: 'first_name,title\nPENELOPE,ACADEMY DINOSAUR\nPENELOPE,ANACONDA CONFESSIONS'
            }
          },
          {
            title: 'Misión: Catálogo de Actores y Películas',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'El gerente quiere saber a qué categoría pertenece la película "ACADEMY DINOSAUR" (film_id = 1).',
              instructions: 'Une las tablas `category` y `film_category` para encontrar el nombre (`name`) de la categoría para el `film_id` 1.',
              initialCode: '-- Encuentra el nombre de la categoría para film_id 1\n',
              expectedOutput: 'name\nDocumentary'
            }
          },
          {
            title: 'Prueba de Conocimiento: Uniones',
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              instructions: '¿Qué unión devuelve todas las filas de la tabla izquierda, incluso si no hay coincidencias en la tabla derecha?',
              initialCode: '',
              quizOptions: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
              correctOptionIndex: 1
            }
          }
        ]
      },
      {
        concept: {
          slug: 'aggregate-functions',
          title: 'Funciones de Agregación',
          description: 'Realiza cálculos sobre grupos de filas para encontrar totales, promedios y extremos.',
          orderIndex: 5,
        },
        lessons: [
          {
            title: 'Matemáticas en SQL',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Las funciones de agregación realizan un cálculo sobre un conjunto de valores y devuelven un solo valor. Son increíblemente útiles para crear reportes y analizar datos.',
              instructions: 'Ejecuta la consulta matemática.',
              initialCode: 'SELECT 2 + 2 AS result;',
              expectedOutput: 'result\n4'
            }
          },
          {
            title: 'Contando Filas con COUNT',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'La función `COUNT()` devuelve el número de filas que coinciden con un criterio especificado.',
              instructions: 'Ejecuta esta consulta para contar el número total de actores en la base de datos.',
              initialCode: 'SELECT COUNT(*) FROM actor;',
              expectedOutput: 'count\n200'
            }
          },
          {
            title: 'Calculando Totales con SUM y AVG',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: '`SUM()` calcula la suma total de una columna numérica. `AVG()` calcula el valor promedio.',
              instructions: 'Calcula la suma de `film_id` para películas donde `film_id` es menor o igual a 3. Da un alias al resultado como `sum`.',
              initialCode: '-- Calcula la suma\n',
              expectedOutput: 'sum\n6'
            }
          },
          {
            title: 'Extremos con MIN y MAX',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: '`MIN()` y `MAX()` devuelven el valor más pequeño y más grande de la columna seleccionada, respectivamente.',
              instructions: 'Selecciona el `film_id` mínimo (alias como `min_id`) y el `film_id` máximo (alias como `max_id`) de la tabla `film`.',
              initialCode: '-- Encuentra el min y max film_ids\n',
              expectedOutput: 'min_id,max_id\n1,1000'
            }
          },
          {
            title: 'Misión: Estadísticas de Inventario',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Es necesario revisar los niveles de inventario.',
              instructions: 'Usa `COUNT(*)` para encontrar el número total de artículos de inventario disponibles para el `film_id` 1.',
              initialCode: '-- Cuenta el inventario para la película 1\n',
              expectedOutput: 'count\n8'
            }
          },
          {
            title: 'Prueba de Conocimiento: Agregaciones',
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              instructions: '¿Qué función calcula el valor promedio de una columna numérica?',
              initialCode: '',
              quizOptions: ['SUM', 'COUNT', 'AVG', 'MEDIAN'],
              correctOptionIndex: 2
            }
          }
        ]
      },
      {
        concept: {
          slug: 'grouping',
          title: 'Agrupación',
          description: 'Organiza datos en filas de resumen usando las cláusulas GROUP BY y HAVING.',
          orderIndex: 6,
        },
        lessons: [
          {
            title: 'Resumen de Datos',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'La agrupación te permite aplicar funciones de agregación a subconjuntos de datos, agrupando filas que tienen los mismos valores en filas de resumen.',
              instructions: 'Ejecuta la consulta para comenzar a agrupar.',
              initialCode: "SELECT 'Grouping' AS concept;",
              expectedOutput: 'concept\nGrouping'
            }
          },
          {
            title: 'Organizando Datos con GROUP BY',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'La declaración `GROUP BY` agrupa las filas que tienen los mismos valores en filas de resumen, como "encontrar el número de clientes en cada tienda".',
              instructions: 'Ejecuta esta consulta para ver cuántos alquileres ha realizado cada cliente (mostrando los 2 primeros).',
              initialCode: 'SELECT customer_id, COUNT(*) FROM rental GROUP BY customer_id ORDER BY customer_id ASC LIMIT 2;',
              expectedOutput: 'customer_id,count\n1,32\n2,27'
            }
          },
          {
            title: 'Agrupando por Múltiples Columnas',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Puedes agrupar por múltiples columnas para crear resúmenes más detallados.',
              instructions: 'Selecciona `store_id`, `active` y `COUNT(*)` de `customer`. Agrupa por `store_id` y `active`. Ordena por `store_id` ASC y `active` ASC. Limita a 2 resultados.',
              initialCode: '-- Agrupa por tienda y estado activo\n',
              expectedOutput: 'store_id,active,count\n1,0,8\n1,1,318'
            }
          },
          {
            title: 'Filtrando Grupos con HAVING',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'La cláusula `HAVING` se añadió a SQL porque la palabra clave `WHERE` no se puede utilizar con funciones de agregación.',
              instructions: 'Selecciona la clasificación (`rating`) de la tabla `film`. Agrupa por `rating` y filtra los grupos `HAVING COUNT(*) > 200`. Ordena por `rating` ASC. Limita a 1.',
              initialCode: '-- Usa HAVING para filtrar grupos\n',
              expectedOutput: 'rating\nPG-13'
            }
          },
          {
            title: 'Misión: Rendimiento de la Tienda',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Necesitamos analizar las categorías de películas basándonos en recuentos exactos.',
              instructions: 'Selecciona la clasificación (`rating`) de `film` agrupada por `rating` que tenga exactamente 178 películas.',
              initialCode: '-- Encuentra la clasificación con exactamente 178 películas\n',
              expectedOutput: 'rating\nG'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'subqueries-advanced',
          title: 'Subconsultas y Conceptos Avanzados',
          description: 'Aprovecha consultas anidadas y lógica condicional para responder preguntas complejas.',
          orderIndex: 7,
        },
        lessons: [
          {
            title: 'Combinando Consultas',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Una subconsulta es una consulta anidada dentro de otra consulta. Pueden usarse en las sentencias SELECT, INSERT, UPDATE o DELETE.',
              instructions: 'Ejecuta la consulta para continuar.',
              initialCode: "SELECT 'Subqueries' AS topic;",
              expectedOutput: 'topic\nSubqueries'
            }
          },
          {
            title: 'Subconsultas en la Cláusula WHERE',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'Puedes usar una subconsulta en una cláusula `WHERE` para filtrar dinámicamente según los resultados de otra consulta.',
              instructions: 'Ejecuta esta consulta para encontrar el título de la película con el mínimo `film_id`.',
              initialCode: 'SELECT title FROM film WHERE film_id = (SELECT MIN(film_id) FROM film);',
              expectedOutput: 'title\nACADEMY DINOSAUR'
            }
          },
          {
            title: 'Subconsultas en la Cláusula SELECT',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Las subconsultas también pueden usarse directamente en la cláusula `SELECT` para obtener un valor escalar (único) por cada fila.',
              instructions: 'Selecciona `title` y una subconsulta `(SELECT MAX(rental_duration) FROM film)` con el alias `max_dur` de `film`. Ordena por `film_id` ASC y limita a 1.',
              initialCode: '-- Agrega una subconsulta a la cláusula SELECT\n',
              expectedOutput: 'title,max_dur\nACADEMY DINOSAUR,7'
            }
          },
          {
            title: 'Lógica Condicional con CASE',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'La declaración `CASE` evalúa condiciones y devuelve un valor cuando se cumple la primera condición, como una declaración if-then-else.',
              instructions: 'Selecciona `film_id` y una sentencia CASE que devuelva "Short" si `length < 50` y "Long" en caso contrario, con el alias `length_cat`, de la tabla `film` ordenado por `film_id` ASC límite 2.',
              initialCode: '-- Escribe una declaración CASE\n',
              expectedOutput: 'film_id,length_cat\n1,Long\n2,Short'
            }
          },
          {
            title: 'Misión: Reportes Complejos',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Un reporte complejo requiere lógica anidada.',
              instructions: 'Selecciona el `title` de `film` donde el `film_id` sea igual al `actor_id` del actor con el `first_name` "PENELOPE" y el `last_name` "GUINESS".',
              initialCode: '-- Encuentra el título de la película basándote en los datos del actor\n',
              expectedOutput: 'title\nACADEMY DINOSAUR'
            }
          }
        ]
      }
    ]
  };
};
