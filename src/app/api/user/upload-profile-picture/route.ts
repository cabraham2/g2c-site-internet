import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt'

export async function POST(request: NextRequest) {
  try {
    // Vérifier le token JWT
    const cookieHeader = request.headers.get('cookie')
    const token = cookieHeader
      ?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = verify(token, JWT_SECRET) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    // Récupérer le fichier depuis FormData
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Vérifications
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Le fichier doit être une image' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB max
      return NextResponse.json({ error: 'L\'image doit faire moins de 5MB' }, { status: 400 })
    }

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'profiles')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Le dossier existe déjà
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `${user.id}-${timestamp}.${extension}`
    const filepath = join(uploadsDir, filename)

    // Sauvegarder le fichier
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    // URL publique de l'image
    const profilePictureUrl = `/uploads/profiles/${filename}`

    // Mettre à jour l'utilisateur dans la base de données
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { profilePicture: profilePictureUrl },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        company: true,
        position: true,
        linkedin: true,
        profilePicture: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      message: 'Photo de profil mise à jour avec succès',
      profilePictureUrl,
      user: updatedUser
    })

  } catch (error) {
    console.error('Erreur lors de l\'upload de la photo de profil:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
