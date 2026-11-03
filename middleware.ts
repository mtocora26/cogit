import { NextRequest, NextResponse } from 'next/server'

// Rutas públicas (landing, login, registro, api, static, etc.)
const PUBLIC_PATHS = ['/', '/login', '/registro', '/api', '/_next', '/favicon.ico', '/public']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookies = request.cookies
  const url = request.url

  // Proteger la ruta /admin y subrutas solo para admin
  const userRol = cookies.get('userRol')?.value
  if (pathname.startsWith('/admin') && userRol !== 'admin') {
    return NextResponse.redirect(new URL('/login', url))
  }

  // Permitir rutas públicas
  if (PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next()
  }

  // Checar autenticación (demo: solo si hay userId en cookies)
  const userId = cookies.get('userId')?.value
  if (!userId) {
    // Si no está autenticado, redirigir a landing
    return NextResponse.redirect(new URL('/', url))
  }

  // Si está autenticado, permitir acceso
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|public).*)'],
}
