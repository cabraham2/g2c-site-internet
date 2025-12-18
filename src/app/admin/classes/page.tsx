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
  GraduationCap, 
  Plus, 
  Users, 
  BookOpen,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react'

interface Class {
  id: string
  name: string
  description?: string
  teacherId: string
  teacher: {
    firstName: string
    lastName: string
  }
  studentsCount: number
  status: 'ACTIVE' | 'PLANNING' | 'COMPLETED'
  startDate: string
  endDate: string
}

interface NewClass {
  name: string
  code: string
  description: string
  level: string
  year: string
}

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newClass, setNewClass] = useState<NewClass>({
    name: '',
    code: '',
    description: '',
    level: '',
    year: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1)
  })

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/classes')
      
      if (response.ok) {
        const data = await response.json()
        setClasses(data.classes || [])
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erreur lors du chargement des classes')
      }
    } catch (err) {
      console.error('Erreur:', err)
      setError('Impossible de charger les classes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newClass.name || !newClass.code || !newClass.level) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }

    try {
      const response = await fetch('/api/admin/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClass)
      })

      if (response.ok) {
        await fetchClasses()
        setIsDialogOpen(false)
        setNewClass({
          name: '',
          code: '',
          description: '',
          level: '',
          year: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1)
        })
        setError('')
      } else {
        const data = await response.json()
        setError(data.message || 'Erreur lors de la création')
      }
    } catch (error) {
      setError('Erreur de connexion')
    }
  }

    const getLevelBadge = (level: string) => {
    const levelColors = {
      'L1': 'bg-blue-100 text-blue-800',
      'L2': 'bg-green-100 text-green-800', 
      'L3': 'bg-yellow-100 text-yellow-800',
      'M1': 'bg-purple-100 text-purple-800',
      'M2': 'bg-red-100 text-red-800'
    }

    return (
      <Badge className={levelColors[level as keyof typeof levelColors] || 'bg-gray-100 text-gray-800'}>
        {level}
      </Badge>
    )
  }

  const getStatusBadge = (status: 'ACTIVE' | 'PLANNING' | 'COMPLETED') => {
    const statusConfig = {
      'ACTIVE': { color: 'bg-green-100 text-green-800', text: 'Actif' },
      'PLANNING': { color: 'bg-yellow-100 text-yellow-800', text: 'Planifié' },
      'COMPLETED': { color: 'bg-gray-100 text-gray-800', text: 'Terminé' }
    }

    const config = statusConfig[status]
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Classes</h1>
          <p className="text-gray-600 mt-2">
            Créez et gérez les classes du Master G2C
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Classe
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleCreateClass}>
              <DialogHeader>
                <DialogTitle>Créer une nouvelle classe</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour créer une nouvelle classe.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom *
                  </Label>
                  <Input
                    id="name"
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                    className="col-span-3"
                    placeholder="ex: Master G2C - Promotion 2025"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Code *
                  </Label>
                  <Input
                    id="code"
                    value={newClass.code}
                    onChange={(e) => setNewClass({...newClass, code: e.target.value})}
                    className="col-span-3"
                    placeholder="ex: M2G2C-2025"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="level" className="text-right">
                    Niveau *
                  </Label>
                  <Select value={newClass.level} onValueChange={(value) => setNewClass({...newClass, level: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L3">Licence 3</SelectItem>
                      <SelectItem value="M1">Master 1</SelectItem>
                      <SelectItem value="M2">Master 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="year" className="text-right">
                    Année
                  </Label>
                  <Input
                    id="year"
                    value={newClass.year}
                    onChange={(e) => setNewClass({...newClass, year: e.target.value})}
                    className="col-span-3"
                    placeholder="2024-2025"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newClass.description}
                    onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                    className="col-span-3"
                    placeholder="Description de la classe..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Créer la classe</Button>
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
            <GraduationCap className="w-5 h-5" />
            <span>Classes existantes</span>
          </CardTitle>
          <CardDescription>
            {classes.length} classe(s) créée(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {classes.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune classe créée
              </h3>
              <p className="text-gray-600">
                Commencez par créer votre première classe.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Classe</TableHead>
                  <TableHead>Professeur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Étudiants</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classe) => (
                  <TableRow key={classe.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{classe.name}</p>
                        {classe.description && (
                          <p className="text-sm text-gray-600">{classe.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {classe.teacher.firstName} {classe.teacher.lastName}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(classe.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{classe.studentsCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        <div>{new Date(classe.startDate).toLocaleDateString('fr-FR')}</div>
                        <div>au {new Date(classe.endDate).toLocaleDateString('fr-FR')}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Modifier
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
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
