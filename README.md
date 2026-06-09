# Real-Time Feedback Hub

Aplicación full-stack en tiempo real que permite a los usuarios publicar mensajes y reaccionar (dar "likes") en tiempo real usando WebSockets.

## Tecnologías
- **Frontend**: Svelte 5 (Vite)
- **Backend**: Node.js + Express + Socket.io + TypeScript
- **Base de Datos**: PostgreSQL (consultas SQL puras con `pg`)

## Requisitos Previos
- Node.js v18+
- PostgreSQL

## Configuración y Ejecución con Docker

Para facilitar la evaluación y el despliegue, todo el proyecto (Base de Datos, Backend y Frontend) está completamente dockerizado.

1. Asegúrate de tener **Docker** y **Docker Compose** instalados en tu computadora.
2. Clona este repositorio y navega a la raíz del proyecto (`pulse`).
3. Ejecuta el siguiente comando:
   ```bash
   docker-compose up --build -d
   ```
4. **¡Listo!** Docker descargará y compilará todo por ti:
   - **Frontend:** Estará disponible en `http://localhost` (Puerto 80).
   - **Backend:** Correrá internamente en el puerto `4000`.
   - **Base de Datos:** Se inicializará automáticamente con la estructura necesaria.

*(Nota: Si deseas correrlo de forma manual sin Docker, puedes revisar el `package.json` de cada directorio).*

## Evaluación y Uso de IA
Por favor revisa el archivo `AI_LOG.md` para ver los detalles sobre cómo se utilizó la IA en la creación de este proyecto.
