# Recuperación ante incidentes (REQ-020)

Estado: **solo hay un procedimiento propuesto. No hay respaldo configurado ni restauración probada.** Las metas (pérdida máxima de 24 h, recuperación en 4 h) están pendientes de aprobar con el equipo.

## Qué se respalda

Toda la base PostgreSQL (`DATABASE_URL`): cuentas, progreso, progreso parcial, contenido de misiones. El progreso de los estudiantes vive solo ahí. Los archivos de la aplicación están en Git.

## Decisión pendiente: dónde y cómo se guarda el respaldo

La base contiene correos y contraseñas cifradas, así que el lugar del respaldo es una decisión del equipo. Opciones, de mejor a peor:

1. **Respaldo del proveedor de la base** (copias automáticas o restauración a un punto en el tiempo, si el plan lo incluye). Es lo más simple y lo que conviene activar primero. Anotar aquí el plan, la frecuencia y la retención.
2. **Volcado diario programado** (`pg_dump`) cifrado y guardado en un almacenamiento del equipo (por ejemplo un bucket privado). Requiere elegir el almacenamiento y dónde viven las claves.
3. **Volcado manual** antes de cada cambio de esquema o despliegue importante. Cumple «diario» solo si alguien lo hace.

Un volcado cifrado se hace así (cualquier máquina con Docker):

```bash
docker run --rm postgres:17 pg_dump --format=custom --no-owner "$DATABASE_URL" > cogit.dump
gpg --symmetric --cipher-algo AES256 -o "cogit-$(date -u +%F).dump.gpg" cogit.dump && rm cogit.dump
```

La frase de cifrado se guarda fuera del repositorio y fuera del propio respaldo: sin ella no se puede abrir.

## Restauración (procedimiento)

1. Obtener el respaldo más reciente.
2. Si es un volcado cifrado: `gpg -o cogit.dump -d cogit-AAAA-MM-DD.dump.gpg`
3. Crear una base vacía nueva (no restaurar encima de la actual hasta verificar).
4. Restaurar: `docker run --rm -i postgres:17 pg_restore --no-owner --no-privileges -d "<url nueva>" < cogit.dump`
5. Verificar integridad (abajo).
6. Apuntar `DATABASE_URL` de la aplicación a la base restaurada y volver a desplegar.

## Verificación de integridad tras restaurar

```sql
SELECT COUNT(*) FROM "Usuario";
SELECT COUNT(*) FROM "Progreso";
SELECT COUNT(*) FROM "Progreso" WHERE completado;
SELECT MAX(fecha) FROM "Progreso";   -- la fecha del último logro respaldado
```

Comparar con la base original en el momento del respaldo: mismos totales y la fecha máxima dentro de las 24 h anteriores al incidente.

## Restauración de prueba (a registrar)

| Fecha | Respaldo usado (fecha) | Duración total | Usuarios / Progreso restaurados | Pérdida de datos (h) | Resultado |
|---|---|---|---|---|---|
| _pendiente_ | | | | | |

Meta: duración ≤ 4 h y pérdida ≤ 24 h. Ejecutar la prueba en una base nueva, medir el tiempo desde obtener el respaldo hasta verificar.
