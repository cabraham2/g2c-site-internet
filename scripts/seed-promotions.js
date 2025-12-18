#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedPromotions() {
  try {
    console.log('🌱 Ajout des promotions de base...');

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
    ];

    for (const promo of promotions) {
      try {
        await prisma.promotion.create({
          data: promo
        });
        console.log(`✅ Promotion ${promo.name} créée`);
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`⚠️  Promotion ${promo.name} existe déjà`);
        } else {
          console.error(`❌ Erreur pour ${promo.name}:`, error.message);
        }
      }
    }

    console.log('✨ Seed des promotions terminé!');

  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPromotions();
