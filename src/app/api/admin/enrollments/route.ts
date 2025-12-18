import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification et les permissions
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || !['ADMIN', 'TEACHER'].includes(payload.role)) {
      return NextResponse.json({ message: 'Accès non autorisé' }, { status: 403 })
    }

    // Récupérer toutes les inscriptions avec les détails
    const enrollments = await prisma.classEnrollment.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            status: true
          }
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
            level: true,
            year: true
          }
        }
      },
      orderBy: [
        { class: { name: 'asc' } },
        { user: { lastName: 'asc' } }
      ]
    })

    return NextResponse.json({ enrollments })

  } catch (error) {
    console.error('Erreur lors de la récupération des inscriptions:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    const { studentId, classId } = await request.json()

    // Validation des champs requis
    if (!studentId || !classId) {
      return NextResponse.json(
        { message: 'L\'ID de l\'étudiant et de la classe sont requis' },
        { status: 400 }
      )
    }

    // Vérifier que l'étudiant existe et est validé
    const student = await prisma.user.findUnique({
      where: { id: studentId }
    })

    if (!student || student.role !== 'STUDENT' || student.status !== 'APPROVED') {
      return NextResponse.json(
        { message: 'Étudiant non trouvé ou non validé' },
        { status: 404 }
      )
    }

    // Vérifier que la classe existe
    const classExists = await prisma.class.findUnique({
      where: { id: classId }
    })

    if (!classExists) {
      return NextResponse.json(
        { message: 'Classe non trouvée' },
        { status: 404 }
      )
    }

    // Vérifier que l'inscription n'existe pas déjà
    const existingEnrollment = await prisma.classEnrollment.findUnique({
      where: {
        userId_classId: {
          userId: studentId,
          classId: classId
        }
      }
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { message: 'L\'étudiant est déjà inscrit à cette classe' },
        { status: 409 }
      )
    }

    // Créer l'inscription
    const enrollment = await prisma.classEnrollment.create({
      data: {
        userId: studentId,
        classId: classId
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            status: true
          }
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
            level: true,
            year: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Étudiant inscrit avec succès',
      enrollment
    }, { status: 201 })

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
