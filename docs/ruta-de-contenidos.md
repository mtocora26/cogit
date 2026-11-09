# Ruta de contenidos de misiones y minijuegos

Auditoría del contenido actual frente al objetivo del producto y a los requisitos REQ-001 a REQ-007,
y plan por fases para completarlo. Seguimiento en el issue #31.

## 1. Objetivo

Según `PRODUCT.md` y `docs/requisitos-mvp-cogit.md`:

- Desarrollar **pensamiento computacional** (descomposición, patrones, abstracción, algoritmos) con
  **misiones cortas y progresivas** y **tres minijuegos propios** (Sudoku, nonogramas, Robot Programmer),
  sin exigir escribir código.
- Principios: mostrar el producto real, **nunca simular lo que no ocurre**, empezar a jugar en menos de dos
  minutos y que **el error enseñe** (explicar y dar pistas, no solo castigar).
- Éxito propuesto del MVP: 16 de 20 estudiantes inician una actividad sin ayuda en dos minutos.

## 2. Qué hay hoy

### Misiones (sección "Explora tu lógica")

| Nivel | Contenido definido | Actividades jugables | Estado |
|---|---|---|---|
| 1. Patrones y lógica | 3 actividades | Observa y reconoce, Encuentra el intruso, Completa el patrón | Jugable |
| 2. Secuencias y algoritmos | 3 actividades (¿Qué es una secuencia?, Ordena los pasos, Desafío de instrucciones) | Ninguna | Solo texto; el botón "Empezar" lleva a "Actividad no encontrada" |
| 3. Algoritmos | 3 actividades | Ninguna | Igual que el nivel 2 |

Las tres actividades del nivel 1 trabajan **una sola habilidad: patrones**.

| Actividad | Qué hace | Ayuda | Retroalimentación |
|---|---|---|---|
| Observa y reconoce (`pattern-recognition`) | 5 rondas aleatorias: continuar una secuencia de colores, formas, números o flechas | Ninguna | "La respuesta correcta era: …" (revela la respuesta) |
| Encuentra el intruso (`outlier-pattern`) | 5 rondas: señalar el elemento que rompe el patrón | 3 pistas + vidas | Explica el patrón base |
| Completa el patrón (`completa-patron`) | 5 secuencias **fijas** con huecos | Ninguna | Solo "Intenta de nuevo" |

### Minijuegos

| Juego | Contenido | Ayuda | Guardado |
|---|---|---|---|
| Sudoku | Generador aleatorio, 3 dificultades (30, 45 y 55 celdas vacías) | Pistas y notas; **sin reglas ni tutorial** | Solo mejores tiempos en el navegador |
| Nonogramas | 8 tableros (Corazón, Estrella, Gato, Barco, Robot, Castillo, Computadora, Cerebro), 4 dificultades | Pistas y tutorial | Solo en el navegador |
| Robot Programmer | 8 niveles, comandos avanzar, girar y encender, con límite de comandos | **Sin pistas** | Solo en el navegador |

## 3. Lo que hay que corregir primero (falso o roto)

1. **Estado de actividades fijo en el código.** `getNivelInfo` en `app/misiones/[seccion]/[nivel]/page.tsx`
   marca la primera actividad como "completada", la segunda "en curso" y la tercera "bloqueada" para
   cualquier usuario, y de ahí sale el "33 % completado". El progreso real que ya se guarda en la base
   (`/api/progreso`) no se usa en esa pantalla. Incumple REQ-007.
2. **Rondas simuladas.** La página de actividad (`.../actividad/[actividad]/page.tsx`) conserva un arreglo de
   "Pregunta N / Explicación de la ronda N" inventado, y muestra una cifra de puntos fija por actividad
   (50, 75, 100) que no coincide con la puntuación real.
3. **Niveles vacíos que parecen activos.** Los niveles 2 y 3 muestran "Empezar" sin tener actividades.
4. **Sudoku sin solución única.** `generateSudoku` quita celdas al azar sin comprobar que quede una sola
   solución, y `sudoku/page.tsx` compara cada número con la solución guardada: con pocas pistas, una jugada
   válida pero distinta se marca como error.
5. **Imágenes de relleno en nonogramas.** Los 8 niveles usan `imagePreview` con `placeholder.svg`.
6. **Los minijuegos no suman a nada.** No llaman a `/api/progreso`: ni al ranking ni al avance.
   REQ-002 pide no perder logros al volver al catálogo.

## 4. Brechas frente a los requisitos

| Requisito | Lo que falta hoy |
|---|---|
| REQ-001 Misiones cortas y progresivas | Objetivo y **duración estimada** por misión; los niveles 2 y 3 sin actividades |
| REQ-002 Catálogo | Guardar logros de los minijuegos en la cuenta |
| REQ-003 Instrucciones y ejemplos | Reglas y un ejemplo **antes** de cada actividad (hay 0 referencias en las tres del nivel 1 y en Sudoku) |
| REQ-004 Retroalimentación | Explicar por qué (no revelar la respuesta); mensajes distintos según el tipo de error |
| REQ-005 Pistas y reintentos | Pistas en 2 de las 3 actividades del nivel 1 y en el Robot; reiniciar el intento |
| REQ-006 Guardar y retomar | Solo se guarda el resultado final; no hay estado reanudable |
| REQ-007 Consultar avance | Estado real de misiones pendientes y completadas (hoy es fijo) |

