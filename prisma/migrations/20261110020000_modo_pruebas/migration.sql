-- Cuenta de pruebas: desbloquea todo el contenido sin otorgar el rol de administrador.
ALTER TABLE "Usuario" ADD COLUMN "modoPruebas" BOOLEAN NOT NULL DEFAULT false;
