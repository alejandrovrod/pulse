# AI Log

Este documento detalla el uso de Inteligencia Artificial (Agente Antigravity) en el desarrollo del Real-Time Feedback Hub.

## Links de Conversaciones
El desarrollo de esta prueba se realizó utilizando un Agente de IA integrado directamente en el IDE (Gemini / Antigravity). Por esta naturaleza integrada, no existe un link web público para compartir la conversación como lo habría en un portal web estándar. Sin embargo, toda la bitácora de prompts, toma de decisiones, resolución de problemas y ejecución de código ha sido documentada a detalle en este archivo `AI_LOG.md`. 
*(ID de Conversación interno: 0801c8c8-4e96-4cdb-b8ea-a47c41cbaed2)*

## Prompts

1. **Prompt Inicial del Usuario:**
   ```text
   Tu objetivo es construir una aplicación que permita publicar mensajes y reaccionar a ellos (likes) en tiempo real... (Ver archivo original para el prompt completo)
   ```

2. **Refinamiento:**
   - El agente creó un `implementation_plan.md` solicitando confirmaciones sobre la ruta de trabajo, si usar `ws` o `socket.io`, y sobre el manejo de usuarios.
   - El usuario pidió que el plan estuviera en español.
   - El usuario aprobó el plan, eligiendo **socket.io** y publicaciones **anónimas**.

## Decisiones

1. **Uso de Svelte 5:** Se eligió Svelte 5 con TypeScript inicializado a través de Vite (`create-vite`) por ser ligero, reactivo nativamente y seguir las directrices ("ideal" según los requerimientos).
2. **Uso de Socket.io:** Aunque `ws` es más puro, se decidió usar `socket.io` por recomendación del agente y confirmación del usuario, debido a su resiliencia (reconexiones automáticas, rooms, etc.).
3. **Estructura del Proyecto:** Se separaron las carpetas en `frontend` y `backend` dentro del mismo repositorio para un fácil despliegue individual o mediante un monorepo.
4. **Base de Datos:** Se escribió SQL puro para crear la tabla de mensajes (`database.sql`) y la conexión usa el paquete `pg` sin ORM, tal y como se solicitó.
5. **Dockerización Completa (Full-Stack):** Aunque los requerimientos mencionaban "Deploy: Render (Ideal)", Render ahora requiere planes de pago para sus "Blueprints" o bases de datos gestionadas persistentes. Para evitar costos y depender de plataformas de terceros, se decidió contenerizar toda la aplicación. Se crearon Dockerfiles para el frontend (`nginx` multi-stage), el backend (Node.js) y la base de datos PostgreSQL, orquestados mediante `docker-compose.yml`. Esto permite levantar todo el stack localmente o desplegarlo fácilmente en plataformas como **Railway** o un VPS con un solo comando, otorgando la máxima portabilidad.

## Problemas y Soluciones

1. **Creación de directorios en Frontend:** 
   - *Problema:* El agente intentó crear el directorio `src/lib` usando línea de comandos (`mkdir src\lib`), pero el directorio ya existía porque la plantilla de Svelte 5 con Vite lo crea por defecto.
   - *Solución:* El agente procedió directamente a crear los archivos `.ts` necesarios usando las herramientas de manipulación de archivos del sistema interno (`write_to_file`).

## Aprendizajes

1. **Integración AI en Tiempo Real:** El uso de un agente integrado en el IDE permitió crear en paralelo el backend (Express + PostgreSQL) y el frontend (Svelte 5) mientras se ejecutaban instalaciones de dependencias en segundo plano.
2. **Estado en Svelte 5:** El agente utilizó la nueva sintaxis `$state()` y `$derived()` (si aplicase) introducida en Svelte 5, mostrando adaptación a frameworks modernos.
3. **Organización Sistemática:** La IA estructuró el trabajo a través de *artefactos* (`implementation_plan.md` y `task.md`), lo cual mantuvo el progreso organizado y alineado a los requerimientos originales del challenge.