Cobertura de habilidades: **patrones** tiene contenido; **algoritmos** solo en el Robot; **descomposición** y
**abstracción** no tienen ninguna actividad.

## 5. Ruta por fases

Cada punto pasa a ser un issue con su rama hacia `dev`. Tamaños orientativos: S (1 día), M (2-3 días), L (una semana).

### F0. Quitar lo falso (M) · REQ-006, REQ-007

- Leer el estado de las actividades y de los niveles desde `/api/progreso` (completada, disponible, bloqueada por orden).
- Eliminar las rondas simuladas y unificar la puntuación mostrada con la guardada.
- Niveles 2 y 3 como "Próximamente" y sin botón "Empezar" mientras no tengan actividades.
- Reemplazar `placeholder.svg` por la vista previa del propio tablero resuelto.

### F1. Nivel 1 completo (L) · REQ-001, 003, 004, 005

- Objetivo y duración estimada en cada misión y actividad.
- Pantalla previa con **reglas y un ejemplo resuelto** que no altera el progreso; se puede reabrir durante la actividad.
- **Ayuda gradual** en las tres actividades: primera pista orienta ("mira cuántas fichas se repiten"), segunda acota, y solo al final se muestra la respuesta, sin completar la actividad.
- Retroalimentación que enseña: nombrar la regla ("se repite cada 3 fichas") en vez de "la respuesta era X".
- Reintentar la ronda o la actividad sin perder lo completado.
- Reanudar una actividad a medias (guardar ronda actual y vidas).

### F2. Motor de contenido (L) · REQ-011

- Generadores por regla con parámetros de dificultad: longitud, número de reglas, alternancia, crecimiento (+1, +2), espejo, doble regla.
- Modelo de datos de misiones y actividades en la base (o en archivos validados) para que el administrador edite contenido y para dejar de codificar cada actividad a mano.
- Banco de ejercicios etiquetado por habilidad y dificultad.

### F3. Niveles 2 a 4 (L por nivel) · REQ-001

| Nivel | Habilidad | Ejercicios propuestos |
|---|---|---|
| 2. Secuencias y algoritmos | Algoritmos | Ordenar pasos de una tarea cotidiana; completar una secuencia de instrucciones; ejecutar a mano un algoritmo corto |
| 3. Abstracción | Abstracción | Clasificar según una regla oculta; "qué sobra"; reducir un problema a lo esencial |
| 4. Depuración y descomposición | Descomposición | Dividir una tarea en subtareas; encontrar el paso con error en una secuencia |

Hay prototipos recuperables del historial de git, que se pueden reutilizar como punto de partida:
`git show f8e59f2^:components/misiones/nivel2/sequence-ordering.tsx`, y de la misma forma `algorithm-fix`,
`classification-game`, `debugging-visual` (nivel 3), `mini-sudoku` (nivel 3) y `nivel4/error-finder`.

### F4. Minijuegos (L) · REQ-002, 003, 005, 006

- **Sudoku:** generar puzzles con solución única (comprobar con el solucionador), reglas y tutorial, dificultades con nombre y técnica a practicar.
- **Nonogramas:** tutorial con ejemplo, tableros de 5×5, 10×10 y 15×15, pistas que expliquen la fila o columna a resolver.
- **Robot Programmer:** pista por nivel, introducir **bucles** ("repetir n veces") y luego condicionales como conceptos, con explicación de por qué falla un programa.
- **Guardado:** registrar el resultado de cada minijuego en la cuenta, con categoría propia, para que alimente el avance y el ranking.

### F5. Validación (M) · REQ-012

- Prueba con estudiantes reales: tiempo hasta iniciar la primera actividad, dónde se atascan, qué pistas usan.
- Ajustar duración, dificultad y ayudas con esos datos.

## 6. Definición de "ejercicio terminado"

Un ejercicio entra a producción solo si cumple todo:

1. Dice su **objetivo** y su **duración** estimada.
2. Muestra **reglas y ejemplo** antes de empezar y se pueden volver a consultar.
3. Tiene **ayuda gradual** que nunca lo completa por sí sola.
4. La retroalimentación **explica la regla**, no solo dice "mal".
5. Se puede **reintentar** sin perder lo ya completado.
6. Su resultado **se guarda** en la cuenta y se refleja en el avance.
7. No depende solo del color, se opera con teclado y funciona a 360 px.
8. Todo su contenido es real: nada simulado ni de relleno.

## 7. Orden recomendado

`F0` primero, porque hoy la pantalla de avance muestra algo falso. Después `F1`, que deja el nivel 1 como
modelo de calidad para copiar. `F2` antes de `F3` evita volver a programar cada actividad a mano. `F4` puede
avanzar en paralelo con `F2` y `F3`, porque son archivos distintos. `F5` al terminar `F1`, sin esperar al resto.
