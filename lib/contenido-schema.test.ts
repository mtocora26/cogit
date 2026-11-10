import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { ActividadSchema, CatalogoSchema, JUEGOS } from "./contenido-schema"
import { CATALOGO_INICIAL, buscarActividad, buscarNivel, minutosNivel, siguienteNivel } from "./misiones-catalogo"

const clonar = <T,>(x: T): T => JSON.parse(JSON.stringify(x))

describe("contenido inicial", () => {
  it("cumple el esquema validado", () => {
    expect(CatalogoSchema.safeParse(CATALOGO_INICIAL).success).toBe(true)
  })

  it("el nivel 1 tiene las tres actividades actuales, cada una con su juego", () => {
    const n1 = CATALOGO_INICIAL.niveles[0]
    expect(n1.actividades.map((a) => a.juego)).toEqual(["reconocer", "intruso", "completa"])
    for (const a of n1.actividades) {
      expect(JUEGOS).toContain(a.juego)
      expect(a.reglas.length).toBeGreaterThan(0)
    }
  })

  it("la migración inserta el mismo contenido (sin desvíos)", () => {
    // La carga inicial y las migraciones posteriores de contenido (cada nivel nuevo agrega la suya).
    const dir = join(process.cwd(), "prisma/migrations")
    const sql = readdirSync(dir)
      .filter((d) => d.includes("contenido_"))
      .map((d) => readFileSync(join(dir, d, "migration.sql"), "utf8"))
      .join("\n")
    const q = (s: string) => s.replace(/'/g, "''")
    for (const n of CATALOGO_INICIAL.niveles) {
      expect(sql).toContain(`'${q(n.title)}'`)
      expect(sql).toContain(`'${q(n.objetivo)}'`)
      for (const a of n.actividades) {
        expect(sql).toContain(`'${q(a.title)}'`)
        expect(sql).toContain(`'${q(a.objetivo)}'`)
        expect(sql).toContain(`'${a.juego}'`)
        for (const r of a.reglas) expect(sql).toContain(q(JSON.stringify(r).slice(1, -1)))
      }
    }
  })
})

describe("validación", () => {
  const base = () => clonar(CATALOGO_INICIAL.niveles[0].actividades[0])

  it("rechaza duración fuera de rango", () => {
    expect(ActividadSchema.safeParse({ ...base(), minutos: 0 }).success).toBe(false)
    expect(ActividadSchema.safeParse({ ...base(), minutos: 61 }).success).toBe(false)
    expect(ActividadSchema.safeParse({ ...base(), minutos: 2.5 }).success).toBe(false)
  })

  it("rechaza un juego que no existe", () => {
    expect(ActividadSchema.safeParse({ ...base(), juego: "inexistente" }).success).toBe(false)
  })

  it("rechaza textos vacíos o demasiado largos", () => {
    expect(ActividadSchema.safeParse({ ...base(), objetivo: "   " }).success).toBe(false)
    expect(ActividadSchema.safeParse({ ...base(), objetivo: "x".repeat(201) }).success).toBe(false)
    expect(ActividadSchema.safeParse({ ...base(), reglas: [] }).success).toBe(false)
  })

  it("rechaza un ejemplo con la ficha resaltada fuera de la secuencia", () => {
    const a = base()
    expect(ActividadSchema.safeParse({ ...a, ejemplo: { ...a.ejemplo, resaltar: 99 } }).success).toBe(false)
  })

  it("rechaza ids repetidos", () => {
    const c = clonar(CATALOGO_INICIAL)
    c.niveles[0].actividades[1].id = c.niveles[0].actividades[0].id
    expect(CatalogoSchema.safeParse(c).success).toBe(false)
    const d = clonar(CATALOGO_INICIAL)
    d.niveles[1].id = d.niveles[0].id
    expect(CatalogoSchema.safeParse(d).success).toBe(false)
  })

  it("agregar una actividad solo es cuestión de datos", () => {
    const c = clonar(CATALOGO_INICIAL)
    c.niveles[0].actividades.push({ ...clonar(c.niveles[0].actividades[0]), id: "9" })
    expect(CatalogoSchema.safeParse(c).success).toBe(true)
    expect(c.niveles[0].actividades).toHaveLength(4)
  })
})

describe("consultas", () => {
  it("busca niveles, actividades y calcula la duración", () => {
    expect(buscarNivel(CATALOGO_INICIAL, "1", "1")?.title).toBe("Reconocimiento de patrones")
    expect(buscarNivel(CATALOGO_INICIAL, "9", "1")).toBeUndefined()
    expect(buscarActividad(CATALOGO_INICIAL, "1", "1", "2")?.juego).toBe("intruso")
    expect(minutosNivel(CATALOGO_INICIAL.niveles[0])).toBe(9)
    expect(siguienteNivel(CATALOGO_INICIAL, "1")?.id).toBe("2")
    expect(siguienteNivel(CATALOGO_INICIAL, "3")?.id).toBe("4")
    expect(siguienteNivel(CATALOGO_INICIAL, "4")).toBeUndefined()
    expect(CATALOGO_INICIAL.niveles[1].actividades.map((a) => a.juego)).toEqual(["ordenar", "instrucciones", "ejecutar"])
    expect(CATALOGO_INICIAL.niveles[2].actividades.map((a) => a.juego)).toEqual(["clasificar", "sobra", "esencial"])
    expect(CATALOGO_INICIAL.niveles[3].actividades.map((a) => a.juego)).toEqual(["subtareas", "error", "depurar"])
  })
})
