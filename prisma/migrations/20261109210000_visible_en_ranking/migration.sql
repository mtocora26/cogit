-- REQ-008: permite que el estudiante se excluya del ranking. Por defecto todos aparecen (con su alias).
ALTER TABLE "Usuario" ADD COLUMN "visibleEnRanking" BOOLEAN NOT NULL DEFAULT true;
