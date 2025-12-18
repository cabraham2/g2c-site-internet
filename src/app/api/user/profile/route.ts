import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function PUT(request: NextRequest) {
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

    const { firstName, lastName, email, phone, company, position, linkedin } = await request.json()

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email && email !== payload.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser && existingUser.id !== payload.userId) {
        return NextResponse.json(
          { error: 'Cet email est déjà utilisé par un autre compte' },
          { status: 400 }
        )
      }
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        position,
        linkedin
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        company: true,
        position: true,
        linkedin: true,
        createdAt: true
      }
    })

    return NextResponse.json({ user: updatedUser })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
