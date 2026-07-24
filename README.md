<div align="center">
  <h1>🌌 CodeNexus</h1>
  <p><strong>A Gamified Learning Platform & Interactive Execution Environment</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter" />
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
    <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </p>
</div>

---

## 📖 Overview

**CodeNexus** is a next-generation platform designed to revolutionize the way users learn programming. By blending a **Matrix/Cyberpunk aesthetic** with advanced gamification mechanics, users embark on missions to master multiple languages including `Python`, `JavaScript`, `TypeScript`, `Java`, `C++`, `Rust`, and `SQL`.

Beyond traditional learning, CodeNexus offers an **AI-powered Mentor** that deeply analyzes AST syntax and runtime errors, and an isolated **interactive 3D execution laboratory** powered by Docker and RabbitMQ.

## 🏗️ Architecture

This repository is structured as a **Monorepo**, housing both the client-side application and the server-side infrastructure.

```mermaid
graph TD;
    Client[📱 Flutter App] -->|GraphQL Queries/Mutations| Backend[⚙️ NestJS Server];
    Client -->|WebSockets| Backend;
    Backend -->|Prisma ORM| DB[(PostgreSQL)];
    Backend -->|Tasks| Queue[🐇 RabbitMQ];
    Queue -->|Executes Code| Sandbox[🐳 Python/JS Sandbox Workers];
```

### 📂 Directory Structure

| Directory | Description |
|-----------|-------------|
| 📱 `app/` | The cross-platform client built with **Flutter** (Dart). Implements a highly customized UI, 3D Canvas integration, and Riverpod for state management. |
| ⚙️ `backend/` | The core API built with **NestJS** (TypeScript). Exposes a Code-First GraphQL schema, integrates with Prisma, and manages RabbitMQ for execution workers. |
| 🐳 `backend/workers/` | Isolated Docker containers that safely execute user-submitted code in sandboxed environments (e.g., Python, Node, GCC). |

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
*   [Flutter SDK](https://flutter.dev/docs/get-started/install) (`^3.12.0`)
*   [Node.js](https://nodejs.org/) (`v18+`)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop) (For PostgreSQL and Execution Workers)

### 1️⃣ Backend Setup (NestJS)

Navigate to the backend directory and set up the infrastructure:

```bash
cd backend
npm install
```

Configure your environment variables in `backend/.env`. (Default values are generally sufficient for local development).

Start the supporting infrastructure (PostgreSQL & RabbitMQ):
```bash
docker-compose up -d
```

Run database migrations and seed the database with missions and languages:
```bash
npx prisma migrate dev
npx prisma db seed
```

Start the NestJS development server:
```bash
npm run start:dev
```
*The GraphQL Playground will be available at: http://localhost:3000/graphql*

### 2️⃣ Frontend Setup (Flutter)

Navigate to the app directory:

```bash
cd app
flutter pub get
```

Configure your environment variables by creating an `app/.env` file:
```env
# Use 10.0.2.2 for Android Emulator, or your local IP (e.g. 192.168.1.5) for physical devices
API_URL=http://10.0.2.2:3000/graphql
WS_URL=http://10.0.2.2:3000
```

Run the application:
```bash
flutter run
```

## ✨ Key Features

*   **🌐 Multi-Language Support**: Learn and execute Python, JS, TS, Java, C++, Rust, and SQL directly in the app.
*   **🤖 AI Mentor Nexus**: Advanced heuristic and LLM-based analysis of code submissions. It doesn't just match strings; it understands tokens and syntax to guide the user without revealing the answer.
*   **🎮 RPG Gamification**: Earn XP, level up, collect Crystals, maintain Streaks, unlock Titles, and nurture virtual "CodePets".
*   **🧪 3D Sandbox Lab**: An immersive physical laboratory where users interact with 3D nodes representing code modules, capable of persistent positioning and real-time execution feedback.
*   **🛡️ Secure Execution**: All user code is executed in ephemeral, isolated Docker containers orchestrated via RabbitMQ to prevent system compromise.

## 📚 Documentation

*   [GraphQL API Documentation](./GRAPHQL_API.md) - Detailed guide to available Queries and Mutations.
*   [Learning Fundamentals](./fundamentos.md) - The theoretical structure of the CodeNexus curriculum.

## 🛡️ License & Copyright

CodeNexus is a proprietary platform. All rights reserved.
