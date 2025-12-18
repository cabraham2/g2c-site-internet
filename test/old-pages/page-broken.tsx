'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
  User, 
  Mail, 
  Calendar,
  GraduationCap,
  Building,
  Crown,
  UserCheck,
  Shield,
  Settings,
  Edit,
  Lock,
  Phone,
  Linkedin,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Camera,
  Upload,
  BookOpen,
  Users,
  MessageSquare,
  BarChart3,
  Award,
  FileText
} from 'lucide-react'

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'ALUMNI'
  company?: string
  position?: string
  linkedin?: string
  profilePicture?: string
  createdAt: string
  promotions?: Array<{
    id: string
    name: string
    year: string
    level: string
  }>
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  linkedin: string
}

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    linkedin: ''
  })
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [editing, setEditing] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUserData(data.user)
        setFormData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          company: data.user.company || '',
          position: data.user.position || '',
          linkedin: data.user.linkedin || ''
        })
      } else {
        setError('Erreur lors du chargement des données utilisateur')
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      setError('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setUserData(data.user)
        setMessage('Profil mis à jour avec succès')
        setEditing(false)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erreur lors de la mise à jour')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError('Le nouveau mot de passe doit contenir au moins 6 caractères')
      return
    }

    setChangingPassword(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      if (response.ok) {
        setMessage('Mot de passe modifié avec succès')
        setShowPasswordDialog(false)
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erreur lors du changement de mot de passe')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setChangingPassword(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image')
      return
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image doit faire moins de 5MB')
      return
    }

    setUploadingImage(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/user/upload-profile-picture', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setUserData(prev => prev ? { ...prev, profilePicture: data.profilePictureUrl } : null)
        setMessage('Photo de profil mise à jour avec succès')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erreur lors du téléchargement')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setUploadingImage(false)
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      'ADMIN': { color: 'bg-red-100 text-red-800', icon: Crown, label: 'Administrateur' },
      'TEACHER': { color: 'bg-blue-100 text-blue-800', icon: UserCheck, label: 'Professeur' },
      'STUDENT': { color: 'bg-green-100 text-green-800', icon: GraduationCap, label: 'Étudiant' },
      'ALUMNI': { color: 'bg-yellow-100 text-yellow-800', icon: Shield, label: 'Alumni' }
    }

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.STUDENT
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
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Impossible de charger les données utilisateur
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec photo de profil */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-6">
            {/* Photo de profil */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {userData.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="Photo de profil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-600">
                    {getInitials(userData.firstName, userData.lastName)}
                  </span>
                )}
              </div>
              <label htmlFor="profilePicture" className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera className="w-3 h-3 text-white" />
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
              {uploadingImage && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Informations utilisateur */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {userData.firstName} {userData.lastName}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                {getRoleBadge(userData.role)}
                <span className="text-gray-600">{userData.email}</span>
              </div>
              {userData.company && (
                <p className="text-gray-600 mt-1">{userData.position} chez {userData.company}</p>
              )}
            </div>

            {/* Actions rapides */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Contacter
              </Button>
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profil', icon: User },
              { id: 'courses', label: 'Mes Cours', icon: BookOpen },
              { id: 'grades', label: 'Notes', icon: BarChart3 },
              { id: 'groups', label: 'Groupes', icon: Users },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'settings', label: 'Paramètres', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {(message || error) && (
          <Alert className={`mb-6 ${message ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            {message ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message ? 'text-green-800' : 'text-red-800'}>
              {message || error}
            </AlertDescription>
          </Alert>
        )}

        {/* Onglet Profil */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informations principales */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Informations personnelles</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editing ? setEditing(false) : setEditing(true)}
                    >
                      {editing ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Annuler
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </>
                      )}
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Vos informations de base et de contact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!editing}
                      placeholder="Optionnel"
                    />
                  </div>

                  {(userData.role === 'ALUMNI' || userData.role === 'TEACHER') && (
                    <>
                      <div>
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          disabled={!editing}
                          placeholder="Optionnel"
                        />
                      </div>

                      <div>
                        <Label htmlFor="position">Poste</Label>
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                          disabled={!editing}
                          placeholder="Optionnel"
                        />
                      </div>

                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                          disabled={!editing}
                          placeholder="https://linkedin.com/in/votre-profil"
                        />
                      </div>
                    </>
                  )}

                  {editing && (
                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleSaveProfile} disabled={saving}>
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? 'Enregistrement...' : 'Enregistrer'}
                      </Button>
                      <Button variant="outline" onClick={() => setEditing(false)}>
                        Annuler
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Sécurité */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span>Sécurité</span>
                  </CardTitle>
                  <CardDescription>
                    Paramètres de sécurité du compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Lock className="w-4 h-4 mr-2" />
                        Changer le mot de passe
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Changer le mot de passe</DialogTitle>
                        <DialogDescription>
                          Entrez votre mot de passe actuel et choisissez un nouveau mot de passe
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowPasswordDialog(false)}
                        >
                          Annuler
                        </Button>
                        <Button
                          onClick={handleChangePassword}
                          disabled={changingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                        >
                          {changingPassword ? 'Modification...' : 'Changer le mot de passe'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Promotions */}
              {userData.promotions && userData.promotions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5" />
                      <span>Promotions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {userData.promotions.map((promotion) => (
                        <div key={promotion.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{promotion.name}</span>
                          <Badge variant="outline">{promotion.level}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Informations du compte */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Informations du compte</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Membre depuis le {new Date(userData.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{userData.email}</span>
                  </div>
                  {userData.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{userData.phone}</span>
                    </div>
                  )}
                  {userData.company && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Building className="w-4 h-4" />
                      <span>{userData.company}</span>
                    </div>
                  )}
                  {userData.linkedin && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Linkedin className="w-4 h-4" />
                      <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Profil LinkedIn
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Onglet Mes Cours */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Mes Cours</span>
                </CardTitle>
                <CardDescription>
                  Vos cours actuels et ressources pédagogiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Exemple de cours */}
                  {[
                    { id: 1, name: 'Management Stratégique', teacher: 'Prof. Martin', progress: 75 },
                    { id: 2, name: 'Finance d\'Entreprise', teacher: 'Prof. Dubois', progress: 60 },
                    { id: 3, name: 'Marketing Digital', teacher: 'Prof. Leclerc', progress: 90 }
                  ].map((course) => (
                    <Card key={course.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{course.teacher}</p>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progression</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          Accéder au cours
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Onglet Notes */}
        {activeTab === 'grades' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Mes Notes</span>
                </CardTitle>
                <CardDescription>
                  Vos résultats et évaluations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { course: 'Management Stratégique', grade: 16, max: 20, date: '2025-09-10' },
                    { course: 'Finance d\'Entreprise', grade: 14, max: 20, date: '2025-09-08' },
                    { course: 'Marketing Digital', grade: 18, max: 20, date: '2025-09-05' }
                  ].map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{grade.course}</h3>
                        <p className="text-sm text-gray-600">{new Date(grade.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {grade.grade}/{grade.max}
                        </div>
                        <div className={`text-sm ${grade.grade >= 16 ? 'text-green-600' : grade.grade >= 12 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {grade.grade >= 16 ? 'Excellent' : grade.grade >= 12 ? 'Bien' : 'À améliorer'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Onglet Groupes */}
        {activeTab === 'groups' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Mes Groupes</span>
                </CardTitle>
                <CardDescription>
                  Vos groupes de travail et promotions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Promotion 2025 M1', members: 45, type: 'Promotion', active: true },
                    { name: 'Groupe Management', members: 8, type: 'Projet', active: true },
                    { name: 'Alumni Network', members: 120, type: 'Alumni', active: false }
                  ].map((group, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{group.name}</h3>
                          <Badge variant={group.active ? "default" : "secondary"}>
                            {group.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{group.members} membres</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Messages
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="w-3 h-3 mr-1" />
                            Membres
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Onglet Documents */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Mes Documents</span>
                </CardTitle>
                <CardDescription>
                  Vos documents et ressources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Relevé de notes S1 2025.pdf', size: '245 KB', date: '2025-09-10', type: 'pdf' },
                    { name: 'Certificat de scolarité.pdf', size: '180 KB', date: '2025-09-05', type: 'pdf' },
                    { name: 'Convention de stage.docx', size: '125 KB', date: '2025-08-28', type: 'doc' }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-600">{doc.size} • {new Date(doc.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Télécharger
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Onglet Paramètres */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Paramètres</span>
                </CardTitle>
                <CardDescription>
                  Préférences et paramètres du compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications par email</h3>
                    <p className="text-sm text-gray-600">Recevoir les notifications importantes par email</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Visibilité du profil</h3>
                    <p className="text-sm text-gray-600">Permettre aux autres étudiants de voir votre profil</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications de groupe</h3>
                    <p className="text-sm text-gray-600">Recevoir les messages des groupes</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
                    <p className="text-sm text-gray-600">Recevoir les messages des groupes</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
