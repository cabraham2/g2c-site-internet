import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 })
    }

    // Vérifier le token
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any
    if (!payload) {
      return NextResponse.json({ message: 'Token invalide' }, { status: 401 })
    }

    // Récupérer les informations de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        company: true,
        position: true,
        createdAt: true
      }
    })

    if (!user) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 })
    }

    return NextResponse.json({ user })

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
