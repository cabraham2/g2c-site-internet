import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'

const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier le token JWT
    const authHeader = request.headers.get('authorization')
    const cookieToken = request.cookies.get('token')?.value
    const token = authHeader?.replace('Bearer ', '') || cookieToken

    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 })
    }

    const { action, promotionId } = await request.json()
    const userId = params.id

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
    }

    // Vérifier que l'utilisateur existe et est en attente
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    if (user.status !== 'PENDING') {
      return NextResponse.json({ error: 'Utilisateur déjà traité' }, { status: 400 })
    }

    // Validation pour les étudiants : promotion requise
    if (action === 'approve' && user.role === 'STUDENT' && !promotionId) {
      return NextResponse.json({ error: 'Promotion requise pour les étudiants' }, { status: 400 })
    }

    // Mettre à jour le statut de l'utilisateur
    const updateData: any = {
      status: action === 'approve' ? 'APPROVED' : 'REJECTED',
      validatedBy: payload.userId as string,
      validatedAt: new Date()
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    })

    // Si approuvé et qu'une promotion est spécifiée, créer la relation
    if (action === 'approve' && promotionId) {
      await prisma.userPromotion.create({
        data: {
          userId: userId,
          promotionId: promotionId
        }
      })
    }

    return NextResponse.json({ 
      message: `Utilisateur ${action === 'approve' ? 'validé' : 'rejeté'} avec succès`,
      user: updatedUser
    })

  } catch (error) {
    console.error('Erreur lors de la validation:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
