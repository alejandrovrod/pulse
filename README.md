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

## Arquitectura y Despliegue en Railway

El proyecto está diseñado como un **Monorepo** y se encuentra completamente contenedorizado. Su arquitectura en la nube está compuesta por tres servicios independientes orquestados:

1. **Frontend (Svelte 5 + Vite):** Compilado en una imagen Multi-stage y servido de forma extremadamente ligera utilizando un servidor **Nginx**. La aplicación se comunica en tiempo real con el backend mediante WebSockets y llamadas a la API REST.
2. **Backend (Node.js 20 + Express + Socket.io):** Se encarga de la lógica de negocio y mantiene las conexiones persistentes para garantizar que los mensajes y los "likes" se actualicen en tiempo real en todos los clientes conectados simultáneamente.
3. **Base de Datos (PostgreSQL):** Un servicio de base de datos relacional aislado, al cual el backend se conecta de forma segura a través de una red privada interna (evitando exponer la base de datos al internet público).

Todo el despliegue está automatizado mediante Dockerfiles independientes para cada servicio.

## Evaluación y Uso de IA
Por favor revisa el archivo `AI_LOG.md` para ver los detalles sobre cómo se utilizó la IA en la creación de este proyecto.
