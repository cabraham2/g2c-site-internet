import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ message: 'Token manquant' }, { status: 401 })
    }

    // Vérifier et décoder le token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    const userPayload = payload as any

    // Vérifier les permissions admin ou teacher
    if (!['ADMIN', 'TEACHER'].includes(userPayload.role)) {
      return NextResponse.json({ message: 'Accès interdit' }, { status: 403 })
    }

    const { status } = await request.json()

    // Valider le statut
    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: 'Statut invalide' }, { status: 400 })
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        status,
        validatedBy: status === 'APPROVED' ? userPayload.userId : null,
        validatedAt: status === 'APPROVED' ? new Date() : null
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        promotion: true,
        company: true,
        position: true,
        createdAt: true,
        validatedAt: true
      }
    })

    return NextResponse.json({
      user: updatedUser,
      message: `Utilisateur ${status.toLowerCase()} avec succès`
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
