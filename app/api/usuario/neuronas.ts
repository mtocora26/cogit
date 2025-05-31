import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// POST: Restar neuronas al fallar una actividad
export async function POST(req: NextRequest) {
  try {
    const { userId, cantidad } = await req.json();
    if (!userId || typeof cantidad !== 'number') {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }
    const usuario = await prisma.usuario.findUnique({ where: { id: userId } });
    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    if (usuario.rol === 'admin') {
      return NextResponse.json({ neuronas: usuario.neuronas, creditos: usuario.creditos });
    }
    let nuevasNeuronas = Math.max(0, usuario.neuronas - cantidad);
    await prisma.usuario.update({
      where: { id: userId },
      data: { neuronas: nuevasNeuronas },
    });
    return NextResponse.json({ neuronas: nuevasNeuronas, creditos: usuario.creditos });
  } catch (error) {
    return NextResponse.json({ error: 'Error al restar neuronas', details: error }, { status: 500 });
  }
}

// PATCH: Recargar neuronas usando créditos
export async function PATCH(req: NextRequest) {
  try {
    const { userId, cantidadNeuronas, costoCreditos } = await req.json();
    if (!userId || typeof cantidadNeuronas !== 'number' || typeof costoCreditos !== 'number') {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }
    const usuario = await prisma.usuario.findUnique({ where: { id: userId } });
    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    if (usuario.rol === 'admin') {
      return NextResponse.json({ neuronas: usuario.maxNeuronas, creditos: usuario.creditos });
    }
    if (usuario.creditos < costoCreditos) {
      return NextResponse.json({ error: 'No tienes suficientes créditos' }, { status: 400 });
    }
    let nuevasNeuronas = Math.min(usuario.maxNeuronas, usuario.neuronas + cantidadNeuronas);
    let nuevosCreditos = usuario.creditos - costoCreditos;
    await prisma.usuario.update({
      where: { id: userId },
      data: { neuronas: nuevasNeuronas, creditos: nuevosCreditos },
    });
    return NextResponse.json({ neuronas: nuevasNeuronas, creditos: nuevosCreditos });
  } catch (error) {
    return NextResponse.json({ error: 'Error al recargar neuronas', details: error }, { status: 500 });
  }
}
