# Requisitos del MVP de COGIT

Los requisitos funcionales usan el codigo RF y los no funcionales RNF. El TipoRequisito de los RF sigue la clasificacion de la clase: **Ubicuos** (el requisito aplica siempre) y **Basado en estado** (el requisito aplica segun el estado o condicion del sistema). El TipoRequisito de los RNF corresponde a su atributo de calidad (Usabilidad, Rendimiento, Seguridad, Calidad, Disponibilidad, entre otros). Cada requisito corresponde a una historia de usuario en [historias-usuario-mvp-cogit.md](historias-usuario-mvp-cogit.md).

## Requisitos funcionales

| CODIGO | NombreRequisitos | TipoRequisito | DescripcionRequisito | ROL | Stakeholder |
|--------|------------------|---------------|----------------------|-----|-------------|
| RF1 | registro | Ubicuos | El sistema debe permitir crear una cuenta con datos validos para acceder al progreso personal. | usuario | estudiante |
| RF2 | login | Ubicuos | El sistema debe permitir iniciar sesion con credenciales validas para consultar el progreso de la cuenta. | software | estudiante |
| RF3 | cierreSesion | Ubicuos | El sistema debe permitir el cierre de sesion manual de forma que el acceso a informacion privada quede bloqueado hasta autenticarse nuevamente. | software | estudiante |
| RF4 | recuperarAcceso | Ubicuos | El sistema debe permitir solicitar la recuperacion de acceso sin revelar si una cuenta de terceros existe. | software | estudiante |
| RF5 | misiones | Basado en estado | El sistema debe mostrar misiones con objetivo, duracion estimada y orden por dificultad segun el nivel del estudiante. | software | estudiante |
| RF6 | catalogoJuegos | Ubicuos | El sistema debe mostrar un catalogo con Sudoku, nonogramas y Robot Programmer para iniciar cada actividad. | usuario | estudiante |
| RF7 | instrucciones | Basado en estado | El sistema debe mostrar reglas, instrucciones y un ejemplo antes y durante la actividad seleccionada. | software | estudiante |
| RF8 | retroalimentacion | Basado en estado | El sistema debe indicar el error y ofrecer una explicacion breve o pista cuando exista una respuesta incorrecta, sin revelar automaticamente toda la solucion. | software | estudiante |
| RF9 | pistas | Basado en estado | El sistema debe permitir solicitar una pista y reiniciar el intento actual sin borrar los logros anteriores. | usuario | estudiante |
| RF10 | guardarProgreso | Basado en estado | El sistema debe guardar misiones completadas, resultados y estado reanudable asociados a la cuenta con sesion activa. | software | estudiante |
| RF11 | consultarAvance | Basado en estado | El sistema debe mostrar misiones pendientes y completadas, resultados y avance general de la cuenta con actividades registradas. | usuario | estudiante |
| RF12 | ranking | Basado en estado | El sistema debe mostrar la clasificacion por puntaje y permitir aparecer con alias o excluirse de la publicacion. | software | estudiante |
| RF13 | comunidad | Ubicuos | El sistema debe mostrar publicaciones de demostracion identificadas como tales. | usuario | estudiante |
| RF14 | gestionUsuarios | Ubicuos | El sistema debe permitir a un administrador consultar los usuarios registrados y administrar el contenido de misiones. | admin/system | administrador |

## Requisitos no funcionales

| CODIGO | NombreRequisitos | TipoRequisito | DescripcionRequisito | ROL | Stakeholder |
|--------|------------------|---------------|----------------------|-----|-------------|
| RNF1 | facilidadUso | Usabilidad | El sistema debe permitir que al menos 16 de 20 estudiantes encuentren una mision e inicien una actividad sin ayuda en dos minutos. | software | estudiante |
| RNF2 | disenoAdaptable | Usabilidad | El sistema debe mantener operables los flujos principales en pantallas de 360, 768 y 1366 pixeles de ancho. | software | estudiante |
| RNF3 | accesibilidad | Usabilidad | El sistema debe permitir teclado, foco visible, etiquetas claras, informacion no dependiente solo del color y ampliacion al 200%; contraste de texto normal al menos 4.5:1. | software | estudiante |
| RNF4 | tiempoRespuesta | Rendimiento | El sistema debe lograr respuesta visible en menos de dos segundos en al menos el 95% de las interacciones normales bajo condiciones de uso concurrente. | software | estudiante |
| RNF5 | privacidad | Seguridad | El sistema debe recoger solo los datos necesarios para cuenta y aprendizaje y evitar la exposicion de datos privados a otros estudiantes. | software | estudiante |
| RNF6 | seguridadAcceso | Seguridad | El sistema debe proteger credenciales y sesiones, cifrar las comunicaciones y autorizar las operaciones privadas en el servidor. | software | estudiante |
| RNF7 | integridadProgreso | Calidad | El sistema debe no confirmar guardados fallidos ni duplicar puntajes ante reintentos de una misma finalizacion. | software | estudiante |
| RNF8 | capacidadPiloto | Rendimiento | El sistema debe soportar 100 cuentas registradas y 25 sesiones concurrentes en los flujos del MVP. | software | estudiante |
| RNF9 | recuperacionIncidentes | Disponibilidad | El sistema debe disponer de respaldo diario del progreso y procedimiento de restauracion con perdida maxima de 24 horas y recuperacion en cuatro horas. | admin/system | administrador/responsable de operacion |
