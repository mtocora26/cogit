---
name: COGIT
description: Plataforma gamificada de pensamiento computacional; un telar Jacquard donde las instrucciones perforadas tejen un patrón de hilo cian a violeta.
colors:
  night: "#0B0E1C"
  white: "#FFFFFF"
  cyan-signal: "#6DF1FF"
  violet-neuron: "#8B80FF"
  violet-electric: "#A815FF"
  background-dark: "hsl(229 43% 8%)"
  card-dark: "hsl(229 38% 12%)"
  popover-dark: "hsl(229 36% 15%)"
  muted-dark: "hsl(229 34% 14%)"
  secondary-dark: "hsl(229 32% 17%)"
  accent-dark: "hsl(229 32% 20%)"
  border-dark: "hsl(229 28% 22%)"
  foreground-dark: "hsl(230 40% 97%)"
  muted-foreground-dark: "hsl(229 22% 72%)"
  background-light: "hsl(240 33% 98%)"
  card-light: "hsl(0 0% 100%)"
  muted-light: "hsl(232 40% 95%)"
  secondary-light: "hsl(232 40% 94%)"
  accent-light: "hsl(232 50% 92%)"
  border-light: "hsl(232 28% 85%)"
  foreground-light: "hsl(229 43% 8%)"
  muted-foreground-light: "hsl(229 18% 36%)"
  primary-light: "hsl(277 100% 45%)"
  neuron-light: "hsl(262 80% 48%)"
  signal-light: "hsl(190 100% 26%)"
  punch-card: "hsl(245 100% 92%)"
  punch-card-light-theme: "hsl(245 60% 92%)"
  punch-hole: "hsl(245 55% 84%)"
  destructive-dark: "hsl(0 72% 58%)"
  destructive-light: "hsl(0 72% 42%)"
typography:
  display:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
rounded:
  thread-cell: "4px"
  punch: "2px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  card: "12px"
spacing:
  cell: "30px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "64px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.violet-electric}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 32px"
  button-outline:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 16px"
  button-ghost:
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 16px"
  punched-card:
    backgroundColor: "{colors.punch-card}"
    textColor: "{colors.night}"
    rounded: "{rounded.md}"
    padding: "20px"
  game-card:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.card}"
    padding: "24px"
  chip-neuron:
    textColor: "{colors.violet-neuron}"
    rounded: "9999px"
    padding: "4px 8px"
  input:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 12px"
---

# Design System: COGIT

## Overview

**Creative North Star: "El Telar Jacquard"**

Las instrucciones tejen el resultado. Una banda de tarjetas perforadas arriba decide, celda por celda, un patrón de hilo abajo; la plataforma entera hereda esa metáfora: cuadrículas estrictas de celdas pequeñas, perforaciones rectangulares, un hilo que va del cian al violeta. Es el modelo mental de un algoritmo (instrucciones, ejecución, resultado) dibujado como artesanía legible, pensado para estudiantes sin experiencia en programación que juegan en ratos cortos, en celular o laptop.

El tema oscuro (azul noche) es el predeterminado y existe un tema claro de papel blanco violáceo. La superficie es casi plana: bordes de 1 px, casi ninguna sombra, profundidad por capas tonales. El color de marca se concentra en el hilo, en el logo y en señales de estado; el texto corriente es siempre neutro.

El kit de marca (v1.0, nov 2026) es fijo. Las neuronas (las vidas) usan el violeta de marca; el cian marca lo activo. Verde y rojo siguen siendo colores funcionales de estado (acierto, error), fuera de la paleta de marca. Esta versión reemplaza al mundo anterior "El Circuito Neuronal / Pixelify Sans".

**Key Characteristics:**
- Celdas de 30 px con esquinas de 4 px; perforaciones de 2 px de esquina.
- Hilo con degradado cian a violeta, solo en el hilo y el logo, nunca en texto.
- Poppins para display, Inter para cuerpo; nada pixelado.
- Bordes de 1 px y capas tonales en lugar de sombras.
- Una sola secuencia de entrada (la tela se teje fila a fila), respeta movimiento reducido.

## Colors

Azul noche con tres tonos de marca: cian para lo activo, violeta medio para texto y acentos, violeta eléctrico para acciones.

### Primary
- **Violeta Eléctrico** (violet-electric; en oscuro `--primary`): botones primarios, selección, final del hilo. En claro baja a primary-light para sostener contraste con texto blanco.

### Secondary
- **Cian Señal** (cyan-signal; `--signal`): lo que está activo, anillo de foco en oscuro, inicio del hilo. En claro se oscurece a signal-light para llegar a 4.5:1.
- **Violeta Neurona** (violet-neuron; `--neuron`): texto de acento, chips, enlaces activos, neuronas. En claro se oscurece a neuron-light.

