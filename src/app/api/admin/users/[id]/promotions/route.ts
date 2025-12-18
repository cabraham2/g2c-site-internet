import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const userId = params.id

    // Récupérer l'utilisateur avec ses promotions actuelles
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        promotion: true // ancien système pour compatibilité
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    // Pour l'instant, retourner les promotions de l'ancien système
    const promotions = user.promotion ? [user.promotion] : []

    return NextResponse.json({ 
      user,
      promotions
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des promotions utilisateur:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const userId = params.id
    const { promotions, action } = await request.json()

    if (!promotions || !Array.isArray(promotions)) {
      return NextResponse.json(
        { error: 'Liste de promotions requise' },
        { status: 400 }
      )
    }

    // Pour l'instant, ne gérer qu'une seule promotion (compatibilité)
    const mainPromotion = promotions[0] || null

    await prisma.user.update({
      where: { id: userId },
      data: { promotion: mainPromotion }
    })

    return NextResponse.json({ 
      message: 'Promotions mises à jour avec succès',
      promotions: mainPromotion ? [mainPromotion] : []
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour des promotions:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const userId = params.id
    const { promotion } = await request.json()

    // Retirer la promotion de l'utilisateur
    await prisma.user.update({
      where: { id: userId },
      data: { promotion: null }
    })

    return NextResponse.json({ 
      message: 'Promotion retirée avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la suppression de la promotion:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
