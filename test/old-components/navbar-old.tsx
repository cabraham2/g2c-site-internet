'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  CheckSquare,
  ClipboardList,
  Eye
} from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const { user, loading, logout } = useUser()

  // Navigation pour les visiteurs non connectés
  const publicNavigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Formations', href: '/formations', icon: GraduationCap },
    { name: 'Professeurs', href: '/professeurs', icon: Users },
    { name: 'Projets', href: '/projets-showcase', icon: Eye },
    { name: 'Prérequis', href: '/prerequis', icon: ClipboardList },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: Phone },
  ]

  // Navigation pour les utilisateurs connectés mais non validés
  const userNavigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Tableau de bord', href: '/dashboard', icon: Home },
    { name: 'Formations', href: '/formations', icon: GraduationCap },
    { name: 'Professeurs', href: '/professeurs', icon: Users },
    { name: 'Projets', href: '/projets-showcase', icon: Eye },
    { name: 'Contact', href: '/contact', icon: Phone },
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
    { name: 'Notes', href: '/teacher/grades', icon: FileText },
    { name: 'Documents', href: '/documents', icon: FileText },
  ]

  // Navigation pour les admins
  const adminNavigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: Home },
    { name: 'Administration', href: '/admin', icon: Settings },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Cours', href: '/admin/courses', icon: BookOpen },
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

  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Master G2C
              </Link>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Master G2C
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
              {user?.role === 'ADMIN' && adminNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                  {user.role === 'STUDENT' && user.status === 'PENDING' && (
                    <Badge variant="secondary" className="text-xs">
                      En attente de validation
                    </Badge>
                  )}
                  {user.role === 'STUDENT' && user.status === 'APPROVED' && (
                    <Badge className="text-xs bg-green-100 text-green-800">
                      Étudiant validé
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profile">
                    Profil
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <div className="space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    Connexion
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register">
                    Inscription
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
