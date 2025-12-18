'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Check, 
  X, 
  Clock, 
  User, 
  Mail, 
  Calendar,
  AlertCircle,
  GraduationCap,
  Edit,
  Users,
  CheckSquare,
  Building2,
  Phone,
  Filter,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
  promotion?: string
  company?: string
  position?: string
  createdAt: string
  validatedAt?: string
  validatedBy?: string
}

interface UserStats {
  total: number
  pending: number
  approved: number
  rejected: number
  students: number
  teachers: number
  alumni: number
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('pending')
  
  // États pour la sélection multiple
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  
  // États pour les filtres
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [promotionFilter, setPromotionFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  
  // États pour le tri
  const [sortField, setSortField] = useState<'name' | 'email' | 'promotion' | 'createdAt'>('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  
  // États pour la modal de promotion individuelle
  const [promotionModal, setPromotionModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newPromotion, setNewPromotion] = useState('')
  
  // États pour la modal de validation en lot
  const [batchModal, setBatchModal] = useState(false)
  const [batchAction, setBatchAction] = useState<'approve' | 'reject'>('approve')
  const [batchPromotion, setBatchPromotion] = useState('')
  
  // État pour les promotions disponibles
  const [availablePromotions, setAvailablePromotions] = useState<string[]>([])

  // Fonction pour récupérer les promotions disponibles
  const fetchAvailablePromotions = async () => {
    try {
      // Promotions simplifiées : 1 an chacune + promotions spéciales
      const defaultPromotions = [
        '2025 M1', '2025 M2', 
        '2024 M1', '2024 M2',
        '2023 M1', '2023 M2',
        'Alumni', 'Drop-out', 'Césure'
      ]
      setAvailablePromotions(defaultPromotions)
    } catch (error) {
      console.error('Erreur lors du chargement des promotions:', error)
    }
  }

  // Fonction pour filtrer et trier les utilisateurs
  const getFilteredAndSortedUsers = (userList: User[]) => {
    let filtered = [...userList]

    // Filtrage par statut
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    // Filtrage par rôle
    if (roleFilter !== 'ALL') {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    // Filtrage par promotion
    if (promotionFilter !== 'ALL') {
      if (promotionFilter === 'NONE') {
        filtered = filtered.filter(user => !user.promotion)
      } else {
        filtered = filtered.filter(user => user.promotion === promotionFilter)
      }
    }

    // Filtrage par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        (user.promotion && user.promotion.toLowerCase().includes(term))
      )
    }

    // Tri
    filtered.sort((a, b) => {
      let aValue: string | Date
      let bValue: string | Date

      switch (sortField) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase()
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase()
          break
        case 'email':
          aValue = a.email.toLowerCase()
          bValue = b.email.toLowerCase()
          break
        case 'promotion':
          aValue = (a.promotion || '').toLowerCase()
          bValue = (b.promotion || '').toLowerCase()
          break
        case 'createdAt':
          aValue = new Date(a.createdAt)
          bValue = new Date(b.createdAt)
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }

  // Fonction pour changer le tri
  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Obtenir les promotions uniques des utilisateurs
  const uniquePromotions = Array.from(new Set(users.map(u => u.promotion).filter(Boolean))).sort()

  const fetchUsers = async () => {
    try {
      let url = '/api/admin/all-users'
      if (activeTab === 'pending') {
        url = '/api/admin/pending-users'
      } else {
        const params = new URLSearchParams()
        if (statusFilter !== 'ALL') params.append('status', statusFilter)
        if (roleFilter !== 'ALL') params.append('role', roleFilter)
        if (params.toString()) url += `?${params.toString()}`
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        if (activeTab === 'pending') {
          setUsers(data.users)
        } else {
          setUsers(data.users)
          setStats(data.stats)
        }
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
    fetchUsers()
    fetchAvailablePromotions()
  }, [activeTab, statusFilter, roleFilter])

  // Fonction pour créer un en-tête de colonne cliquable
  const SortableHeader = ({ field, children }: { field: typeof sortField, children: React.ReactNode }) => {
    const isActive = sortField === field
    const Icon = isActive ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown
    
    return (
      <TableHead 
        className="cursor-pointer hover:bg-gray-50 select-none" 
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center space-x-1">
          <span>{children}</span>
          <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
        </div>
      </TableHead>
    )
  }

  // Gérer la sélection individuelle
  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId])
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId))
      setSelectAll(false)
    }
  }

  // Gérer la sélection de tous
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedUsers(users.filter(u => u.status === 'PENDING').map(u => u.id))
    } else {
      setSelectedUsers([])
    }
  }

  // Gérer la validation en lot
  const handleBatchValidation = async () => {
    if (selectedUsers.length === 0) return
    
    setActionLoading('batch')
    try {
      const response = await fetch('/api/admin/batch-validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userIds: selectedUsers,
          action: batchAction,
          promotion: batchAction === 'approve' ? batchPromotion : undefined
        })
      })

      if (response.ok) {
        await fetchUsers()
        setSelectedUsers([])
        setSelectAll(false)
        setBatchModal(false)
        setBatchPromotion('')
      } else {
        const data = await response.json()
        setError(data.error || 'Erreur lors de la validation en lot')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setActionLoading(null)
    }
  }

  const handleValidateUser = async (userId: string, action: 'approve' | 'reject') => {
    setActionLoading(userId)
    try {
      const response = await fetch(`/api/admin/validate-user/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })

      if (response.ok) {
        // Recharger la liste
        await fetchUsers()
      } else {
        const data = await response.json()
        setError(data.message || 'Erreur lors de la validation')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setActionLoading(null)
    }
  }

  const handlePromotionUpdate = async () => {
    if (!selectedUser || !newPromotion) return
    
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}/promotion`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promotion: newPromotion })
      })

      if (response.ok) {
        await fetchUsers()
        setPromotionModal(false)
        setSelectedUser(null)
        setNewPromotion('')
      } else {
        const data = await response.json()
        setError(data.error || 'Erreur lors de la mise à jour')
      }
    } catch (error) {
      setError('Erreur de connexion')
    }
  }

  const openPromotionModal = (user: User) => {
    setSelectedUser(user)
    setNewPromotion(user.promotion || '')
    setPromotionModal(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />En attente</Badge>
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Validé</Badge>
      case 'REJECTED':
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Rejeté</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    const roleColors = {
      STUDENT: 'bg-blue-100 text-blue-800',
      TEACHER: 'bg-purple-100 text-purple-800',
      ALUMNI: 'bg-green-100 text-green-800',
      ADMIN: 'bg-red-100 text-red-800'
    }

    return (
      <Badge className={roleColors[role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'}>
        {role}
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

  // Fonction pour rendre la table des utilisateurs
  const renderUserTable = (userList: User[], showSelection = true) => {
    const filteredUsers = getFilteredAndSortedUsers(userList)
    
    if (filteredUsers.length === 0) {
      return (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun utilisateur trouvé
          </h3>
          <p className="text-gray-600">
            Aucun utilisateur ne correspond aux critères sélectionnés.
          </p>
        </div>
      )
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {showSelection && (
              <TableHead className="w-12">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  aria-label="Sélectionner tout"
                />
              </TableHead>
            )}
            <SortableHeader field="name">Utilisateur</SortableHeader>
            <SortableHeader field="email">Email</SortableHeader>
            <TableHead>Rôle</TableHead>
            <SortableHeader field="promotion">Promotion</SortableHeader>
            <TableHead>Statut</TableHead>
            <SortableHeader field="createdAt">Date d'inscription</SortableHeader>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              {showSelection && (
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                    disabled={user.status !== 'PENDING'}
                    aria-label={`Sélectionner ${user.firstName} ${user.lastName}`}
                  />
                </TableCell>
              )}
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {user.firstName[0]}{user.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    {user.company && (
                      <p className="text-sm text-gray-500 flex items-center">
                        <Building2 className="w-3 h-3 mr-1" />
                        {user.company}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                {getRoleBadge(user.role)}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {user.promotion || 'Non définie'}
                  </span>
                  {user.role === 'STUDENT' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openPromotionModal(user)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(user.status)}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                {user.validatedAt && (
                  <div className="text-xs text-gray-500 mt-1">
                    Validé le {new Date(user.validatedAt).toLocaleDateString('fr-FR')}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {user.status === 'PENDING' && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-300 hover:bg-green-50"
                      onClick={() => handleValidateUser(user.id, 'approve')}
                      disabled={actionLoading === user.id}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Valider
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                      onClick={() => handleValidateUser(user.id, 'reject')}
                      disabled={actionLoading === user.id}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Rejeter
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  // Fonction pour rendre la gestion des promotions
  const renderPromotionManagement = () => {
    const students = users.filter(u => u.role === 'STUDENT' && u.status === 'APPROVED')
    const promotionGroups = students.reduce((acc, student) => {
      const promotion = student.promotion || 'Sans promotion'
      if (!acc[promotion]) {
        acc[promotion] = []
      }
      acc[promotion].push(student)
      return acc
    }, {} as Record<string, User[]>)

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(promotionGroups).map(([promotion, students]) => (
            <Card key={promotion}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{promotion}</span>
                  <Badge variant="secondary">{students.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {students.slice(0, 3).map(student => (
                    <div key={student.id} className="flex items-center space-x-2 text-sm">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">
                          {student.firstName[0]}{student.lastName[0]}
                        </span>
                      </div>
                      <span>{student.firstName} {student.lastName}</span>
                    </div>
                  ))}
                  {students.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{students.length - 3} autres étudiants
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => {
                    setSelectedUsers(students.map(s => s.id))
                    setBatchAction('approve')
                    setBatchModal(true)
                  }}
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Gérer cette promotion
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
        <p className="text-gray-600 mt-2">
          Gérez les inscriptions, validations et promotions des utilisateurs
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Statistiques rapides */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Validés</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Étudiants</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.students}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Validation ({stats?.pending || 0})</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Tous les utilisateurs</span>
          </TabsTrigger>
          <TabsTrigger value="promotions" className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span>Gestion des promotions</span>
          </TabsTrigger>
        </TabsList>

        {/* Onglet Validation */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Utilisateurs en attente de validation</span>
                </div>
                {selectedUsers.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {selectedUsers.length} sélectionné(s)
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setBatchAction('approve')
                        setBatchModal(true)
                      }}
                      className="text-green-600 border-green-300 hover:bg-green-50"
                    >
                      <CheckSquare className="w-4 h-4 mr-1" />
                      Valider en lot
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setBatchAction('reject')
                        setBatchModal(true)
                      }}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Rejeter en lot
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                {users.filter(u => u.status === 'PENDING').length} utilisateur(s) en attente de validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderUserTable(users.filter(u => u.status === 'PENDING'))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Tous les utilisateurs */}
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Tous les utilisateurs</span>
                </div>
              </CardTitle>
              <CardDescription>
                {getFilteredAndSortedUsers(users).length} utilisateur(s) affiché(s) sur {users.length} au total
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Barre de recherche et filtres */}
              <div className="mb-6 space-y-4">
                {/* Barre de recherche */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher par nom, email ou promotion..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Filtres */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filtres:</span>
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Tous statuts</SelectItem>
                      <SelectItem value="PENDING">En attente</SelectItem>
                      <SelectItem value="APPROVED">Validés</SelectItem>
                      <SelectItem value="REJECTED">Rejetés</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Tous rôles</SelectItem>
                      <SelectItem value="STUDENT">Étudiants</SelectItem>
                      <SelectItem value="TEACHER">Professeurs</SelectItem>
                      <SelectItem value="ALUMNI">Alumni</SelectItem>
                      <SelectItem value="ADMIN">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={promotionFilter} onValueChange={setPromotionFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Toutes promotions</SelectItem>
                      <SelectItem value="NONE">Sans promotion</SelectItem>
                      {uniquePromotions.map(promotion => (
                        <SelectItem key={promotion} value={promotion!}>
                          {promotion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Bouton pour réinitialiser les filtres */}
                  {(statusFilter !== 'ALL' || roleFilter !== 'ALL' || promotionFilter !== 'ALL' || searchTerm) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStatusFilter('ALL')
                        setRoleFilter('ALL')
                        setPromotionFilter('ALL')
                        setSearchTerm('')
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Réinitialiser
                    </Button>
                  )}
                </div>
              </div>
              
              {renderUserTable(users, false)}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Gestion des promotions */}
        <TabsContent value="promotions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5" />
                <span>Gestion des promotions</span>
              </CardTitle>
              <CardDescription>
                Gérez les promotions des étudiants par lot
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderPromotionManagement()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal pour gérer les promotions individuelles */}
      <Dialog open={promotionModal} onOpenChange={setPromotionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Attribuer une promotion
            </DialogTitle>
            <DialogDescription>
              Attribuez une promotion à {selectedUser?.firstName} {selectedUser?.lastName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="promotion">Promotion</Label>
              <Select value={newPromotion} onValueChange={setNewPromotion}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une promotion" />
                </SelectTrigger>
                <SelectContent>
                  {availablePromotions.map(promotion => (
                    <SelectItem key={promotion} value={promotion}>
                      {promotion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPromotionModal(false)}>
              Annuler
            </Button>
            <Button onClick={handlePromotionUpdate} disabled={!newPromotion}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Attribuer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal pour la validation en lot */}
      <Dialog open={batchModal} onOpenChange={setBatchModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {batchAction === 'approve' ? 'Valider en lot' : 'Rejeter en lot'}
            </DialogTitle>
            <DialogDescription>
              {batchAction === 'approve' 
                ? `Valider ${selectedUsers.length} utilisateur(s) sélectionné(s)`
                : `Rejeter ${selectedUsers.length} utilisateur(s) sélectionné(s)`
              }
            </DialogDescription>
          </DialogHeader>
          
          {batchAction === 'approve' && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="batchPromotion">Promotion (optionnel)</Label>
                <Select value={batchPromotion} onValueChange={setBatchPromotion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une promotion pour tous les étudiants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Aucune promotion</SelectItem>
                    {availablePromotions.map(promotion => (
                      <SelectItem key={promotion} value={promotion}>
                        {promotion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Cette promotion sera attribuée à tous les étudiants sélectionnés. 
                  Les autres rôles ne seront pas affectés.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBatchModal(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleBatchValidation} 
              disabled={actionLoading === 'batch'}
              className={batchAction === 'approve' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
              }
            >
              {actionLoading === 'batch' ? (
                <Clock className="w-4 h-4 mr-2 animate-spin" />
              ) : batchAction === 'approve' ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <X className="w-4 h-4 mr-2" />
              )}
              {batchAction === 'approve' ? 'Valider' : 'Rejeter'} ({selectedUsers.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
