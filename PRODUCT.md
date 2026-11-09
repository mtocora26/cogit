# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Estudiantes universitarios de primero y segundo semestre (Colombia), muchos sin experiencia previa en programación. Usan COGIT en ratos cortos entre clases, en celular o laptop, para practicar pensamiento computacional jugando. Un grupo secundario es el equipo docente/administrador que usa el panel básico de administración. Piloto del MVP: hasta 100 usuarios registrados y 25 simultáneos (4 ago – 5 dic).

## Product Purpose
Plataforma web educativa y gamificada para desarrollar pensamiento computacional (descomposición, patrones, abstracción, algoritmos) mediante misiones cortas y progresivas, minijuegos y progreso guardado. Éxito del MVP (propuesto, aún sin validar con estudiantes reales): 16 de 20 estudiantes encuentran una misión e inician una actividad sin ayuda en dos minutos.

## Positioning
Pensamiento computacional jugando: misiones cortas más minijuegos propios (Sudoku, nonogramas, Robot Programmer) que entrenan razonamiento algorítmico sin exigir escribir código. El lenguaje del juego (neuronas como vidas) es parte de la identidad, no el diferencial principal.

## Operating Context
- Flujos principales: registro (con aceptación explícita de términos en `/terminos`) → misiones → actividades y minijuegos → progreso, ranking y comunidad.
- Rol administrador con panel básico (usuarios, contenido, estadísticas).
- Inicio de sesión con nombre de usuario y contraseña (hash scrypt); el correo solo sirve para recuperar el acceso. Sesión en cookie httpOnly firmada por el servidor; roles `estudiante` y `admin` como enum en la base. Datos en PostgreSQL vía Prisma; monolito Next.js (React, Tailwind, Radix/shadcn).
- Se evaluará con pruebas reales de usabilidad; las cifras y prioridades de los documentos del MVP son provisionales y proceden en parte de una encuesta simulada.

## Capabilities and Constraints
- Terminología propia que debe conservarse: Misiones, Minijuegos, Comunidad, Ranking, Neuronas (vidas). La Tienda y los Sparkz (moneda virtual) se retiraron del MVP el 2026-11-09: no están en los requisitos ni en el modelo de negocio; pueden retomarse después.
- Ranking sin correo ni nombre real por defecto; sin exposición de datos privados entre estudiantes (REQ-016).
- La comunidad es solo demostrativa en el MVP: las publicaciones de ejemplo deben ir identificadas como demostración.
- Economía: no hay compras ni moneda en el MVP. Las neuronas se recuperan solas con el tiempo (una cada 30 minutos). No queda ningún rastro de créditos en el código ni en la base (se eliminó la columna `creditos`).
- Decisiones abiertas: duración objetivo de las misiones, metas de rendimiento y capacidad, política de privacidad y licencia.

## Brand Commitments
Nombre COGIT. Español cercano y motivador. Existen insignias propias del proyecto (`public/insignia-COGIT.png` y `public/insignia-COGIT1.png`). No hay otra identidad visual confirmada como obligatoria.

## Evidence on Hand
- Documentos del MVP en `docs/` (requisitos, historias de usuario, inventario técnico, encuesta).
- Tres minijuegos y misiones por niveles implementados en el código.
- Ausentes y que no deben inventarse: número real de estudiantes (la landing dice "+1000 estudiantes" sin respaldo), testimonios, resultados de pruebas de usabilidad reales, capturas de usuarios, datos reales de comunidad.

## Product Principles
1. Mostrar el producto real antes que prometerlo: puzzles y misiones visibles, no fotos de stock.
2. Nunca simular lo que no ocurre: datos de ejemplo se etiquetan como demostración y las funciones inexistentes no aparecen como activas.
3. Empezar a jugar en menos de dos minutos, sin ayuda y sin saber programar.
4. El error enseña: la retroalimentación explica y da pistas sin penalizar de forma que frene el aprendizaje.
5. Pensado para ratos cortos en celular; los tableros deben funcionar en pantallas pequeñas y con teclado.

## Accessibility & Inclusion
Requisitos propuestos del MVP (REQ-013, REQ-014): flujos operables a 360, 768 y 1366 px sin scroll horizontal de página; teclado, foco visible, etiquetas claras, información no dependiente solo del color, ampliación al 200% y contraste de texto normal mínimo 4.5:1. No constituye certificación WCAG completa.
