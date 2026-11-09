-- La economía (créditos / Sparkz / tienda) se retiró del MVP: no está en los requisitos ni en el modelo de negocio.
-- Todas las cuentas existentes tenían 0 créditos, así que no se pierde ningún saldo.
ALTER TABLE "Usuario" DROP COLUMN "creditos";
