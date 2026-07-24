# CodeNexus

CodeNexus es una plataforma gamificada de aprendizaje de programación y un entorno de ejecución interactivo. Permite a los usuarios aprender diferentes lenguajes de programación (Python, JavaScript, TypeScript, Java, C++, Rust, SQL) a través de misiones y retos inmersivos dentro de un universo Sci-Fi (estilo Matrix/Cyberpunk), subir de nivel, equipar items, y recibir mentoría potenciada por Inteligencia Artificial.

## Estructura del Monorepo

Este proyecto funciona como un monorepo que contiene tanto la aplicación cliente (Flutter) como el servidor backend (NestJS).

*   `app/`: Contiene la aplicación móvil/escritorio desarrollada en **Flutter** (Dart).
*   `backend/`: Contiene la API GraphQL desarrollada en **NestJS** (TypeScript) con Prisma ORM y la infraestructura de ejecución de código aislada usando Docker y RabbitMQ.

## Requisitos Previos

*   **Flutter SDK**: ^3.12.2
*   **Node.js**: v18+ y npm/yarn
*   **Docker Desktop**: Necesario para levantar la base de datos PostgreSQL, RabbitMQ y los workers de ejecución de código (Python Sandbox).

## Configuración Inicial

### 1. Backend (NestJS)

1. Ve al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env`:
   Asegúrate de tener configurado tu archivo `.env` en la carpeta `backend` con las variables `DATABASE_URL`, `JWT_SECRET`, y `RABBITMQ_URL` (se pueden usar los valores por defecto locales).
4. Levanta la infraestructura de Docker (Base de datos y RabbitMQ):
   ```bash
   docker-compose up -d
   ```
5. Ejecuta las migraciones de base de datos y el Seed:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
6. Inicia el servidor de desarrollo:
   ```bash
   npm run start:dev
   ```

### 2. Frontend (Flutter)

1. Ve al directorio de la app:
   ```bash
   cd app
   ```
2. Instala las dependencias de Flutter:
   ```bash
   flutter pub get
   ```
3. Configura las variables de entorno:
   Crea o verifica que exista un archivo `app/.env` con la IP de tu backend. Ejemplo:
   ```env
   API_URL=http://10.0.2.2:3000/graphql
   WS_URL=http://10.0.2.2:3000
   ```
   *(Nota: Usa `10.0.2.2` para emuladores Android o la IP local `192.168.x.x` para probar en dispositivos físicos en la misma red LAN).*
4. Ejecuta la aplicación:
   ```bash
   flutter run
   ```

## Arquitectura y Tecnologías

*   **Frontend**: Flutter, Riverpod (Gestión de estado), GraphQL Flutter, Socket.io (Ejecución en tiempo real).
*   **Backend**: NestJS, GraphQL (Code-first), Prisma ORM, PostgreSQL.
*   **Ejecución de Código Aislada**: RabbitMQ (Message Broker) que distribuye las tareas hacia contenedores Docker (Workers) efímeros y seguros.
*   **IA**: Mentor Nexus (Agente heurístico/LLM para análisis profundo de código basado en AST y errores de consola).

## Licencia

Este proyecto es privado.
