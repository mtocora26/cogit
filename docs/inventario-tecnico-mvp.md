# Inventario tecnico del MVP de COGIT

## 1. Objetivo

Este documento presenta el inventario de recursos tecnologicos necesarios para desarrollar y operar el MVP de COGIT, una plataforma educativa gamificada para el aprendizaje del pensamiento computacional.

El inventario esta preparado desde la perspectiva del desarrollador para ser entregado al PMO. Los costos estan expresados en pesos colombianos (COP) y son aproximados.

## 2. Supuestos del proyecto

- Duracion: del 4 de agosto al 5 de diciembre.
- Duracion aproximada: 4 meses.
- Equipo: 3 personas.
- Roles: PMO, desarrollador, analista de sistemas y encargado de marketing.
- Una persona cumple simultaneamente los roles de analista de sistemas y marketing.
- Usuarios objetivo: estudiantes de primero y segundo semestre.
- Usuarios registrados estimados: hasta 100.
- Usuarios simultaneos estimados: hasta 25.
- Tipo de producto: MVP web.
- Moneda: pesos colombianos (COP).
- El costo de desarrollo humano no se incluye porque el inventario solicitado corresponde a recursos tecnologicos.

## 3. Alcance funcional del MVP

El MVP contempla las siguientes funcionalidades:

- Registro e inicio de sesion.
- Misiones y actividades de aprendizaje.
- Sudoku.
- Nonogramas.
- Robot Programmer.
- Guardado de progreso.
- Ranking.
- Panel administrativo basico.
- Comunidad en una primera version demostrativa.

## 4. Arquitectura tecnica actual

COGIT es un monolito full-stack integrado. El frontend, el backend y el acceso a la base de datos se encuentran dentro del mismo proyecto Next.js.

| Capa | Tecnologia o ubicacion |
|---|---|
| Interfaz web | React y Next.js |
| Backend | Route Handlers de Next.js en `app/api` |
| Persistencia | Prisma ORM y PostgreSQL |
| Estilos | Tailwind CSS |
| Componentes UI | Radix UI y componentes propios |
| Juegos | Componentes React y logica en `lib` |
| Autenticacion actual | Cookies y `localStorage` |
| Control de versiones | Git y GitHub |

Referencias del repositorio:

- [package.json](package.json)
- [app/api](app/api)
- [prisma/schema.prisma](prisma/schema.prisma)
- [lib](lib)
- [middleware.ts](middleware.ts)

## 5. Lenguajes, frameworks y software

| Recurso | Cantidad | Costo aproximado | Periodicidad |
|---|---:|---:|---|
| TypeScript | 1 | $0 | Unico |
| JavaScript | 1 | $0 | Unico |
| React | 1 | $0 | Unico |
| Next.js | 1 | $0 | Unico |
| Tailwind CSS | 1 | $0 | Unico |
| Prisma ORM | 1 | $0 | Unico |
| PostgreSQL | 1 instancia | Incluido en infraestructura | Mensual |
| Radix UI | 1 conjunto | $0 | Unico |
| Lucide React | 1 | $0 | Unico |
| Framer Motion | 1 | $0 | Unico |
| pnpm | 1 | $0 | Unico |
| Node.js LTS | 3 instalaciones | $0 | Unico |
| Visual Studio Code | 3 instalaciones | $0 | Unico |
| Git | 3 instalaciones | $0 | Unico |
| GitHub | 1 repositorio | $0 | Mensual |
| Playwright para pruebas | 1 conjunto | $0 | Unico |

Los lenguajes y dependencias principales estan declarados en [package.json](package.json), [tsconfig.json](tsconfig.json) y [tailwind.config.ts](tailwind.config.ts).

## 6. Hosting y servidor recomendado

### Recomendacion: Render + Neon

Se recomienda alojar la aplicacion Next.js en Render y utilizar Neon como proveedor de PostgreSQL.

Esta alternativa evita depender exclusivamente de Vercel, mantiene una configuracion sencilla y permite separar la aplicacion de la base de datos sin administrar servidores fisicos.

| Servicio | Cantidad | Costo mensual aproximado | Costo durante 4 meses |
|---|---:|---:|---:|
| Render para alojar Next.js | 1 servicio | $30.000 - $50.000 | $120.000 - $200.000 |
| Neon PostgreSQL | 1 instancia | $80.000 - $100.000 | $320.000 - $400.000 |
| Backups de base de datos | 1 politica | $0 - $50.000 | $0 - $200.000 |
| Dominio propio | 1 | No mensual | $60.000 - $120.000 anual |
| Certificado SSL | 1 | $0 | $0 |
| Repositorio GitHub | 1 | $0 | $0 |

