-- REQ-017: límite de intentos de inicio de sesión.
CREATE TABLE "LimiteLogin" (
    "clave" TEXT NOT NULL,
    "intentos" INTEGER NOT NULL DEFAULT 0,
    "desde" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LimiteLogin_pkey" PRIMARY KEY ("clave")
);
