# Historias de usuario del MVP de COGIT

## Estado y trazabilidad

Este documento contiene una historia por cada uno de los 20 requisitos de [requisitos-mvp-cogit.md](requisitos-mvp-cogit.md). HU-001 corresponde a REQ-001, y asi sucesivamente hasta HU-020.

**Las historias son propuestas derivadas de una simulacion academica y del alcance documentado del MVP. No representan testimonios reales, funcionalidades comprobadas ni compromisos aprobados.**

Cada historia utiliza el formato **Como [rol], quiero [necesidad], para [beneficio]**. Los criterios Dado/Cuando/Entonces describen comprobaciones futuras, no resultados de pruebas ya ejecutadas. Las historias de requisitos no funcionales expresan necesidades de calidad transversales y no crean funcionalidades adicionales.

## Historias de requisitos funcionales

### HU-001. Aprender con misiones cortas y progresivas

Requisito asociado: **REQ-001**. Prioridad propuesta: **Alta**.

Como estudiante, quiero consultar misiones con objetivos concretos, duracion estimada y dificultad identificable, para organizar mi aprendizaje y avanzar progresivamente.

**Criterios de aceptacion**

1. Dado el listado de misiones, cuando lo consulto, entonces las misiones se presentan ordenadas por dificultad y puedo identificar su nivel.
2. Dada una mision, cuando consulto su informacion, entonces veo su objetivo y su duracion estimada. La duracion objetivo queda pendiente de acuerdo con el equipo tras revisar P7.

### HU-002. Elegir un minijuego

Requisito asociado: **REQ-002**. Prioridad propuesta: **Alta**.

Como estudiante, quiero elegir entre Sudoku, nonogramas y Robot Programmer, para practicar distintas habilidades de pensamiento computacional.

**Criterios de aceptacion**

1. Dado el catalogo, cuando selecciono cualquiera de los tres juegos, entonces puedo iniciar la actividad correspondiente.
2. Dados logros previamente guardados, cuando regreso al catalogo desde un juego, entonces esos logros permanecen disponibles.

### HU-003. Consultar reglas y ejemplos

Requisito asociado: **REQ-003**. Prioridad propuesta: **Alta**.

Como estudiante, quiero consultar instrucciones y ejemplos antes y durante una actividad, para comprender las reglas sin abandonar mi aprendizaje.

**Criterios de aceptacion**

1. Dado cualquiera de los tres juegos, cuando voy a comenzar o necesito ayuda durante la partida, entonces puedo consultar sus reglas e instrucciones.
2. Dada una actividad con ejemplo disponible, cuando consulto el ejemplo, entonces puedo revisarlo sin modificar mi progreso ni mis resultados.

### HU-004. Comprender mis errores

Requisito asociado: **REQ-004**. Prioridad propuesta: **Alta**.

Como estudiante, quiero recibir una explicacion breve o una pista al equivocarme, para entender el error y corregirlo por mi cuenta.

**Criterios de aceptacion**

1. Dada una respuesta incorrecta, cuando la actividad la evalua, entonces recibo una indicacion comprensible del error y una explicacion breve o pista, sin revelar automaticamente toda la solucion.
2. Dada una actividad sin resolver, cuando recibo esa ayuda, entonces la actividad no se registra como completada.

### HU-005. Solicitar pistas y volver a intentar

Requisito asociado: **REQ-005**. Prioridad propuesta: **Media**.

Como estudiante, quiero solicitar pistas y reiniciar el intento actual, para continuar practicando sin perder logros obtenidos anteriormente.

**Criterios de aceptacion**

1. Dada una actividad en curso, cuando solicito una pista, entonces recibo ayuda sin que la actividad quede completada automaticamente.
2. Dada una actividad completada y otra en curso, cuando reinicio el intento de la segunda, entonces se reinicia ese intento y la primera conserva su estado completado y sus logros.

### HU-006. Retomar mi aprendizaje

Requisito asociado: **REQ-006**. Prioridad propuesta: **Alta**.

Como estudiante con una cuenta, quiero guardar y recuperar mi avance en otra sesion, para continuar desde el estado que deje guardado.

**Criterios de aceptacion**

1. Dadas misiones completadas, resultados y una actividad con estado guardado, cuando vuelvo a iniciar sesion con la misma cuenta, entonces recupero mis logros, resultados y el estado reanudable.
2. Dado el progreso de una cuenta, cuando inicio sesion con otra, entonces no recibo el progreso de la primera.

### HU-007. Revisar mi avance

Requisito asociado: **REQ-007**. Prioridad propuesta: **Alta**.

Como estudiante, quiero consultar misiones pendientes y completadas, resultados y avance general, para reconocer mis logros y decidir que practicar despues.

**Criterios de aceptacion**

