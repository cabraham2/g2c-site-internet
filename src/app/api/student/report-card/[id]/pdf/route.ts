import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    // Vérifier que l'utilisateur est un étudiant approuvé
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || user.role !== 'STUDENT' || user.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    // Récupérer le bulletin de notes
    const reportCard = await prisma.report.findFirst({
      where: {
        id: params.id,
        studentId: user.id
      },
      include: {
        student: true
      }
    })

    if (!reportCard) {
      return NextResponse.json({ error: 'Bulletin non trouvé' }, { status: 404 })
    }

    // Récupérer les notes pour ce bulletin
    const grades = await prisma.grade.findMany({
      where: {
        studentId: user.id,
        createdAt: {
          gte: new Date(`${reportCard.year}-01-01`),
          lt: new Date(`${parseInt(reportCard.year) + 1}-01-01`)
        }
      },
      include: {
        subject: true
      }
    })

    // Générer le PDF (simplifié - ici on retourne du HTML qui pourrait être converti en PDF)
    const htmlContent = generateReportCardHTML(reportCard, grades)

    // Pour l'instant, on retourne le HTML
    // Dans un vrai système, on utiliserait une librairie comme puppeteer ou jsPDF
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="bulletin-${reportCard.id}.html"`
      }
    })

  } catch (error) {
    console.error('Erreur lors de la génération du bulletin:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

function generateReportCardHTML(reportCard: any, grades: any[]): string {
  // Calculer les moyennes
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
  }, {})

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

  const totalCoefficient = subjects.reduce((sum: number, s: any) => sum + s.subject.coefficient, 0)
  const weightedSum = subjects.reduce((sum: number, s: any) => sum + s.weightedAverage, 0)
  const generalAverage = totalCoefficient > 0 ? weightedSum / totalCoefficient : 0

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bulletin de Notes</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                color: #333;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #2563eb;
                padding-bottom: 20px;
            }
            .school-info {
                font-size: 18px;
                font-weight: bold;
                color: #2563eb;
            }
            .student-info {
                display: flex;
                justify-content: space-between;
                margin: 20px 0;
                background: #f8fafc;
                padding: 15px;
                border-radius: 8px;
            }
            .grades-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .grades-table th,
            .grades-table td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
            }
            .grades-table th {
                background-color: #2563eb;
                color: white;
                font-weight: bold;
            }
            .grades-table tr:nth-child(even) {
                background-color: #f8fafc;
            }
            .summary {
                display: flex;
                justify-content: space-around;
                margin: 30px 0;
                text-align: center;
            }
            .summary-item {
                background: #eff6ff;
                padding: 20px;
                border-radius: 8px;
                border: 2px solid #2563eb;
            }
            .summary-value {
                font-size: 24px;
                font-weight: bold;
                color: #2563eb;
            }
            .appreciation {
                margin: 20px 0;
                padding: 15px;
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                border-radius: 4px;
            }
            .footer {
                margin-top: 40px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
            @media print {
                body { margin: 0; }
                .header { page-break-inside: avoid; }
                .grades-table { page-break-inside: avoid; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="school-info">École Supérieure - G2C</div>
            <h1>Bulletin de Notes</h1>
            <p>Semestre ${reportCard.semester} - Année ${reportCard.year}</p>
        </div>

        <div class="student-info">
            <div>
                <strong>Étudiant:</strong> ${reportCard.student.firstName} ${reportCard.student.lastName}<br>
                <strong>Email:</strong> ${reportCard.student.email}
            </div>
            <div>
                <strong>Classe:</strong> Non assigné<br>
                <strong>Date d'édition:</strong> ${new Date(reportCard.createdAt).toLocaleDateString('fr-FR')}
            </div>
        </div>

        <table class="grades-table">
            <thead>
                <tr>
                    <th>Matière</th>
                    <th>Nombre de notes</th>
                    <th>Moyenne</th>
                    <th>Coefficient</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                ${subjects.map((subject: any) => `
                    <tr>
                        <td><strong>${subject.subject.name}</strong><br><small>${subject.subject.code}</small></td>
                        <td>${subject.grades.length}</td>
                        <td><strong>${subject.average.toFixed(2)}/20</strong></td>
                        <td>${subject.subject.coefficient}</td>
                        <td>${subject.weightedAverage.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="summary">
            <div class="summary-item">
                <div>Moyenne Générale</div>
                <div class="summary-value">${generalAverage.toFixed(2)}/20</div>
            </div>
            ${reportCard.rank && reportCard.totalStudents ? `
                <div class="summary-item">
                    <div>Classement</div>
                    <div class="summary-value">${reportCard.rank}°/${reportCard.totalStudents}</div>
                </div>
            ` : ''}
        </div>

        ${reportCard.appreciation ? `
            <div class="appreciation">
                <h3>Appréciation générale</h3>
                <p>${reportCard.appreciation}</p>
            </div>
        ` : ''}

        <div class="footer">
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            <p>École Supérieure G2C - Système de gestion académique</p>
        </div>
    </body>
    </html>
  `
}
