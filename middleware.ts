import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE, readSession } from "@/lib/session"

// Rutas públicas: landing, auth, términos y las APIs (cada API valida su propia sesión).
const PUBLIC_PATHS = ["/", "/login", "/registro", "/recuperar-password", "/restablecer-password", "/terminos", "/api", "/_next", "/favicon.ico", "/public"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value)

  // /admin: solo con sesión firmada de administrador. La cookie no se puede fabricar desde el navegador.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!session) return NextResponse.redirect(new URL("/login", request.url))
    if (session.rol !== "admin") return NextResponse.redirect(new URL("/misiones", request.url))
    return NextResponse.next()
  }

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next()
  }

  if (!session) return NextResponse.redirect(new URL("/login", request.url))
  return NextResponse.next()
}

export const config = {
  // Excluye también los archivos estáticos de /public (imágenes, fuentes): sin esto, quien no
  // ha iniciado sesión recibe un redirect en lugar de la imagen.
  matcher: ["/((?!_next|api|favicon.ico|public|.*\\.(?:png|jpe?g|gif|svg|webp|ico|woff2?|txt|xml)$).*)"],
}