**Costo estimado de infraestructura cloud durante el proyecto:** $500.000 - $920.000 COP.

Los valores son aproximados y deben confirmarse directamente con los proveedores antes de contratar.

### Alternativas

- Vercel + Neon: alternativa con integracion muy sencilla para Next.js.
- Railway: alternativa sencilla que puede alojar aplicacion y base de datos en un mismo proveedor.
- Supabase: alternativa que ofrece PostgreSQL y servicios adicionales como autenticacion y almacenamiento.

Para el MVP se recomienda no utilizar servidores fisicos propios.

## 7. Servicios externos y APIs

| Servicio | Uso | Cantidad | Costo aproximado | Periodicidad |
|---|---|---:|---:|---|
| PostgreSQL administrado | Usuarios y progreso | 1 | Incluido en Neon | Mensual |
| Servicio de correo | Recuperacion de contrasena y notificaciones futuras | 1 | $0 - $60.000 | Mensual |
| Monitoreo de errores | Deteccion de fallos en produccion | 1 | $0 inicialmente | Mensual |
| CDN y SSL | Entrega segura de la aplicacion | 1 | Incluido en hosting | Mensual |
| Imagens de Unsplash | Recursos visuales actuales | Varias | $0 actualmente | No aplica |
| Google Login | Actualmente simulado | 0 real | $0 actualmente | No aplica |
| GitHub Login | Actualmente simulado | 0 real | $0 actualmente | No aplica |

Para mayor estabilidad se recomienda almacenar localmente las imagenes esenciales y no depender de URLs externas para recursos importantes del producto.

Las APIs internas actuales son:

- [app/api/usuario/route.ts](app/api/usuario/route.ts)
- [app/api/progreso/route.ts](app/api/progreso/route.ts)
- [app/api/ranking/route.ts](app/api/ranking/route.ts)

## 8. Software de seguridad y calidad recomendado

| Recurso | Cantidad | Costo aproximado | Periodicidad |
|---|---:|---:|---|
| Libreria de hash de contrasenas, como Argon2 o bcrypt | 1 | $0 | Unico |
| Libreria de sesiones seguras | 1 | $0 | Unico |
| Zod para validacion de datos | 1 | $0 | Unico |
| Playwright para pruebas de usuario | 1 | $0 | Unico |
| Sentry u otro monitor de errores | 1 | $0 inicialmente | Mensual |
| Herramienta de rate limiting | 1 | $0 - $50.000 | Mensual |

Estas herramientas son necesarias para pasar de prototipo a MVP estable.

## 9. Licencias

| Recurso | Cantidad | Costo aproximado | Periodicidad |
|---|---:|---:|---|
| Licencia del codigo propio | 1 | Por definir | Unico |
| Dependencias open source | Varias | $0 | Unico |
| Visual Studio Code | 3 | $0 | Unico |
| GitHub Free | 1 | $0 | Mensual |
| Imagens de Unsplash | Varias | $0 inicialmente | No aplica |
| Dominio propio | 1 | $60.000 - $120.000 | Anual |

No se observa un archivo `LICENSE` en el repositorio. Antes de publicar el producto se debe definir la licencia del codigo y revisar las licencias de las dependencias utilizadas.

## 10. Computadores y dispositivos

### 10.1 Equipo del proyecto

Si los integrantes ya poseen computadores personales, estos recursos deben registrarse como disponibles y no como compras nuevas.

| Equipo | Cantidad | Costo unitario aproximado | Costo total | Periodicidad |
|---|---:|---:|---:|---|
| Computador portatil para desarrollo | 1 | $2.500.000 - $4.000.000 | $2.500.000 - $4.000.000 | Unico |
| Computador para PMO | 1 | $1.800.000 - $3.000.000 | $1.800.000 - $3.000.000 | Unico |
| Computador para analisis y marketing | 1 | $1.800.000 - $3.000.000 | $1.800.000 - $3.000.000 | Unico |

**Subtotal estimado del equipo del proyecto:** $6.100.000 - $10.000.000 COP.

### 10.2 Equipos para estudiantes

El MVP contempla hasta 100 usuarios registrados, pero se estima que no todos utilizaran la plataforma al mismo tiempo. Para un piloto de 25 usuarios simultaneos se propone el siguiente escenario:

