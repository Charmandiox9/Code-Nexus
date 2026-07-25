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
          title: 'SQL Basics',
          description: 'Learn the fundamentals of querying databases with SQL.',
          orderIndex: 1,
        },
        lessons: [
          {
            title: 'Introduction to Databases',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'SQL (Structured Query Language) is the standard language for querying relational databases. In this course, we will use a sample database called **Pagila**, which represents a movie rental store.',
              instructions: 'Run the query below to test your database connection.',
              initialCode: 'SELECT 1 AS result;',
              expectedOutput: 'result\n1'
            }
          },
          {
            title: 'Your First Query',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The `SELECT` statement is used to retrieve data from a database. The `FROM` clause specifies the table. For example: `SELECT * FROM actor;` retrieves all columns.',
              instructions: 'Run the query to retrieve the first and last names of the first two actors in the database.',
              initialCode: 'SELECT first_name, last_name FROM actor ORDER BY actor_id ASC LIMIT 2;',
              expectedOutput: 'first_name,last_name\nPENELOPE,GUINESS\nNICK,WAHLBERG'
            }
          },
          {
            title: 'Selecting Specific Columns',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Instead of using `*` to select all columns, it is best practice to specify exactly which columns you want.',
              instructions: 'Write a query to select the `title` and `release_year` from the `film` table. Order by `film_id` ascending and limit to 2 results.',
              initialCode: '-- Select title and release_year from the film table\n',
              expectedOutput: 'title,release_year\nACADEMY DINOSAUR,2006\nACE GOLDFINGER,2006'
            }
          },
          {
            title: 'Filtering with WHERE',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'The `WHERE` clause is used to filter records. It extracts only those records that fulfill a specified condition.',
              instructions: 'Select the `first_name` of the actor with `actor_id = 5`.',
              initialCode: '-- Write your query here\n',
              expectedOutput: 'first_name\nJOHNNY'
            }
          },
          {
            title: 'Mission: Retrieve Actor Information',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Your first mission as a database analyst!',
              instructions: 'Find the `first_name` and `last_name` of the actor whose `actor_id` is 10.',
              initialCode: '-- Find actor 10\n',
              expectedOutput: 'first_name,last_name\nCHRISTIAN,GABLE'
            }
          },
          {
            title: 'Knowledge Check: SQL Basics',
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              instructions: 'Which SQL clause is used to filter records based on a specific condition?',
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
          title: 'Sorting & Pagination',
          description: 'Control the order and volume of the data returned by your queries.',
          orderIndex: 2,
        },
        lessons: [
          {
            title: 'Order of Operations',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'In SQL, queries return data in an unpredictable order unless explicitly sorted. Furthermore, pagination allows you to handle large datasets effectively.',
              instructions: 'Run the query to continue.',
              initialCode: "SELECT 'Sorting' AS topic;",
              expectedOutput: 'topic\nSorting'
            }
          },
          {
            title: 'Sorting with ORDER BY',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The `ORDER BY` keyword is used to sort the result-set in ascending (`ASC`) or descending (`DESC`) order.',
              instructions: 'Run this query to see how the database sorts names in descending order.',
              initialCode: 'SELECT actor_id, first_name FROM actor ORDER BY actor_id DESC LIMIT 2;',
              expectedOutput: 'actor_id,first_name\n200,THORA\n199,JULIA'
            }
          },
          {
            title: 'Removing Duplicates with DISTINCT',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'The `SELECT DISTINCT` statement is used to return only distinct (different) values.',
              instructions: 'Write a query to select all distinct `release_year` values from the `film` table.',
              initialCode: '-- Select distinct release years\n',
              expectedOutput: 'release_year\n2006'
            }
          },
          {
            title: 'Sorting by Multiple Columns',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'You can sort by multiple columns. The database sorts by the first column, and if there is a tie, it sorts by the second.',
              instructions: 'Select `first_name` and `last_name` from `actor`. Order by `first_name` descending, and `last_name` descending. Limit to 2 results.',
              initialCode: '-- Write your query here\n',
              expectedOutput: 'first_name,last_name\nZERO,SUVARI\nZERO,CAGE'
            }
          },
          {
            title: 'Pagination with LIMIT and OFFSET',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: '`LIMIT` restricts the number of rows returned. `OFFSET` skips a specified number of rows before beginning to return rows.',
              instructions: 'Select `actor_id` from `actor` ordered by `actor_id` ascending. Limit to 2 rows, and skip the first 2 rows (Offset 2).',
              initialCode: '-- Use LIMIT and OFFSET\n',
              expectedOutput: 'actor_id\n3\n4'
            }
          },
          {
            title: 'Mission: Top Movies',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'The store manager needs to know which movies are the most expensive to rent.',
              instructions: 'Select the `title` and `rental_rate` from the `film` table. Order them by `rental_rate` descending, then by `title` ascending. Limit to 3 results.',
              initialCode: '-- Find the top rentals\n',
              expectedOutput: 'title,rental_rate\nACE GOLDFINGER,4.99\nAFFAIR PREJUDICE,4.99\nAFRICAN EGG,4.99'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'pattern-matching',
          title: 'Pattern Matching & Nulls',
          description: 'Learn to filter text flexibly and handle missing data.',
          orderIndex: 3,
        },
        lessons: [
          {
            title: 'Working with Text',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'SQL provides powerful tools for filtering and manipulating text data, such as wildcards and string functions.',
              instructions: 'Execute the placeholder query.',
              initialCode: "SELECT 'Text processing' AS category;",
              expectedOutput: 'category\nText processing'
            }
          },
          {
            title: 'Pattern Matching with LIKE',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column. `%` represents zero, one, or multiple characters.',
              instructions: 'Run the query to find films starting with "AL".',
              initialCode: "SELECT title FROM film WHERE title LIKE 'AL%' ORDER BY title ASC LIMIT 2;",
              expectedOutput: 'title\nALABAMA DEVIL\nALADDIN CALENDAR'
            }
          },
          {
            title: 'String Functions',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Functions like `UPPER()`, `LOWER()`, and `LENGTH()` can manipulate string data directly in your query.',
              instructions: 'Select the `first_name` in lowercase using the `LOWER()` function from the `actor` table where `actor_id` is 1.',
              initialCode: '-- Select lowercased first_name\n',
              expectedOutput: 'lower\npenelope'
            }
          },
          {
            title: 'Handling Missing Data with IS NULL',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'A field with a NULL value is a field with no value. Use `IS NULL` or `IS NOT NULL` to check for it.',
              instructions: 'Write a query that selects `1 AS result` where `NULL IS NULL`.',
              initialCode: 'SELECT 1 AS result WHERE NULL IS NULL;',
              expectedOutput: 'result\n1'
            }
          },
          {
            title: 'Multiple Values with IN and BETWEEN',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'The `IN` operator allows you to specify multiple values in a `WHERE` clause. `BETWEEN` selects values within a given range.',
              instructions: 'Select `actor_id` from `actor` where the `actor_id` is between 10 and 11. Order by `actor_id` ascending.',
              initialCode: '-- Use BETWEEN\n',
              expectedOutput: 'actor_id\n10\n11'
            }
          },
          {
            title: 'Mission: Find the Missing Data',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'You have been tasked with auditing the database for specific ranges.',
              instructions: 'Select `film_id` from `film` where `film_id` is IN (1, 3). Order by `film_id` ascending.',
              initialCode: '-- Find films 1 and 3\n',
              expectedOutput: 'film_id\n1\n3'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'joins',
          title: 'Joins',
          description: 'Combine data from multiple tables using relationships.',
          orderIndex: 4,
        },
        lessons: [
          {
            title: 'Introduction to Relational Data',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'A relational database stores data in multiple tables. Joins allow us to combine rows from two or more tables based on a related column between them.',
              instructions: 'Run the query.',
              initialCode: "SELECT 'Joins' AS topic;",
              expectedOutput: 'topic\nJoins'
            }
          },
          {
            title: 'Combining Data with INNER JOIN',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The `INNER JOIN` keyword selects records that have matching values in both tables.',
              instructions: 'Run the query to see how actors and their film IDs are linked.',
              initialCode: 'SELECT a.actor_id, a.first_name, fa.film_id FROM actor a INNER JOIN film_actor fa ON a.actor_id = fa.actor_id ORDER BY a.actor_id ASC, fa.film_id ASC LIMIT 2;',
              expectedOutput: 'actor_id,first_name,film_id\n1,PENELOPE,1\n1,PENELOPE,23'
            }
          },
          {
            title: 'Including Unmatched Records with LEFT JOIN',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'The `LEFT JOIN` keyword returns all records from the left table, and the matched records from the right table. Unmatched right side records will be NULL.',
              instructions: 'Select `c.customer_id` and `r.rental_id` using a LEFT JOIN from `customer c` to `rental r`. Order by `c.customer_id` ASC and `r.rental_id` ASC. Limit to 1 result.',
              initialCode: '-- Write your LEFT JOIN query\n',
              expectedOutput: 'customer_id,rental_id\n1,76'
            }
          },
          {
            title: 'Joining Multiple Tables',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'You can chain multiple joins in a single query to connect data across many tables.',
              instructions: 'Join `actor`, `film_actor`, and `film` to find the `title` of films featuring `actor_id` = 1. Select `a.first_name` and `f.title`. Order by `f.title` ASC and limit to 2.',
              initialCode: '-- Chain multiple joins\n',
              expectedOutput: 'first_name,title\nPENELOPE,ACADEMY DINOSAUR\nPENELOPE,ANACONDA CONFESSIONS'
            }
          },
          {
            title: 'Mission: Actor and Film Catalog',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'The manager wants to know what category the film "ACADEMY DINOSAUR" (film_id = 1) belongs to.',
              instructions: 'Join the `category` and `film_category` tables to find the `name` of the category for `film_id` 1.',
              initialCode: '-- Find the category name for film_id 1\n',
              expectedOutput: 'name\nDocumentary'
            }
          },
          {
            title: 'Knowledge Check: Joins',
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              instructions: 'Which join returns all rows from the left table, even if there are no matches in the right table?',
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
          title: 'Aggregate Functions',
          description: 'Perform calculations on groups of rows to find totals, averages, and extremes.',
          orderIndex: 5,
        },
        lessons: [
          {
            title: 'Math in SQL',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Aggregate functions perform a calculation on a set of values and return a single value. They are incredibly useful for reporting and data analysis.',
              instructions: 'Execute the math query.',
              initialCode: 'SELECT 2 + 2 AS result;',
              expectedOutput: 'result\n4'
            }
          },
          {
            title: 'Counting Rows with COUNT',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The `COUNT()` function returns the number of rows that match a specified criterion.',
              instructions: 'Run this query to count the total number of actors in the database.',
              initialCode: 'SELECT COUNT(*) FROM actor;',
              expectedOutput: 'count\n200'
            }
          },
          {
            title: 'Calculating Totals with SUM and AVG',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: '`SUM()` calculates the total sum of a numeric column. `AVG()` calculates the average value.',
              instructions: 'Calculate the sum of `film_id` for films where `film_id` is less than or equal to 3. Alias the result as `sum`.',
              initialCode: '-- Calculate the sum\n',
              expectedOutput: 'sum\n6'
            }
          },
          {
            title: 'Extremes with MIN and MAX',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: '`MIN()` and `MAX()` return the smallest and largest values of the selected column, respectively.',
              instructions: 'Select the minimum `film_id` (alias as `min_id`) and maximum `film_id` (alias as `max_id`) from the `film` table.',
              initialCode: '-- Find the min and max film_ids\n',
              expectedOutput: 'min_id,max_id\n1,1000'
            }
          },
          {
            title: 'Mission: Inventory Stats',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'Inventory levels need checking.',
              instructions: 'Use `COUNT(*)` to find the total number of inventory items available for `film_id` 1.',
              initialCode: '-- Count inventory for film 1\n',
              expectedOutput: 'count\n8'
            }
          },
          {
            title: 'Knowledge Check: Aggregations',
            type: LessonType.BOSS,
            xpReward: 10,
            content: {
              instructions: 'Which function calculates the average value of a numeric column?',
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
          title: 'Grouping',
          description: 'Organize data into summary rows using GROUP BY and HAVING clauses.',
          orderIndex: 6,
        },
        lessons: [
          {
            title: 'Data Summarization',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'Grouping allows you to apply aggregate functions to subsets of data, grouping rows that have the same values into summary rows.',
              instructions: 'Run the query to start grouping.',
              initialCode: "SELECT 'Grouping' AS concept;",
              expectedOutput: 'concept\nGrouping'
            }
          },
          {
            title: 'Organizing Data with GROUP BY',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'The `GROUP BY` statement groups rows that have the same values into summary rows, like "find the number of customers in each store".',
              instructions: 'Run this query to see how many rentals each customer has made (showing the first 2).',
              initialCode: 'SELECT customer_id, COUNT(*) FROM rental GROUP BY customer_id ORDER BY customer_id ASC LIMIT 2;',
              expectedOutput: 'customer_id,count\n1,32\n2,27'
            }
          },
          {
            title: 'Grouping by Multiple Columns',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'You can group by multiple columns to create more granular summaries.',
              instructions: 'Select `store_id`, `active`, and `COUNT(*)` from `customer`. Group by `store_id` and `active`. Order by `store_id` ASC and `active` ASC. Limit to 2 results.',
              initialCode: '-- Group by store and active status\n',
              expectedOutput: 'store_id,active,count\n1,0,8\n1,1,318'
            }
          },
          {
            title: 'Filtering Groups with HAVING',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'The `HAVING` clause was added to SQL because the `WHERE` keyword cannot be used with aggregate functions.',
              instructions: 'Select `rating` from `film`. Group by `rating` and filter for groups `HAVING COUNT(*) > 200`. Order by `rating` ASC. Limit to 1.',
              initialCode: '-- Use HAVING to filter groups\n',
              expectedOutput: 'rating\nPG-13'
            }
          },
          {
            title: 'Mission: Store Performance',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'We need to analyze film categories based on exact counts.',
              instructions: 'Select the `rating` from `film` grouped by `rating` that has exactly 178 films.',
              initialCode: '-- Find the rating with exactly 178 films\n',
              expectedOutput: 'rating\nG'
            }
          }
        ]
      },
      {
        concept: {
          slug: 'subqueries-advanced',
          title: 'Subqueries & Advanced Concepts',
          description: 'Leverage nested queries and conditional logic to answer complex questions.',
          orderIndex: 7,
        },
        lessons: [
          {
            title: 'Combining Queries',
            type: LessonType.INTRO,
            xpReward: 10,
            content: {
              theory: 'A subquery is a query nested inside another query. They can be used in SELECT, INSERT, UPDATE, or DELETE statements.',
              instructions: 'Execute the query to continue.',
              initialCode: "SELECT 'Subqueries' AS topic;",
              expectedOutput: 'topic\nSubqueries'
            }
          },
          {
            title: 'Subqueries in WHERE Clause',
            type: LessonType.DEMO,
            xpReward: 15,
            content: {
              theory: 'You can use a subquery in a `WHERE` clause to filter dynamically based on the results of another query.',
              instructions: 'Run this query to find the title of the film with the minimum `film_id`.',
              initialCode: 'SELECT title FROM film WHERE film_id = (SELECT MIN(film_id) FROM film);',
              expectedOutput: 'title\nACADEMY DINOSAUR'
            }
          },
          {
            title: 'Subqueries in SELECT Clause',
            type: LessonType.EXERCISE_GUIDED,
            xpReward: 20,
            content: {
              theory: 'Subqueries can also be used directly in the `SELECT` clause to fetch a scalar (single) value for every row.',
              instructions: 'Select `title` and a subquery `(SELECT MAX(rental_duration) FROM film)` aliased as `max_dur` from `film`. Order by `film_id` ASC and limit to 1.',
              initialCode: '-- Add a subquery to the SELECT clause\n',
              expectedOutput: 'title,max_dur\nACADEMY DINOSAUR,7'
            }
          },
          {
            title: 'Conditional Logic with CASE',
            type: LessonType.EXERCISE_FREE,
            xpReward: 25,
            content: {
              theory: 'The `CASE` statement goes through conditions and returns a value when the first condition is met, like an if-then-else statement.',
              instructions: 'Select `film_id` and a CASE statement that returns "Short" if `length < 50` else "Long", aliased as `length_cat`, from `film` ordered by `film_id` ASC limit 2.',
              initialCode: '-- Write a CASE statement\n',
              expectedOutput: 'film_id,length_cat\n1,Long\n2,Short'
            }
          },
          {
            title: 'Mission: Complex Reporting',
            type: LessonType.BOSS,
            xpReward: 50,
            content: {
              theory: 'A complex report requires nested logic.',
              instructions: 'Select the `title` from `film` where the `film_id` equals the `actor_id` of the actor with `first_name` "PENELOPE" and `last_name` "GUINESS".',
              initialCode: '-- Find the film title based on actor data\n',
              expectedOutput: 'title\nACADEMY DINOSAUR'
            }
          }
        ]
      }
    ]
  };
};
