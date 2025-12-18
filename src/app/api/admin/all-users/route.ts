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

    // Récupérer tous les utilisateurs avec filtre optionnel
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const role = searchParams.get('role')

    const whereClause: any = {}
    if (status && status !== 'ALL') {
      whereClause.status = status
    }
    if (role && role !== 'ALL') {
      whereClause.role = role
    }

    const users = await prisma.user.findMany({
      where: whereClause,
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
        { status: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    // Statistiques
    const stats = {
      total: await prisma.user.count(),
      pending: await prisma.user.count({ where: { status: 'PENDING' } }),
      approved: await prisma.user.count({ where: { status: 'APPROVED' } }),
      rejected: await prisma.user.count({ where: { status: 'REJECTED' } }),
      students: await prisma.user.count({ where: { role: 'STUDENT' } }),
      teachers: await prisma.user.count({ where: { role: 'TEACHER' } }),
      alumni: await prisma.user.count({ where: { role: 'ALUMNI' } })
    }

    return NextResponse.json({ users, stats })

  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
