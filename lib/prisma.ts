import { PrismaClient } from "@/lib/generated/prisma"

// Un solo cliente por proceso (en desarrollo el módulo se recarga y abriría conexiones de más).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
