# Prueba de rendimiento y capacidad (REQ-015 y REQ-019)

Estado: **script listo, medición pendiente.** Los números de esta página son los criterios; los resultados reales hay que obtenerlos y anotarlos al final.

## Criterios

| Requisito | Criterio |
|---|---|
| REQ-015 | De 100 interacciones normales con 25 sesiones concurrentes, conexión de 10 Mbps y latencia de 100 ms, al menos 95 responden en menos de 2 s. Se excluyen la carga inicial y los servicios externos. |
| REQ-019 | Con 100 cuentas registradas y 25 sesiones activas, al menos 99 de 100 operaciones de consultar y guardar progreso tienen éxito, y se cumple REQ-015. |

## Preparación

1. Usar un **entorno de pruebas** (preview de Vercel con su propia base, o local con `pnpm dev` y una base de desarrollo), nunca producción: la prueba guarda progreso.
   **Un preview de Vercel comparte la base de producción** si `DATABASE_URL` del entorno *Preview* es la misma que la de *Production* (es el caso de este proyecto hasta que se separe). En ese caso hay que crear una base aparte y asignarla solo a *Preview*, aplicar las migraciones (`prisma migrate deploy`) y redesplegar antes de seguir.
2. Crear 100 cuentas `carga1` … `carga100` con la misma contraseña (REQ-019 pide 100 cuentas registradas; la prueba usa 25 a la vez):
   ```bash
   node scripts/crear-cuentas-carga.mjs --url=https://<preview>.vercel.app --password=<clave> --confirmo
   ```
   Usa el registro normal de la API, es idempotente (las que ya existen se saltan) y las crea con correo `cargaN@carga.invalid`.
3. Aplicar las condiciones de red al equipo que ejecuta la prueba:
   - Windows: [Clumsy](https://jagt.github.io/clumsy/) (retardo 100 ms) y limitar a 10 Mbps.
   - Linux: `tc qdisc add dev eth0 root netem delay 100ms rate 10mbit`.
   - Alternativa sin herramientas: Chrome DevTools → Network → *Custom* (10 Mbps, 100 ms) para las mediciones manuales de la interfaz.

## Ejecutar

```bash
node scripts/carga.mjs --url=https://<preview>.vercel.app --prefijo=carga --password=<clave> --sesiones=25 --ops=100 --confirmo
```

El script inicia 25 sesiones, reparte 100 operaciones (consultar cuenta/progreso, catálogo de misiones, neuronas y guardar un nivel de sudoku, que es idempotente), imprime éxito y tiempos (p50, p95, máximo por operación) y termina con código 0 solo si se cumplen REQ-019 (≥ 99% de éxito) y REQ-015 (≥ 95% por debajo de 2 s). Repetir 3 veces y anotar la peor.

El script se probó contra un servidor simulado; **no se ha ejecutado contra la aplicación real**.

## Qué cubre y qué no

- Cubre la API (lectura y escritura de progreso) bajo concurrencia; el inicio de sesión no se mide.
- No simula la latencia ni el ancho de banda: hay que aplicarlos con el sistema (arriba).
- No mide el pintado en el navegador (la parte «respuesta visible»). Para eso, medir a mano o con Lighthouse/DevTools unas cuantas interacciones (abrir una misión, responder una ronda, resolver una celda) con la red limitada.
- Las funciones serverless en frío tardan más en la primera petición: calentar el entorno con una ejecución previa y anotar si se hizo.
- El límite de intentos de login cuenta solo fallos, así que 25 inicios correctos desde la misma IP no lo activan.

## Registro de resultados

| Fecha | Entorno | Condiciones de red | Sesiones | Éxito | < 2 s | p95 | Resultado |
|---|---|---|---|---|---|---|---|
| _pendiente_ | | | | | | | |
