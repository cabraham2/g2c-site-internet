import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/auth'

const prisma = new PrismaClient()

export async function DELETE(
  request: NextRequest,
  { params }: { params: { enrollmentId: string } }
) {
  try {
    // Vérifier l'authentification et les permissions
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Accès non autorisé' }, { status: 403 })
    }

    const enrollmentId = params.enrollmentId

    // Vérifier que l'inscription existe
    const enrollment = await prisma.classEnrollment.findUnique({
      where: { id: enrollmentId }
    })

    if (!enrollment) {
      return NextResponse.json({ message: 'Inscription non trouvée' }, { status: 404 })
    }

    // Supprimer l'inscription
    await prisma.classEnrollment.delete({
      where: { id: enrollmentId }
    })

    return NextResponse.json({
      message: 'Étudiant désinscrit avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la désinscription:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
