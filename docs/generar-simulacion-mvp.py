from collections import Counter
from pathlib import Path
import random
import re
from xml.etree import ElementTree as ET
from zipfile import ZIP_DEFLATED, ZipFile


BASE = Path(__file__).resolve().parent
SOURCE = BASE / "INSTRUMENTO DE VALIDACI\u00d3N DE LA VIABILIDAD DE COGIT.xlsx"
SURVEY = BASE / "encuesta-mvp-cogit.md"
OUTPUT = BASE / "simulacion-encuesta-mvp-20-personas.xlsx"
REPORT = BASE / "simulacion-encuesta-mvp-20-personas.md"
NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
SELECTION_SEED = 20261102
RESPONSE_SEED = 20261103


def source_participants():
    with ZipFile(SOURCE) as book:
        shared = ["".join(item.itertext()) for item in
                  ET.fromstring(book.read("xl/sharedStrings.xml"))]
        rows = ET.fromstring(book.read("xl/worksheets/sheet1.xml"))
        participants = []
        for row in rows.findall(f"{{{NS}}}sheetData/{{{NS}}}row"):
            if row.get("r") == "1":
                continue
            cells = {}
            for cell in row.findall(f"{{{NS}}}c"):
                value = cell.find(f"{{{NS}}}v")
                text = value.text if value is not None else ""
                column = re.sub(r"\d+$", "", cell.get("r"))
                if column in ("A", "H"):
                    cells[column] = shared[int(text)] if cell.get("t") == "s" else text
            if cells.get("A"):
                semester = cells.get("H", "").strip()
                assert semester in ("1 Semestre", "2 Semestre"), semester
                participants.append((int(cells["A"]), int(row.get("r")), semester))
        assert len({item[0] for item in participants}) == len(participants)
        return participants


def survey_questions():
    text = SURVEY.read_text(encoding="utf-8")
    questions = {}
    pattern = r"\*\*(\d+)\. (.*?)\*\*\s*\*\((.*?)\)\*(.*?)(?=\n\*\*\d+\.|\n## |\Z)"
    for match in re.finditer(pattern, text, re.S):
        number, title, instruction, body = match.groups()
        questions[int(number)] = (title, instruction, re.findall(r"^- (.+)$", body, re.M))
    assert list(questions) == list(range(1, 20))
    return questions


WEIGHTS = {
    2: [1, 4, 8, 5, 2, 1], 3: [4, 7, 7, 6, 6, 7, 0, 0],
    4: [9, 7, 8, 9, 8, 6, 7, 0], 5: [1, 2, 4, 9, 7, 1],
    6: [6, 5, 9, 9, 0, 0], 7: [2, 11, 5, 1, 1],
    8: [3, 6, 9, 2, 1, 1], 9: [1, 1, 3, 8, 10, 1],
    10: [10, 6, 7, 9, 3, 0, 0], 11: [1, 2, 5, 8, 5, 1],
    12: [11, 2, 4, 3, 1], 13: [7, 5, 6, 2, 1],
    14: [3, 9, 7, 1, 0], 15: [1, 2, 5, 8, 5, 3],
    16: [5, 6, 6, 4, 10, 0, 0], 17: [11, 7, 2, 0, 1],
    18: [6, 4, 2, 8, 1, 0],
}
COMMENTS = [
    "Guardar las misiones completadas para continuar otro dia.",
    "Explicar los errores sin mostrar de inmediato toda la solucion.",
    "Ofrecer misiones cortas y ordenadas por dificultad.",
    "Ver con claridad las misiones pendientes y completadas.",
    "Tener pistas cuando no sepa como continuar.",
    "Poder usar los juegos desde el celular sin botones demasiado pequenos.",
    "Ver un ejemplo antes de organizar las instrucciones del robot.",
    "Usar un alias y decidir si aparezco en el ranking.",
    "Que las pantallas y actividades respondan rapido.",
    "Poder repetir una actividad sin borrar mis logros anteriores.",
    "Entender las reglas del Sudoku antes de comenzar.",
    "Recibir indicaciones claras para resolver los nonogramas.",
    "Conservar el avance aunque cierre la sesion.",
    "Consultar preguntas frecuentes en la comunidad demostrativa.",
    "Leer instrucciones con buen contraste y texto claro.",
    "Aprender condiciones y ciclos con el Robot Programmer.",
    "Ver los resultados despues de terminar cada actividad.",
    "Recuperar el acceso a mi cuenta si olvido la contrasena.",
    "Que los datos de mi cuenta no sean visibles para otros estudiantes.",
    "Encontrar los juegos y las misiones sin menus confusos.",
]