1. Dada mi cuenta con actividades registradas, cuando consulto el avance, entonces veo misiones pendientes y completadas, resultados y avance general.
2. Dada una mision pendiente, cuando la completo, entonces se actualizan su estado, su resultado y mi avance general sin registrar dos veces la finalizacion.

### HU-008. Controlar mi identidad en el ranking

Requisito asociado: **REQ-008**. Prioridad propuesta: **Media**.

Como estudiante, quiero consultar el ranking y elegir aparecer con un alias o no aparecer, para comparar resultados sin exponer mi nombre real por defecto.

**Criterios de aceptacion**

1. Dados participantes con puntajes distintos, cuando consulto el ranking, entonces la clasificacion respeta el orden por puntaje.
2. Dada mi participacion con alias, cuando se muestra el ranking, entonces aparece el alias y no mi nombre real.
3. Dada mi eleccion de excluirme, cuando se consulta el ranking, entonces no aparece mi participacion. El nombre real no se publica por defecto.

### HU-009. Consultar la comunidad demostrativa

Requisito asociado: **REQ-009**. Prioridad propuesta: **Media**.

Como estudiante, quiero consultar publicaciones de ejemplo identificadas como demostrativas, para conocer el contenido previsto de la comunidad sin confundirlo con participacion real.

**Criterios de aceptacion**

1. Dada la comunidad del MVP, cuando consulto sus publicaciones, entonces puedo leer contenido de muestra y reconocer su naturaleza demostrativa.
2. Dado que publicar y responder no forma parte del MVP inicial, cuando consulto la comunidad o interactuo con una demostracion, entonces no recibo una confirmacion falsa de publicacion ni se promete persistencia real.

### HU-010. Gestionar el acceso a mi cuenta

Requisito asociado: **REQ-010**. Prioridad propuesta: **Alta**.

Como estudiante, quiero crear una cuenta, iniciar y cerrar sesion y solicitar recuperacion de acceso, para consultar mi progreso personal y conservar el control de mi cuenta.

**Criterios de aceptacion**

1. Dados datos validos de registro, cuando creo una cuenta y luego inicio sesion con credenciales validas, entonces puedo acceder al progreso de esa cuenta.
2. Dada una sesion activa, cuando cierro sesion e intento acceder a informacion privada, entonces el acceso queda bloqueado hasta autenticarme nuevamente.
3. Dada una solicitud de recuperacion de acceso, cuando la envio, entonces puedo iniciar el procedimiento y la respuesta visible no revela si una cuenta de terceros existe.

### HU-011. Administrar usuarios y contenido

Requisito asociado: **REQ-011**. Prioridad propuesta: **Media**.

Como administrador, quiero consultar usuarios y administrar contenido de misiones, para mantener actualizado el contenido educativo del MVP.

**Criterios de aceptacion**

1. Dada una cuenta administradora autorizada, cuando accedo a la administracion, entonces puedo consultar usuarios y editar contenido de misiones.
2. Dada una cuenta de estudiante, cuando intenta realizar esas acciones administrativas, entonces el sistema rechaza la operacion.

## Historias de requisitos no funcionales

### HU-012. Iniciar una actividad sin ayuda

Requisito asociado: **REQ-012**. Prioridad propuesta: **Alta**.

Como estudiante, quiero encontrar una mision e iniciar una actividad de manera comprensible, para comenzar a aprender sin necesitar asistencia externa.

**Criterios de aceptacion**

1. Dados 20 estudiantes reales en una prueba de uso, cuando cada uno intenta encontrar una mision e iniciar una actividad, entonces al menos 16 completan ambas acciones sin ayuda en un tiempo maximo de dos minutos por persona.
2. Dada esa prueba, cuando se registran los resultados, entonces se documentan tiempo, exito y ayuda recibida. Las respuestas simuladas de P15 no se utilizan como evidencia de cumplimiento.

### HU-013. Utilizar el MVP en diferentes pantallas

Requisito asociado: **REQ-013**. Prioridad propuesta: **Alta**.

Como estudiante, quiero utilizar las funciones principales desde pantallas de distintos tamanos, para aprender desde el dispositivo que tenga disponible.

**Criterios de aceptacion**

1. Dados anchos de pantalla de 360, 768 y 1366 pixeles, cuando realizo el registro y consulto misiones, entonces los controles son operables, no se superponen y la pagina no requiere desplazamiento horizontal.
2. Dados esos mismos anchos, cuando utilizo Sudoku, nonogramas y Robot Programmer, entonces los tres juegos cumplen las mismas condiciones de operabilidad y distribucion.

### HU-014. Acceder con distintas necesidades de uso

Requisito asociado: **REQ-014**. Prioridad propuesta: **Alta**.

Como estudiante que utiliza teclado o necesita ampliar el contenido, quiero controles identificables e informacion legible que no dependa solo del color, para participar en las actividades de forma accesible.

**Criterios de aceptacion**

