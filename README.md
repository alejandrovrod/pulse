# Real-Time Feedback Hub

Aplicación full-stack en tiempo real que permite a los usuarios publicar mensajes y reaccionar (dar "likes") en tiempo real usando WebSockets.

## Tecnologías
- **Frontend**: Svelte 5 (Vite)
- **Backend**: Node.js + Express + Socket.io + TypeScript
- **Base de Datos**: PostgreSQL (consultas SQL puras con `pg`)

## Requisitos Previos
- Node.js v18+
- PostgreSQL

## Configuración y Ejecución

### 1. Base de Datos (Docker)
1. Asegúrate de tener **Docker** y **Docker Compose** instalados.
2. En la raíz del proyecto (`c:\Workspace\examen\Pulse`), ejecuta el siguiente comando para construir la imagen y levantar la base de datos PostgreSQL:
   ```bash
   docker-compose up --build -d
   ```
   *Nota: Esto construirá una imagen de Docker personalizada (`Dockerfile.db`) que ya incluye el script `database.sql` instalado en su interior. La tabla `messages` se creará sola la primera vez que se inicie la imagen.*

### 2. Backend
1. Navega a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` basado en `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Actualiza `DATABASE_URL` con tus credenciales de PostgreSQL.
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El backend correrá en `http://localhost:3000`.

### 3. Frontend
1. Navega a la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El frontend correrá en `http://localhost:5173`.

## Evaluación y Uso de IA
Por favor revisa el archivo `AI_LOG.md` para ver los detalles sobre cómo se utilizó la IA en la creación de este proyecto.
