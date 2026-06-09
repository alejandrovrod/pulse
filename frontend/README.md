# Svelte + TS + Vite

Esta plantilla te ayudará a empezar a desarrollar con Svelte y TypeScript en Vite.

## Configuración recomendada del IDE

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## ¿Necesitas un framework oficial de Svelte?

Echa un vistazo a [SvelteKit](https://github.com/sveltejs/kit#readme), que también funciona con Vite. Despliégalo en cualquier lugar con su enfoque "serverless-first" y adáptalo a varias plataformas, con soporte integrado para TypeScript, SCSS y Less, y la posibilidad de añadir fácilmente mdsvex, GraphQL, PostCSS, Tailwind CSS y más.

## Consideraciones técnicas

**¿Por qué usar esto en lugar de SvelteKit?**

- Trae su propia solución de enrutamiento (routing) que puede no ser la preferida por algunos usuarios.
- Es principalmente un framework que resulta usar Vite por debajo, no es puramente una aplicación Vite.

Esta plantilla contiene lo mínimo necesario para empezar con Vite + TypeScript + Svelte, teniendo en cuenta la experiencia del desarrollador en cuanto a HMR (Hot Module Replacement) e intellisense. Demuestra capacidades al mismo nivel que las otras plantillas de `create-vite` y es un buen punto de partida para los principiantes que se están adentrando en un proyecto de Vite + Svelte.

Si más adelante necesitas las capacidades avanzadas y la extensibilidad que proporciona SvelteKit, la plantilla ha sido estructurada de forma similar a SvelteKit para que sea fácil de migrar.

**¿Por qué `global.d.ts` en lugar de `compilerOptions.types` dentro de `jsconfig.json` o `tsconfig.json`?**

Configurar `compilerOptions.types` bloquea todos los demás tipos que no estén listados explícitamente en la configuración. Usar referencias de triple barra (triple-slash references) mantiene la configuración predeterminada de TypeScript que acepta información de tipos de todo el espacio de trabajo, mientras añade también la información de tipos de `svelte` y `vite/client`.

**¿Por qué incluir `.vscode/extensions.json`?**

Otras plantillas recomiendan extensiones de forma indirecta a través del README, pero este archivo permite que VS Code le sugiera al usuario instalar las extensiones recomendadas tan pronto como abre el proyecto.

**¿Por qué habilitar `allowJs` en la plantilla de TS?**

Aunque `allowJs: false` prevendría el uso de archivos `.js` en el proyecto, no previene el uso de sintaxis de JavaScript en los archivos `.svelte`. Además, forzaría a tener `checkJs: false`, trayendo lo peor de ambos mundos: no poder garantizar que todo el código base sea TypeScript, y al mismo tiempo tener un peor chequeo de tipos para el JavaScript existente. Adicionalmente, hay casos de uso válidos donde una mezcla de código puede ser relevante.

**¿Por qué HMR no está conservando el estado local de mis componentes?**

¡La preservación del estado con HMR tiene varias trampas! Ha sido deshabilitada por defecto tanto en `svelte-hmr` como en `@sveltejs/vite-plugin-svelte` debido a su comportamiento que a menudo resulta sorprendente. Puedes leer los detalles [aquí](https://github.com/rixo/svelte-hmr#svelte-hmr).

Si tienes algún estado que es importante conservar dentro de un componente, considera crear un store (almacén) externo que no será reemplazado por el HMR.

```ts
// store.ts
// Un store externo extremadamente simple
import { writable } from 'svelte/store'
export default writable(0)
```
