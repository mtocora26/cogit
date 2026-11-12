# Estado de implementación de los requisitos del MVP

Revisión hecha leyendo el código de `dev` el 2026-11-11 (hasta el PR de REQ-021). Es una revisión del código, no una verificación con usuarios: los requisitos no funcionales (REQ-012 a REQ-020) piden pruebas o mediciones reales y no se pueden tachar leyendo código. Los criterios están en [requisitos-mvp-cogit.md](requisitos-mvp-cogit.md).

Leyenda: ✅ implementado · 🟡 parcial · ⬜ sin implementar.

## Requisitos funcionales

| Req | Estado | Qué hay y qué falta |
|---|---|---|
| REQ-001 Misiones cortas y progresivas | ✅ | Objetivo, duración estimada y nivel visibles en cada misión. |
| REQ-002 Catálogo de minijuegos | ✅ | Los 3 juegos se inician; los resultados se guardan en la cuenta (#50) y los selectores de nivel muestran los logros de la cuenta además de los del navegador, así que no se pierden al cambiar de dispositivo. |
| REQ-003 Instrucciones y ejemplos | ✅ | Reglas y ejemplo en Sudoku, nonogramas, Robot y nivel 1, consultables durante la partida. |
| REQ-004 Retroalimentación de errores | ✅ | Mensajes que explican el error, sin completar la actividad. |
| REQ-005 Pistas y reintentos | ✅ | Pistas graduales; reintentar no borra lo completado. |
| REQ-006 Guardar y retomar progreso | ✅ | Misiones y minijuegos guardan el estado a medias en la cuenta (tablero, programa, notas, pistas y tiempo) y lo retoman al volver a entrar, con aviso y opción de empezar de nuevo. Se descarta al reiniciar, al perder o al completar. |
| REQ-007 Consultar avance | ✅ | Avance de misiones y, en el perfil, nivel, mejor tiempo y puntos de cada minijuego completado; el ranking suma esos puntos. |
| REQ-008 Ranking con control de identidad | ✅ | Ordenado por puntaje, con alias y exclusión desde el perfil. |
| REQ-009 Comunidad demostrativa | ✅ | Solo lectura, con publicaciones marcadas como ejemplo. |
| REQ-010 Registro y acceso | ✅ | Registro, inicio y cierre de sesión. Recuperación real por correo: enlace de un solo uso (hash SHA-256 en base, vigencia 60 min), misma respuesta exista o no la cuenta y envío con Resend. Requiere `RESEND_API_KEY`, `APP_URL` y la migración `20261111010000_recuperacion_password`. Sin dominio verificado, Resend solo entrega al correo del dueño de su cuenta. Las sesiones ya abiertas siguen válidas hasta expirar (cookie sin estado en el servidor). |
| REQ-011 Administración básica | ✅ | Usuarios y edición de contenido, solo para administradores. |
| REQ-021 Términos y condiciones | ✅ | Página `/terminos` con versión y fecha, casilla en el registro, validación en el servidor y registro de versión y fecha aceptadas. Requiere aplicar la migración `20261111000000_aceptacion_terminos` en producción. |

## Requisitos no funcionales

| Req | Estado | Nota |
|---|---|---|
| REQ-012 Facilidad de uso | ⬜ | Requiere prueba con estudiantes reales (#51). |
| REQ-013 Diseño adaptable | ⬜ | Sin verificar en 360, 768 y 1366 px. |
| REQ-014 Accesibilidad | ⬜ | Sin verificar con teclado, zoom ni contraste. |
| REQ-015 Tiempo de respuesta | ⬜ | Sin medir. |
| REQ-016 Privacidad | ✅ | Verificado con pruebas y contra producción: una cuenta no consulta datos de otra, el ranking no expone correo ni contraseña y el aviso de finalidad está en `/terminos`. Detalle en [verificacion-rnf.md](verificacion-rnf.md). |
| REQ-017 Seguridad de acceso | 🟡 | Rutas privadas rechazan sin sesión (probado en producción), HTTPS con HSTS, cookie firmada y `httpOnly`. Pendiente: una cuenta antigua con contraseña aún sin cifrar, sin límite de intentos de login y las sesiones abiertas no se cierran al cambiar la contraseña. Ver [verificacion-rnf.md](verificacion-rnf.md). |
| REQ-018 Integridad del progreso | ✅ | Los guardados fallidos se avisan y se pueden reintentar (minijuegos y misiones); enviar dos veces la misma finalización no duplica puntos ni baja logros (pruebas). Sin probar la interrupción de red real en navegador. Ver [verificacion-rnf.md](verificacion-rnf.md). |
| REQ-019 Capacidad del piloto | ⬜ | Sin pruebas de carga (#19). |
| REQ-020 Recuperación ante incidentes | ⬜ | Sin respaldo ni restauración documentados (#20). |
