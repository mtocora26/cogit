---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Surface brief: COGIT landing y plataforma (rediseño completo)

Modo: Persuade (landing); Operate (misiones, minijuegos, ranking, comunidad, perfil, administración, auth).
Audiencia: estudiantes universitarios de 1.º y 2.º semestre en Colombia, sin experiencia en programación, en celular o laptop.
Acción: crear cuenta y empezar la primera misión. Prueba: el producto real (puzzles y misiones), nada inventado.
Restricciones: paleta del kit de marca fija (cian #6DF1FF, violeta medio #8B80FF, violeta eléctrico #A815FF, azul noche #0B0E1C, blanco); sin tipografía pixelada; tema oscuro por defecto más modo claro; logo del kit (versión negra sobre fondo claro, a color solo sobre oscuro); nombres propios intactos.
Decisiones abiertas: ninguna sobre dirección; elegido por el usuario el 2026-11-09 (boceto `.impeccable/mocks/decision/assigned.html`).

## Direction contract

THESIS: Las instrucciones tejen el resultado. La plataforma es un telar: filas de tarjetas perforadas producen un patrón de hilo. Rechaza el hero de dos columnas con captura y la fila de tarjetas iguales.
OWN-WORLD: Tela de hilos en cuadrícula estricta, celdas de 30 px con esquinas de 4 px, hilo con degradado cian a violeta (solo en el hilo y el logo, nunca en texto); tarjetas perforadas en lavanda claro con agujeros rectangulares; fondo azul noche en oscuro y papel blanco violáceo en claro; poca sombra, bordes de 1 px.
STORY: El visitante entiende en un vistazo que dar instrucciones cambia el resultado, cree que es jugable sin saber programar y crea una cuenta o empieza la primera misión.
FIRST VIEWPORT: 1440x900. Titular a la izquierda (76 px, "Programa el patrón. Mira cómo se teje.") con subtítulo y botón primario "Empezar misión" a la altura del ojo; abajo, a todo el ancho, una banda de tarjetas perforadas de 6 filas y, debajo, la tela de 10 filas que se teje según las perforaciones; arriba a la derecha una tarjeta "Siguiente tarjeta" como segundo punto de entrada.
FORM: Telar Jacquard, candidata 4 de mi lista, asignada por el sorteo. seed:ba45a6addfb9165b
SIGNATURE: Al cargar, las perforaciones se leen de izquierda a derecha y la tela se teje fila a fila; al pulsar una perforación se cambia la celda correspondiente. Una sola secuencia, ease-out exponencial, respeta movimiento reducido.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
