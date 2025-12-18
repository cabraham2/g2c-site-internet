import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Hash des mots de passe pour comptes de test
  const adminHashed = await bcrypt.hash('admin123', 10)
  const profHashed = await bcrypt.hash('prof123', 10)
  const studentHashed = await bcrypt.hash('etudiant123', 10)

  // Créer les promotions d'abord (système 1-an comme demandé)
  const promo2025M1 = await prisma.promotion.upsert({
    where: { name: '2025 M1' },
    update: {},
    create: {
      name: '2025 M1',
      year: '2025',
      level: 'M1',
      isActive: true,
      description: 'Master 1 promotion 2025'
    }
  })

  const promo2024M2 = await prisma.promotion.upsert({
    where: { name: '2024 M2' },
    update: {},
    create: {
      name: '2024 M2',
      year: '2024',
      level: 'M2',
      isActive: true,
      description: 'Master 2 promotion 2024'
    }
  })

  const promo2025L3 = await prisma.promotion.upsert({
    where: { name: '2025 L3' },
    update: {},
    create: {
      name: '2025 L3',
      year: '2025',
      level: 'L3',
      isActive: true,
      description: 'Licence 3 promotion 2025'
    }
  })

  // Promotions spéciales
  const promoAlumni = await prisma.promotion.upsert({
    where: { name: 'Alumni' },
    update: {},
    create: {
      name: 'Alumni',
      year: null,
      level: 'Alumni',
      isActive: true,
      description: 'Anciens diplômés'
    }
  })

  const promoDropout = await prisma.promotion.upsert({
    where: { name: 'Drop-out' },
    update: {},
    create: {
      name: 'Drop-out',
      year: null,
      level: 'Drop-out',
      isActive: false,
      description: 'Étudiants ayant quitté le cursus'
    }
  })

  const promoCesure = await prisma.promotion.upsert({
    where: { name: 'Césure' },
    update: {},
    create: {
      name: 'Césure',
      year: null,
      level: 'Césure',
      isActive: true,
      description: 'Étudiants en année de césure'
    }
  })

  // Créer un admin (identifiants docs)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@g2c.fr' },
    update: {},
    create: {
      email: 'admin@g2c.fr',
      password: adminHashed,
      firstName: 'Admin',
      lastName: 'G2C',
      role: 'ADMIN',
      status: 'APPROVED'
    }
  })

  console.log('👤 Admin créé:', admin.email)

  // Créer des professeurs
  const teacher1 = await prisma.user.upsert({
    where: { email: 'prof@g2c.fr' },
    update: {},
    create: {
      email: 'prof@g2c.fr',
      password: profHashed,
      firstName: 'Pierre',
      lastName: 'Martin',
      role: 'TEACHER',
      status: 'APPROVED',
      validatedBy: admin.id,
      validatedAt: new Date()
    }
  })

  const teacher2 = await prisma.user.upsert({
    where: { email: 'prof.dubois@g2c.fr' },
    update: {},
    create: {
      email: 'prof.dubois@g2c.fr',
      password: profHashed,
      firstName: 'Marie',
      lastName: 'Dubois',
      role: 'TEACHER',
      status: 'APPROVED',
      validatedBy: admin.id,
      validatedAt: new Date()
    }
  })

  // Créer des étudiants
  const student1 = await prisma.user.upsert({
    where: { email: 'etudiant@g2c.fr' },
    update: {},
    create: {
      email: 'etudiant@g2c.fr',
      password: studentHashed,
      firstName: 'Jean',
      lastName: 'Dupont',
      role: 'STUDENT',
      status: 'APPROVED',
      validatedBy: admin.id,
      validatedAt: new Date()
    }
  })

  const student2 = await prisma.user.upsert({
    where: { email: 'marie.bernard@student.g2c.fr' },
    update: {},
    create: {
      email: 'marie.bernard@student.g2c.fr',
      password: studentHashed,
      firstName: 'Marie',
      lastName: 'Bernard',
      role: 'STUDENT',
      status: 'APPROVED',
      validatedBy: admin.id,
      validatedAt: new Date()
    }
  })

  const student3 = await prisma.user.upsert({
    where: { email: 'paul.simon@student.g2c.fr' },
    update: {},
    create: {
      email: 'paul.simon@student.g2c.fr',
      password: studentHashed,
      firstName: 'Paul',
      lastName: 'Simon',
      role: 'STUDENT',
      status: 'PENDING'
    }
  })

  // Assigner les promotions aux étudiants (plusieurs promotions possibles par utilisateur)
  await prisma.userPromotion.upsert({
    where: {
      userId_promotionId: {
        userId: student1.id,
        promotionId: promo2025M1.id
      }
    },
    update: {},
    create: {
      userId: student1.id,
      promotionId: promo2025M1.id,
      isActive: true,
      assignedBy: admin.id
    }
  })

  await prisma.userPromotion.upsert({
    where: {
      userId_promotionId: {
        userId: student2.id,
        promotionId: promo2024M2.id
      }
    },
    update: {},
    create: {
      userId: student2.id,
      promotionId: promo2024M2.id,
      isActive: true,
      assignedBy: admin.id
    }
  })

  await prisma.userPromotion.upsert({
    where: {
      userId_promotionId: {
        userId: student3.id,
        promotionId: promo2025L3.id
      }
    },
    update: {},
    create: {
      userId: student3.id,
      promotionId: promo2025L3.id,
      isActive: true,
      assignedBy: admin.id
    }
  })

  console.log('🎓 Promotions assignées aux étudiants')

  // Créer des matières
  const math = await prisma.subject.upsert({
    where: { code: 'MATH-101' },
    update: {},
    create: {
      name: 'Mathématiques',
      code: 'MATH-101',
      description: 'Mathématiques fondamentales',
      coefficient: 3.0,
      color: '#EF4444'
    }
  })

  const physics = await prisma.subject.upsert({
    where: { code: 'PHYS-101' },
    update: {},
    create: {
      name: 'Physique',
      code: 'PHYS-101',
      description: 'Physique générale',
      coefficient: 2.5,
      color: '#3B82F6'
    }
  })

  const programming = await prisma.subject.upsert({
    where: { code: 'PROG-101' },
    update: {},
    create: {
      name: 'Programmation',
      code: 'PROG-101',
      description: 'Introduction à la programmation',
      coefficient: 4.0,
      color: '#10B981'
    }
  })

  // Créer des classes
  const classL3 = await prisma.class.upsert({
    where: { code: 'L3-INFO-2024' },
    update: {},
    create: {
      name: 'L3 Informatique',
      code: 'L3-INFO-2024',
      description: 'Licence 3 Informatique',
      level: 'L3',
      year: '2024-2025'
    }
  })

  const classM1 = await prisma.class.upsert({
    where: { code: 'M1-INFO-2024' },
    update: {},
    create: {
      name: 'M1 Informatique',
      code: 'M1-INFO-2024',
      description: 'Master 1 Informatique',
      level: 'M1',
      year: '2024-2025'
    }
  })

  // Les matières sont déjà liées via les TeacherSubject, pas besoin de connect ici

  // Inscrire les étudiants dans les classes
  await prisma.classEnrollment.createMany({
    data: [
      { userId: student1.id, classId: classL3.id },
      { userId: student2.id, classId: classL3.id },
      { userId: student3.id, classId: classM1.id }
    ]
  })

  // Assigner les professeurs aux matières
  await prisma.teacherSubject.createMany({
    data: [
      { teacherId: teacher1.id, subjectId: math.id, classId: classL3.id },
      { teacherId: teacher1.id, subjectId: programming.id, classId: classL3.id },
      { teacherId: teacher1.id, subjectId: programming.id, classId: classM1.id },
      { teacherId: teacher2.id, subjectId: physics.id, classId: classL3.id },
      { teacherId: teacher2.id, subjectId: physics.id, classId: classM1.id }
    ]
  })

  // Créer quelques notes
  await prisma.grade.createMany({
    data: [
      {
        studentId: student1.id,
        teacherId: teacher1.id,
        subjectId: math.id,
        value: 16.5,
        maxValue: 20,
        weight: 1.0,
        type: 'EXAM',
        title: 'Examen Final Mathématiques',
        description: 'Examen sur les fonctions et dérivées'
      },
      {
        studentId: student1.id,
        teacherId: teacher1.id,
        subjectId: programming.id,
        value: 18.0,
        maxValue: 20,
        weight: 2.0,
        type: 'PROJECT',
        title: 'Projet de Programmation',
        description: 'Application web en JavaScript'
      },
      {
        studentId: student1.id,
        teacherId: teacher2.id,
        subjectId: physics.id,
        value: 14.5,
        maxValue: 20,
        weight: 1.0,
        type: 'HOMEWORK',
        title: 'Devoir Maison Physique',
        description: 'Exercices sur la mécanique'
      },
      {
        studentId: student2.id,
        teacherId: teacher1.id,
        subjectId: math.id,
        value: 12.0,
        maxValue: 20,
        weight: 1.0,
        type: 'EXAM',
        title: 'Examen Final Mathématiques',
        description: 'Examen sur les fonctions et dérivées'
      },
      {
        studentId: student2.id,
        teacherId: teacher1.id,
        subjectId: programming.id,
        value: 15.5,
        maxValue: 20,
        weight: 2.0,
        type: 'PROJECT',
        title: 'Projet de Programmation',
        description: 'Application web en JavaScript'
      }
    ]
  })

  // Créer un bulletin de notes pour un étudiant
  await prisma.report.upsert({
    where: {
      studentId_semester_year: {
        studentId: student1.id,
        semester: 'S1',
        year: '2024'
      }
    },
    update: {},
    create: {
      studentId: student1.id,
      classId: classL3.id,
      semester: 'S1',
      year: '2024',
      average: 16.33,
      rank: 1,
      totalStudents: 2,
      appreciation: 'Excellent travail, continuez ainsi !',
      status: 'PUBLISHED',
      generatedAt: new Date()
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('\n📧 Comptes créés:')
  console.log('Admin: admin@g2c.fr / admin123')
  console.log('Professeur 1: prof@g2c.fr / prof123')
  console.log('Professeur 2: prof.dubois@g2c.fr / prof123')
  console.log('Étudiant 1: etudiant@g2c.fr / etudiant123')
  console.log('Étudiant 2: marie.bernard@student.g2c.fr / etudiant123')
  console.log('Étudiant 3 (en attente): paul.simon@student.g2c.fr / etudiant123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
