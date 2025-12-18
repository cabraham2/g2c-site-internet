import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migratePromotions() {
  try {
    // Créer les promotions de base
    const promotions = [
      { name: '2024-2026 M1', startYear: '2024', endYear: '2026', level: 'M1' },
      { name: '2024-2026 M2', startYear: '2024', endYear: '2026', level: 'M2' },
      { name: '2023-2025 M1', startYear: '2023', endYear: '2025', level: 'M1' },
      { name: '2023-2025 M2', startYear: '2023', endYear: '2025', level: 'M2' },
      { name: '2022-2024 M1', startYear: '2022', endYear: '2024', level: 'M1' },
      { name: '2022-2024 M2', startYear: '2022', endYear: '2024', level: 'M2' },
      { name: '2021-2023 M1', startYear: '2021', endYear: '2023', level: 'M1' },
      { name: '2021-2023 M2', startYear: '2021', endYear: '2023', level: 'M2' },
      { name: '2020-2022 M1', startYear: '2020', endYear: '2022', level: 'M1' },
      { name: '2020-2022 M2', startYear: '2020', endYear: '2022', level: 'M2' }
    ]

    console.log('Migration des promotions...')
    
    for (const promo of promotions) {
      await prisma.promotion.upsert({
        where: { name: promo.name },
        update: {},
        create: promo
      })
      console.log(`✓ Promotion ${promo.name} créée/mise à jour`)
    }

    // Migrer les utilisateurs existants avec des promotions
    console.log('Migration des utilisateurs existants...')
    
    const users = await prisma.user.findMany({
      where: {
        promotion: {
          not: null
        }
      }
    })

    for (const user of users) {
      if (user.promotion) {
        const promotion = await prisma.promotion.findUnique({
          where: { name: user.promotion }
        })
        
        if (promotion) {
          await prisma.user.update({
            where: { id: user.id },
            data: { 
              promotionId: promotion.id,
              promotion: null // Supprimer l'ancien champ
            }
          })
          console.log(`✓ Utilisateur ${user.firstName} ${user.lastName} migré vers ${promotion.name}`)
        }
      }
    }

    console.log('Migration terminée avec succès!')

  } catch (error) {
    console.error('Erreur lors de la migration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  migratePromotions()
}

export default migratePromotions
