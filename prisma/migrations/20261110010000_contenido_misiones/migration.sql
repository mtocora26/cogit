-- REQ-011: contenido de las misiones en la base (niveles y actividades), con la carga inicial del contenido actual.
-- CreateTable
CREATE TABLE "Nivel" (
    "id" SERIAL NOT NULL,
    "seccion" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,

    CONSTRAINT "Nivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "nivelId" INTEGER NOT NULL,
    "clave" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "minutos" INTEGER NOT NULL,
    "juego" TEXT NOT NULL,
    "reglas" JSONB NOT NULL,
    "ejemplo" JSONB NOT NULL,
    "orden" INTEGER NOT NULL,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nivel_seccion_clave_key" ON "Nivel"("seccion", "clave");

-- CreateIndex
CREATE UNIQUE INDEX "Actividad_nivelId_clave_key" ON "Actividad"("nivelId", "clave");

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "Nivel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Carga inicial: el contenido actual (lib/misiones-catalogo.ts)
INSERT INTO "Nivel" ("seccion", "clave", "titulo", "texto", "objetivo", "orden") VALUES ('1', '1', 'Reconocimiento de patrones', 'Aprende a identificar patrones y secuencias en diferentes contextos.', 'Reconocer la regla de un patrón y usarla para continuarlo o encontrar lo que no encaja.', 0);
INSERT INTO "Nivel" ("seccion", "clave", "titulo", "texto", "objetivo", "orden") VALUES ('1', '2', 'Secuencias y Series', 'Descubre cómo se forman las secuencias y encuentra el siguiente elemento.', 'Ordenar pasos y construir secuencias de instrucciones.', 1);
INSERT INTO "Nivel" ("seccion", "clave", "titulo", "texto", "objetivo", "orden") VALUES ('1', '3', 'Lógica de Secuencias', 'Completa secuencias y deduce las reglas ocultas detrás de los patrones.', 'Deducir la regla oculta detrás de una secuencia.', 2);

INSERT INTO "Actividad" ("nivelId", "clave", "titulo", "descripcion", "objetivo", "minutos", "juego", "reglas", "ejemplo", "orden") VALUES ((SELECT "id" FROM "Nivel" WHERE "seccion" = '1' AND "clave" = '1'), '1', 'Observa y reconoce', 'Identifica la regla de un patrón visual y elige el elemento que sigue en la secuencia.', 'Identificar la regla de una secuencia y elegir el elemento que sigue.', 3, 'reconocer', '["Observa la secuencia: se repite siguiendo una regla.","Elige, entre las opciones, la ficha que continúa la secuencia.","Si te equivocas pierdes una vida; al final repasas las rondas falladas.","Puedes pedir hasta 3 pistas por ronda; las pistas no cuentan como error ni dan puntos."]'::jsonb, '{"secuencia":["🔴","🔵","🔴","🔵","🔴","❔"],"respuesta":["🔵"],"explicacion":"La regla es alternar rojo y azul. Después del círculo rojo viene el azul."}'::jsonb, 0);
INSERT INTO "Actividad" ("nivelId", "clave", "titulo", "descripcion", "objetivo", "minutos", "juego", "reglas", "ejemplo", "orden") VALUES ((SELECT "id" FROM "Nivel" WHERE "seccion" = '1' AND "clave" = '1'), '2', 'Encuentra el intruso', 'Observa la secuencia y detecta el elemento que no pertenece al patrón.', 'Detectar el elemento que rompe la regla del patrón.', 3, 'intruso', '["Casi todas las fichas siguen la misma regla; una no encaja.","Toca la ficha que no pertenece al patrón.","Si te equivocas pierdes una vida; al final repasas las rondas falladas.","Puedes pedir hasta 3 pistas por ronda; las pistas no cuentan como error ni dan puntos."]'::jsonb, '{"secuencia":["🔺","🔺","⭐","🔺","🔺"],"resaltar":2,"respuesta":["⭐"],"explicacion":"Todas son triángulos menos la estrella: ella es el intruso."}'::jsonb, 1);
INSERT INTO "Actividad" ("nivelId", "clave", "titulo", "descripcion", "objetivo", "minutos", "juego", "reglas", "ejemplo", "orden") VALUES ((SELECT "id" FROM "Nivel" WHERE "seccion" = '1' AND "clave" = '1'), '3', 'Completa el patrón', 'Algunos espacios están en blanco: elige las fichas que completan el patrón.', 'Completar los huecos de un patrón aplicando su regla.', 3, 'completa', '["Observa la secuencia: algunos espacios están vacíos.","Haz clic en las opciones para colocar la ficha correcta en cada hueco.","Comprueba tu respuesta cuando hayas llenado todos los huecos.","Puedes pedir hasta 3 pistas por patrón; no cuentan como error ni dan puntos."]'::jsonb, '{"secuencia":["🟢","🟡","🟢","❔","🟢","❔"],"respuesta":["🟡","🟡"],"explicacion":"La regla es alternar verde y amarillo, así que cada hueco lleva un círculo amarillo."}'::jsonb, 2);
