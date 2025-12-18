import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    // Vérifier et décoder le token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    const userPayload = payload as any

    // Vérifier les permissions admin
    if (userPayload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 })
    }

    const { promotion } = await request.json()
    
    if (!promotion) {
      return NextResponse.json({ error: 'Promotion requise' }, { status: 400 })
    }

    // Mettre à jour la promotion de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { promotion },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        promotion: true,
        role: true
      }
    })

    return NextResponse.json({ 
      success: true,
      user: updatedUser,
      message: 'Promotion mise à jour avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la promotion:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
