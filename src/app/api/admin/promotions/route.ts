import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
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

    // Promotions simplifiées : 1 an chacune + promotions spéciales
    const defaultPromotions = [
      { id: '1', name: '2025 M1', year: '2025', level: 'M1', isActive: true, description: 'Master 1ère année 2025' },
      { id: '2', name: '2025 M2', year: '2025', level: 'M2', isActive: true, description: 'Master 2ème année 2025' },
      { id: '3', name: '2024 M1', year: '2024', level: 'M1', isActive: true, description: 'Master 1ère année 2024' },
      { id: '4', name: '2024 M2', year: '2024', level: 'M2', isActive: true, description: 'Master 2ème année 2024' },
      { id: '5', name: '2023 M1', year: '2023', level: 'M1', isActive: false, description: 'Master 1ère année 2023 (terminée)' },
      { id: '6', name: '2023 M2', year: '2023', level: 'M2', isActive: false, description: 'Master 2ème année 2023 (terminée)' },
      { id: '7', name: 'Alumni', year: '', level: 'Alumni', isActive: true, description: 'Anciens diplômés' },
      { id: '8', name: 'Drop-out', year: '', level: 'Drop-out', isActive: true, description: 'Étudiants ayant abandonné' },
      { id: '9', name: 'Césure', year: '', level: 'Césure', isActive: true, description: 'Étudiants en année de césure' }
    ]

    // Compter les utilisateurs pour chaque promotion
    const promotionsWithCounts = await Promise.all(
      defaultPromotions.map(async (promo) => {
        const userCount = await prisma.user.count({
          where: { promotion: promo.name }
        })
        return {
          ...promo,
          _count: { users: userCount }
        }
      })
    )

    return NextResponse.json({ promotions: promotionsWithCounts })

  } catch (error) {
    console.error('Erreur lors de la récupération des promotions:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

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

    const { name, year, level, description } = await request.json()

    if (!name || !level) {
      return NextResponse.json(
        { error: 'Le nom et le niveau sont requis' },
        { status: 400 }
      )
    }

    // Pour l'instant, simuler la création
    const promotion = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      year: year || '',
      level,
      description,
      isActive: true,
      createdAt: new Date().toISOString(),
      _count: { users: 0 }
    }

    return NextResponse.json({ 
      promotion,
      message: 'Promotion créée avec succès (simulation)' 
    })

  } catch (error) {
    console.error('Erreur lors de la création de la promotion:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
