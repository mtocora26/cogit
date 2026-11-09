# Flujo de trabajo

COGIT se trabaja con dos ramas permanentes y ramas cortas por issue.

```
main  ← producción (Vercel). Solo recibe PRs desde dev.
 └─ dev  ← integración. Aquí se juntan y prueban los cambios.
     └─ feat/12-ranking-con-alias   ← una rama por issue, sale de dev y vuelve a dev
```

`main` y `dev` están protegidas: no se hace push directo ni forzado; todo entra por Pull Request
con el job `build` de CI en verde.

## Ciclo de un issue

1. **Elige un issue** (cada requisito del MVP tiene el suyo, `REQ-0xx`) y asígnatelo.
2. **Crea la rama desde `dev` actualizada** con el nombre `tipo/<n>-descripcion-corta`:
   ```bash
   git checkout dev && git pull
   git checkout -b feat/12-ranking-con-alias
   ```
   Tipos: `feat` (funcionalidad), `fix` (error), `docs`, `chore` (mantenimiento), `refactor`.
3. **Haz commits pequeños** con mensajes convencionales: `feat: ranking con alias (#12)`.
4. **Abre un PR hacia `dev`** y enlaza el issue con `Refs #12` (no `Closes`, ver abajo).
   Se mergea con **squash**: queda un solo commit limpio en `dev`. La rama se borra sola.
5. Al mergear a `dev`, el issue recibe la etiqueta **`en-dev`** (automático): ya está integrado
   pero aún no en producción.

## Publicar (`dev` → `main`)

1. Verifica en el preview de Vercel de `dev` que todo funciona.
2. Abre un PR de `dev` a `main`. En la descripción lista los issues incluidos con
   `Closes #12`, `Closes #15`… para que se cierren al llegar a `main`.
3. Se mergea con **merge commit** (no squash) para conservar el historial de `dev`.
4. Vercel despliega producción solo al entrar a `main`.

> GitHub solo cierra issues con `Closes #n` cuando el PR llega a la rama por defecto (`main`).
> Por eso las ramas de issue usan `Refs` y el cierre ocurre en el PR de publicación.

## Antes de pedir revisión

- `pnpm exec tsc --noEmit` y `pnpm build` sin errores.
- Si cambias `prisma/schema.prisma`, incluye la migración (`pnpm exec prisma migrate dev --name <cambio>`).
  El build de producción en Vercel la aplica con `prisma migrate deploy`; en previews no.
- Sin secretos en el código: usa variables de entorno (`.env` local, panel de Vercel en despliegue).
- Cambios visuales: adjunta captura en claro y oscuro, y revisa 360 px de ancho.

## Variables de entorno

| Variable | Dónde | Para qué |
|---|---|---|
| `DATABASE_URL` | `.env` y Vercel | Conexión a PostgreSQL |
| `SESSION_SECRET` | `.env` y Vercel | Firma de la cookie de sesión (mínimo 32 caracteres) |
