'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Mail, 
  Calendar,
  GraduationCap,
  Building,
  Crown,
  UserCheck
} from 'lucide-react'

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'ALUMNI'
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
  promotion?: string
  company?: string
  position?: string
  linkedin?: string
  createdAt: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUserData(data.user)
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-gray-500">Chargement du profil...</div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Impossible de charger le profil</p>
        </div>
      </div>
    )
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <Crown className="h-5 w-5 text-yellow-600" />
      case 'TEACHER':
        return <GraduationCap className="h-5 w-5 text-blue-600" />
      case 'STUDENT':
        return <User className="h-5 w-5 text-green-600" />
      case 'ALUMNI':
        return <UserCheck className="h-5 w-5 text-purple-600" />
      default:
        return <User className="h-5 w-5 text-gray-600" />
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrateur'
      case 'TEACHER':
        return 'Professeur'
      case 'STUDENT':
        return 'Étudiant'
      case 'ALUMNI':
        return 'Alumni'
      default:
        return role
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'SUSPENDED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card principale du profil */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">
                      {userData.firstName} {userData.lastName}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      {getRoleIcon(userData.role)}
                      <span className="font-medium">{getRoleLabel(userData.role)}</span>
                      <Badge className={getStatusColor(userData.status)}>
                        {userData.status === 'APPROVED' ? 'Validé' : 
                         userData.status === 'PENDING' ? 'En attente' :
                         userData.status === 'REJECTED' ? 'Rejeté' : 'Suspendu'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Informations de contact */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Informations de contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                    </div>
                    {userData.phone && (
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <p className="font-medium">{userData.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informations académiques/professionnelles */}
                {(userData.promotion || userData.company || userData.position) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      {userData.role === 'STUDENT' || userData.role === 'ALUMNI' 
                        ? 'Informations académiques' 
                        : 'Informations professionnelles'}
                    </h3>
                    <div className="space-y-4">
                      {userData.promotion && (
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Promotion</p>
                            <p className="font-medium">{userData.promotion}</p>
                          </div>
                        </div>
                      )}
                      {userData.company && (
                        <div className="flex items-center space-x-3">
                          <Building className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Entreprise</p>
                            <p className="font-medium">{userData.company}</p>
                          </div>
                        </div>
                      )}
                      {userData.position && (
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Poste</p>
                            <p className="font-medium">{userData.position}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar avec informations supplémentaires */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Membre depuis</p>
                  <p className="font-medium">
                    {new Date(userData.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID utilisateur</p>
                  <p className="font-mono text-xs bg-gray-100 p-1 rounded">
                    {userData.id.substring(0, 8)}...
                  </p>
                </div>
              </CardContent>
            </Card>

            {userData.role === 'ADMIN' && (
              <Card>
                <CardHeader>
                  <CardTitle>Privilèges administrateur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Gestion utilisateurs</span>
                      <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Configuration système</span>
                      <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
