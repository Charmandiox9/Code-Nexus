# CodeNexus GraphQL API Documentation

Esta es la documentación de la API GraphQL de CodeNexus (Hosteada en `http://localhost:3000/graphql`). El esquema sigue un enfoque "code-first" generado a través de NestJS.

## Queries (Consultas)

Las Queries se utilizan para leer información del sistema.

### 1. `users`
*   **Descripción**: Obtiene la lista de todos los usuarios registrados en el sistema.
*   **Retorno**: `[User!]!`

### 2. `gamificationProfile(userId: String!)`
*   **Descripción**: Obtiene el perfil de gamificación de un usuario específico. Incluye sus niveles, XP, rachas (streaks), inventario, mascotas y títulos.
*   **Parámetros**: `userId` (El ID del usuario).
*   **Retorno**: `GamificationProfile!`

### 3. `concepts`
*   **Descripción**: Obtiene todos los conceptos o módulos de aprendizaje disponibles en la plataforma con sus respectivas lecciones y misiones anidadas.
*   **Retorno**: `[Concept!]!`

### 4. `getFriends(userId: String!)`
*   **Descripción**: Recupera la lista de amigos y el grafo social de un usuario.
*   **Parámetros**: `userId`.
*   **Retorno**: `[JSON!]!`

### 5. `getFriendActivityFeed(userId: String!)`
*   **Descripción**: Devuelve la actividad reciente de la red social de amigos del usuario (Logros conseguidos, misiones completadas).
*   **Parámetros**: `userId`.
*   **Retorno**: `[JSON!]!`

### 6. `getLeaderboard(language: String, userId: String!)`
*   **Descripción**: Obtiene la tabla de clasificación. Si se provee `language`, se filtra el top para ese lenguaje.
*   **Parámetros**: `language` (Opcional), `userId`.
*   **Retorno**: `[JSON!]!`

### 7. `getMentorHint(code: String!, errorMessage: String!)`
*   **Descripción**: Consulta al Mentor Nexus por una pista genérica en base a un error.
*   **Parámetros**: `code`, `errorMessage`.
*   **Retorno**: `String!`

### 8. `getProMentorAnalysis(code: String!, errorMessage: String!, task: String!, userId: String!)`
*   **Descripción**: Servicio de análisis en profundidad (Mentor Pro). Analiza la línea exacta, los tokens y entrega una explicación guiada sin dar la solución.
*   **Parámetros**: `code`, `errorMessage`, `task`, `userId`.
*   **Retorno**: `String!`

---

## Mutations (Mutaciones)

Las Mutaciones se utilizan para crear, modificar o eliminar datos, y ejecutar acciones con efectos secundarios.

### 1. `login(input: LoginInput!)`
*   **Descripción**: Inicia sesión usando correo y contraseña. Devuelve un Token JWT y los datos del usuario.
*   **Retorno**: `AuthResponse!`

### 2. `loginWithGoogle(input: LoginWithGoogleInput!)`
*   **Descripción**: Inicia sesión (o registra al usuario) utilizando un token de autenticación provisto por Google.
*   **Retorno**: `AuthResponse!`

### 3. `createUser(input: CreateUserInput!)`
*   **Descripción**: Registra un nuevo usuario clásico con email, usuario y contraseña.
*   **Retorno**: `User!`

### 4. `updateUser(input: UpdateUserInput!)`
*   **Descripción**: Actualiza el perfil de un usuario existente (Avatar, username).
*   **Retorno**: `User!`

### 5. `upgradeToPremium(userId: String!)`
*   **Descripción**: Simula el flujo de compra y mejora el plan del usuario a PREMIUM. Esto desbloquea el resto de lenguajes.
*   **Retorno**: `User!`

### 6. `submitCode(input: SubmitCodeInput!)`
*   **Descripción**: Envía un fragmento de código al motor de ejecución aislado (RabbitMQ -> Python Sandbox/etc) para su validación de la misión.
*   **Parámetros**: `code` (String), `language` (String), `lessonId` (String Opcional), `userId` (ID Opcional).
*   **Retorno**: `ExecutionResult!` (Incluye estado de ejecución, memoria, stdout, y stderr).

### 7. `addXp(userId: String!, xp: Int!)`
*   **Descripción**: Añade experiencia y procesa las subidas de nivel si corresponden.
*   **Retorno**: `GamificationProfile!`

### 8. `addCrystals(amount: Int!, userId: String!)`
*   **Descripción**: Añade cristales virtuales (Moneda in-game) al usuario.
*   **Retorno**: `GamificationProfile!`

### 9. `addCrystalsToUsername(amount: Int!, username: String!)`
*   **Descripción**: Función de desarrollo para fondear la cuenta de cristales usando el `username`.
*   **Retorno**: `GamificationProfile!`

### 10. `spendCrystals(amount: Int!, itemName: String!, userId: String!)`
*   **Descripción**: Gasta cristales a cambio de ítems en la tienda virtual, descontando el saldo.
*   **Retorno**: `GamificationProfile!`

### 11. `useItem(itemName: String!, userId: String!)`
*   **Descripción**: Consume y activa un ítem del inventario (ej. Multiplicador de XP).
*   **Retorno**: `GamificationProfile!`

### 12. `sendFriendRequest(targetUsername: String!, userId: String!)`
*   **Descripción**: Envía una solicitud de amistad a otro usuario en la red.
*   **Retorno**: `Boolean!`

### 13. `acceptFriendRequest(friendId: String!, userId: String!)`
*   **Descripción**: Acepta una solicitud de amistad pendiente.
*   **Retorno**: `Boolean!`
