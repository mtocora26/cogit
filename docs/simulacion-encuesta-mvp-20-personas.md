# Simulacion academica de la encuesta del MVP de COGIT

**No contiene respuestas reales. No demuestra viabilidad ni valida requisitos.**

## Alcance y metodo

- **Fuente:** INSTRUMENTO DE VALIDACIÓN DE LA VIABILIDAD DE COGIT.xlsx; Sheet1; solo ID, fila y semestre originales.
- **Candidatos:** 28
- **Muestra:** 20
- **Seleccion:** Aleatoria simple sin reemplazo; semilla 20261102; orden final por ID.
- **Respuestas:** P1 conserva semestre real. P2-P19 son sinteticas; semilla 20261103.
- **Sesgo:** Pesos artificiales orientados a explorar necesidades; no estimados de los datos originales. No usar para inferencia poblacional.
- **Privacidad:** Se omiten nombres y telefonos. IDs y filas permiten vinculacion: datos seudonimizados, no anonimizados; uso academico restringido.
- **Pregunta 15:** Mide expectativa declarada, no facilidad de uso observada; no hubo prueba real del MVP.
- **Requisitos:** Candidatos provisionales. Prioridades y umbrales son propuestas, no acuerdos validados ni funciones ya comprobadas.
- **Multiseleccion:** Porcentaje por personas sobre 20; la suma puede superar 100%. P19 no se cuantifica por temas.
- **Limitacion:** No se simulan opciones Otro, rechazo ni ausencia de informacion en preguntas multiseleccion; cobertura deliberadamente limitada.

El original contiene 28 registros en Sheet1, aunque la solicitud inicial mencionaba 30. No se agregaron personas inexistentes. La seleccion no fue estratificada por semestre.

La encuesta utilizada es [encuesta-mvp-cogit.md](encuesta-mvp-cogit.md). El Excel generado conserva una matriz de una fila por participante y una columna por pregunta, como el instrumento de origen, pero no copia sus otras hojas ni su formato visual.

## Muestra seleccionada

| Participante | ID original | Fila Sheet1 | Semestre original |
| --- | --- | --- | --- |
| SIM-01 | 2 | 3 | 2 Semestre |
| SIM-02 | 3 | 4 | 1 Semestre |
| SIM-03 | 4 | 5 | 1 Semestre |
| SIM-04 | 6 | 7 | 1 Semestre |
| SIM-05 | 7 | 8 | 2 Semestre |
| SIM-06 | 8 | 9 | 1 Semestre |
| SIM-07 | 9 | 10 | 2 Semestre |
| SIM-08 | 10 | 11 | 1 Semestre |
| SIM-09 | 13 | 14 | 1 Semestre |
| SIM-10 | 14 | 15 | 2 Semestre |
| SIM-11 | 15 | 16 | 1 Semestre |
| SIM-12 | 17 | 18 | 1 Semestre |
| SIM-13 | 18 | 19 | 2 Semestre |
| SIM-14 | 19 | 20 | 1 Semestre |
| SIM-15 | 21 | 22 | 1 Semestre |
| SIM-16 | 22 | 23 | 2 Semestre |
| SIM-17 | 25 | 26 | 1 Semestre |
| SIM-18 | 26 | 27 | 2 Semestre |
| SIM-19 | 27 | 28 | 1 Semestre |
| SIM-20 | 28 | 29 | 2 Semestre |

## Resultados descriptivos

Cada persona equivale al 5% de la muestra. Los porcentajes describen solo este escenario sintetico; no se calculan margenes de error ni se generalizan a estudiantes reales.

### P1. ¿En qué semestre se encuentra actualmente?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Primero | 12 | 60% |
| Segundo | 8 | 40% |
| Otro. ¿Cuál?: ____________________ | 0 | 0% |
| Prefiero no responder | 0 | 0% |

