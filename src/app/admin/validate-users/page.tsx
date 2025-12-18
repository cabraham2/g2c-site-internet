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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Check, 
  X, 
  Clock, 
  User,
  Mail,
  Calendar,
  GraduationCap,
  AlertCircle,
  UserCheck,
  UserX,
  Eye,
  Users
} from 'lucide-react'

interface PendingUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'STUDENT' | 'TEACHER' | 'ALUMNI'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  company?: string
  position?: string
  linkedin?: string
  createdAt: string
}

interface Promotion {
  id: string
  name: string
  year: string
  level: string
  isActive: boolean
}

export default function ValidateUsersPage() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null)
  const [selectedPromotion, setSelectedPromotion] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [usersResponse, promotionsResponse] = await Promise.all([
        fetch('/api/admin/pending-users'),
        fetch('/api/admin/promotions')
      ])

      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        setPendingUsers(usersData.users)
      }

      if (promotionsResponse.ok) {
        const promotionsData = await promotionsResponse.json()
        setPromotions(promotionsData.promotions.filter((p: Promotion) => p.isActive))
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
      setError('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const handleValidateUser = async (userId: string, action: 'approve' | 'reject') => {
    setActionLoading(userId)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/validate-user/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action,
          promotionId: action === 'approve' ? selectedPromotion : undefined
        })
      })

      if (response.ok) {
        await fetchData()
        setMessage(`Utilisateur ${action === 'approve' ? 'validé' : 'rejeté'} avec succès`)
        setSelectedUser(null)
        setSelectedPromotion('')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erreur lors de la validation')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setActionLoading(null)
    }
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      'STUDENT': { color: 'bg-green-100 text-green-800', label: 'Étudiant' },
      'TEACHER': { color: 'bg-blue-100 text-blue-800', label: 'Professeur' },
      'ALUMNI': { color: 'bg-yellow-100 text-yellow-800', label: 'Alumni' }
    }

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.STUDENT

    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'PENDING': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'En attente' },
      'APPROVED': { color: 'bg-green-100 text-green-800', icon: Check, label: 'Validé' },
      'REJECTED': { color: 'bg-red-100 text-red-800', icon: X, label: 'Rejeté' }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    const Icon = config.icon

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
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
          <h1 className="text-3xl font-bold text-gray-900">Validation des Utilisateurs</h1>
          <p className="text-gray-600 mt-2">
            Validez ou rejetez les demandes d'inscription en attente
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-2" />
            {pendingUsers.filter(u => u.status === 'PENDING').length} en attente
          </Badge>
        </div>
      </div>

      {(message || error) && (
        <Alert className={`mb-6 ${message ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          {message ? (
            <UserCheck className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={message ? 'text-green-800' : 'text-red-800'}>
            {message || error}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Utilisateurs en attente de validation</span>
          </CardTitle>
          <CardDescription>
            Examinez les demandes d'inscription et assignez des promotions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune validation en attente
              </h3>
              <p className="text-gray-600">
                Toutes les demandes d'inscription ont été traitées.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Voir
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Détails de l'utilisateur</DialogTitle>
                              <DialogDescription>
                                Informations complètes et validation
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedUser && (
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Nom complet</p>
                                    <p className="text-sm text-gray-900">
                                      {selectedUser.firstName} {selectedUser.lastName}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Rôle</p>
                                    {getRoleBadge(selectedUser.role)}
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Email</p>
                                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                                </div>

                                {selectedUser.company && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Entreprise</p>
                                    <p className="text-sm text-gray-900">{selectedUser.company}</p>
                                  </div>
                                )}

                                {selectedUser.position && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Poste</p>
                                    <p className="text-sm text-gray-900">{selectedUser.position}</p>
                                  </div>
                                )}

                                {selectedUser.role === 'STUDENT' && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">
                                      Assigner à une promotion
                                    </p>
                                    <Select value={selectedPromotion} onValueChange={setSelectedPromotion}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner une promotion" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {promotions.map((promotion) => (
                                          <SelectItem key={promotion.id} value={promotion.id}>
                                            {promotion.name} ({promotion.level})
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}
                              </div>
                            )}

                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => handleValidateUser(user.id, 'reject')}
                                disabled={actionLoading === user.id}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Rejeter
                              </Button>
                              <Button
                                onClick={() => handleValidateUser(user.id, 'approve')}
                                disabled={
                                  actionLoading === user.id || 
                                  (user.role === 'STUDENT' && !selectedPromotion)
                                }
                                className="text-green-600 bg-green-50 hover:bg-green-100 border-green-300"
                              >
                                <UserCheck className="w-4 h-4 mr-2" />
                                {actionLoading === user.id ? 'Validation...' : 'Valider'}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
    case 'SUSPENDED': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'PENDING': return 'En attente'
    case 'APPROVED': return 'Approuvé'
    case 'REJECTED': return 'Rejeté'
    case 'SUSPENDED': return 'Suspendu'
    default: return status
  }
}

export default function ValidateUsersPage() {
  const handleApprove = async (userId: string) => {
    // API call pour approuver l'utilisateur
    console.log('Approving user:', userId)
  }

  const handleReject = async (userId: string) => {
    // API call pour rejeter l'utilisateur
    console.log('Rejecting user:', userId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Validation des Utilisateurs
        </h1>
        <p className="text-gray-600">
          Approuvez ou rejetez les demandes d'inscription des étudiants
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Demandes à traiter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approuvés</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">145</div>
            <p className="text-xs text-muted-foreground">
              Ce semestre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejetés</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-muted-foreground">
              Ce semestre
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerte si des demandes en attente */}
      {pendingUsers.length > 0 && (
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-medium text-yellow-800">
                  {pendingUsers.length} demande{pendingUsers.length > 1 ? 's' : ''} en attente
                </h3>
                <p className="text-sm text-yellow-700">
                  Des étudiants attendent la validation de leur compte pour accéder à la plateforme.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des utilisateurs en attente */}
      <Card>
        <CardHeader>
          <CardTitle>Demandes en attente de validation</CardTitle>
          <CardDescription>
            Examinez les demandes d'inscription et validez les comptes étudiants
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <div className="text-center py-8">
              <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune demande en attente
              </h3>
              <p className="text-gray-500">
                Toutes les demandes d'inscription ont été traitées.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {user.firstName} {user.lastName}
                          </h3>
                          <Badge className={getStatusColor(user.status)}>
                            {getStatusLabel(user.status)}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4" />
                          <span>Promotion {user.promotion}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Demande du {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                        onClick={() => handleReject(user.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Rejeter
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(user.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approuver
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