def simulate(selected, questions):
    rng = random.Random(RESPONSE_SEED)
    responses = []
    for index, participant in enumerate(selected):
        answers = {1: ["Primero" if participant[2] == "1 Semestre" else "Segundo"]}
        for number in range(2, 19):
            options = questions[number][2]
            if number in (3, 4, 6, 10, 16):
                limit = 3 if number in (3, 4, 10) else 4 if number == 6 else 5
                count = rng.randint(1, min(limit, sum(weight > 0 for weight in WEIGHTS[number])))
                available = list(range(len(options)))
                picked = []
                for unused in range(count):
                    choice = rng.choices(available, weights=[WEIGHTS[number][item] for item in available])[0]
                    picked.append(choice)
                    available.remove(choice)
                answers[number] = [options[item] for item in sorted(picked)]
            else:
                answers[number] = [rng.choices(options, weights=WEIGHTS[number])[0]]
        answers[19] = [COMMENTS[index]]
        responses.append(answers)
    return responses


REQUIREMENTS = [
    ("REQ-001", "RF", "Alta", "Misiones cortas y progresivas", "P5, P7; alcance MVP", "Ofrecer misiones con objetivo, duracion estimada y orden por dificultad.", "Al consultar una mision, se muestran objetivo y duracion; su nivel es identificable. La duracion objetivo se acuerda tras revisar P7."),
    ("REQ-002", "RF", "Alta", "Catalogo de minijuegos", "P6; alcance MVP", "Permitir iniciar Sudoku, nonogramas y Robot Programmer.", "Desde el catalogo se inicia cada uno de los tres juegos y se puede regresar sin perder logros guardados."),
    ("REQ-003", "RF", "Alta", "Instrucciones y ejemplos", "P3, P4, P19", "Mostrar reglas e instrucciones antes de la actividad y permitir volver a consultarlas; incluir un ejemplo cuando corresponda.", "En cada juego se pueden consultar reglas antes y durante la partida; un ejemplo no altera el progreso."),
    ("REQ-004", "RF", "Alta", "Retroalimentacion de errores", "P4, P8, P19", "Indicar errores y ofrecer una explicacion breve o una pista sin revelar automaticamente toda la solucion.", "Una respuesta incorrecta produce un mensaje comprensible; la explicacion o pista no marca la actividad como completada."),
    ("REQ-005", "RF", "Media", "Pistas y reintentos", "P4, P8, P19", "Permitir solicitar una pista y reiniciar el intento actual sin borrar logros anteriores.", "Tras completar una actividad y reiniciar otra, la primera sigue completada; solicitar pista no completa la segunda."),
    ("REQ-006", "RF", "Alta", "Guardar y retomar progreso", "P9, P18, P19", "Guardar misiones completadas, resultados y estado reanudable de la actividad para la cuenta correspondiente.", "Al guardar un estado y volver a iniciar sesion, el mismo usuario recupera ese estado y sus logros; otro usuario no los recibe."),
    ("REQ-007", "RF", "Alta", "Consultar avance", "P10, P19", "Mostrar misiones pendientes y completadas, resultados y avance general.", "Completar una mision actualiza el listado, el resultado y el avance general sin duplicar la finalizacion."),
    ("REQ-008", "RF", "Media", "Ranking con control de identidad", "P11, P12, P19", "Mostrar clasificacion por puntaje y permitir alias o exclusion de la publicacion; no exponer nombres reales por defecto.", "El ranking se ordena segun puntaje; un usuario excluido no aparece y uno con alias no expone su nombre real."),
    ("REQ-009", "RF", "Media", "Comunidad demostrativa", "P13; alcance MVP", "Permitir consultar publicaciones de demostracion, identificadas como tales.", "Se consultan publicaciones de muestra; no se informa que un comentario fue publicado si no existe persistencia real. Publicar y responder queda fuera del MVP inicial."),
    ("REQ-010", "RF", "Alta", "Registro y acceso", "Inventario tecnico; P18 como preocupacion, no demanda directa", "Permitir crear una cuenta, iniciar y cerrar sesion y solicitar recuperacion de acceso.", "Una cuenta valida permite acceder a su progreso; cerrar sesion bloquea acceso privado y la recuperacion no revela si terceros tienen cuenta."),
    ("REQ-011", "RF", "Media", "Administracion basica", "Inventario tecnico, no encuesta", "Permitir a administradores consultar usuarios y administrar contenido de misiones.", "Un administrador puede consultar usuarios y editar contenido; un estudiante no puede realizar esas acciones."),
    ("REQ-012", "RNF", "Alta", "Facilidad de uso", "P4, P15, P16, P19", "En una prueba real, al menos 16 de 20 estudiantes deben encontrar una mision e iniciar una actividad sin ayuda en dos minutos.", "Aplicar prueba con participantes reales y registrar tiempo, exito y ayuda. P15 solo mide expectativa, no usabilidad comprobada."),
    ("REQ-013", "RNF", "Alta", "Diseno adaptable", "P14, P16, P19", "Hacer operables los flujos principales en pantallas de 360, 768 y 1366 pixeles de ancho.", "En cada ancho, registro, misiones y los tres juegos no presentan controles superpuestos ni desplazamiento horizontal de la pagina."),
    ("REQ-014", "RNF", "Alta", "Accesibilidad", "P16; meta tecnica propuesta", "Permitir teclado, foco visible, etiquetas claras, informacion no dependiente solo del color y ampliacion al 200%; contraste de texto normal al menos 4.5:1.", "Verificar manualmente los flujos de inicio y juegos con teclado y zoom; medir contraste. Estos controles no constituyen certificacion completa WCAG."),
    ("REQ-015", "RNF", "Alta", "Tiempo de respuesta", "P17; meta tecnica propuesta", "Lograr respuesta visible en menos de dos segundos en al menos el 95% de interacciones normales.", "Medir 100 interacciones con 25 sesiones concurrentes, conexion de 10 Mbps y latencia de 100 ms; 95 deben tardar menos de dos segundos, excluyendo carga inicial y servicios externos."),
    ("REQ-016", "RNF", "Alta", "Privacidad", "P12, P18, P19", "Recoger solo datos necesarios para cuenta y aprendizaje y evitar exposicion de datos privados a otros estudiantes.", "Una cuenta no puede consultar datos privados de otra; el ranking no muestra correo ni nombre real por defecto; existe aviso de finalidad de los datos."),
    ("REQ-017", "RNF", "Alta", "Seguridad de acceso", "P18; criterio tecnico", "Proteger credenciales y sesiones, cifrar comunicaciones y autorizar operaciones privadas en el servidor.", "No se almacenan contrasenas en texto plano; solicitudes sin sesion o permisos validos son rechazadas; el acceso publico usa HTTPS."),
    ("REQ-018", "RNF", "Alta", "Integridad del progreso", "P9, P18, P19", "No confirmar guardados fallidos ni duplicar puntajes ante reintentos de una misma finalizacion.", "Interrumpir un guardado muestra error y permite reintento; enviar dos veces la misma finalizacion no duplica el puntaje ni pierde logros anteriores."),
    ("REQ-019", "RNF", "Media", "Capacidad del piloto", "Inventario tecnico, no encuesta", "Soportar 100 cuentas registradas y 25 sesiones concurrentes en los flujos del MVP.", "Con 100 cuentas y 25 sesiones activas, al menos el 99% de 100 operaciones de consultar y guardar progreso tienen exito y se verifica REQ-015."),
    ("REQ-020", "RNF", "Media", "Recuperacion ante incidentes", "P18; meta tecnica propuesta", "Disponer de respaldo diario del progreso y procedimiento de restauracion con perdida maxima de 24 horas y recuperacion en cuatro horas.", "Ejecutar restauracion de prueba y verificar fechas del respaldo, integridad de logros y duracion. Valores pendientes de aprobar con el equipo."),
]