### P2. ¿Qué tanta dificultad ha tenido al aprender temas relacionados con pensamiento computacional o lógica de programación?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Ninguna | 1 | 5% |
| Poca | 3 | 15% |
| Moderada | 10 | 50% |
| Alta | 4 | 20% |
| Muy alta | 0 | 0% |
| No he estudiado estos temas | 2 | 10% |

### P3. ¿En cuáles de estos temas encuentra o esperaría encontrar mayor dificultad?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Comprender y seguir instrucciones paso a paso | 4 | 20% |
| Identificar patrones o resolver problemas de lógica | 9 | 45% |
| Dividir un problema en partes más pequeñas | 7 | 35% |
| Comprender secuencias de instrucciones | 5 | 25% |
| Comprender decisiones o condiciones | 6 | 30% |
| Comprender repeticiones o ciclos | 10 | 50% |
| Ninguno de los anteriores | 0 | 0% |
| Otro: ____________________ | 0 | 0% |

### P4. ¿Qué apoyos le serían más útiles al resolver actividades de aprendizaje?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Instrucciones claras, presentadas paso a paso | 5 | 25% |
| Ejemplos resueltos antes de iniciar | 3 | 15% |
| Pistas disponibles cuando me atasco | 4 | 20% |
| Retroalimentación inmediata al responder | 7 | 35% |
| Dificultad progresiva | 10 | 50% |
| Representaciones visuales de las instrucciones o del problema | 4 | 20% |
| Poder intentar de nuevo sin perder el avance | 5 | 25% |
| Otro: ____________________ | 0 | 0% |

### P5. Indique su nivel de acuerdo con la afirmación: “Me interesaría aprender mediante misiones cortas con objetivos concretos”.

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Totalmente en desacuerdo | 1 | 5% |
| En desacuerdo | 1 | 5% |
| Ni de acuerdo ni en desacuerdo | 4 | 20% |
| De acuerdo | 7 | 35% |
| Totalmente de acuerdo | 7 | 35% |
| No tengo suficiente información para responder | 0 | 0% |

### P6. ¿Cuáles de las actividades previstas para COGIT le interesaría probar?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Sudoku | 9 | 45% |
| Nonogramas | 9 | 45% |
| Robot Programmer, para organizar instrucciones y guiar un robot | 10 | 50% |
| Misiones de aprendizaje que integren actividades y objetivos | 11 | 55% |
| Ninguna por ahora | 0 | 0% |
| No tengo suficiente información para decidir | 0 | 0% |

### P7. ¿Qué duración preferiría para una misión o actividad de aprendizaje?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Menos de 5 minutos | 4 | 20% |
| Entre 5 y 10 minutos | 10 | 50% |
| Entre 11 y 15 minutos | 4 | 20% |
| Más de 15 minutos | 1 | 5% |
| No tengo preferencia | 1 | 5% |

### P8. Cuando se equivoca en una actividad, ¿qué tipo de respuesta preferiría recibir?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Una indicación inmediata que señale que hay un error | 3 | 15% |
| Una pista que ayude a encontrar la solución sin revelarla | 4 | 20% |
| Una explicación breve del error y cómo corregirlo | 13 | 65% |
| La solución correcta con una explicación | 0 | 0% |
| Prefiero poder continuar sin recibir mensajes | 0 | 0% |
| No tengo preferencia | 0 | 0% |

### P9. ¿Qué tan importante sería para usted que COGIT conserve el avance para retomarlo en otra sesión?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Nada importante | 0 | 0% |
| Poco importante | 0 | 0% |
| Moderadamente importante | 1 | 5% |
| Importante | 6 | 30% |
| Muy importante | 11 | 55% |
| No tengo suficiente información para responder | 2 | 10% |

### P10. ¿Qué información sobre su avance le resultaría útil consultar?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Misiones completadas y pendientes | 9 | 45% |
| Actividades realizadas | 10 | 50% |
| Resultados o puntajes obtenidos | 8 | 40% |
| Avance general en las misiones | 12 | 60% |
| Fecha o registro de la última actividad | 3 | 15% |
| No necesito consultar información de avance | 0 | 0% |
| Otra: ____________________ | 0 | 0% |

