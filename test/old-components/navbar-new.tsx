'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/useUser'
import { 
  Home, 
  Users, 
  BookOpen, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut,
  User,
  GraduationCap,
  Phone,
  HelpCircle,
  Menu,
  X,
  UserCircle
} from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useUser()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Navigation publique
  const publicNavigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'À propos', href: '/about', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: Phone },
  ]

  // Navigation pour les utilisateurs non validés
  const userNavigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Tableau de bord', href: '/dashboard', icon: Home },
  ]

  // Navigation pour les étudiants validés
  const studentNavigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: Home },
    { name: 'Mes Notes', href: '/student/grades', icon: GraduationCap },
    { name: 'Formations', href: '/courses', icon: BookOpen },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Projets', href: '/projects', icon: Calendar },
    { name: 'Réseau Alumni', href: '/alumni', icon: Users },
  ]

  // Navigation pour les professeurs
  const teacherNavigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: Home },
    { name: 'Mes Cours', href: '/teacher/courses', icon: BookOpen },
    { name: 'Étudiants', href: '/teacher/students', icon: Users },
    { name: 'Notes', href: '/teacher/grades', icon: GraduationCap },
    { name: 'Documents', href: '/documents', icon: FileText },
  ]

  // Navigation pour les admins
  const adminNavigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: Home },
    { name: 'Administration', href: '/admin', icon: Settings },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Classes', href: '/admin/classes', icon: BookOpen },
    { name: 'Inscriptions', href: '/admin/enrollments', icon: GraduationCap },
    { name: 'Documents', href: '/documents', icon: FileText },
  ]

  const getNavigation = () => {
    if (!user) return publicNavigation
    
    switch (user.role) {
      case 'ADMIN':
        return adminNavigation
      case 'TEACHER':
        return teacherNavigation
      case 'STUDENT':
        // Vérifier si l'étudiant est validé
        if (user.status === 'APPROVED') {
          return studentNavigation
        }
        return userNavigation
      case 'ALUMNI':
        return studentNavigation // Les alumni ont les mêmes droits que les étudiants validés
      default:
        return userNavigation
    }
  }

  const navigation = getNavigation()

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    router.push('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et navigation principale */}
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">G2C</span>
              </Link>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Boutons utilisateur */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                {/* Statut utilisateur */}
                {user.status === 'PENDING' && (
                  <Badge variant="secondary" className="mr-3 bg-yellow-100 text-yellow-800 border-yellow-200">
                    En attente de validation
                  </Badge>
                )}
                
                {/* Menu utilisateur */}
                <Button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="hidden sm:block">
                    {user.firstName} {user.lastName}
                  </span>
                </Button>

                {/* Dropdown menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 border border-gray-200 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant={user.role === 'ADMIN' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {user.role === 'ADMIN' && 'Administrateur'}
                          {user.role === 'TEACHER' && 'Professeur'}
                          {user.role === 'STUDENT' && 'Étudiant'}
                          {user.role === 'ALUMNI' && 'Alumni'}
                        </Badge>
                        <Badge 
                          variant={user.status === 'APPROVED' ? 'default' : 'secondary'}
                          className={cn(
                            "text-xs",
                            user.status === 'APPROVED' && "bg-green-100 text-green-800 border-green-200",
                            user.status === 'PENDING' && "bg-yellow-100 text-yellow-800 border-yellow-200",
                            user.status === 'REJECTED' && "bg-red-100 text-red-800 border-red-200"
                          )}
                        >
                          {user.status === 'APPROVED' && 'Validé'}
                          {user.status === 'PENDING' && 'En attente'}
                          {user.status === 'REJECTED' && 'Rejeté'}
                        </Badge>
                      </div>
                    </div>
                    
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Mon Profil
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  <Link href="/login">
                    <UserCircle className="w-5 h-5 mr-2" />
                    Se connecter
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/register">
                    S'inscrire
                  </Link>
                </Button>
              </div>
            )}

            {/* Menu mobile */}
            <div className="md:hidden">
              <Button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation mobile */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-2 text-base font-medium rounded-md mx-2',
                      isActive
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    )}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Cliquer en dehors pour fermer les menus */}
      {(showUserMenu || showMobileMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowUserMenu(false)
            setShowMobileMenu(false)
          }}
        />
      )}
    </nav>
  )
}
