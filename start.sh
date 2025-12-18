#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   🚀 Démarrage G2C Site Internet${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Vérification de Node.js
echo -e "${YELLOW}🔍 Vérification de Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"
echo ""

# Vérification de npm
echo -e "${YELLOW}🔍 Vérification de npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm --version)${NC}"
echo ""

# Installation des dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installation des dépendances...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors de l'installation des dépendances${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Dépendances installées${NC}"
    echo ""
else
    echo -e "${GREEN}✅ Dépendances déjà installées${NC}"
    echo ""
fi

# Vérification du fichier .env
echo -e "${YELLOW}🔍 Vérification de la configuration...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Fichier .env manquant${NC}"
    if [ -f ".env.example" ]; then
        echo -e "${BLUE}Copie de .env.example vers .env...${NC}"
        cp .env.example .env
        echo -e "${YELLOW}⚠️  Pensez à configurer votre fichier .env${NC}"
    else
        echo -e "${RED}❌ Aucun fichier .env.example trouvé${NC}"
        echo -e "${YELLOW}Création d'un fichier .env basique...${NC}"
        cat > .env << EOF
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (changez cette valeur en production)
JWT_SECRET="votre-secret-jwt-super-securise-changez-moi"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF
        echo -e "${GREEN}✅ Fichier .env créé${NC}"
    fi
    echo ""
else
    echo -e "${GREEN}✅ Fichier .env présent${NC}"
    echo ""
fi

# Génération du client Prisma
echo -e "${YELLOW}🔧 Génération du client Prisma...${NC}"
npx prisma generate --schema=./prisma/schema.prisma
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors de la génération du client Prisma${NC}"
    echo -e "${YELLOW}💡 Essayez: rm -rf node_modules && npm install${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Client Prisma généré${NC}"
echo ""

# Migration de la base de données
echo -e "${YELLOW}🗄️  Vérification de la base de données...${NC}"
if [ -f "prisma/dev.db" ]; then
    echo -e "${GREEN}✅ Base de données existante trouvée${NC}"
else
    echo -e "${BLUE}Création de la base de données...${NC}"
    npx prisma migrate deploy
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}⚠️  Erreur de migration${NC}"
    fi
fi
echo ""

# Création du dossier uploads si nécessaire
echo -e "${YELLOW}📁 Vérification des dossiers nécessaires...${NC}"
mkdir -p public/uploads/profiles
echo -e "${GREEN}✅ Dossiers créés${NC}"
echo ""

# Affichage des identifiants
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}   📋 Identifiants de connexion${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}👨‍💼 Admin:${NC}     admin@g2c.fr / admin123"
echo -e "${YELLOW}👨‍🏫 Prof:${NC}      prof@g2c.fr / prof123"
echo -e "${YELLOW}👨‍🎓 Étudiant:${NC}  etudiant@g2c.fr / etudiant123"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Démarrage du serveur de développement
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}   ✨ Démarrage du serveur de développement...${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}🌐 L'application sera disponible sur :${NC}"
echo -e "${BLUE}   http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}⚡ Appuyez sur Ctrl+C pour arrêter le serveur${NC}"
echo ""

npm run dev
