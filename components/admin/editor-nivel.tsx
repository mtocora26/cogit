"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { JUEGOS, NOMBRE_JUEGO, NivelSchema, type Juego, type NivelCatalogo } from "@/lib/contenido-schema"

/** Actividad como texto editable: las listas se escriben en una línea de texto o una por línea. */
interface ActividadForm {
  id: string
  title: string
  descripcion: string
  objetivo: string
  minutos: string
  juego: Juego
  reglas: string
  secuencia: string
  resaltar: string
  respuesta: string
  explicacion: string
}
interface NivelForm {
  title: string
  text: string
  objetivo: string
  actividades: ActividadForm[]
}

const aForm = (n: NivelCatalogo): NivelForm => ({
  title: n.title,
  text: n.text,
  objetivo: n.objetivo,
  actividades: n.actividades.map((a) => ({
    id: a.id,
    title: a.title,
    descripcion: a.descripcion,
    objetivo: a.objetivo,
    minutos: String(a.minutos),
    juego: a.juego,
    reglas: a.reglas.join("\n"),
    secuencia: unir(a.ejemplo.secuencia),
    resaltar: a.ejemplo.resaltar === undefined ? "" : String(a.ejemplo.resaltar),
    respuesta: unir(a.ejemplo.respuesta),
    explicacion: a.ejemplo.explicacion,
  })),
})

// Fichas separadas por espacio; si alguna es una frase (pasos de una tarea), se separan con «|».
const fichas = (s: string) => (s.includes("|") ? s.split("|") : s.split(/\s+/)).map((x) => x.trim()).filter(Boolean)
const unir = (xs: string[]) => (xs.some((x) => /\s/.test(x)) ? xs.join(" | ") : xs.join(" "))

const aNivel = (id: string, f: NivelForm): unknown => ({
  id,
  title: f.title,
  text: f.text,
  objetivo: f.objetivo,
  actividades: f.actividades.map((a) => ({
    id: a.id,
    title: a.title,
    descripcion: a.descripcion,
    objetivo: a.objetivo,
    minutos: a.minutos.trim() === "" ? NaN : Number(a.minutos),
    juego: a.juego,
    reglas: a.reglas.split("\n").map((r) => r.trim()).filter(Boolean),
    ejemplo: {
      secuencia: fichas(a.secuencia),
      ...(a.resaltar.trim() === "" ? {} : { resaltar: Number(a.resaltar) }),
      respuesta: fichas(a.respuesta),
      explicacion: a.explicacion,
    },
  })),
})

const ETIQUETAS: Record<string, string> = {
  title: "Título",
  text: "Descripción",
  objetivo: "Objetivo",
  descripcion: "Descripción",
  minutos: "Duración",
  juego: "Juego",
  reglas: "Reglas",
  secuencia: "Ejemplo: fichas",
  resaltar: "Ejemplo: ficha resaltada",
  respuesta: "Ejemplo: respuesta",
  explicacion: "Ejemplo: explicación",
  actividades: "Actividades",
}

/** "actividades.1.minutos" -> "Actividad 2 · Duración" */
function describir(campo: string): string {
  const p = campo.split(".")
  const hoja = p.filter((x) => !/^\d+$/.test(x) && x !== "ejemplo").pop() ?? ""
  const i = p[0] === "actividades" ? Number(p[1]) : NaN
  const nombre = ETIQUETAS[hoja] ?? hoja
  return Number.isNaN(i) ? nombre : `Actividad ${i + 1} · ${nombre}`
}

