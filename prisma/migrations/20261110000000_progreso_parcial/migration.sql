-- REQ-006: estado de una actividad a medias, para retomarla al volver a entrar con la misma cuenta.
-- CreateTable
CREATE TABLE "ProgresoParcial" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "seccion" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "actividad" TEXT NOT NULL,
    "estado" JSONB NOT NULL,
    "vidas" INTEGER NOT NULL,
    "actualizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgresoParcial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgresoParcial_userId_seccion_nivel_actividad_key" ON "ProgresoParcial"("userId", "seccion", "nivel", "actividad");

-- AddForeignKey
ALTER TABLE "ProgresoParcial" ADD CONSTRAINT "ProgresoParcial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