### P11. ¿Cómo influiría en su motivación ver una clasificación o ranking de participantes?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| La disminuiría mucho | 0 | 0% |
| La disminuiría un poco | 2 | 10% |
| No tendría efecto | 4 | 20% |
| La aumentaría un poco | 4 | 20% |
| La aumentaría mucho | 9 | 45% |
| No tengo suficiente información para responder | 1 | 5% |

### P12. Si se presenta un ranking, ¿cómo preferiría que apareciera su identidad?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Con un alias o nombre de usuario | 10 | 50% |
| Con mi nombre | 2 | 10% |
| Solo con mi posición, sin mostrar mi nombre ni alias | 3 | 15% |
| Preferiría que mi participación no apareciera en el ranking | 4 | 20% |
| No tengo preferencia | 1 | 5% |

### P13. ¿Qué interacción esperaría de la comunidad demostrativa incluida en el MVP?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Consultar publicaciones o información sin participar | 5 | 25% |
| Consultar publicaciones y reaccionar o responder | 7 | 35% |
| Publicar preguntas o comentarios y consultar respuestas | 7 | 35% |
| No utilizaría la comunidad | 1 | 5% |
| No tengo suficiente información para decidir | 0 | 0% |

### P14. ¿Desde qué dispositivo usaría principalmente COGIT?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Computador de escritorio | 4 | 20% |
| Computador portátil | 11 | 55% |
| Teléfono inteligente | 5 | 25% |
| Tableta | 0 | 0% |
| Otro: ____________________ | 0 | 0% |

### P15. Indique su nivel de acuerdo con la afirmación: “Me resultaría fácil encontrar las misiones, iniciar una actividad y entender qué debo hacer”.

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Totalmente en desacuerdo | 0 | 0% |
| En desacuerdo | 3 | 15% |
| Ni de acuerdo ni en desacuerdo | 8 | 40% |
| De acuerdo | 4 | 20% |
| Totalmente de acuerdo | 2 | 10% |
| No tengo suficiente información para responder | 3 | 15% |

### P16. ¿Qué ajustes facilitarían el uso de las actividades?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Texto de mayor tamaño o posibilidad de ajustarlo | 10 | 50% |
| Contraste más alto entre texto y fondo | 14 | 70% |
| Instrucciones que no dependan únicamente del color | 14 | 70% |
| Navegación mediante teclado | 12 | 60% |
| Instrucciones y botones con texto claro | 15 | 75% |
| No necesitaría ajustes adicionales | 0 | 0% |
| Otro: ____________________ | 0 | 0% |

### P17. ¿Qué tiempo de espera para que una actividad o pantalla responda consideraría aceptable durante el uso normal?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Menos de 2 segundos | 11 | 55% |
| Entre 2 y 4 segundos | 7 | 35% |
| Entre 5 y 8 segundos | 1 | 5% |
| Más de 8 segundos | 0 | 0% |
| No tengo una expectativa definida | 1 | 5% |

### P18. ¿Qué aspecto le generaría mayor preocupación al crear una cuenta y guardar su progreso?

| Opcion | Personas | Porcentaje |
| --- | --- | --- |
| Que otras personas vean mis datos o resultados sin mi autorización | 7 | 35% |
| Tener que proporcionar demasiada información personal | 3 | 15% |
| Olvidar mi contraseña y no poder acceder | 4 | 20% |
| Que se pierda mi avance | 6 | 30% |
| No me preocuparía ninguno de estos aspectos | 0 | 0% |
| Otra: ____________________ | 0 | 0% |

### P19. Comentarios sinteticos

Son textos ficticios; no son citas de los participantes del archivo original.

