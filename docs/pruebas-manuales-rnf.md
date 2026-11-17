# Pruebas manuales de REQ-012, REQ-013 y REQ-014

Estas comprobaciones necesitan personas o navegadores reales. Esta guía fija el procedimiento y los formatos de registro. Resultados: pendientes.

## REQ-012. Facilidad de uso (issue #51)

**Meta:** al menos 16 de 20 estudiantes encuentran una misión e inician una actividad sin ayuda en menos de 2 minutos.

Procedimiento (por participante, 5 min):

1. Cuenta nueva o ya registrada, sesión iniciada en la pantalla de inicio. Cronómetro en 0.
2. Consigna única, sin pistas: «Busca una misión y empieza una actividad».
3. Parar el cronómetro cuando aparezca la primera ronda de la actividad (no la pantalla de reglas).
4. Anotar si pidió ayuda (cualquier indicación del observador cuenta) y dónde dudó.

| # | Edad/curso | Dispositivo | Tiempo (s) | ¿Lo logró? | ¿Ayuda? | Dónde dudó |
|---|---|---|---|---|---|---|
| 1 | | | | | | |

Éxito = logró **y** sin ayuda **y** ≤ 120 s. Cumple con ≥ 16 éxitos de 20. No usar las respuestas simuladas de la encuesta (P15) como evidencia.

## REQ-013. Diseño adaptable

**Anchos:** 360, 768 y 1366 px (DevTools → modo dispositivo, o ventana redimensionada). **Criterio:** en cada ancho no hay controles superpuestos ni desplazamiento horizontal de la página.

Pantallas: registro, inicio, misiones (sección, nivel, una actividad), Sudoku, Nonogramas, Robot Programmer, login y perfil.

Comprobación rápida de desborde horizontal: en la consola del navegador, `document.documentElement.scrollWidth > innerWidth` debe dar `false`.

| Pantalla | 360 | 768 | 1366 | Notas |
|---|---|---|---|---|
| Registro | | | | |
| Misiones (nivel) | | | | |
| Actividad | | | | |
| Sudoku | | | | |
| Nonogramas | | | | |
| Robot Programmer | | | | |

Conocido: en 360 px las celdas del sudoku miden ~32 px y las de nonogramas grandes menos (9–15 columnas no caben a 44 px); las acciones de entrada sí son de 44 px.

## REQ-014. Accesibilidad (parte manual)

1. **Teclado:** con Tab/Shift+Tab/Enter/Espacio/flechas, recorrer registro, inicio, una actividad y los tres juegos. Todo operable, foco siempre visible, sin trampas de foco. Nonogramas: flechas para moverse, Enter rellena, X marca.
2. **Zoom 200%:** Ctrl + «+» hasta 200% en una ventana de 1280 px; instrucciones y estados legibles y utilizables, sin pérdida de contenido.
3. **No solo color:** revisar con un simulador de daltonismo (DevTools → Rendering → Emulate vision deficiencies) que errores, aciertos y pistas se distinguen.
4. **Contraste:** ya cubierto por `lib/contraste.test.ts` para los tokens; revisar a mano los colores sueltos (p. ej. `text-gray-400` sobre fondos de color) con DevTools.

| Flujo | Teclado | Zoom 200% | Sin color | Notas |
|---|---|---|---|---|
| Registro/login | | | | |
| Inicio y misiones | | | | |
| Sudoku | | | | |
| Nonogramas | | | | |
| Robot Programmer | | | | |
