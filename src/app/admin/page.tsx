'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  Users, 
  BookOpen, 
  FileText, 
  Settings,
  UserPlus,
  Shield,
  Database,
  BarChart3,
  Calendar,
  Mail,
  Plus,
  Edit,
  Trash2,
  GraduationCap
} from 'lucide-react'

// Mock data pour l'administration
const stats = {
  totalUsers: 156,
  newUsersThisMonth: 12,
  totalCourses: 24,
  activeCourses: 8,
  totalDocuments: 342,
  documentsThisWeek: 15,
  totalProjects: 48,
  activeProjects: 16
}

const recentUsers = [
  { id: 1, name: 'Marie Dupont', email: 'marie.dupont@email.com', role: 'STUDENT', promotion: '2024-2026', joinedAt: '2024-09-10' },
  { id: 2, name: 'Thomas Laurent', email: 'thomas.laurent@email.com', role: 'ALUMNI', promotion: '2020-2022', joinedAt: '2024-09-08' },
  { id: 3, name: 'Sophie Bernard', email: 'sophie.bernard@email.com', role: 'TEACHER', promotion: null, joinedAt: '2024-09-05' },
  { id: 4, name: 'Alexandre Petit', email: 'alexandre.petit@email.com', role: 'STUDENT', promotion: '2023-2025', joinedAt: '2024-09-03' },
]

const recentCourses = [
  { id: 1, title: 'Marketing Digital Avancé', teacher: 'Prof. Dubois', students: 28, status: 'Actif' },
  { id: 2, title: 'Analyse Financière Internationale', teacher: 'Prof. Martin', students: 22, status: 'Actif' },
  { id: 3, title: 'Négociation Cross-culturelle', teacher: 'Prof. Leclerc', students: 25, status: 'Planifié' },
]

const getRoleColor = (role: string) => {
  switch (role) {
    case 'ADMIN': return 'bg-red-100 text-red-800'
    case 'TEACHER': return 'bg-blue-100 text-blue-800'
    case 'STUDENT': return 'bg-green-100 text-green-800'
    case 'ALUMNI': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'ADMIN': return 'Admin'
    case 'TEACHER': return 'Professeur'
    case 'STUDENT': return 'Étudiant'
    case 'ALUMNI': return 'Alumni'
    default: return role
  }
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administration
          </h1>
          <p className="text-gray-600">
            Gérez les utilisateurs, cours et contenus de la plateforme
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter utilisateur
          </Button>
        </div>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newUsersThisMonth} ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cours</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <p className="text-xs text-muted-foreground">
              Sur {stats.totalCourses} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.documentsThisWeek} cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              Sur {stats.totalProjects} total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gestion des utilisateurs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Utilisateurs récents</CardTitle>
              <CardDescription>
                Dernières inscriptions sur la plateforme
              </CardDescription>
            </div>
            <Button size="sm" asChild>
              <Link href="/admin/users">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{user.name}</h4>
                      <Badge className={getRoleColor(user.role)}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    {user.promotion && (
                      <p className="text-xs text-gray-400">Promotion {user.promotion}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      Inscrit le {new Date(user.joinedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link href="/admin/users">
                Voir tous les utilisateurs
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Gestion des cours */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Cours actifs</CardTitle>
              <CardDescription>
                Formations en cours ce semestre
              </CardDescription>
            </div>
            <Button size="sm" asChild>
              <Link href="/admin/classes">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau cours
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-500">{course.teacher}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-400">
                        {course.students} étudiants
                      </span>
                      <Badge variant={course.status === 'Actif' ? 'default' : 'secondary'}>
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <BarChart3 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link href="/admin/classes">
                Gérer tous les cours
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/users">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Gestion des utilisateurs</h3>
                <p className="text-sm text-gray-500">Valider et gérer les comptes utilisateurs</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/promotions">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Promotions</h3>
                <p className="text-sm text-gray-500">Créer et gérer les promotions d'étudiants</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/settings">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Permissions</h3>
                <p className="text-sm text-gray-500">Gérer les rôles et permissions</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/stats">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Statistiques</h3>
                <p className="text-sm text-gray-500">Voir les rapports détaillés</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