| Participante | Comentario simulado |
| --- | --- |
| SIM-01 | Guardar las misiones completadas para continuar otro dia. |
| SIM-02 | Explicar los errores sin mostrar de inmediato toda la solucion. |
| SIM-03 | Ofrecer misiones cortas y ordenadas por dificultad. |
| SIM-04 | Ver con claridad las misiones pendientes y completadas. |
| SIM-05 | Tener pistas cuando no sepa como continuar. |
| SIM-06 | Poder usar los juegos desde el celular sin botones demasiado pequenos. |
| SIM-07 | Ver un ejemplo antes de organizar las instrucciones del robot. |
| SIM-08 | Usar un alias y decidir si aparezco en el ranking. |
| SIM-09 | Que las pantallas y actividades respondan rapido. |
| SIM-10 | Poder repetir una actividad sin borrar mis logros anteriores. |
| SIM-11 | Entender las reglas del Sudoku antes de comenzar. |
| SIM-12 | Recibir indicaciones claras para resolver los nonogramas. |
| SIM-13 | Conservar el avance aunque cierre la sesion. |
| SIM-14 | Consultar preguntas frecuentes en la comunidad demostrativa. |
| SIM-15 | Leer instrucciones con buen contraste y texto claro. |
| SIM-16 | Aprender condiciones y ciclos con el Robot Programmer. |
| SIM-17 | Ver los resultados despues de terminar cada actividad. |
| SIM-18 | Recuperar el acceso a mi cuenta si olvido la contrasena. |
| SIM-19 | Que los datos de mi cuenta no sean visibles para otros estudiantes. |
| SIM-20 | Encontrar los juegos y las misiones sin menus confusos. |

## Requisitos provisionales y trazabilidad

RF significa requisito funcional y RNF requisito no funcional. Cada ID es unico. Las prioridades son una propuesta del analisis, no un voto de la muestra. Las frecuencias anteriores sirven para ensayar la priorizacion, no para aprobar estos requisitos.

Registro, administracion y capacidad provienen del [inventario-tecnico-mvp.md](inventario-tecnico-mvp.md), no se atribuyen a la encuesta. La publicacion real en comunidad queda fuera del MVP demostrativo. Las metas de accesibilidad, rendimiento y recuperacion necesitan acuerdo del equipo.

### REQ-001: Misiones cortas y progresivas (RF)

- Prioridad propuesta: Alta.
- Origen: P5, P7; alcance MVP.
- Requisito: Ofrecer misiones con objetivo, duracion estimada y orden por dificultad.
- Aceptacion: Al consultar una mision, se muestran objetivo y duracion; su nivel es identificable. La duracion objetivo se acuerda tras revisar P7.

### REQ-002: Catalogo de minijuegos (RF)

- Prioridad propuesta: Alta.
- Origen: P6; alcance MVP.
- Requisito: Permitir iniciar Sudoku, nonogramas y Robot Programmer.
- Aceptacion: Desde el catalogo se inicia cada uno de los tres juegos y se puede regresar sin perder logros guardados.

### REQ-003: Instrucciones y ejemplos (RF)

- Prioridad propuesta: Alta.
- Origen: P3, P4, P19.
- Requisito: Mostrar reglas e instrucciones antes de la actividad y permitir volver a consultarlas; incluir un ejemplo cuando corresponda.
- Aceptacion: En cada juego se pueden consultar reglas antes y durante la partida; un ejemplo no altera el progreso.

### REQ-004: Retroalimentacion de errores (RF)

- Prioridad propuesta: Alta.
- Origen: P4, P8, P19.
- Requisito: Indicar errores y ofrecer una explicacion breve o una pista sin revelar automaticamente toda la solucion.
- Aceptacion: Una respuesta incorrecta produce un mensaje comprensible; la explicacion o pista no marca la actividad como completada.

### REQ-005: Pistas y reintentos (RF)

- Prioridad propuesta: Media.
- Origen: P4, P8, P19.
- Requisito: Permitir solicitar una pista y reiniciar el intento actual sin borrar logros anteriores.
- Aceptacion: Tras completar una actividad y reiniciar otra, la primera sigue completada; solicitar pista no completa la segunda.

### REQ-006: Guardar y retomar progreso (RF)

