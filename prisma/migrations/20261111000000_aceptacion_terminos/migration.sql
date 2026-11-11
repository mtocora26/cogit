-- REQ-021: se guarda qué versión de los términos aceptó cada cuenta y cuándo.
-- Nulas para las cuentas creadas antes de que existiera la aceptación.
ALTER TABLE "Usuario" ADD COLUMN "terminosVersion" TEXT;
ALTER TABLE "Usuario" ADD COLUMN "terminosAceptadosEn" TIMESTAMP(3);
