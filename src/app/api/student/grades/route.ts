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
    
    // Vérifier que l'utilisateur est un étudiant approuvé
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        enrollments: {
          include: {
            class: {
              include: {
                subjects: true
              }
            }
          }
        }
      }
    })

    if (!user || user.role !== 'STUDENT' || user.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    // Récupérer les notes actuelles (semestre en cours)
    const currentGrades = await prisma.grade.findMany({
      where: {
        studentId: user.id
      },
      include: {
        subject: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limiter aux 50 dernières notes
    })

    // Récupérer les bulletins de notes existants
    const reports = await prisma.report.findMany({
      where: {
        studentId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Pour chaque bulletin, récupérer les notes correspondantes
    const formattedReportCards = await Promise.all(
      reports.map(async (report: any) => {
        const grades = await prisma.grade.findMany({
          where: {
            studentId: user.id,
            createdAt: {
              gte: new Date(`${report.year}-01-01`),
              lt: new Date(`${parseInt(report.year) + 1}-01-01`)
            }
          },
          include: {
            subject: true
          }
        })

        // Grouper les notes par matière
        const subjectGroups = grades.reduce((acc: any, grade: any) => {
          const subjectId = grade.subject.id
          if (!acc[subjectId]) {
            acc[subjectId] = {
              subject: grade.subject,
              grades: []
            }
          }
          acc[subjectId].grades.push(grade)
          return acc
        }, {} as Record<string, { subject: any, grades: any[] }>)

        // Calculer les moyennes par matière
        const subjects = Object.values(subjectGroups).map((group: any) => {
          const totalWeight = group.grades.reduce((sum: number, grade: any) => sum + grade.weight, 0)
          const weightedSum = group.grades.reduce((sum: number, grade: any) => {
            return sum + ((grade.value / grade.maxValue) * 20 * grade.weight)
          }, 0)
          
          const average = totalWeight > 0 ? weightedSum / totalWeight : 0
          
          return {
            subject: group.subject,
            grades: group.grades,
            average,
            weightedAverage: average * group.subject.coefficient
          }
        })

        // Calculer la moyenne générale
        const totalCoefficient = subjects.reduce((sum: number, s: any) => sum + s.subject.coefficient, 0)
        const weightedSum = subjects.reduce((sum: number, s: any) => sum + s.weightedAverage, 0)
        const generalAverage = totalCoefficient > 0 ? weightedSum / totalCoefficient : 0

        return {
          id: report.id,
          semester: report.semester,
          year: report.year,
          average: report.average || generalAverage,
          rank: report.rank,
          totalStudents: report.totalStudents,
          subjects,
          appreciation: report.appreciation,
          createdAt: report.createdAt
        }
      })
    )

    return NextResponse.json({
      currentGrades,
      reportCards: formattedReportCards
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des notes:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
