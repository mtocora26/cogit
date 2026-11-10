import { describe, expect, it } from "vitest"
import {
  CATEGORIAS,
  PROBLEMAS,
  REGLAS_CLASIFICAR,
  generarClasificar,
  generarEsencial,
  generarSobra,
  pistasClasificar,
  pistasEsencial,
  pistasSobra,
  revisarClasificar,
  revisarEsencial,
  revisarSobra,
} from "./abstraccion"
import { crearRng } from "./generador-patrones"

const nombre = (f: string) => `ficha ${f}`
const DIFS = ["baja", "media", "alta"] as const

describe("clasificar según una regla oculta", () => {
  it("la respuesta sigue la regla y los ejemplos no se repiten ni coinciden con la ficha nueva", () => {
    for (const d of DIFS) {
      for (let s = 1; s <= 80; s++) {
        const r = generarClasificar(d, { rng: crearRng(s * 7) })
        const regla = REGLAS_CLASIFICAR.find((x) => x.id === r.regla)!
        const enA = r.respuesta === "A"
        const aEsSi = regla.test(r.grupoA[0])
        // Los ejemplos de cada grupo cumplen (o no) la regla de forma homogénea.
        for (const f of r.grupoA) expect(regla.test(f)).toBe(aEsSi)
        for (const f of r.grupoB) expect(regla.test(f)).toBe(!aEsSi)
        expect(regla.test(r.ficha)).toBe(enA ? aEsSi : !aEsSi)
        expect([...r.grupoA, ...r.grupoB]).not.toContain(r.ficha)
      }
    }
  })

  it("los ejemplos descartan a la regla rival (la respuesta es única)", () => {
    for (let s = 1; s <= 200; s++) {
      const r = generarClasificar("media", { rng: crearRng(s) })
      const rival = REGLAS_CLASIFICAR.find((x) => x.id === (r.regla === "par" ? "mayor5" : "par"))!
      const a = r.grupoA.map(rival.test)
      const b = r.grupoB.map(rival.test)
      const separa = a.every((x) => x === a[0]) && b.every((x) => x === b[0]) && a[0] !== b[0]
      expect(separa).toBe(false)
    }
  })

  it("explica la regla sin dar solo «mal» y las pistas son graduales", () => {
    const r = generarClasificar("baja", { rng: crearRng(2) })
    const otra = r.respuesta === "A" ? "B" : "A"
    expect(revisarClasificar(r, r.respuesta, nombre).correcto).toBe(true)
    const mal = revisarClasificar(r, otra, nombre)
    expect(mal.correcto).toBe(false)
    expect(mal.explicacion).toContain(r.descA)
    expect(mal.explicacion).toContain(r.descB)
    const p = pistasClasificar(r, nombre)
    expect(p[0]).not.toContain(r.descA)
    expect(p[2]).toContain(r.descA)
  })
})

describe("qué sobra", () => {
  it("las categorías no comparten palabras y la cercana existe", () => {
    const todas = CATEGORIAS.flatMap((c) => c.miembros)
    expect(new Set(todas).size).toBe(todas.length)
    for (const c of CATEGORIAS) expect(CATEGORIAS.some((x) => x.id === c.cercana)).toBe(true)
  })

  it("hay un solo intruso, de otra categoría, y la dificultad sube el número de palabras", () => {
    for (const d of DIFS) {
      for (let s = 1; s <= 60; s++) {
        const r = generarSobra(d, { rng: crearRng(s * 5) })
        const cat = CATEGORIAS.find((c) => c.nombre === r.categoria)!
        const enCat = r.palabras.filter((p) => cat.miembros.includes(p))
        expect(enCat).toHaveLength(r.palabras.length - 1)
        expect(cat.miembros).not.toContain(r.palabras[r.impar])
        expect(r.palabras).toHaveLength(d === "alta" ? 5 : 4)
        expect(new Set(r.palabras).size).toBe(r.palabras.length)
      }
    }
  })

  it("explica la categoría y no revela al intruso antes de la última pista", () => {
    const r = generarSobra("media", { rng: crearRng(4) })
    const mal = revisarSobra(r, (r.impar + 1) % r.palabras.length)
    expect(mal.correcto).toBe(false)
    expect(mal.explicacion).toContain(r.categoria)
    expect(mal.explicacion).not.toContain(r.palabras[r.impar])
    expect(revisarSobra(r, r.impar).correcto).toBe(true)
    const p = pistasSobra(r)
    expect(p[1]).not.toContain(r.palabras[r.impar])
    expect(p[2]).toContain(r.palabras[r.impar])
  })
})

describe("reducir a lo esencial", () => {
  it("cada problema tiene datos esenciales e irrelevantes distintos", () => {
    for (const p of PROBLEMAS) {
      expect(p.esenciales.length).toBeGreaterThanOrEqual(2)
      expect(p.irrelevantes.length).toBeGreaterThanOrEqual(3)
      expect(new Set([...p.esenciales, ...p.irrelevantes]).size).toBe(p.esenciales.length + p.irrelevantes.length)
    }
  })

  it("no repite problema dentro de una partida y mezcla esenciales con relleno", () => {
    const usados = new Set<string>()
    const rng = crearRng(9)
    const ids = Array.from({ length: 5 }, () => generarEsencial({ rng, usados }).problemaId)
    expect(new Set(ids).size).toBe(5)
    const r = generarEsencial({ rng: crearRng(3) })
    expect(r.datos.length).toBeGreaterThan(r.esenciales.length)
    for (const e of r.esenciales) expect(r.datos).toContain(e)
  })

  it("acepta solo el conjunto exacto y explica qué sobra y qué falta", () => {
    const r = generarEsencial({ rng: crearRng(6) })
    expect(revisarEsencial(r, [...r.esenciales].reverse()).correcto).toBe(true)
    const relleno = r.datos.find((d) => !r.esenciales.includes(d))!
    const conSobra = revisarEsencial(r, [...r.esenciales, relleno])
    expect(conSobra.correcto).toBe(false)
    expect(conSobra.explicacion).toContain(relleno)
    const conFalta = revisarEsencial(r, [r.esenciales[0]])
    expect(conFalta.correcto).toBe(false)
    expect(conFalta.explicacion).toContain("falta")
    expect(conFalta.explicacion).not.toContain(r.esenciales[1])
    expect(pistasEsencial(r)[1]).not.toContain(r.esenciales[0])
    expect(pistasEsencial(r)[2]).toContain(r.esenciales[0])
  })
})
