# Verificación de requisitos no funcionales: REQ-016, REQ-017 y REQ-018

Fecha: 2026-11-12. Producción verificada: https://cogit-nine.vercel.app. Método: revisión del código, pruebas automáticas (`pnpm vitest run`, 148 pruebas) y peticiones de solo lectura contra producción. No se crearon datos de prueba en producción.

Leyenda: ✅ cumple · 🟡 cumple con hallazgos pendientes.

## REQ-016. Privacidad: ✅

| Criterio | Evidencia |
|---|---|
| Una cuenta no puede consultar datos privados de otra | `GET /api/progreso?userId=otro` responde 403 a un estudiante y solo un administrador puede (prueba `app/api/privacidad.test.ts`). `/api/usuario/me`, `/api/progreso/parcial` y `/api/usuario/cambiar-password` leen siempre la cuenta de la sesión y no aceptan un userId. |
| El ranking no muestra correo ni nombre real por defecto | El ranking pide solo `id`, `username` (alias), `rol` y puntaje; una prueba verifica que `email` y `password` no están en la consulta, en ranking semanal y global. En producción devuelve `[{"id","name","points","rank"}]`. |
| El usuario puede excluirse | `visibleEnRanking` (interruptor en `/perfil`); la consulta filtra por él (prueba). |
| Datos mínimos | Se guardan alias, correo (solo para recuperar acceso), contraseña cifrada y progreso. |
| Aviso de finalidad de los datos | `/terminos`, sección 3 (responde 200 en producción); el registro obliga a aceptarlo. |

Observación: `/api/ranking` es público (no exige sesión) y expone el alias y el id numérico de cada estudiante visible. Es coherente con REQ-008, pero si se prefiere que el ranking solo lo vea quien inició sesión, es un cambio de una línea.

## REQ-017. Seguridad de acceso: 🟡

| Criterio | Evidencia |
|---|---|
| Contraseñas no en texto plano | Nuevas contraseñas con scrypt y sal (`lib/auth.ts`); cambio y restablecimiento también cifran (pruebas). **Hallazgo 1**, ver abajo. |
| Solicitudes sin sesión o permisos válidos son rechazadas | Producción sin cookie: `/api/usuario/me`, `/api/progreso`, `/api/progreso/parcial`, `/api/misiones/catalogo`, `/api/admin/usuarios` y `PUT /api/admin/contenido` responden 401; `POST /api/progreso` y `POST /api/usuario/cambiar-password` responden 401; `/admin` redirige a `/login`. Las rutas de administración vuelven a leer el rol en la base (`lib/admin-guard.ts`). |
| Sesión protegida | Cookie `httpOnly`, `sameSite=lax`, `secure` en producción, firmada con HMAC-SHA256; `SESSION_SECRET` es obligatorio en producción. |
| Acceso público con HTTPS | `http://` redirige con 308 a `https://`; `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`. |
| Recuperación sin revelar cuentas | Misma respuesta exista o no el correo (prueba). |

Hallazgos pendientes:

1. **Una cuenta de producción con contraseña sin cifrar.** El 2026-11-12 había 3 cuentas y solo 2 con hash scrypt. Es una cuenta antigua: el sistema la cifra sola la próxima vez que esa persona inicia sesión, pero hasta entonces sigue en texto plano. Este criterio no se puede dar por cumplido hasta que esa cuenta se migre (la persona inicia sesión, o se cifra directamente en la base).
2. **No hay límite de intentos de inicio de sesión.** Alguien podría probar contraseñas sin freno. Mitigación recomendada: limitar intentos por usuario y por IP (requiere un almacén compartido, por ejemplo la base de datos o Redis).
3. **Cambiar la contraseña no cierra las sesiones ya abiertas**: la cookie es válida hasta 7 días. Mitigación recomendada: guardar una versión de contraseña en la sesión.
4. **Cabeceras de seguridad**: faltaban `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy`. Se agregan en `next.config.mjs` junto con este documento. No se añadió una política CSP: puede romper scripts de la aplicación y requiere pruebas visuales.

## REQ-018. Integridad del progreso: ✅

| Criterio | Evidencia |
|---|---|
| No confirmar guardados fallidos | Minijuegos: `lib/guardar-resultado.ts` lanza un error si el servidor falla, no hay sesión o no hay red, y la pantalla muestra el aviso con "Reintentar" (`lib/guardar-resultado.test.ts`). Misiones: antes el aviso pedía "volver a intentarlo" sin forma de hacerlo; ahora el resultado queda pendiente y la pantalla final ofrece "Reintentar guardado" sin repetir la actividad. Avance a medias: ya tenía aviso y reintento. |
| Enviar dos veces la misma finalización no duplica el puntaje | Clave única `userId+seccion+nivel+actividad` con `upsert` (una sola fila); el puntaje conserva el máximo. Pruebas en `app/api/progreso/route.test.ts`, para minijuegos y misiones. |
| No pierde logros anteriores | Un reintento peor no baja el puntaje ni quita `completado` (prueba). |
| Los puntos de minijuegos no los decide el cliente | El servidor los fija por nivel (`lib/minijuegos-puntos.ts`). Para misiones el puntaje sí lo envía el cliente: un usuario podría inflar su propio puntaje. Mitigación pendiente si el ranking importa. |

Lo que no se probó: interrumpir la red a mitad de un guardado en un navegador real. Las pruebas cubren el comportamiento con respuestas simuladas.

## REQ-014. Accesibilidad: 🟡

Fecha: 2026-11-17. Método: prueba automática de contraste sobre los tokens de color y revisión del código. No es una certificación WCAG completa.

| Criterio | Evidencia |
|---|---|
| Contraste de texto normal ≥ 4.5:1 | `lib/contraste.test.ts` mide 20 combinaciones texto/fondo en el tema claro y en el oscuro (texto, tarjetas, paneles, botones, neuronas, grises secundarios). Falló una: el blanco sobre el rojo de error del tema oscuro (4.05:1). Se cambió el texto de ese botón a azul noche y ahora todas pasan. |
| Teclado y etiquetas | Sudoku: las celdas son botones con etiqueta («Fila 3, columna 5: vacía, error»). Nonogramas: las celdas eran `div` con clic, **inaccesibles con teclado**; ahora son botones con etiqueta, flechas para moverse, Enter/espacio para rellenar y la tecla X (o Mayús+Enter) para marcar. Robot Programmer: las instrucciones se añaden con botones (arrastrar es opcional). Misiones: opciones como botones/radios reales. |
| Marcar con X sin clic derecho | Solo se podía con clic derecho (imposible en táctil). Ahora hay un botón «Marcar con X» que activa el modo. |
| Información no dependiente solo del color | Error y pista en nonogramas llevan símbolo («!» y «•»); error en sudoku lleva «!» y etiqueta; los estados de las actividades del nivel 4 llevan icono y texto («Correcto», «Incorrecto»). |
| Foco visible | No hay `outline-none` sin un anillo de foco alternativo (búsqueda en `app/` y `components/`); los botones comparten `focus-visible:ring`. |
| Ampliación al 200% | No se bloquea el zoom (no hay `maximum-scale` ni `user-scalable`). **Sin probar visualmente** al 200%. |

Pendiente para dar el requisito por cumplido: recorrer a mano los flujos de inicio y los tres juegos solo con teclado y con zoom al 200% (equivale a un ancho útil de 640 px en una pantalla de 1280 px), y revisar los colores que no son tokens (por ejemplo `text-gray-400` sobre fondos de color).
