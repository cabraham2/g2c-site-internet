# 🔐 Identifiants de Connexion - G2C Site Internet

## 📋 Comptes de Test

### 👨‍💼 Administrateur
- **Email**: `admin@g2c.fr`
- **Mot de passe**: `admin123`
- **Accès**: Panel admin complet, gestion utilisateurs, validation, classes, inscriptions

---

### 👨‍🏫 Professeur
- **Email**: `prof@g2c.fr`
- **Mot de passe**: `prof123`
- **Accès**: Gestion des notes, visualisation des étudiants

---

### 👨‍🎓 Étudiant
- **Email**: `etudiant@g2c.fr`
- **Mot de passe**: `etudiant123`
- **Accès**: Consultation des notes, profil, documents

---

## 🚀 Comment lancer le projet ?

### Option 1: Script automatique (recommandé)
```bash
./start.sh
```

### Option 2: Script rapide
```bash
./quick-start.sh
```

### Option 3: Manuel
```bash
# 1. Installer les dépendances
npm install

# 2. Générer le client Prisma
npx prisma generate

# 3. Lancer le serveur
npm run dev
```

## 🌐 Accès

Une fois lancé, l'application est accessible sur :
**http://localhost:3000**

## 📝 Notes

- La base de données SQLite est dans `prisma/dev.db`
- Les photos de profil sont stockées dans `public/uploads/profiles/`
- Pour réinitialiser la BDD : `npx prisma migrate reset`
- Pour voir les données : `npx prisma studio`

## ⚠️ Avertissement Hydratation

Si vous voyez un warning d'hydratation React mentionnant `bis_skin_checked` ou `bis_register`, c'est causé par une extension de navigateur (comme Bitwarden). Ce n'est pas un bug de l'application, vous pouvez l'ignorer ou désactiver l'extension sur localhost.

## 🔧 Commandes Utiles

```bash
# Voir la base de données dans un interface graphique
npx prisma studio

# Réinitialiser la BDD avec les données de seed
npx prisma migrate reset

# Créer un nouveau seed
npm run db:seed

# Vérifier les erreurs TypeScript
npm run lint
```

## 📦 Base de données

La base de données contient déjà :
- 3 comptes de test (admin, prof, étudiant)
- 2 promotions (2024 Bachelor, 2025 Master)
- Structure complète pour utilisateurs, classes, inscriptions, notes
