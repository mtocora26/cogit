/*
  Warnings:

  - A unique constraint covering the columns `[userId,seccion,nivel,actividad]` on the table `Progreso` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Progreso_userId_seccion_nivel_actividad_key" ON "Progreso"("userId", "seccion", "nivel", "actividad");
