import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    // Vérifier que l'utilisateur est un enseignant
    const teacher = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!teacher || teacher.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    const { studentId, subjectId, classId, value, maxValue, weight, type, title, description } = await request.json()

    // Vérifier que l'enseignant a le droit de noter cette matière
    const teacherSubject = await prisma.teacherSubject.findFirst({
      where: {
        teacherId: teacher.id,
        subjectId,
        classId
      }
    })

    if (!teacherSubject) {
      return NextResponse.json({ error: 'Vous n\'êtes pas autorisé à noter cette matière dans cette classe' }, { status: 403 })
    }

    // Vérifier que l'étudiant est inscrit dans cette classe
    const enrollment = await prisma.classEnrollment.findFirst({
      where: {
        userId: studentId,
        classId
      }
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'L\'étudiant n\'est pas inscrit dans cette classe' }, { status: 400 })
    }

    // Créer la note
    const grade = await prisma.grade.create({
      data: {
        studentId,
        teacherId: teacher.id,
        subjectId,
        classId,
        value: parseFloat(value),
        maxValue: parseFloat(maxValue),
        weight: parseFloat(weight),
        type,
        title,
        description
      },
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        subject: true
      }
    })

    return NextResponse.json(grade)

  } catch (error) {
    console.error('Erreur lors de la création de la note:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    // Vérifier que l'utilisateur est un enseignant
    const teacher = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!teacher || teacher.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    const url = new URL(request.url)
    const classId = url.searchParams.get('classId')
    const subjectId = url.searchParams.get('subjectId')

    let whereClause: any = {
      teacherId: teacher.id
    }

    if (classId) {
      whereClause.classId = classId
    }

    if (subjectId) {
      whereClause.subjectId = subjectId
    }

    // Récupérer les notes créées par cet enseignant
    const grades = await prisma.grade.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        subject: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(grades)

  } catch (error) {
    console.error('Erreur lors de la récupération des notes:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
