'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  BookOpen, 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp,
  Clock,
  MessageSquare,
  GraduationCap,
  Settings,
  UserCheck
} from 'lucide-react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'ALUMNI'
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données utilisateur
        const userResponse = await fetch('/api/auth/me')
        if (userResponse.ok) {
          const userData = await userResponse.json()
          setUser(userData.user)

          // Récupérer les statistiques selon le rôle
          if (userData.user.role === 'ADMIN') {
            const [statsResponse, classesResponse] = await Promise.all([
              fetch('/api/admin/users'),
              fetch('/api/admin/classes')
            ])
            
            const statsData = statsResponse.ok ? await statsResponse.json() : null
            const classesData = classesResponse.ok ? await classesResponse.json() : null
            
            setStats({
              ...statsData?.stats,
              classes: classesData?.stats
            })
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-gray-500">Chargement...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Impossible de charger les informations utilisateur</p>
          <Link href="/login">
            <Button>Se connecter</Button>
          </Link>
        </div>
      </div>
    )
  }

  const renderRoleSpecificContent = () => {
    switch (user.role) {
      case 'ADMIN':
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tableau de bord - Administrateur
            </h1>
            <p className="text-gray-600 mb-8">
              Bienvenue {user.firstName} {user.lastName}, gérez votre plateforme G2C
            </p>
            
            {/* Admin Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs en attente</CardTitle>
                  <UserCheck className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats ? stats.pending : '--'}
                  </div>
                  <p className="text-xs text-gray-500">À valider</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Étudiants</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats ? stats.approved : '--'}
                  </div>
                  <p className="text-xs text-gray-500">Actifs</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Classes</CardTitle>
                  <BookOpen className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats?.classes ? stats.classes.active : '--'}
                  </div>
                  <p className="text-xs text-gray-500">Actives</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Professeurs</CardTitle>
                  <GraduationCap className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats ? stats.teachers : '--'}
                  </div>
                  <p className="text-xs text-gray-500">Actifs</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestion des utilisateurs
                  </CardTitle>
                  <CardDescription>Valider et gérer les comptes utilisateurs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/users">
                    <Button className="w-full">Accéder</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Classes & Matières
                  </CardTitle>
                  <CardDescription>Gérer les classes et matières</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/classes">
                    <Button className="w-full">Accéder</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configuration
                  </CardTitle>
                  <CardDescription>Paramètres de la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/settings">
                    <Button className="w-full">Accéder</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        )

      case 'TEACHER':
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tableau de bord - Professeur
            </h1>
            <p className="text-gray-600 mb-8">
              Bienvenue {user.firstName} {user.lastName}, gérez vos cours et étudiants
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Gestion des notes
                  </CardTitle>
                  <CardDescription>Saisir et consulter les notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/teacher/grades">
                    <Button className="w-full">Accéder</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Validation étudiants
                  </CardTitle>
                  <CardDescription>Valider les nouveaux comptes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/users">
                    <Button className="w-full">Accéder</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        )

      case 'STUDENT':
        if (user.status === 'PENDING') {
          return (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Compte en attente de validation
              </h1>
              <p className="text-gray-600 mb-8">
                Bonjour {user.firstName} {user.lastName}, votre compte est en cours de validation.
              </p>
              
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    Validation en cours
                  </CardTitle>
                  <CardDescription>
                    Votre demande d'inscription est en cours de traitement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Vous recevrez une notification une fois votre compte validé.
                  </p>
                </CardContent>
              </Card>
            </>
          )
        }

        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tableau de bord - Étudiant
            </h1>
            <p className="text-gray-600 mb-8">
              Bienvenue {user.firstName} {user.lastName}, suivez votre progression
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Mes notes
                  </CardTitle>
                  <CardDescription>Consulter vos notes et bulletins</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/student/grades">
                    <Button className="w-full">Accéder</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Mes cours
                  </CardTitle>
                  <CardDescription>Accéder aux ressources</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/courses">
                    <Button className="w-full">Accéder</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        )

      default:
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tableau de bord
            </h1>
            <p className="text-gray-600 mb-8">
              Bienvenue {user.firstName} {user.lastName}
            </p>
          </>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {renderRoleSpecificContent()}
    </div>
  )
}
