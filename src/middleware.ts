import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  // Pages publiques (accessibles à tous)
  const publicPaths = ['/', '/login', '/register', '/contact', '/formations', '/professeurs', '/projets-showcase', '/prerequis', '/faq', '/pending-validation', '/about']
  
  // Pages nécessitant une connexion simple (utilisateur connecté)
  const authRequiredPaths = ['/profile', '/dashboard']
  
  // Pages nécessitant validation étudiant (étudiant validé)
  const studentPaths = ['/courses', '/documents', '/projects', '/alumni']
  
  // Pages admin/professeur
  const adminPaths = ['/admin']
  const teacherPaths = ['/teacher']

  const pathname = request.nextUrl.pathname
  const isPublicPath = publicPaths.includes(pathname)
  const isAuthRequiredPath = authRequiredPaths.some(path => pathname.startsWith(path))
  const isStudentPath = studentPaths.some(path => pathname.startsWith(path))
  const isAdminPath = adminPaths.some(path => pathname.startsWith(path))
  const isTeacherPath = teacherPaths.some(path => pathname.startsWith(path))

  // Récupérer le token depuis les cookies
  const token = request.cookies.get('token')?.value
  console.log(`[MIDDLEWARE] Path: ${pathname}, Token present: ${!!token}`)
  console.log(`[MIDDLEWARE] All cookies:`, Object.fromEntries(request.cookies.getAll().map(c => [c.name, c.value.substring(0, 20) + '...'])))

  // Si pas de token et que la page nécessite une authentification
  if (!token && (isAuthRequiredPath || isStudentPath || isAdminPath || isTeacherPath)) {
    console.log(`[MIDDLEWARE] No token, redirecting to login for ${pathname}`)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si token présent, vérifier sa validité
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      const { payload } = await jwtVerify(token, secret)
      const userPayload = payload as any // Cast pour accéder aux propriétés custom
      console.log(`[MIDDLEWARE] Token valid: true, User: ${userPayload.email}, Role: ${userPayload.role}`)
      
      // Redirection si connecté et va sur login/register
      if (pathname === '/login' || pathname === '/register') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // Redirection des étudiants non validés vers la page d'attente
      if (userPayload.role === 'STUDENT' && userPayload.status === 'PENDING') {
        if (!publicPaths.includes(pathname) && pathname !== '/pending-validation') {
          return NextResponse.redirect(new URL('/pending-validation', request.url))
        }
      }

      // Vérification admin
      if (isAdminPath && userPayload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // Vérification professeur ou admin
      if (isTeacherPath && !['TEACHER', 'ADMIN'].includes(userPayload.role)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // Vérification étudiant validé (pour accès aux cours, documents, projets)
      if (isStudentPath) {
        if (userPayload.role === 'STUDENT' && userPayload.status !== 'APPROVED') {
          return NextResponse.redirect(new URL('/pending-validation', request.url))
        }
        // Les professeurs et admins ont accès
        if (!['STUDENT', 'TEACHER', 'ADMIN', 'ALUMNI'].includes(userPayload.role)) {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      }

      // Ajouter les infos utilisateur dans les headers pour les pages
      const response = NextResponse.next()
      response.headers.set('x-user-id', userPayload.userId)
      response.headers.set('x-user-role', userPayload.role)
      response.headers.set('x-user-status', userPayload.status || 'APPROVED')
      return response
    } catch (error) {
      console.log(`[MIDDLEWARE] Token invalid or expired: ${error}`)
      // Token invalide, supprimer le cookie et rediriger vers login si nécessaire
      if (!isPublicPath) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('token')
        return response
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