def column_name(number):
    result = ""
    while number:
        number, remainder = divmod(number - 1, 26)
        result = chr(65 + remainder) + result
    return result


def write_workbook(sheets):
    relationship_ns = "http://schemas.openxmlformats.org/package/2006/relationships"
    office_ns = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    content_ns = "http://schemas.openxmlformats.org/package/2006/content-types"
    workbook = ET.Element("workbook", xmlns=NS)
    sheet_list = ET.SubElement(workbook, "sheets")
    relations = ET.Element("Relationships", xmlns=relationship_ns)
    types = ET.Element("Types", xmlns=content_ns)
    ET.SubElement(types, "Default", Extension="rels", ContentType="application/vnd.openxmlformats-package.relationships+xml")
    ET.SubElement(types, "Default", Extension="xml", ContentType="application/xml")
    ET.SubElement(types, "Override", PartName="/xl/workbook.xml", ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml")
    root_relations = ET.Element("Relationships", xmlns=relationship_ns)
    ET.SubElement(root_relations, "Relationship", Id="rId1", Type=f"{office_ns}/officeDocument", Target="xl/workbook.xml")
    with ZipFile(OUTPUT, "w", ZIP_DEFLATED) as book:
        for index, (name, rows) in enumerate(sheets, 1):
            ET.SubElement(sheet_list, "sheet", name=name, sheetId=str(index), attrib={f"{{{office_ns}}}id": f"rId{index}"})
            ET.SubElement(relations, "Relationship", Id=f"rId{index}", Type=f"{office_ns}/worksheet", Target=f"worksheets/sheet{index}.xml")
            ET.SubElement(types, "Override", PartName=f"/xl/worksheets/sheet{index}.xml", ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml")
            sheet = ET.Element("worksheet", xmlns=NS)
            views = ET.SubElement(sheet, "sheetViews")
            view = ET.SubElement(views, "sheetView", workbookViewId="0")
            ET.SubElement(view, "pane", ySplit="1", topLeftCell="A2", activePane="bottomLeft", state="frozen")
            columns = ET.SubElement(sheet, "cols")
            for column in range(1, max(map(len, rows)) + 1):
                ET.SubElement(columns, "col", min=str(column), max=str(column), width="45" if column > 3 else "24", customWidth="1")
            data = ET.SubElement(sheet, "sheetData")
            for row_number, values in enumerate(rows, 1):
                row = ET.SubElement(data, "row", r=str(row_number))
                for column, value in enumerate(values, 1):
                    cell = ET.SubElement(row, "c", r=f"{column_name(column)}{row_number}", t="inlineStr")
                    inline = ET.SubElement(cell, "is")
                    ET.SubElement(inline, "t").text = str(value)
            ET.SubElement(sheet, "autoFilter", ref=f"A1:{column_name(max(map(len, rows)))}{len(rows)}")
            book.writestr(f"xl/worksheets/sheet{index}.xml", ET.tostring(sheet, encoding="utf-8", xml_declaration=True))
        for path, element in (("[Content_Types].xml", types), ("_rels/.rels", root_relations), ("xl/workbook.xml", workbook), ("xl/_rels/workbook.xml.rels", relations)):
            book.writestr(path, ET.tostring(element, encoding="utf-8", xml_declaration=True))


def main():
    candidates = source_participants()
    selected = sorted(random.Random(SELECTION_SEED).sample(candidates, 20))
    questions = survey_questions()
    responses = simulate(selected, questions)
    assert len(selected) == len(responses) == 20
    for answers in responses:
        assert set(answers) == set(questions)
        for number in range(1, 19):
            assert set(answers[number]).issubset(questions[number][2])
            assert len(answers[number]) == len(set(answers[number]))
            assert len(answers[number]) <= (3 if number in (3, 4, 10) else 6 if number in (6, 16) else 1)
    metadata = [
        ["Campo", "Descripcion"],
        ["Naturaleza", "SIMULACION ACADEMICA: no son respuestas reales ni prueba de viabilidad."],
        ["Fuente", SOURCE.name + "; Sheet1; solo ID, fila y semestre originales."],
        ["Candidatos", len(candidates)], ["Muestra", 20],
        ["Seleccion", f"Aleatoria simple sin reemplazo; semilla {SELECTION_SEED}; orden final por ID."],
        ["Respuestas", f"P1 conserva semestre real. P2-P19 son sinteticas; semilla {RESPONSE_SEED}."],
        ["Sesgo", "Pesos artificiales orientados a explorar necesidades; no estimados de los datos originales. No usar para inferencia poblacional."],
        ["Privacidad", "Se omiten nombres y telefonos. IDs y filas permiten vinculacion: datos seudonimizados, no anonimizados; uso academico restringido."],
        ["Pregunta 15", "Mide expectativa declarada, no facilidad de uso observada; no hubo prueba real del MVP."],
        ["Requisitos", "Candidatos provisionales. Prioridades y umbrales son propuestas, no acuerdos validados ni funciones ya comprobadas."],
        ["Multiseleccion", "Porcentaje por personas sobre 20; la suma puede superar 100%. P19 no se cuantifica por temas."],
        ["Limitacion", "No se simulan opciones Otro, rechazo ni ausencia de informacion en preguntas multiseleccion; cobertura deliberadamente limitada."],
    ]
    sample_rows = [["Participante", "ID original", "Fila Sheet1", "Semestre original"]]
    answer_rows = [["Participante", "ID original", "Estado"] + [f"P{number}" for number in questions]]
    for index, (participant, answers) in enumerate(zip(selected, responses), 1):
        sample_rows.append([f"SIM-{index:02}", *participant])
        answer_rows.append([f"SIM-{index:02}", participant[0], "SIMULADA; P1 original"] + ["; ".join(answers[number]) for number in questions])
    summary_rows = [["Pregunta", "Opcion", "Personas", "Porcentaje sobre 20", "Naturaleza"]]
    for number in range(1, 19):
        counts = Counter(answer for answers in responses for answer in answers[number])
        for option in questions[number][2]:
            count = counts[option]
            summary_rows.append([f"P{number}", option, count, f"{count * 5}%", "Perfil original" if number == 1 else "Simulada"])
        if number not in (3, 4, 6, 10, 16):
            assert sum(counts.values()) == 20
    question_rows = [["Pregunta", "Texto", "Instruccion", "Opciones"]] + [[f"P{number}", title, instruction, "; ".join(options)] for number, (title, instruction, options) in questions.items()]
    requirement_rows = [["ID", "Tipo", "Prioridad propuesta", "Nombre", "Origen", "Requisito provisional", "Criterio de aceptacion propuesto"]] + [list(item) for item in REQUIREMENTS]
    write_workbook([("Metodologia", metadata), ("Muestra", sample_rows), ("Preguntas", question_rows), ("Respuestas simuladas", answer_rows), ("Resumen", summary_rows), ("Requisitos provisionales", requirement_rows)])
    lines = ["# Simulacion academica de la encuesta del MVP de COGIT", "", "**No contiene respuestas reales. No demuestra viabilidad ni valida requisitos.**", "", "## Alcance y metodo", ""]
    lines += [f"- **{field}:** {description}" for field, description in metadata[2:]]
    lines += ["", "El original contiene 28 registros en Sheet1, aunque la solicitud inicial mencionaba 30. No se agregaron personas inexistentes. La seleccion no fue estratificada por semestre.", "", "La encuesta utilizada es [encuesta-mvp-cogit.md](encuesta-mvp-cogit.md). El Excel generado conserva una matriz de una fila por participante y una columna por pregunta, como el instrumento de origen, pero no copia sus otras hojas ni su formato visual.", "", "## Muestra seleccionada", "", "| Participante | ID original | Fila Sheet1 | Semestre original |", "| --- | --- | --- | --- |"]
    lines += ["| " + " | ".join(map(str, row)) + " |" for row in sample_rows[1:]]
    lines += ["", "## Resultados descriptivos", "", "Cada persona equivale al 5% de la muestra. Los porcentajes describen solo este escenario sintetico; no se calculan margenes de error ni se generalizan a estudiantes reales."]
    for number in range(1, 19):
        lines += ["", f"### P{number}. {questions[number][0]}", "", "| Opcion | Personas | Porcentaje |", "| --- | --- | --- |"]
        lines += [f"| {option} | {count} | {percentage} |" for question, option, count, percentage, nature in summary_rows[1:] if question == f"P{number}"]
    lines += ["", "### P19. Comentarios sinteticos", "", "Son textos ficticios; no son citas de los participantes del archivo original.", "", "| Participante | Comentario simulado |", "| --- | --- |"]
    lines += [f"| SIM-{index:02} | {answers[19][0]} |" for index, answers in enumerate(responses, 1)]
    lines += ["", "## Requisitos provisionales y trazabilidad", "", "RF significa requisito funcional y RNF requisito no funcional. Cada ID es unico. Las prioridades son una propuesta del analisis, no un voto de la muestra. Las frecuencias anteriores sirven para ensayar la priorizacion, no para aprobar estos requisitos.", "", "Registro, administracion y capacidad provienen del [inventario-tecnico-mvp.md](inventario-tecnico-mvp.md), no se atribuyen a la encuesta. La publicacion real en comunidad queda fuera del MVP demostrativo. Las metas de accesibilidad, rendimiento y recuperacion necesitan acuerdo del equipo.", ""]
    for identifier, kind, priority, name, origin, requirement, acceptance in REQUIREMENTS:
        lines += [f"### {identifier}: {name} ({kind})", "", f"- Prioridad propuesta: {priority}.", f"- Origen: {origin}.", f"- Requisito: {requirement}", f"- Aceptacion: {acceptance}", ""]
    lines += ["## Escenarios de validacion posterior", "", "1. **Aprender y retomar (alta):** dada una cuenta con una mision iniciada, al guardar y volver en otra sesion se recuperan estado y logros sin duplicacion. Verificar REQ-001 a REQ-007 y REQ-018.", "2. **Consultar ranking sin exponer identidad (media):** dado un estudiante que elige alias o exclusion, al consultar el ranking se respeta esa eleccion. Verificar REQ-008 y REQ-016.", "3. **Usar el MVP en distintas condiciones (alta):** dadas pantallas y condiciones de prueba acordadas, al iniciar actividades los controles son operables y la respuesta cumple las metas. Verificar REQ-012 a REQ-015 y REQ-019.", "4. **Consultar la comunidad (media):** dadas publicaciones de muestra, al consultarlas se reconoce el estado demostrativo y no se promete publicacion real. Verificar REQ-009.", "", "## Entidades principales", "", "Cuenta de estudiante, mision, actividad, intento, progreso, resultado, entrada de ranking y publicacion demostrativa. Los identificadores SIM corresponden solo al conjunto sintetico, no a cuentas creadas en COGIT.", "", "## Uso y limites", "", "Este material sirve para ensayar tabulacion y redactar candidatos a requisitos. No reemplaza aplicar la encuesta, observar el uso del MVP ni obtener consentimiento de los participantes. Antes de basar decisiones en estos requisitos, recoger respuestas reales, revisar opiniones minoritarias, acordar prioridades y ejecutar los criterios de aceptacion. No se ha modificado la aplicacion ni el instrumento original.", "", "## Reproduccion", "", "Desde la raiz del proyecto: `python3 docs/generar-simulacion-mvp.py`. Usa solo la biblioteca estandar de Python y reemplaza exclusivamente los dos archivos de salida de esta simulacion.", ""]
    REPORT.write_text("\n".join(lines), encoding="utf-8")
    with ZipFile(OUTPUT) as book:
        assert book.testzip() is None
        for name in book.namelist():
            ET.fromstring(book.read(name))
        matrix = ET.fromstring(book.read("xl/worksheets/sheet4.xml"))
        assert len(matrix.findall(f"{{{NS}}}sheetData/{{{NS}}}row")) == 21
    assert len({item[0] for item in REQUIREMENTS}) == len(REQUIREMENTS)
    print(f"OK: {len(candidates)} candidatos; 20 IDs unicos; 19 preguntas; matriz y conteos validos; {len(REQUIREMENTS)} requisitos provisionales.")
    print("IDs seleccionados:", ", ".join(str(item[0]) for item in selected))
    print("Salidas:", OUTPUT.name, "y", REPORT.name)


if __name__ == "__main__":
    main()