| Equipo | Cantidad | Costo unitario aproximado | Costo total | Periodicidad |
|---|---:|---:|---:|---|
| Computadores para laboratorio | 25 | $1.800.000 - $2.500.000 | $45.000.000 - $62.500.000 | Unico |
| Tablets | 0 | $0 | $0 | Unico |
| Impresoras | 0 | $0 | $0 | Unico |
| Audifonos o perifericos adicionales | 25 | $80.000 - $150.000 | $2.000.000 - $3.750.000 | Unico |
| Router o puntos de acceso | 1 conjunto | $800.000 - $2.000.000 | $800.000 - $2.000.000 | Unico |

**Subtotal estimado para estudiantes:** $47.800.000 - $68.250.000 COP.

Los equipos para estudiantes son una necesidad institucional opcional. Si los estudiantes utilizan sus propios dispositivos, este valor se elimina del presupuesto del MVP.

## 11. Internet y conectividad

| Recurso | Cantidad | Costo aproximado | Periodicidad |
|---|---:|---:|---|
| Internet institucional o empresarial | 1 servicio | $150.000 - $350.000 | Mensual |
| Costo durante 4 meses | 1 | $600.000 - $1.400.000 | Durante el proyecto |

Para 25 usuarios simultaneos se recomienda una conexion estable de al menos 100 Mbps. El costo real depende del proveedor y de la ciudad.

## 12. Resumen economico

### Escenario A: utilizando computadores existentes o personales

| Categoria | Costo aproximado |
|---|---:|
| Infraestructura cloud, dominio y servicios | $500.000 - $920.000 |
| Internet durante 4 meses | $600.000 - $1.400.000 |
| Software y licencias | $0 - $120.000 |
| Equipos del equipo de trabajo | $0 si ya existen |
| **Total estimado** | **$1.100.000 - $2.440.000 COP** |

### Escenario B: comprando equipos para el equipo y estudiantes

| Categoria | Costo aproximado |
|---|---:|
| Infraestructura cloud, dominio y servicios | $500.000 - $920.000 |
| Internet durante 4 meses | $600.000 - $1.400.000 |
| Equipos del equipo del proyecto | $6.100.000 - $10.000.000 |
| Equipos para estudiantes y perifericos | $47.800.000 - $68.250.000 |
| Software y licencias | $0 - $120.000 |
| **Total estimado** | **$55.000.000 - $80.700.000 COP** |

Estos valores no incluyen salarios, honorarios, diseño, soporte ni mantenimiento posterior al 5 de diciembre.

## 13. Mejoras necesarias para un MVP estable

Antes de presentar COGIT como un producto real se recomienda:

1. Hashear las contrasenas y eliminar el envio de contrasenas mediante solicitudes `GET`.
2. Implementar sesiones seguras controladas desde el servidor.
3. Validar permisos dentro de cada API.
4. Conectar comunidad, administracion y estadisticas a datos reales.
5. Agregar pruebas para registro, login, progreso, ranking y juegos.
6. Configurar migraciones, backups y variables de entorno.
7. Agregar monitoreo de errores y logs.
8. Implementar rate limiting para login y APIs publicas.
9. Definir licencia, politica de privacidad y terminos de uso.
10. Corregir la instalacion de dependencias y validar el build de produccion.
11. Evitar ignorar errores de TypeScript y ESLint en el build final.

## 14. Recursos que no se pueden estimar con exactitud

- Precio final del dominio elegido.
- Precio exacto de Render, Neon u otro proveedor.
- Numero real de usuarios simultaneos.
- Velocidad y precio del internet institucional.
- Si los integrantes ya cuentan con computadores.
- Cantidad definitiva de computadores para estudiantes.
- Costos de mantenimiento y soporte despues del proyecto.
- Costos de desarrollo y horas de trabajo.
- Requisitos legales especificos.
- Licencia final del producto.

## 15. Conclusion

Para el MVP de COGIT se recomienda una arquitectura monolitica full-stack desplegada en Render, con PostgreSQL administrado en Neon, dominio propio y herramientas open source.

El costo de infraestructura y operacion durante los cuatro meses se estima entre $1.100.000 y $2.440.000 COP si se utilizan computadores existentes. El mayor costo corresponde a los computadores para los estudiantes, por lo que deben presentarse como una necesidad institucional opcional y no como un requisito directo del desarrollo del software.
