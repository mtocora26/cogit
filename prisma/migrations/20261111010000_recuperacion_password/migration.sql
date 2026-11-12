-- REQ-010: recuperación de acceso por correo. Solo se guarda el hash (SHA-256) del enlace, nunca el enlace.
CREATE TABLE "RecuperacionPassword" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiraEn" TIMESTAMP(3) NOT NULL,
    "usadoEn" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecuperacionPassword_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "RecuperacionPassword_tokenHash_key" ON "RecuperacionPassword"("tokenHash");
CREATE INDEX "RecuperacionPassword_userId_idx" ON "RecuperacionPassword"("userId");

ALTER TABLE "RecuperacionPassword" ADD CONSTRAINT "RecuperacionPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
