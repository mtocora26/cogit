// Envío de correos transaccionales con Resend (API HTTP, sin dependencias).
// Variables: RESEND_API_KEY (obligatoria para enviar), CORREO_REMITENTE (por defecto el remitente de pruebas de Resend).

export interface Correo {
  to: string
  subject: string
  html: string
  text: string
}

export async function enviarCorreo(correo: Correo): Promise<boolean> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    // Sin proveedor configurado: en desarrollo se muestra el contenido en consola para poder probar el flujo.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[correo] RESEND_API_KEY no configurada. Correo para ${correo.to}:\n${correo.text}`)
    } else {
      console.error("[correo] RESEND_API_KEY no configurada: no se envió el correo")
    }
    return false
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CORREO_REMITENTE || "COGIT <onboarding@resend.dev>",
        to: [correo.to],
        subject: correo.subject,
        html: correo.html,
        text: correo.text,
      }),
    })
    if (!res.ok) console.error("[correo] Resend respondió", res.status, await res.text().catch(() => ""))
    return res.ok
  } catch (e) {
    console.error("[correo] No se pudo contactar a Resend", e)
    return false
  }
}
