import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
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

    const { userIds, action, promotion } = await request.json()

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: 'Liste des utilisateurs requise' }, { status: 400 })
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
    }

    // Préparer les données de mise à jour
    const updateData: any = {
      status: action === 'approve' ? 'APPROVED' : 'REJECTED',
      validatedBy: payload.userId,
      validatedAt: new Date()
    }

    // Si on approuve et qu'une promotion est fournie, l'ajouter
    if (action === 'approve' && promotion) {
      updateData.promotion = promotion
    }

    // Mettre à jour tous les utilisateurs sélectionnés
    const updatedUsers = await prisma.user.updateMany({
      where: {
        id: {
          in: userIds
        },
        status: 'PENDING' // Seulement les utilisateurs en attente
      },
      data: updateData
    })

    return NextResponse.json({ 
      message: `${updatedUsers.count} utilisateur(s) ${action === 'approve' ? 'validé(s)' : 'rejeté(s)'}`,
      count: updatedUsers.count
    })

  } catch (error) {
    console.error('Erreur lors de la validation en lot:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
