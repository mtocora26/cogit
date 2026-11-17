Antes de publicar
- Migraciones: son dos, progreso_parcial y contenido_misiones. Las escribí a mano, sin base local, y se aplican solo en producción. Conviene revisarlas antes del PR a main.
- Editor en preview: en un preview sin migrar, el editor del panel responde un aviso de que el nivel aún no está en la base (409).
- CI: ahora también corre pnpm test.
- Diffs: al editar con scripts se pierden los finales de línea CRLF en algunos archivos. Se ve como ruido en los diffs; no cambia el comportamiento.
- Prisma local: lib/generated/prisma/* sigue modificado solo en tu carpeta.
