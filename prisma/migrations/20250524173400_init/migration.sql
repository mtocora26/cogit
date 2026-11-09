-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progreso" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "seccion" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "actividad" TEXT NOT NULL,
    "completado" BOOLEAN NOT NULL,
    "score" INTEGER NOT NULL,
    "tiempo" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Progreso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