### Neutral
- **Azul Noche** (night, background-dark): fondo del tema oscuro; también tinta de las perforaciones llenas.
- **Papel Violáceo** (background-light) y **Blanco** (card-light): fondo y tarjetas del tema claro.
- **Lavanda Perforada** (punch-card): papel de las tarjetas perforadas; agujeros vacíos en punch-hole.
- Superficies oscuras escalonadas: card-dark, popover-dark, muted-dark, secondary-dark, accent-dark; borde border-dark. Equivalentes claros: muted-light, secondary-light, accent-light, border-light.
- Texto: foreground y muted-foreground por tema.
- **Rojo funcional** (destructive-dark / destructive-light): errores. No es parte de la marca.

### Named Rules
**The Thread Rule.** El degradado cian a violeta (de `--thread-from` a `--thread-to`) vive solo en el hilo de la tela y en el logo. Jamás en texto, botones ni fondos de sección.
**The Brand Roles Rule.** Neuronas = violeta de marca; cian = lo activo; verde y rojo quedan como colores de estado funcionales fuera de la paleta.
**The Dual Contrast Rule.** En claro, cian y violeta de texto se oscurecen (signal-light, neuron-light) para llegar a 4.5:1; no se reutilizan los valores del tema oscuro.

## Typography

**Display Font:** Poppins (500, 600, 700; con system-ui, sans-serif), variable `--font-display`
**Body Font:** Inter (con system-ui, sans-serif), variable `--font-sans`

**Character:** Poppins geométrica y firme para titulares, Inter neutra para lectura y datos. Los titulares llevan tracking -0.02em.

### Hierarchy
- **Display** (700, 2.25rem móvil / 3.75rem sm / 4.5rem lg, 1.04): solo el titular del hero.
- **Headline** (600, 1.875rem / 2.25rem sm, ~1.2): títulos de sección de la landing.
- **Title** (600, 1.25rem a 1.5rem): subtítulos, nombres de habilidad y de tarjeta.
- **Body** (400, 1rem a 1.25rem, 1.625): párrafos; líneas de máximo 28 a 36rem (~65ch).
- **Label** (500, 0.875rem): botones, enlaces de navegación, metadatos en 0.75rem.

### Named Rules
**The No Pixel Rule.** Ninguna tipografía pixelada ni monoespaciada decorativa; Poppins e Inter son las dos únicas familias.

## Layout

Contenedor `max-w-6xl` con padding de 16 px (24 px desde sm). Secciones con ritmo vertical de 64 px (96 px desde lg) separadas por borde de 1 px, alternando fondo liso, fondo de cuadrícula (`bg-loom`: líneas de 1 px en neurona al 7%, celdas de 30 px) y `card/40`. El hero es titular a la izquierda y una tarjeta "Siguiente tarjeta" de 17rem a la derecha (solo lg), con el telar a todo el ancho debajo, sin contenedor. El telar usa 48, 32 o 20 columnas según el ancho (lg, sm, menor). Objetivos táctiles de mínimo 44 px (botón primario grande de 48 px). Las rejillas de habilidades pasan de 1 a 2 a 4 columnas, con divisores de 1 px en lugar de tarjetas separadas. En la app autenticada, el contenedor es `container` (centrado, 2rem, máx. 1400px).

## Elevation & Depth

Sistema plano con capas tonales: fondo, card, popover, accent suben un escalón de luminosidad en oscuro. Las sombras están ausentes en reposo; el único énfasis de hover es un desplazamiento de -2 px (`-translate-y-0.5`) y un borde teñido de neurona al 60%. El menú de usuario del nav conserva `shadow-2xl` (ver deriva).

### Named Rules
**The Flat Weave Rule.** Bordes de 1 px y diferencias tonales, nunca sombras ni halos para separar superficies.

## Shapes

Geometría de cuadrícula. Celdas de hilo con esquina de 4 px y separación de 1 px; perforaciones con esquina de 2 px; botones, inputs y tarjetas de tarea en 6 a 8 px; tarjetas de contenido y contenedores de habilidad en 12 px; chips en píldora. Radio base `--radius` 0.5rem (lg 8, md 6, sm 4). Las perforaciones son rectángulos, nunca círculos.

## Components

### Buttons
- **Shape:** esquina de 6 px (rounded-md).
- **Primary:** violeta eléctrico con texto blanco, hover al 90%; hero y cierre usan 48 px de alto y 32 px de padding horizontal; resto 40 a 44 px.
- **Outline / Ghost:** borde de 1 px o sin borde sobre fondo; hover en `accent`. Alto mínimo 44 px.
- **Press:** `active:scale-[0.97]`, 150 ms con ease-out-strong. Foco: anillo de 2 px (`--ring`: cian en oscuro, violeta en claro) con offset 2 px.

