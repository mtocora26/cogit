/**
 * Prepara una cuenta de pruebas: activa `modoPruebas` y marca como completadas
 * todas las actividades que existan hoy en la base. Se puede volver a ejecutar
 * cuando se agregue contenido nuevo.
 *
 * Uso: pnpm precargar:pruebas [username]
 */
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const { PrismaClient } = require("../lib/generated/prisma")

const prisma = new PrismaClient()
const username = process.argv[2] || "tocora1"

async function main() {
  const usuario = await prisma.usuario.findUnique({ where: { username } })
  if (!usuario) throw new Error(`No existe el usuario "${username}"`)

  const niveles = await prisma.nivel.findMany({
    orderBy: { orden: "asc" },
    include: { actividades: { orderBy: { orden: "asc" } } },
  })

  const filas = niveles.flatMap((nivel) =>
    nivel.actividades.map((actividad) => ({
      userId: usuario.id,
      seccion: nivel.seccion,
      nivel: nivel.clave,
      actividad: `${nivel.seccion}-${nivel.clave}-${actividad.clave}`,
      completado: true,
      // Puntos y tiempo en 0 para no distorsionar el ranking con la cuenta de pruebas.
      score: 0,
      tiempo: 0,
    })),
  )

  await prisma.$transaction([
    prisma.usuario.update({ where: { id: usuario.id }, data: { modoPruebas: true } }),
    ...filas.map((fila) =>
      prisma.progreso.upsert({
        where: {
          userId_seccion_nivel_actividad: {
            userId: fila.userId,
            seccion: fila.seccion,
            nivel: fila.nivel,
            actividad: fila.actividad,
          },
        },
        update: { completado: true },
        create: fila,
      }),
    ),
  ])

  console.log(`Modo pruebas activado para "${username}": ${filas.length} actividades precargadas.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