export default function EditorNivel({ nivel }: { nivel: NivelCatalogo }) {
  const router = useRouter()
  const [f, setF] = useState<NivelForm>(() => aForm(nivel))
  const [errores, setErrores] = useState<string[]>([])
  const [estado, setEstado] = useState<"idle" | "guardando" | "ok">("idle")
  const idp = `n${nivel.id}`

  const set = (patch: Partial<NivelForm>) => {
    setEstado("idle")
    setF((x) => ({ ...x, ...patch }))
  }
  const setAct = (i: number, patch: Partial<ActividadForm>) =>
    set({ actividades: f.actividades.map((a, k) => (k === i ? { ...a, ...patch } : a)) })

  function agregar() {
    const usados = new Set(f.actividades.map((a) => a.id))
    let n = f.actividades.length + 1
    while (usados.has(String(n))) n++
    set({
      actividades: [
        ...f.actividades,
        { id: String(n), title: "", descripcion: "", objetivo: "", minutos: "3", juego: "reconocer", reglas: "", secuencia: "", resaltar: "", respuesta: "", explicacion: "" },
      ],
    })
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    setEstado("idle")
    // Se valida aquí con el mismo esquema que usa el servidor; el servidor vuelve a validar.
    const r = NivelSchema.safeParse(aNivel(nivel.id, f))
    if (!r.success) {
      setErrores(r.error.issues.map((i) => `${describir(i.path.join("."))}: ${i.message}`))
      return
    }
    setErrores([])
    setEstado("guardando")
    try {
      const res = await fetch("/api/admin/contenido", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nivel: r.data }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        const detalles: { campo: string; mensaje: string }[] = j.detalles ?? []
        setErrores(detalles.length ? detalles.map((d) => `${describir(d.campo)}: ${d.mensaje}`) : [j.error ?? "No se pudo guardar. Inténtalo de nuevo."])
        setEstado("idle")
        return
      }
      setEstado("ok")
      router.refresh()
    } catch {
      setErrores(["No se pudo guardar. Revisa tu conexión e inténtalo de nuevo."])
      setEstado("idle")
    }
  }

  return (
    <form onSubmit={guardar} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`${idp}-title`}>Título del nivel</Label>
          <Input id={`${idp}-title`} value={f.title} onChange={(e) => set({ title: e.target.value })} maxLength={80} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${idp}-objetivo`}>Objetivo del nivel</Label>
          <Input id={`${idp}-objetivo`} value={f.objetivo} onChange={(e) => set({ objetivo: e.target.value })} maxLength={200} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor={`${idp}-text`}>Descripción corta</Label>
          <Textarea id={`${idp}-text`} rows={2} value={f.text} onChange={(e) => set({ text: e.target.value })} maxLength={300} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold">Actividades</h3>
        {f.actividades.length === 0 && <p className="text-sm text-muted-foreground">Sin actividades: el nivel se muestra como «Próximamente».</p>}
        {f.actividades.map((a, i) => {
          const p = `${idp}-a${i}`
          return (
            <fieldset key={i} className="space-y-4 rounded-lg border border-border p-4">
              <legend className="px-1 text-sm font-medium">Actividad {i + 1}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor={`${p}-title`}>Título</Label>
                  <Input id={`${p}-title`} value={a.title} onChange={(e) => setAct(i, { title: e.target.value })} maxLength={80} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor={`${p}-minutos`}>Duración (min)</Label>
                    <Input id={`${p}-minutos`} inputMode="numeric" value={a.minutos} onChange={(e) => setAct(i, { minutos: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`${p}-juego`}>Juego</Label>
                    <select
                      id={`${p}-juego`}
                      value={a.juego}
                      onChange={(e) => setAct(i, { juego: e.target.value as Juego })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      {JUEGOS.map((j) => (
                        <option key={j} value={j}>
                          {NOMBRE_JUEGO[j]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor={`${p}-objetivo`}>Objetivo (una frase)</Label>
                  <Input id={`${p}-objetivo`} value={a.objetivo} onChange={(e) => setAct(i, { objetivo: e.target.value })} maxLength={200} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor={`${p}-descripcion`}>Descripción</Label>
                  <Textarea id={`${p}-descripcion`} rows={2} value={a.descripcion} onChange={(e) => setAct(i, { descripcion: e.target.value })} maxLength={600} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor={`${p}-reglas`}>Reglas (una por línea)</Label>
                  <Textarea id={`${p}-reglas`} rows={4} value={a.reglas} onChange={(e) => setAct(i, { reglas: e.target.value })} />
                </div>
              </div>

              <div className="space-y-4 rounded-md bg-secondary/40 p-3">
                <p className="text-sm font-medium">Ejemplo resuelto</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor={`${p}-secuencia`}>Fichas de la secuencia (separadas por espacio, o por | si son frases; ❔ marca un hueco)</Label>
                    <Input id={`${p}-secuencia`} value={a.secuencia} onChange={(e) => setAct(i, { secuencia: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`${p}-respuesta`}>Fichas de la respuesta (mismo formato)</Label>
                    <Input id={`${p}-respuesta`} value={a.respuesta} onChange={(e) => setAct(i, { respuesta: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`${p}-resaltar`}>Posición resaltada (opcional, desde 0)</Label>
                    <Input id={`${p}-resaltar`} inputMode="numeric" value={a.resaltar} onChange={(e) => setAct(i, { resaltar: e.target.value })} />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor={`${p}-explicacion`}>Explicación</Label>
                    <Textarea id={`${p}-explicacion`} rows={2} value={a.explicacion} onChange={(e) => setAct(i, { explicacion: e.target.value })} maxLength={400} />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="min-h-11 text-muted-foreground"
                onClick={() => set({ actividades: f.actividades.filter((_, k) => k !== i) })}
              >
                <Trash2 aria-hidden className="mr-2 h-4 w-4" />
                Quitar actividad (se aplica al guardar)
              </Button>
            </fieldset>
          )
        })}
        <Button type="button" variant="outline" className="min-h-11" onClick={agregar}>
          <Plus aria-hidden className="mr-2 h-4 w-4" />
          Agregar actividad
        </Button>
      </div>

      {errores.length > 0 && (
        <div role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm">
          <p className="mb-2 font-medium">No se guardó. Corrige esto:</p>
          <ul className="list-disc space-y-1 pl-5">
            {errores.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      {estado === "ok" && (
        <p role="status" className="rounded-lg border border-green-500/40 bg-green-500/10 p-3 text-sm">
          Guardado. Los estudiantes ya ven este contenido.
        </p>
      )}

      <Button type="submit" className="min-h-11" disabled={estado === "guardando"}>
        {estado === "guardando" ? "Guardando…" : "Guardar nivel"}
      </Button>
    </form>
  )
}
