import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
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

    // Vérifier les permissions admin
    if (userPayload.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Accès interdit' }, { status: 403 })
    }

    // Récupérer tous les utilisateurs
    const users = await prisma.user.findMany({
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
        validatedAt: true,
        validatedBy: true
      },
      orderBy: [
        { status: 'asc' }, // PENDING en premier
        { createdAt: 'desc' }
      ]
    })

    // Statistiques
    const stats = {
      total: users.length,
      pending: users.filter(u => u.status === 'PENDING').length,
      approved: users.filter(u => u.status === 'APPROVED').length,
      rejected: users.filter(u => u.status === 'REJECTED').length,
      suspended: users.filter(u => u.status === 'SUSPENDED').length,
      admins: users.filter(u => u.role === 'ADMIN').length,
      teachers: users.filter(u => u.role === 'TEACHER').length,
      students: users.filter(u => u.role === 'STUDENT').length,
      alumni: users.filter(u => u.role === 'ALUMNI').length
    }

    return NextResponse.json({ 
      users,
      stats,
      message: 'Utilisateurs récupérés avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