### Punched Card
Tarjeta "Siguiente tarjeta": lavanda perforada, tinta azul noche, borde de 1 px, 6 px de esquina, 20 px de padding, y una tira de 10 perforaciones (2.5 de alto) que alterna tinta y agujero. Sube 2 px en hover. Mantiene los mismos colores en ambos temas.

### Loom (componente firma)
Dos SVG a todo el ancho: banda de 6 filas de perforaciones (celdas de 30 x 22, agujero de 16 x 12 con esquina de 2; lleno en azul noche, vacío en punch-hole; separadores verticales cada 8 columnas) y tela de 10 filas (celdas de 28 x 24, esquina 4, relleno de hilo con tono de 186 a 277 y luminosidad de 71% a 54% según la fila; celda vacía en `muted`). Tocar una perforación cambia su celda. Entrada: cada fila se desliza desde -18 px y aparece en 520 ms, con 70 ms de retardo por fila.

### Cards / Containers
- **Game card:** esquina de 12 px, borde de 1 px, fondo `card`; cabecera de 192 px con cuadrícula `bg-loom` y vista dibujada del juego real; padding 24 px; icono en chip de neurona al 15%; botón primario completo con 44 px mínimo.
- **Contenedor de habilidades:** una sola banda de 12 px de esquina con divisores internos y mini hilera de 6 perforaciones por celda (2 x 4 px, neurona o borde).

### Inputs / Fields
Alto 40 px, borde de 1 px (`--input`), fondo `background`, esquina de 6 px, foco con anillo de 2 px y offset 2 px; placeholder en muted-foreground.

### Navigation
Landing: cabecera absoluta sin fondo, logo, selector de tema, "Ingresar" (ghost) y "Crear cuenta" (outline, desde sm). App: barra fija con borde inferior, `bg-background/90` y blur; enlaces de 14 px peso 500; activo en violeta neurona con subrayado de 2 px; Sparkz y neuronas a la derecha; menú móvil con despliegue. Logo: versión negra sobre claro y a color solo sobre oscuro; isotipo (mínimo 24 px) en el panel de autenticación.

### Auth Panel
Mitad de pantalla (md y más) con tela de 14 x 6 celdas al 90% de opacidad anclada abajo, isotipo de 72 px y título display sobre fondo `card`.

### Chips
Píldora, fondo neurona al 15%, texto neurona, 12 px, padding 8 x 4 px.

## Do's and Don'ts

### Do:
- **Do** construir superficies con cuadrículas de celdas de 30 px y esquinas de 4 px (hilo) o 2 px (perforación).
- **Do** usar los tokens (`primary`, `neuron`, `signal`, `muted`, `border`) y la escala `--g-*` que se invierte en claro; evitar hex sueltos.
- **Do** mantener el fondo en azul noche (oscuro) o papel violáceo (claro) y la tarjeta perforada en lavanda en ambos temas.
- **Do** usar el logo negro sobre fondo claro y el logo a color solo sobre oscuro.
- **Do** dar a cada animación una sola secuencia con ease-out exponencial `cubic-bezier(0.23, 1, 0.32, 1)` y detenerla con movimiento reducido.
- **Do** codificar el estado también con texto o forma, no solo con color.

### Don't:
- **Don't** aplicar el degradado cian a violeta a texto, botones o fondos.
- **Don't** usar tipografías pixeladas, mono decorativas ni familias distintas a Poppins e Inter.
- **Don't** usar verde o rojo como color de marca; son estados funcionales.
- **Don't** separar superficies con sombras, brillos o halos de neón.
- **Don't** mostrar datos de ejemplo como reales; las vistas dibujadas se rotulan "Vista ilustrativa".

## Known drift (recorded, not canonized)
- `tailwind.config.ts` remapea `gray`, `blue`, `purple` y `yellow` a tokens de marca y tema para que las clases heredadas (`text-gray-400`, `bg-blue-600`, `text-yellow-400`, `text-purple-400`) sigan funcionando. Los componentes antiguos (nav-bar, minijuegos) aún los usan; las superficies nuevas deben usar los tokens semánticos.
- Hex sueltos en la landing (`#0B0E1C`, `#2d3358`, `hsl(245 55% 84%)`) y la escala `blue-500..900` y `purple-500..900` con valores fijos no son tokens.
- `nav-bar.tsx`: `drop-shadow-glow` (sin definición en la configuración), `shadow-2xl` en el menú y `text-red-500` en cerrar sesión contradicen la regla Flat Weave salvo el rojo funcional.
