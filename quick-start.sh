#!/bin/bash

# Script rapide sans vérifications iCloud
echo "🚀 Démarrage rapide G2C Site Internet"
echo ""

# Nettoyage complet
echo "🧹 Nettoyage des anciens fichiers..."
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client

echo ""
echo "📦 Réinstallation de Prisma Client..."
npm install @prisma/client --force

echo ""
echo "🔧 Génération du client Prisma..."
npx prisma generate --schema=./prisma/schema.prisma

echo ""
echo "🗄️  Vérification de la base de données..."
npx prisma migrate deploy

echo ""
echo "✅ Prêt ! Lancement du serveur..."
echo ""
npm run dev
