'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  FileText, 
  Download, 
  TrendingUp,
  AlertCircle,
  GraduationCap,
  Calendar
} from 'lucide-react'

interface Grade {
  id: string
  value: number
  maxValue: number
  weight: number
  type: string
  title: string
  description?: string
  subject: {
    id: string
    name: string
    code: string
    coefficient: number
    color: string
  }
  createdAt: string
}

interface SubjectAverage {
  subject: {
    id: string
    name: string
    code: string
    coefficient: number
    color: string
  }
  grades: Grade[]
  average: number
  weightedAverage: number
}

interface ReportCard {
  id: string
  semester: string
  year: string
  average?: number
  rank?: number
  totalStudents?: number
  subjects: SubjectAverage[]
  appreciation?: string
  createdAt: string
}

export default function StudentGradesPage() {
  const [reportCards, setReportCards] = useState<ReportCard[]>([])
  const [currentGrades, setCurrentGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchGrades = async () => {
    try {
      const response = await fetch('/api/student/grades')
      if (response.ok) {
        const data = await response.json()
        setReportCards(data.reportCards)
        setCurrentGrades(data.currentGrades)
      } else {
        setError('Erreur lors du chargement des notes')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGrades()
  }, [])

  const getGradeColor = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getTypeLabel = (type: string) => {
    const types = {
      'HOMEWORK': 'Devoir',
      'EXAM': 'Examen',
      'PROJECT': 'Projet',
      'PRESENTATION': 'Présentation',
      'PARTICIPATION': 'Participation'
    }
    return types[type as keyof typeof types] || type
  }

  const downloadReportCard = async (reportCardId: string) => {
    try {
      const response = await fetch(`/api/student/report-card/${reportCardId}/pdf`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `bulletin-${reportCardId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        setError('Erreur lors du téléchargement du bulletin')
      }
    } catch (error) {
      setError('Erreur de connexion')
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mes Notes et Bulletins</h1>
        <p className="text-gray-600 mt-2">
          Consultez vos notes et téléchargez vos bulletins de notes
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Notes actuelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Notes du semestre en cours</span>
            </CardTitle>
            <CardDescription>
              Vos dernières notes attribuées
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentGrades.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune note disponible
                </h3>
                <p className="text-gray-600">
                  Vos notes apparaîtront ici une fois qu'elles auront été saisies par vos professeurs.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Matière</TableHead>
                    <TableHead>Évaluation</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Coefficient</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: grade.subject.color }}
                          />
                          <div>
                            <p className="font-medium">{grade.subject.name}</p>
                            <p className="text-sm text-gray-600">{grade.subject.code}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{grade.title}</p>
                          {grade.description && (
                            <p className="text-sm text-gray-600">{grade.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <span className={`text-lg font-bold ${getGradeColor(grade.value, grade.maxValue)}`}>
                            {grade.value}/{grade.maxValue}
                          </span>
                          <div className="text-xs text-gray-500">
                            {((grade.value / grade.maxValue) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getTypeLabel(grade.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <span className="text-sm">{grade.weight}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(grade.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Bulletins disponibles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Bulletins de notes</span>
            </CardTitle>
            <CardDescription>
              Téléchargez vos bulletins de notes par semestre
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reportCards.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun bulletin disponible
                </h3>
                <p className="text-gray-600">
                  Vos bulletins de notes seront générés à la fin de chaque semestre.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reportCards.map((reportCard) => (
                  <div key={reportCard.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Bulletin {reportCard.semester} - {reportCard.year}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Généré le {new Date(reportCard.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Button onClick={() => downloadReportCard(reportCard.id)}>
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger PDF
                      </Button>
                    </div>

                    {reportCard.average && (
                      <div className="flex items-center space-x-6 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {reportCard.average.toFixed(2)}/20
                          </div>
                          <div className="text-sm text-gray-600">Moyenne générale</div>
                        </div>
                        {reportCard.rank && reportCard.totalStudents && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {reportCard.rank}°/{reportCard.totalStudents}
                            </div>
                            <div className="text-sm text-gray-600">Classement</div>
                          </div>
                        )}
                      </div>
                    )}

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Matière</TableHead>
                          <TableHead>Moyenne</TableHead>
                          <TableHead>Coefficient</TableHead>
                          <TableHead>Nb. notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportCard.subjects.map((subjectAvg) => (
                          <TableRow key={subjectAvg.subject.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div 
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: subjectAvg.subject.color }}
                                />
                                <div>
                                  <p className="font-medium">{subjectAvg.subject.name}</p>
                                  <p className="text-sm text-gray-600">{subjectAvg.subject.code}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`text-lg font-bold ${getGradeColor(subjectAvg.average, 20)}`}>
                                {subjectAvg.average.toFixed(2)}/20
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{subjectAvg.subject.coefficient}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{subjectAvg.grades.length}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {reportCard.appreciation && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Appréciation générale</h4>
                        <p className="text-blue-800">{reportCard.appreciation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
