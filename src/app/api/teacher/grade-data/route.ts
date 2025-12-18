import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

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

    // Récupérer les matières et classes assignées à cet enseignant
    const teacherSubjects = await prisma.teacherSubject.findMany({
      where: {
        teacherId: teacher.id
      },
      include: {
        subject: true,
        class: {
          include: {
            enrollments: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                  }
                }
              },
              where: {
                user: {
                  role: 'STUDENT',
                  status: 'APPROVED'
                }
              }
            }
          }
        }
      }
    })

    // Organiser les données pour le frontend
    const data = {
      classes: [] as any[],
      subjects: [] as any[],
      students: [] as any[]
    }

    // Extraire toutes les classes uniques
    const classMap = new Map()
    teacherSubjects.forEach(ts => {
      if (!classMap.has(ts.class.id)) {
        classMap.set(ts.class.id, {
          id: ts.class.id,
          name: ts.class.name,
          code: ts.class.code,
          level: ts.class.level,
          students: ts.class.enrollments.map(e => e.user).filter(user => user)
        })
      }
    })
    data.classes = Array.from(classMap.values())

    // Extraire toutes les matières uniques
    const subjectMap = new Map()
    teacherSubjects.forEach(ts => {
      if (!subjectMap.has(ts.subject.id)) {
        subjectMap.set(ts.subject.id, ts.subject)
      }
    })
    data.subjects = Array.from(subjectMap.values())

    // Extraire tous les étudiants uniques
    const studentMap = new Map()
    teacherSubjects.forEach(ts => {
      ts.class.enrollments.forEach(enrollment => {
        if (enrollment.user && !studentMap.has(enrollment.user.id)) {
          studentMap.set(enrollment.user.id, enrollment.user)
        }
      })
    })
    data.students = Array.from(studentMap.values())

    return NextResponse.json(data)

  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
