import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// POST: Registrar usuario
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, password, rol } = body
    if (!nombre || !email || !password || !rol) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
    }
    // Verificar si el email ya existe
    const existing = await prisma.usuario.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'El email ya está registrado' }, { status: 409 })
    }
    // Crear usuario
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password, // En producción, hashea la contraseña
        rol,
        neuronas: 5,
        maxNeuronas: 5,
        creditos: 0,
        ultimaRecarga: new Date(),
      },
    })
    return NextResponse.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      neuronas: usuario.neuronas,
      maxNeuronas: usuario.maxNeuronas,
      creditos: usuario.creditos,
      ultimaRecarga: usuario.ultimaRecarga,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar usuario', details: error }, { status: 500 })
  }
}

// GET: Login de usuario (por email y password)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const password = searchParams.get('password')
    if (!email || !password) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario || usuario.password !== password) {
      return NextResponse.json({ error: 'Email o contraseña incorrectos' }, { status: 401 })
    }
    // Lógica de recarga automática de neuronas
    let neuronas = usuario.neuronas
    let ultimaRecarga = usuario.ultimaRecarga || new Date()
    const maxNeuronas = usuario.maxNeuronas || 5
    const creditos = usuario.creditos || 0
    const ahora = new Date()
    if (neuronas < maxNeuronas && ultimaRecarga) {
      const msPasados = ahora.getTime() - new Date(ultimaRecarga).getTime()
      const recargas = Math.floor(msPasados / (30 * 60 * 1000)) // cada 30 min
      if (recargas > 0) {
        neuronas = Math.min(maxNeuronas, neuronas + recargas)
        ultimaRecarga = new Date(new Date(ultimaRecarga).getTime() + recargas * 30 * 60 * 1000)
        await prisma.usuario.update({
          where: { id: usuario.id },
          data: { neuronas, ultimaRecarga },
        })
      }
    }
    return NextResponse.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      neuronas,
      maxNeuronas,
      creditos,
      ultimaRecarga,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error al buscar usuario', details: error }, { status: 500 })
  }
}

// PATCH: Sumar o restar puntos al usuario (por email)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, puntos } = body
    if (!email || typeof puntos !== 'number') {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
    }
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }
    // Asegura que los créditos nunca sean negativos
    const nuevosCreditos = Math.max(0, (usuario.creditos || 0) + puntos)
    const actualizado = await prisma.usuario.update({
      where: { email },
      data: { creditos: nuevosCreditos },
    })
    return NextResponse.json({
      id: actualizado.id,
      email: actualizado.email,
      creditos: actualizado.creditos,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar puntos', details: error }, { status: 500 })
  }
}
