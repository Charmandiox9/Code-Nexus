# 🔌 CodeNexus GraphQL API Reference

Welcome to the CodeNexus API Documentation. Our API is built with **NestJS**, following a **Code-First GraphQL** approach. 

> **Endpoint:** `http://localhost:3000/graphql`  
> **Playground:** Available in development mode at the same URL.

---

## 📑 Table of Contents

1. [Authentication & Authorization](#-authentication--authorization)
2. [User Management (Queries & Mutations)](#-user-management)
3. [Gamification & Economy](#-gamification--economy)
4. [Learning & Code Execution](#-learning--code-execution)
5. [Social Features](#-social-features)
6. [Types Overview](#-types-overview)

---

## 🔐 Authentication & Authorization

All protected routes require a JWT token passed in the HTTP Headers:
`Authorization: Bearer <your_jwt_token>`

### Mutations

#### `login`
Authenticates a user and returns a JWT token.
```graphql
mutation {
  login(input: { email: "user@example.com", password: "securepassword" }) {
    accessToken
    user {
      id
      username
      plan
    }
  }
}
```

#### `loginWithGoogle`
Authenticates or registers a user using a Google OAuth ID Token.
*   **Input**: `LoginWithGoogleInput { idToken: String! }`
*   **Returns**: `AuthResponse!`

---

## 👤 User Management

### Queries

#### `users`
Retrieves a list of all registered users.
*   **Returns**: `[User!]!`

### Mutations

#### `createUser`
Registers a new user on the platform.
*   **Input**: `CreateUserInput { username, email, password }`
*   **Returns**: `User!`

#### `updateUser`
Updates an existing user's profile information.
*   **Input**: `UpdateUserInput { id, username?, avatarUrl? }`
*   **Returns**: `User!`

#### `upgradeToPremium`
Simulates a checkout flow and upgrades a user's plan to `PREMIUM`, unlocking advanced languages and features.
*   **Parameters**: `userId: String!`
*   **Returns**: `User!`

---

## 🎮 Gamification & Economy

CodeNexus heavily relies on RPG elements. These endpoints manage the user's progression.

### Queries

#### `gamificationProfile(userId: String!)`
Fetches a user's complete gamification state, including XP, Crystals, Streaks, Inventory, and Pets.
*   **Returns**: `GamificationProfile!`

#### `getLeaderboard(language: String, userId: String!)`
Fetches the global or language-specific leaderboard.
*   **Returns**: `[JSON!]!`

### Mutations

#### `addXp(userId: String!, xp: Int!)`
Grants XP to a user. Internally handles leveling up and stat recalculation.
*   **Returns**: `GamificationProfile!`

#### `addCrystals(amount: Int!, userId: String!)` / `addCrystalsToUsername`
Mints new Crystals (in-game currency) for a user.
*   **Returns**: `GamificationProfile!`

#### `spendCrystals(amount: Int!, itemName: String!, userId: String!)`
Deducts crystals in exchange for store items.
*   **Returns**: `GamificationProfile!`

#### `useItem(itemName: String!, userId: String!)`
Consumes an item from the inventory (e.g., "XP Boost", "Streak Freeze").
*   **Returns**: `GamificationProfile!`

---

## 🧠 Learning & Code Execution

Endpoints responsible for delivering content and validating user code.

### Queries

#### `concepts`
Retrieves the entire curriculum hierarchy (Concepts -> Lessons).
*   **Returns**: `[Concept!]!`

#### `getMentorHint` & `getProMentorAnalysis`
Invokes the **AI Mentor Nexus**. `getProMentorAnalysis` provides an in-depth AST and Token-based breakdown of syntax errors without revealing the direct answer.
*   **Parameters**: `code: String!`, `errorMessage: String!`, `task: String!`, `userId: String!`
*   **Returns**: `String!` (Markdown formatted explanation).

### Mutations

#### `submitCode`
The core engine interaction. Sends source code to the RabbitMQ execution queue.
```graphql
mutation {
  submitCode(input: {
    code: "print('Hello Matrix')"
    language: "python"
    lessonId: "uuid-lesson-123"
  }) {
    status
    stdout
    stderr
    executionTimeMs
  }
}
```
*   **Returns**: `ExecutionResult!`

---

## 🌐 Social Features

### Queries

*   `getFriends(userId: String!)`: Returns a user's friends list.
*   `getFriendActivityFeed(userId: String!)`: Returns recent achievements and level-ups from friends.

### Mutations

*   `sendFriendRequest(targetUsername: String!, userId: String!)`: Dispatches a friend request.
*   `acceptFriendRequest(friendId: String!, userId: String!)`: Accepts a pending request.

---

## 📦 Types Overview

*   **`User`**: Base identity (ID, Email, Username, Plan Type).
*   **`GamificationProfile`**: RPG Stats (XP, Level, Crystals, Streaks).
*   **`Concept` / `Lesson`**: Educational entities containing theory, instructions, and expected outputs.
*   **`ExecutionResult`**: The output from the Docker sandboxes.
*   **`CodePet`**: Virtual companions that evolve as the user learns specific languages.
