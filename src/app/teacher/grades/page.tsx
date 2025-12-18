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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BookOpen, 
  Plus, 
  FileText,
  Edit,
  AlertCircle,
  TrendingUp
} from 'lucide-react'

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface Subject {
  id: string
  name: string
  code: string
  coefficient: number
}

interface Class {
  id: string
  name: string
  code: string
  level: string
}

interface Grade {
  id: string
  value: number
  maxValue: number
  weight: number
  type: string
  title: string
  description?: string
  student: Student
  subject: Subject
  createdAt: string
}

interface NewGrade {
  studentId: string
  subjectId: string
  classId: string
  value: string
  maxValue: string
  weight: string
  type: string
  title: string
  description: string
}

export default function TeacherGradesPage() {
  const [grades, setGrades] = useState<Grade[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('')
  const [newGrade, setNewGrade] = useState<NewGrade>({
    studentId: '',
    subjectId: '',
    classId: '',
    value: '',
    maxValue: '20',
    weight: '1',
    type: 'HOMEWORK',
    title: '',
    description: ''
  })

  const fetchData = async () => {
    try {
      const [gradesRes, studentsRes, subjectsRes, classesRes] = await Promise.all([
        fetch('/api/teacher/grades'),
        fetch('/api/teacher/students'),
        fetch('/api/teacher/subjects'),
        fetch('/api/teacher/classes')
      ])

      if (gradesRes.ok && studentsRes.ok && subjectsRes.ok && classesRes.ok) {
        const [gradesData, studentsData, subjectsData, classesData] = await Promise.all([
          gradesRes.json(),
          studentsRes.json(),
          subjectsRes.json(),
          classesRes.json()
        ])
        
        setGrades(gradesData.grades)
        setStudents(studentsData.students)
        setSubjects(subjectsData.subjects)
        setClasses(classesData.classes)
      } else {
        setError('Erreur lors du chargement des données')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newGrade.studentId || !newGrade.subjectId || !newGrade.value || !newGrade.title) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }

    if (parseFloat(newGrade.value) > parseFloat(newGrade.maxValue)) {
      setError('La note ne peut pas être supérieure à la note maximale')
      return
    }

    try {
      const response = await fetch('/api/teacher/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newGrade,
          value: parseFloat(newGrade.value),
          maxValue: parseFloat(newGrade.maxValue),
          weight: parseFloat(newGrade.weight)
        })
      })

      if (response.ok) {
        await fetchData()
        setIsDialogOpen(false)
        setNewGrade({
          studentId: '',
          subjectId: '',
          classId: '',
          value: '',
          maxValue: '20',
          weight: '1',
          type: 'HOMEWORK',
          title: '',
          description: ''
        })
        setError('')
      } else {
        const data = await response.json()
        setError(data.message || 'Erreur lors de la création de la note')
      }
    } catch (error) {
      setError('Erreur de connexion')
    }
  }

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

  const filteredStudents = selectedClass 
    ? students.filter(student => 
        grades.some(grade => 
          grade.student.id === student.id && 
          newGrade.classId === selectedClass
        )
      )
    : students

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Notes</h1>
          <p className="text-gray-600 mt-2">
            Attribuez et gérez les notes de vos étudiants
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleCreateGrade}>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle note</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour attribuer une note à un étudiant.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class">Classe *</Label>
                    <Select value={newGrade.classId} onValueChange={(value) => setNewGrade({...newGrade, classId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((classe) => (
                          <SelectItem key={classe.id} value={classe.id}>
                            {classe.name} ({classe.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Matière *</Label>
                    <Select value={newGrade.subjectId} onValueChange={(value) => setNewGrade({...newGrade, subjectId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une matière" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name} (Coef. {subject.coefficient})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="student">Étudiant *</Label>
                  <Select value={newGrade.studentId} onValueChange={(value) => setNewGrade({...newGrade, studentId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un étudiant" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.firstName} {student.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Titre de l'évaluation *</Label>
                  <Input
                    id="title"
                    value={newGrade.title}
                    onChange={(e) => setNewGrade({...newGrade, title: e.target.value})}
                    placeholder="ex: Contrôle continu #1"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="value">Note *</Label>
                    <Input
                      id="value"
                      type="number"
                      step="0.1"
                      min="0"
                      value={newGrade.value}
                      onChange={(e) => setNewGrade({...newGrade, value: e.target.value})}
                      placeholder="15.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxValue">Sur</Label>
                    <Input
                      id="maxValue"
                      type="number"
                      step="0.1"
                      min="1"
                      value={newGrade.maxValue}
                      onChange={(e) => setNewGrade({...newGrade, maxValue: e.target.value})}
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Coefficient</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={newGrade.weight}
                      onChange={(e) => setNewGrade({...newGrade, weight: e.target.value})}
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newGrade.type} onValueChange={(value) => setNewGrade({...newGrade, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HOMEWORK">Devoir</SelectItem>
                        <SelectItem value="EXAM">Examen</SelectItem>
                        <SelectItem value="PROJECT">Projet</SelectItem>
                        <SelectItem value="PRESENTATION">Présentation</SelectItem>
                        <SelectItem value="PARTICIPATION">Participation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Commentaire</Label>
                  <Textarea
                    id="description"
                    value={newGrade.description}
                    onChange={(e) => setNewGrade({...newGrade, description: e.target.value})}
                    placeholder="Commentaire sur la performance de l'étudiant..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Attribuer la note</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Notes attribuées</span>
          </CardTitle>
          <CardDescription>
            {grades.length} note(s) attribuée(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {grades.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune note attribuée
              </h3>
              <p className="text-gray-600">
                Commencez par attribuer des notes à vos étudiants.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Étudiant</TableHead>
                  <TableHead>Matière</TableHead>
                  <TableHead>Évaluation</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Coef.</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {grade.student.firstName[0]}{grade.student.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {grade.student.firstName} {grade.student.lastName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{grade.subject.name}</p>
                        <p className="text-sm text-gray-600">{grade.subject.code}</p>
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
                      <span className={`text-lg font-bold ${getGradeColor(grade.value, grade.maxValue)}`}>
                        {grade.value}/{grade.maxValue}
                      </span>
                      <div className="text-xs text-gray-500">
                        {((grade.value / grade.maxValue) * 100).toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getTypeLabel(grade.type)}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{grade.weight}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {new Date(grade.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
