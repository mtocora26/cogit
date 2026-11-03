# Requisitos del MVP de COGIT

## Estado y alcance

Este documento lista 20 requisitos candidatos: 11 funcionales (RF) y 9 no funcionales (RNF). Proceden del [informe de simulacion](simulacion-encuesta-mvp-20-personas.md) y del [inventario tecnico](inventario-tecnico-mvp.md).

**Los resultados de la encuesta son simulados. Estos requisitos, sus prioridades y sus metas son provisionales y requieren validacion con estudiantes reales y aprobacion del equipo. No indican que las funcionalidades esten implementadas o verificadas.**

Las referencias P1 a P19 corresponden a las preguntas de la [encuesta del MVP](encuesta-mvp-cogit.md). Registro, administracion y capacidad del piloto provienen del inventario tecnico; no se presentan como demandas demostradas por la encuesta. P15 mide expectativa de facilidad de uso, no usabilidad observada.

Las historias asociadas se encuentran exclusivamente en [historias-usuario-mvp-cogit.md](historias-usuario-mvp-cogit.md). Cada requisito tiene una historia con el mismo numero.

## Requisitos funcionales

### REQ-001. Misiones cortas y progresivas

- Tipo: RF. Prioridad propuesta: Alta. Historia: HU-001.
- Origen: P5, P7; alcance MVP.
- Requisito: Ofrecer misiones con objetivo, duracion estimada y orden por dificultad.
- Aceptacion: Al consultar una mision, se muestran objetivo y duracion; su nivel es identificable. La duracion objetivo se acuerda tras revisar P7.

### REQ-002. Catalogo de minijuegos

- Tipo: RF. Prioridad propuesta: Alta. Historia: HU-002.
- Origen: P6; alcance MVP.
- Requisito: Permitir iniciar Sudoku, nonogramas y Robot Programmer.
- Aceptacion: Desde el catalogo se inicia cada uno de los tres juegos y se puede regresar sin perder logros guardados.

### REQ-003. Instrucciones y ejemplos

- Tipo: RF. Prioridad propuesta: Alta. Historia: HU-003.
- Origen: P3, P4, P19.
- Requisito: Mostrar reglas e instrucciones antes de la actividad y permitir volver a consultarlas; incluir un ejemplo cuando corresponda.
- Aceptacion: En cada juego se pueden consultar reglas antes y durante la partida; un ejemplo no altera el progreso.

### REQ-004. Retroalimentacion de errores

- Tipo: RF. Prioridad propuesta: Alta. Historia: HU-004.
- Origen: P4, P8, P19.
- Requisito: Indicar errores y ofrecer una explicacion breve o una pista sin revelar automaticamente toda la solucion.
- Aceptacion: Una respuesta incorrecta produce un mensaje comprensible; la explicacion o pista no marca la actividad como completada.

### REQ-005. Pistas y reintentos

- Tipo: RF. Prioridad propuesta: Media. Historia: HU-005.
- Origen: P4, P8, P19.
- Requisito: Permitir solicitar una pista y reiniciar el intento actual sin borrar logros anteriores.
- Aceptacion: Tras completar una actividad y reiniciar otra, la primera sigue completada; solicitar pista no completa la segunda.

### REQ-006. Guardar y retomar progreso

- Tipo: RF. Prioridad propuesta: Alta. Historia: HU-006.
- Origen: P9, P18, P19.
- Requisito: Guardar misiones completadas, resultados y estado reanudable de la actividad para la cuenta correspondiente.
- Aceptacion: Al guardar un estado y volver a iniciar sesion, el mismo usuario recupera ese estado y sus logros; otro usuario no los recibe.

### REQ-007. Consultar avance

- Tipo: RF. Prioridad propuesta: Alta. Historia: HU-007.
- Origen: P10, P19.
- Requisito: Mostrar misiones pendientes y completadas, resultados y avance general.
- Aceptacion: Completar una mision actualiza el listado, el resultado y el avance general sin duplicar la finalizacion.

### REQ-008. Ranking con control de identidad

- Tipo: RF. Prioridad propuesta: Media. Historia: HU-008.
- Origen: P11, P12, P19.
- Requisito: Mostrar clasificacion por puntaje y permitir alias o exclusion de la publicacion; no exponer nombres reales por defecto.
- Aceptacion: El ranking se ordena segun puntaje; un usuario excluido no aparece y uno con alias no expone su nombre real.

### REQ-009. Comunidad demostrativa

- Tipo: RF. Prioridad propuesta: Media. Historia: HU-009.
- Origen: P13; alcance MVP.
- Requisito: Permitir consultar publicaciones de demostracion, identificadas como tales.
- Aceptacion: Se consultan publicaciones de muestra; no se informa que un comentario fue publicado si no existe persistencia real. Publicar y responder queda fuera del MVP inicial.

### REQ-010. Registro y acceso

- Tipo: RF. Prioridad propuesta: Alta. Historia: HU-010.
- Origen: Inventario tecnico; P18 como preocupacion, no demanda directa.
- Requisito: Permitir crear una cuenta, iniciar y cerrar sesion y solicitar recuperacion de acceso.
- Aceptacion: Una cuenta valida permite acceder a su progreso; cerrar sesion bloquea acceso privado y la recuperacion no revela si terceros tienen cuenta.

