import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification et les permissions
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || !['ADMIN', 'TEACHER'].includes(payload.role)) {
      return NextResponse.json({ message: 'Accès non autorisé' }, { status: 403 })
    }

    // Récupérer tous les étudiants validés
    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        status: 'APPROVED'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true
      },
      orderBy: [
        { lastName: 'asc' },
        { firstName: 'asc' }
      ]
    })

    return NextResponse.json({ students })

  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