- Prioridad propuesta: Alta.
- Origen: P9, P18, P19.
- Requisito: Guardar misiones completadas, resultados y estado reanudable de la actividad para la cuenta correspondiente.
- Aceptacion: Al guardar un estado y volver a iniciar sesion, el mismo usuario recupera ese estado y sus logros; otro usuario no los recibe.

### REQ-007: Consultar avance (RF)

- Prioridad propuesta: Alta.
- Origen: P10, P19.
- Requisito: Mostrar misiones pendientes y completadas, resultados y avance general.
- Aceptacion: Completar una mision actualiza el listado, el resultado y el avance general sin duplicar la finalizacion.

### REQ-008: Ranking con control de identidad (RF)

- Prioridad propuesta: Media.
- Origen: P11, P12, P19.
- Requisito: Mostrar clasificacion por puntaje y permitir alias o exclusion de la publicacion; no exponer nombres reales por defecto.
- Aceptacion: El ranking se ordena segun puntaje; un usuario excluido no aparece y uno con alias no expone su nombre real.

### REQ-009: Comunidad demostrativa (RF)

- Prioridad propuesta: Media.
- Origen: P13; alcance MVP.
- Requisito: Permitir consultar publicaciones de demostracion, identificadas como tales.
- Aceptacion: Se consultan publicaciones de muestra; no se informa que un comentario fue publicado si no existe persistencia real. Publicar y responder queda fuera del MVP inicial.

### REQ-010: Registro y acceso (RF)

- Prioridad propuesta: Alta.
- Origen: Inventario tecnico; P18 como preocupacion, no demanda directa.
- Requisito: Permitir crear una cuenta, iniciar y cerrar sesion y solicitar recuperacion de acceso.
- Aceptacion: Una cuenta valida permite acceder a su progreso; cerrar sesion bloquea acceso privado y la recuperacion no revela si terceros tienen cuenta.

### REQ-011: Administracion basica (RF)

- Prioridad propuesta: Media.
- Origen: Inventario tecnico, no encuesta.
- Requisito: Permitir a administradores consultar usuarios y administrar contenido de misiones.
- Aceptacion: Un administrador puede consultar usuarios y editar contenido; un estudiante no puede realizar esas acciones.

### REQ-012: Facilidad de uso (RNF)

- Prioridad propuesta: Alta.
- Origen: P4, P15, P16, P19.
- Requisito: En una prueba real, al menos 16 de 20 estudiantes deben encontrar una mision e iniciar una actividad sin ayuda en dos minutos.
- Aceptacion: Aplicar prueba con participantes reales y registrar tiempo, exito y ayuda. P15 solo mide expectativa, no usabilidad comprobada.

### REQ-013: Diseno adaptable (RNF)

- Prioridad propuesta: Alta.
- Origen: P14, P16, P19.
- Requisito: Hacer operables los flujos principales en pantallas de 360, 768 y 1366 pixeles de ancho.
- Aceptacion: En cada ancho, registro, misiones y los tres juegos no presentan controles superpuestos ni desplazamiento horizontal de la pagina.

### REQ-014: Accesibilidad (RNF)

- Prioridad propuesta: Alta.
- Origen: P16; meta tecnica propuesta.
- Requisito: Permitir teclado, foco visible, etiquetas claras, informacion no dependiente solo del color y ampliacion al 200%; contraste de texto normal al menos 4.5:1.
- Aceptacion: Verificar manualmente los flujos de inicio y juegos con teclado y zoom; medir contraste. Estos controles no constituyen certificacion completa WCAG.

### REQ-015: Tiempo de respuesta (RNF)

- Prioridad propuesta: Alta.
- Origen: P17; meta tecnica propuesta.
- Requisito: Lograr respuesta visible en menos de dos segundos en al menos el 95% de interacciones normales.
- Aceptacion: Medir 100 interacciones con 25 sesiones concurrentes, conexion de 10 Mbps y latencia de 100 ms; 95 deben tardar menos de dos segundos, excluyendo carga inicial y servicios externos.

