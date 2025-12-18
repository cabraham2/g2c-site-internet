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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users, 
  Plus, 
  GraduationCap,
  UserPlus,
  AlertCircle,
  X
} from 'lucide-react'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
}

interface Class {
  id: string
  name: string
  code: string
  level: string
  year: string
}

interface Enrollment {
  id: string
  user: User
  class: Class
}

export default function AdminEnrollmentsPage() {
  const [students, setStudents] = useState<User[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedClass, setSelectedClass] = useState('')

  const fetchData = async () => {
    try {
      const [studentsRes, classesRes, enrollmentsRes] = await Promise.all([
        fetch('/api/admin/students'),
        fetch('/api/admin/classes'),
        fetch('/api/admin/enrollments')
      ])

      if (studentsRes.ok && classesRes.ok && enrollmentsRes.ok) {
        const [studentsData, classesData, enrollmentsData] = await Promise.all([
          studentsRes.json(),
          classesRes.json(),
          enrollmentsRes.json()
        ])
        
        setStudents(studentsData.students)
        setClasses(classesData.classes)
        setEnrollments(enrollmentsData.enrollments)
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

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedStudent || !selectedClass) {
      setError('Veuillez sélectionner un étudiant et une classe')
      return
    }

    try {
      const response = await fetch('/api/admin/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent,
          classId: selectedClass
        })
      })

      if (response.ok) {
        await fetchData()
        setIsDialogOpen(false)
        setSelectedStudent('')
        setSelectedClass('')
        setError('')
      } else {
        const data = await response.json()
        setError(data.message || 'Erreur lors de l\'inscription')
      }
    } catch (error) {
      setError('Erreur de connexion')
    }
  }

  const handleUnenrollStudent = async (enrollmentId: string) => {
    try {
      const response = await fetch(`/api/admin/enrollments/${enrollmentId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchData()
      } else {
        const data = await response.json()
        setError(data.message || 'Erreur lors de la désinscription')
      }
    } catch (error) {
      setError('Erreur de connexion')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary">En attente</Badge>
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800">Validé</Badge>
      case 'REJECTED':
        return <Badge variant="destructive">Rejeté</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAvailableStudents = () => {
    const enrolledStudentIds = enrollments.map(e => e.user.id)
    return students.filter(student => 
      student.status === 'APPROVED' && 
      !enrolledStudentIds.includes(student.id)
    )
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inscription aux Classes</h1>
          <p className="text-gray-600 mt-2">
            Gérez les inscriptions des étudiants validés aux différentes classes
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Inscrire un étudiant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleEnrollStudent}>
              <DialogHeader>
                <DialogTitle>Inscrire un étudiant à une classe</DialogTitle>
                <DialogDescription>
                  Sélectionnez un étudiant validé et une classe.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Étudiant</label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un étudiant" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableStudents().map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.firstName} {student.lastName} ({student.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Classe</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
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
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">Inscrire</Button>
              </div>
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

      <div className="grid gap-6">
        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Étudiants validés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {students.filter(s => s.status === 'APPROVED').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Classes créées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Inscriptions actives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrollments.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des inscriptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Inscriptions aux classes</span>
            </CardTitle>
            <CardDescription>
              Liste des étudiants inscrits aux différentes classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {enrollments.length === 0 ? (
              <div className="text-center py-8">
                <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune inscription
                </h3>
                <p className="text-gray-600">
                  Commencez par inscrire des étudiants aux classes.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Étudiant</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Année</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {enrollment.user.firstName[0]}{enrollment.user.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {enrollment.user.firstName} {enrollment.user.lastName}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{enrollment.user.email}</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(enrollment.user.status)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{enrollment.class.name}</p>
                          <p className="text-sm text-gray-600">{enrollment.class.code}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{enrollment.class.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{enrollment.class.year}</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          onClick={() => handleUnenrollStudent(enrollment.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Désinscrire
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
    </div>
  )
}
