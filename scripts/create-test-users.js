const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUsers() {
  try {
    console.log('Création d\'utilisateurs de test en attente...')

    // Hasher les mots de passe
    const hashedPassword = await bcrypt.hash('password123', 10)

    // Créer quelques utilisateurs en attente
    const testUsers = [
      {
        id: 'test-student-1',
        firstName: 'Marie',
        lastName: 'Dubois',
        email: 'marie.dubois@student.iae-caen.fr',
        password: hashedPassword,
        role: 'STUDENT',
        status: 'PENDING'
      },
      {
        id: 'test-student-2',
        firstName: 'Thomas',
        lastName: 'Martin',
        email: 'thomas.martin@student.iae-caen.fr',
        password: hashedPassword,
        role: 'STUDENT',
        status: 'PENDING'
      },
      {
        id: 'test-alumni-1',
        firstName: 'Sophie',
        lastName: 'Leclerc',
        email: 'sophie.leclerc@alumni.iae-caen.fr',
        password: hashedPassword,
        role: 'ALUMNI',
        status: 'PENDING',
        company: 'TechCorp',
        position: 'Développeuse Full-Stack',
        linkedin: 'https://linkedin.com/in/sophie-leclerc'
      },
      {
        id: 'test-teacher-1',
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@iae-caen.fr',
        password: hashedPassword,
        role: 'TEACHER',
        status: 'PENDING'
      }
    ]

    for (const userData of testUsers) {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      })

      if (!existingUser) {
        await prisma.user.create({
          data: userData
        })
        console.log(`✅ Utilisateur créé: ${userData.firstName} ${userData.lastName} (${userData.email})`)
      } else {
        console.log(`⚠️ Utilisateur déjà existant: ${userData.email}`)
      }
    }

    console.log('\n✅ Création d\'utilisateurs de test terminée!')

  } catch (error) {
    console.error('❌ Erreur lors de la création des utilisateurs de test:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUsers()
