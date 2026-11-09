-- Define los roles como enum, hace del nombre de usuario el identificador de inicio de sesión
-- y deja el correo solo para recuperación. Conserva los usuarios existentes.
BEGIN;

-- 1. Rol: cualquier valor distinto de 'admin' (p. ej. 'user', 'estudiante', mayúsculas) pasa a 'estudiante'.
UPDATE "Usuario" SET "rol" = CASE WHEN lower("rol") = 'admin' THEN 'admin' ELSE 'estudiante' END;
CREATE TYPE "Rol" AS ENUM ('estudiante', 'admin');
ALTER TABLE "Usuario" ALTER COLUMN "rol" TYPE "Rol" USING "rol"::"Rol";
ALTER TABLE "Usuario" ALTER COLUMN "rol" SET DEFAULT 'estudiante';

-- 2. nombre -> username: minúsculas, solo letras, números y guion bajo, mínimo 3 caracteres, único.
ALTER TABLE "Usuario" RENAME COLUMN "nombre" TO "username";
UPDATE "Usuario" SET "username" = lower(regexp_replace("username", '[^A-Za-z0-9_]', '_', 'g'));
UPDATE "Usuario" SET "username" = "username" || '_' || "id" WHERE length("username") < 3;
UPDATE "Usuario" u SET "username" = u."username" || '_' || u."id"
  WHERE EXISTS (SELECT 1 FROM "Usuario" o WHERE o."username" = u."username" AND o."id" < u."id");
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

COMMIT;