### REQ-011. Administracion basica

- Tipo: RF. Prioridad propuesta: Media. Historia: HU-011.
- Origen: Inventario tecnico, no encuesta.
- Requisito: Permitir a administradores consultar usuarios y administrar contenido de misiones.
- Aceptacion: Un administrador puede consultar usuarios y editar contenido; un estudiante no puede realizar esas acciones.

## Requisitos no funcionales

### REQ-012. Facilidad de uso

- Tipo: RNF. Prioridad propuesta: Alta. Historia: HU-012.
- Origen: P4, P15, P16, P19.
- Requisito: En una prueba real, al menos 16 de 20 estudiantes deben encontrar una mision e iniciar una actividad sin ayuda en dos minutos.
- Aceptacion: Aplicar prueba con participantes reales y registrar tiempo, exito y ayuda. P15 solo mide expectativa, no usabilidad comprobada.

### REQ-013. Diseno adaptable

- Tipo: RNF. Prioridad propuesta: Alta. Historia: HU-013.
- Origen: P14, P16, P19.
- Requisito: Hacer operables los flujos principales en pantallas de 360, 768 y 1366 pixeles de ancho.
- Aceptacion: En cada ancho, registro, misiones y los tres juegos no presentan controles superpuestos ni desplazamiento horizontal de la pagina.

### REQ-014. Accesibilidad

- Tipo: RNF. Prioridad propuesta: Alta. Historia: HU-014.
- Origen: P16; meta tecnica propuesta.
- Requisito: Permitir teclado, foco visible, etiquetas claras, informacion no dependiente solo del color y ampliacion al 200%; contraste de texto normal al menos 4.5:1.
- Aceptacion: Verificar manualmente los flujos de inicio y juegos con teclado y zoom; medir contraste. Estos controles no constituyen certificacion completa WCAG.

### REQ-015. Tiempo de respuesta

- Tipo: RNF. Prioridad propuesta: Alta. Historia: HU-015.
- Origen: P17; meta tecnica propuesta.
- Requisito: Lograr respuesta visible en menos de dos segundos en al menos el 95% de interacciones normales.
- Aceptacion: Medir 100 interacciones con 25 sesiones concurrentes, conexion de 10 Mbps y latencia de 100 ms; 95 deben tardar menos de dos segundos, excluyendo carga inicial y servicios externos.

### REQ-016. Privacidad

- Tipo: RNF. Prioridad propuesta: Alta. Historia: HU-016.
- Origen: P12, P18, P19.
- Requisito: Recoger solo datos necesarios para cuenta y aprendizaje y evitar exposicion de datos privados a otros estudiantes.
- Aceptacion: Una cuenta no puede consultar datos privados de otra; el ranking no muestra correo ni nombre real por defecto; existe aviso de finalidad de los datos.

### REQ-017. Seguridad de acceso

- Tipo: RNF. Prioridad propuesta: Alta. Historia: HU-017.
- Origen: P18; criterio tecnico.
- Requisito: Proteger credenciales y sesiones, cifrar comunicaciones y autorizar operaciones privadas en el servidor.
- Aceptacion: No se almacenan contrasenas en texto plano; solicitudes sin sesion o permisos validos son rechazadas; el acceso publico usa HTTPS.

### REQ-018. Integridad del progreso

- Tipo: RNF. Prioridad propuesta: Alta. Historia: HU-018.
- Origen: P9, P18, P19.
- Requisito: No confirmar guardados fallidos ni duplicar puntajes ante reintentos de una misma finalizacion.
- Aceptacion: Interrumpir un guardado muestra error y permite reintento; enviar dos veces la misma finalizacion no duplica el puntaje ni pierde logros anteriores.

### REQ-019. Capacidad del piloto

- Tipo: RNF. Prioridad propuesta: Media. Historia: HU-019.
- Origen: Inventario tecnico, no encuesta.
- Requisito: Soportar 100 cuentas registradas y 25 sesiones concurrentes en los flujos del MVP.
- Aceptacion: Con 100 cuentas y 25 sesiones activas, al menos el 99% de 100 operaciones de consultar y guardar progreso tienen exito y se verifica REQ-015.

### REQ-020. Recuperacion ante incidentes

- Tipo: RNF. Prioridad propuesta: Media. Historia: HU-020.
- Origen: P18; meta tecnica propuesta.
- Requisito: Disponer de respaldo diario del progreso y procedimiento de restauracion con perdida maxima de 24 horas y recuperacion en cuatro horas.
- Aceptacion: Ejecutar restauracion de prueba y verificar fechas del respaldo, integridad de logros y duracion. Valores pendientes de aprobar con el equipo.

## Condiciones pendientes de aprobacion

La duracion de las misiones, las prioridades y las metas de usabilidad, accesibilidad, rendimiento, capacidad y recuperacion deben acordarse antes de utilizarlas como compromisos del MVP. La publicacion y las respuestas reales en comunidad no forman parte del alcance demostrativo.