### REQ-016: Privacidad (RNF)

- Prioridad propuesta: Alta.
- Origen: P12, P18, P19.
- Requisito: Recoger solo datos necesarios para cuenta y aprendizaje y evitar exposicion de datos privados a otros estudiantes.
- Aceptacion: Una cuenta no puede consultar datos privados de otra; el ranking no muestra correo ni nombre real por defecto; existe aviso de finalidad de los datos.

### REQ-017: Seguridad de acceso (RNF)

- Prioridad propuesta: Alta.
- Origen: P18; criterio tecnico.
- Requisito: Proteger credenciales y sesiones, cifrar comunicaciones y autorizar operaciones privadas en el servidor.
- Aceptacion: No se almacenan contrasenas en texto plano; solicitudes sin sesion o permisos validos son rechazadas; el acceso publico usa HTTPS.

### REQ-018: Integridad del progreso (RNF)

- Prioridad propuesta: Alta.
- Origen: P9, P18, P19.
- Requisito: No confirmar guardados fallidos ni duplicar puntajes ante reintentos de una misma finalizacion.
- Aceptacion: Interrumpir un guardado muestra error y permite reintento; enviar dos veces la misma finalizacion no duplica el puntaje ni pierde logros anteriores.

### REQ-019: Capacidad del piloto (RNF)

- Prioridad propuesta: Media.
- Origen: Inventario tecnico, no encuesta.
- Requisito: Soportar 100 cuentas registradas y 25 sesiones concurrentes en los flujos del MVP.
- Aceptacion: Con 100 cuentas y 25 sesiones activas, al menos el 99% de 100 operaciones de consultar y guardar progreso tienen exito y se verifica REQ-015.

### REQ-020: Recuperacion ante incidentes (RNF)

- Prioridad propuesta: Media.
- Origen: P18; meta tecnica propuesta.
- Requisito: Disponer de respaldo diario del progreso y procedimiento de restauracion con perdida maxima de 24 horas y recuperacion en cuatro horas.
- Aceptacion: Ejecutar restauracion de prueba y verificar fechas del respaldo, integridad de logros y duracion. Valores pendientes de aprobar con el equipo.

## Escenarios de validacion posterior

1. **Aprender y retomar (alta):** dada una cuenta con una mision iniciada, al guardar y volver en otra sesion se recuperan estado y logros sin duplicacion. Verificar REQ-001 a REQ-007 y REQ-018.
2. **Consultar ranking sin exponer identidad (media):** dado un estudiante que elige alias o exclusion, al consultar el ranking se respeta esa eleccion. Verificar REQ-008 y REQ-016.
3. **Usar el MVP en distintas condiciones (alta):** dadas pantallas y condiciones de prueba acordadas, al iniciar actividades los controles son operables y la respuesta cumple las metas. Verificar REQ-012 a REQ-015 y REQ-019.
4. **Consultar la comunidad (media):** dadas publicaciones de muestra, al consultarlas se reconoce el estado demostrativo y no se promete publicacion real. Verificar REQ-009.

## Entidades principales

Cuenta de estudiante, mision, actividad, intento, progreso, resultado, entrada de ranking y publicacion demostrativa. Los identificadores SIM corresponden solo al conjunto sintetico, no a cuentas creadas en COGIT.

## Uso y limites

Este material sirve para ensayar tabulacion y redactar candidatos a requisitos. No reemplaza aplicar la encuesta, observar el uso del MVP ni obtener consentimiento de los participantes. Antes de basar decisiones en estos requisitos, recoger respuestas reales, revisar opiniones minoritarias, acordar prioridades y ejecutar los criterios de aceptacion. No se ha modificado la aplicacion ni el instrumento original.

## Reproduccion

Desde la raiz del proyecto: `python3 docs/generar-simulacion-mvp.py`. Usa solo la biblioteca estandar de Python y reemplaza exclusivamente los dos archivos de salida de esta simulacion.