1. Dados los flujos de inicio y los tres juegos, cuando navego solo con teclado, entonces puedo operar los controles con foco visible y etiquetas claras.
2. Dados esos flujos, cuando amplio el contenido al 200% y consulto instrucciones o estados, entonces siguen siendo utilizables y su significado no depende exclusivamente del color.
3. Dado el texto normal de esos flujos, cuando se mide su contraste, entonces la relacion es al menos 4.5:1. Estas comprobaciones no se presentan como certificacion completa WCAG.

### HU-015. Obtener respuestas oportunas

Requisito asociado: **REQ-015**. Prioridad propuesta: **Alta**.

Como estudiante, quiero que las interacciones normales respondan rapidamente, para mantener la continuidad de mi aprendizaje.

**Criterios de aceptacion**

1. Dadas 25 sesiones concurrentes, una conexion de 10 Mbps y latencia de 100 ms, cuando se miden 100 interacciones normales, entonces al menos 95 producen una respuesta visible en menos de dos segundos.
2. Dada la medicion, cuando se calcula el cumplimiento, entonces se excluyen la carga inicial y los servicios externos y se documentan las condiciones de prueba.

### HU-016. Proteger mis datos personales

Requisito asociado: **REQ-016**. Prioridad propuesta: **Alta**.

Como estudiante, quiero que solo se recojan los datos necesarios y que mi informacion privada no se exponga a otros estudiantes, para utilizar COGIT con control sobre mi privacidad.

**Criterios de aceptacion**

1. Dado el registro y uso de la cuenta, cuando se revisan los datos solicitados, entonces cada dato tiene una finalidad necesaria para cuenta o aprendizaje y existe un aviso de finalidad de los datos.
2. Dadas dos cuentas de estudiantes, cuando una intenta consultar datos privados de la otra, entonces el acceso se rechaza.
3. Dado el ranking sin una decision explicita de publicacion de identidad, cuando se consulta, entonces no muestra correo ni nombre real por defecto.

### HU-017. Acceder de manera segura

Requisito asociado: **REQ-017**. Prioridad propuesta: **Alta**.

Como estudiante, quiero que mis credenciales y mi sesion esten protegidas y que solo se autoricen accesos permitidos, para evitar el uso indebido de mi cuenta.

**Criterios de aceptacion**

1. Dada una cuenta registrada, cuando se revisa el almacenamiento de credenciales, entonces su contrasena no se encuentra en texto plano.
2. Dado el acceso publico a COGIT, cuando se utiliza la plataforma, entonces las comunicaciones usan HTTPS.
3. Dada una operacion privada, cuando llega al servidor sin sesion valida o sin permisos suficientes, entonces se rechaza sin realizar la accion.

### HU-018. Conservar resultados consistentes

Requisito asociado: **REQ-018**. Prioridad propuesta: **Alta**.

Como estudiante, quiero saber si mi progreso se guardo y evitar resultados duplicados al reintentar, para confiar en mis logros y puntajes.

**Criterios de aceptacion**

1. Dado un guardado en curso, cuando se interrumpe y falla, entonces se informa el error, no se confirma un guardado exitoso y puedo reintentarlo.
2. Dada la misma finalizacion enviada dos veces, cuando se procesan ambas solicitudes, entonces se registra una sola finalizacion, no se duplica el puntaje y no se pierden logros anteriores.

### HU-019. Participar en un piloto con otros estudiantes

Requisito asociado: **REQ-019**. Prioridad propuesta: **Media**.

Como estudiante del piloto, quiero consultar y guardar mi progreso mientras otros estudiantes utilizan COGIT, para aprender sin que el uso simultaneo impida las operaciones principales.

**Criterios de aceptacion**

1. Dadas 100 cuentas registradas y 25 sesiones concurrentes, cuando se ejecutan 100 operaciones de consulta y guardado de progreso, entonces al menos 99 tienen exito.
2. Dada esa carga, cuando se mide el tiempo de respuesta bajo las condiciones de HU-015, entonces se cumple REQ-015: al menos el 95% de interacciones normales responde en menos de dos segundos.

### HU-020. Recuperar el progreso tras un incidente

Requisito asociado: **REQ-020**. Prioridad propuesta: **Media**.

Como responsable de la operacion de COGIT, quiero disponer de respaldos diarios y un procedimiento de restauracion, para recuperar el progreso de los estudiantes ante un incidente.

**Criterios de aceptacion**

1. Dado el servicio en operacion, cuando se revisa la politica y ejecucion de respaldos, entonces existe un respaldo diario del progreso y un procedimiento documentado de restauracion.
2. Dado un incidente simulado, cuando se ejecuta una restauracion de prueba, entonces la recuperacion tarda como maximo cuatro horas, la perdida de datos no supera 24 horas y se verifica la integridad de los logros recuperados.
3. Dadas esas metas, cuando se acuerda el alcance del MVP, entonces el equipo confirma o ajusta los valores antes de convertirlos en compromisos de operacion.