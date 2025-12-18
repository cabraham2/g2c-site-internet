import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function GET(request: NextRequest) {
  try {
    // Vérifier le token JWT
    const authHeader = request.headers.get('authorization')
    const cookieToken = request.cookies.get('token')?.value
    const token = authHeader?.replace('Bearer ', '') || cookieToken

    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)

    // Vérifier que l'utilisateur est admin ou professeur
    if (payload.role !== 'ADMIN' && payload.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 })
    }

    // Mock des données de classes pour l'instant
    const mockClasses = [
      {
        id: '1',
        name: 'Développement Web',
        description: 'Formation complète en développement web moderne',
        teacherId: '1',
        teacher: { firstName: 'Jean', lastName: 'Dupont' },
        studentsCount: 15,
        status: 'ACTIVE',
        startDate: '2024-01-15',
        endDate: '2024-06-15'
      },
      {
        id: '2',
        name: 'Data Science',
        description: 'Introduction à la science des données',
        teacherId: '2',
        teacher: { firstName: 'Marie', lastName: 'Martin' },
        studentsCount: 12,
        status: 'ACTIVE',
        startDate: '2024-02-01',
        endDate: '2024-07-01'
      },
      {
        id: '3',
        name: 'Design UX/UI',
        description: 'Conception d\'interfaces utilisateur',
        teacherId: '3',
        teacher: { firstName: 'Pierre', lastName: 'Dubois' },
        studentsCount: 8,
        status: 'PLANNING',
        startDate: '2024-03-01',
        endDate: '2024-08-01'
      }
    ]

    const classes = mockClasses
    
    const stats = {
      total: classes.length,
      active: classes.filter(c => c.status === 'ACTIVE').length,
      planning: classes.filter(c => c.status === 'PLANNING').length,
      completed: classes.filter(c => c.status === 'COMPLETED').length,
      totalStudents: classes.reduce((sum, c) => sum + c.studentsCount, 0)
    }

    return NextResponse.json({
      classes,
      stats,
      success: true
    })

  } catch (error) {
    console.error('Erreur API classes:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
