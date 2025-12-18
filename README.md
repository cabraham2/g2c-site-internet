# G2C - Plateforme Académique du Master G2C

## 🎓 À propos du projet

**Projet de fin d'année - Master 2 G2C**

Cette plateforme a été développée dans le cadre du Master G2C avec pour objectif de moderniser et professionnaliser la gestion académique du master. Le projet répond à plusieurs besoins essentiels :

### 🎯 Objectifs du projet

- **🔐 Souveraineté sur les données** : Reprendre le contrôle des données académiques (évaluations, cours, notes) plutôt que de dépendre uniquement de systèmes externes
- **📊 Gestion autonome des évaluations** : Permettre au master de gérer librement ses propres évaluations et systèmes de notation
- **📚 Centralisation des ressources** : Mettre en ligne et organiser les cours, documents et ressources pédagogiques
- **🤝 Réseau Alumni** : Créer et maintenir un réseau d'anciens étudiants pour favoriser les échanges professionnels
- **👥 Groupes entre étudiants** : Faciliter la collaboration et la communication entre les étudiants actuels
- **💼 Image professionnelle** : Offrir une plateforme moderne et professionnelle qui renforce la notoriété du master
- **🌟 Visibilité et attractivité** : Améliorer la présence en ligne du master pour attirer de nouveaux étudiants

Ce projet représente une étape importante vers l'autonomie numérique et la modernisation du Master G2C, tout en créant une communauté étudiante et alumni plus connectée.

## 🚀 Fonctionnalités

### 🔐 Système d'Authentification & Validation

- **Inscription** : Les utilisateurs peuvent s'inscrire avec validation email
- **Validation d'étudiants** : Les étudiants inscrits doivent être approuvés par un admin/professeur
- **Rôles utilisateurs** : ADMIN, TEACHER, STUDENT, ALUMNI
- **Statuts** : PENDING, APPROVED, REJECTED, SUSPENDED

### 👥 Gestion des Utilisateurs

- **Tableau de bord admin** : Validation des comptes étudiants
- **Profils détaillés** : Informations personnelles et professionnelles
- **Navigation adaptative** : Interface différente selon le rôle et le statut

### 🏫 Gestion Académique

#### Classes & Inscriptions
- **Création de classes** : Organisation par niveau (L3, M1, M2) et année
- **Inscription d'étudiants** : Attribution des étudiants validés aux classes
- **Statistiques** : Suivi des effectifs par classe

#### Matières & Professeurs
- **Gestion des matières** : Création avec coefficients et codes couleur
- **Attribution professeurs** : Assignation des enseignants aux matières par classe
- **Planning flexible** : Gestion multi-classes et multi-matières

### 📝 Système de Notes

#### Attribution des Notes
- **Interface professeur** : Saisie de notes par matière et classe
- **Types d'évaluations** : Devoir, Examen, Projet, Présentation, Participation
- **Coefficients** : Pondération des notes avec poids personnalisables
- **Barème flexible** : Notes sur différents totaux (ex: 15/20, 18/25)

#### Consultation Étudiante
- **Tableau de notes** : Visualisation des notes par matière
- **Moyennes automatiques** : Calcul des moyennes pondérées
- **Historique complet** : Accès à toutes les évaluations

### 📊 Bulletins de Notes

#### Génération Automatique
- **Calculs automatiques** : Moyennes par matière et générale
- **Classements** : Position dans la classe
- **Appréciations** : Commentaires personnalisés

#### Export PDF
- **Téléchargement** : Bulletins au format PDF
- **Mise en page professionnelle** : Design adapté à l'impression
- **Archivage** : Conservation de l'historique des bulletins

## 🛠 Technologies

- **Frontend** : Next.js 15.5.2, React 19, TypeScript
- **Styling** : Tailwind CSS v4, Radix UI Components
- **Backend** : Next.js API Routes, Prisma ORM
- **Base de données** : SQLite (développement), PostgreSQL (production)
- **Authentification** : JWT, bcryptjs
- **Validation** : Zod, React Hook Form

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Configuration

#### 🚀 Installation rapide (recommandé)

1. **Cloner le projet**
```bash
git clone https://github.com/cabraham2/g2c-site-internet.git
cd g2c-site-internet
```

2. **Rendre le script exécutable et lancer**
```bash
chmod +x start.sh
./start.sh
```

Le script `start.sh` s'occupe de tout automatiquement :
- ✅ Vérification de Node.js et npm
- ✅ Installation des dépendances
- ✅ Configuration du fichier .env
- ✅ Génération du client Prisma
- ✅ Création de la base de données
- ✅ Création des dossiers nécessaires
- ✅ Démarrage du serveur

#### ⚡ Installation ultra-rapide (si problème avec Prisma)

```bash
chmod +x quick-start.sh
./quick-start.sh
```

Le script `quick-start.sh` nettoie et réinstalle Prisma complètement.

#### 🔧 Installation manuelle (optionnel)

<details>
<summary>Cliquez pour voir les étapes manuelles</summary>

1. **Installer les dépendances**
```bash
npm install
```

2. **Configuration environnement**
```bash
# Créer le fichier .env
cp .env.example .env

# Configurer les variables
JWT_SECRET=votre_secret_jwt_très_sécurisé
DATABASE_URL="file:./dev.db"
```

3. **Base de données**
```bash
# Générer le client Prisma
npx prisma generate

# Créer la base de données
npx prisma db push

# Insérer les données de test
npm run db:seed
```

4. **Démarrer le serveur**
```bash
npm run dev
```

</details>

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 👤 Comptes de Test

Après le seed, vous pouvez utiliser ces comptes :

### Administrateur
- **Email** : admin@g2c.com
- **Mot de passe** : password123
- **Permissions** : Gestion complète du système

### Professeurs
- **Prof. Martin** : prof.martin@g2c.com / password123
- **Prof. Dubois** : prof.dubois@g2c.com / password123
- **Permissions** : Gestion des notes et validation d'étudiants

### Étudiants
- **Jean Dupont** : jean.dupont@student.g2c.com / password123 (Approuvé)
- **Marie Bernard** : marie.bernard@student.g2c.com / password123 (Approuvé)
- **Paul Simon** : paul.simon@student.g2c.com / password123 (En attente)

## 🔄 Workflow de Validation

1. **Inscription** : Un utilisateur s'inscrit avec le rôle STUDENT
2. **Attente** : Son statut est automatiquement PENDING
3. **Redirection** : Il est redirigé vers `/pending-validation`
4. **Validation** : Un admin/professeur approuve ou rejette le compte
5. **Accès** : L'étudiant approuvé accède à l'interface complète

## 📊 Structure de la Base de Données

### Modèles Principaux

- **User** : Utilisateurs avec rôles et statuts
- **Class** : Classes organisées par niveau/année
- **Subject** : Matières avec coefficients
- **Grade** : Notes avec pondération
- **Report** : Bulletins de notes générés
- **ClassEnrollment** : Inscriptions étudiants-classes
- **TeacherSubject** : Assignations professeurs-matières

### Relations

- Un utilisateur peut être inscrit dans plusieurs classes
- Un professeur peut enseigner plusieurs matières dans plusieurs classes
- Une note lie un étudiant, un professeur et une matière
- Un bulletin compile les notes d'un étudiant pour une période

## 🎯 Architecture

### Pages Principales

```
/                        # Page d'accueil publique
/login                   # Connexion
/register               # Inscription
/dashboard              # Tableau de bord (selon rôle)
/pending-validation     # Page d'attente pour étudiants

# Admin
/admin/users            # Gestion des utilisateurs
/admin/classes          # Gestion des classes
/admin/enrollments      # Inscriptions étudiants

# Professeurs
/teacher/grades         # Gestion des notes

# Étudiants
/student/grades         # Consultation notes et bulletins
```

### API Routes

```
/api/auth/*             # Authentification
/api/admin/*           # Administration
/api/teacher/*         # Gestion professeur
/api/student/*         # Consultation étudiant
```

## 🔧 Configuration Avancée

### Variables d'Environnement

```env
# Sécurité
JWT_SECRET=secret_très_sécurisé_minimum_32_caractères

# Base de données
DATABASE_URL="file:./dev.db"                    # SQLite (dev)
# DATABASE_URL="postgresql://..."               # PostgreSQL (prod)

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe
```

### Production

1. **Base de données PostgreSQL**
```bash
# Modifier DATABASE_URL dans .env
DATABASE_URL="postgresql://user:password@host:port/database"

# Migrer la base
npx prisma migrate deploy
```

2. **Variables de sécurité**
```bash
# Générer un JWT secret fort
openssl rand -base64 32
```

## 🚦 Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur de développement

# Base de données
npx prisma studio        # Interface graphique Prisma
npx prisma migrate dev   # Créer une migration
npx prisma db push       # Appliquer le schéma (dev)
npm run db:seed          # Insérer les données de test

# Production
npm run build            # Build de production
npm start                # Serveur de production
```

## 🎨 Personnalisation

### Thème et Couleurs

Les couleurs des matières et thèmes peuvent être personnalisés via :
- `src/app/globals.css` : Variables CSS
- Base de données : Couleurs des matières dans la table `subjects`

### Composants UI

Les composants sont basés sur Radix UI et peuvent être étendus :
- `src/components/ui/` : Composants de base
- `src/components/` : Composants métier

## 🔒 Sécurité

- **Authentification JWT** : Tokens sécurisés avec expiration
- **Validation des entrées** : Zod pour la validation côté serveur
- **Autorisations** : Middleware de vérification des rôles
- **Hachage des mots de passe** : bcryptjs avec salt

## 📈 Évolutions Futures

### 🎓 Projet pédagogique évolutif

Une des évolutions majeures envisagées est de **transformer cette plateforme en support pédagogique** pour les cours d'informatique du master :

- **Projets Git** : Les étudiants travailleraient sur des branches dédiées pour implémenter de nouvelles fonctionnalités
- **Apprentissage pratique** : Développement sur un projet réel avec des enjeux concrets
- **Validation par les enseignants** : Les professeurs d'informatique revieweraient et valideraient les modifications avant merge
- **Plateforme évolutive** : Chaque promotion contribuerait à l'amélioration du site
- **Continuité pédagogique** : Le site devient un projet vivant qui évolue avec les contributions des étudiants successifs

**Avantages :**
- ✅ Apprentissage sur un cas d'usage réel plutôt que théorique
- ✅ Compréhension du workflow Git en équipe (branches, pull requests, code review)
- ✅ Les étudiants contribuent directement à l'outil qu'ils utilisent
- ✅ Plateforme en constante amélioration grâce aux contributions étudiantes
- ✅ Portfolio concret pour les étudiants avec des contributions visibles

Cela ferait de G2C une **plateforme de test et d'apprentissage collaborative** qui bénéficierait à tous les futurs étudiants du master.

### Phase 2 - Réseau Alumni
- [ ] **Profils Alumni enrichis** : Parcours professionnels, entreprises, postes actuels
- [ ] **Annuaire interactif** : Recherche par promotion, secteur d'activité, entreprise
- [ ] **Mentorat** : Mise en relation étudiants actuels / alumni
- [ ] **Événements alumni** : Gestion des rencontres et networking

### Phase 3 - Collaboration étudiante
- [ ] **Messagerie** : Communication entre étudiants et professeurs
- [ ] **Groupes de travail** : Espaces collaboratifs par projet ou matière
- [ ] **Forums** : Discussions thématiques et entraide

### Phase 4 - Ressources pédagogiques
- [ ] **Bibliothèque de cours** : Dépôt et consultation des supports de cours
- [ ] **Documents partagés** : Ressources pédagogiques accessibles
- [ ] **Planning** : Gestion des emplois du temps

### Phase 5 - Fonctionnalités avancées
- [ ] **Notifications** : Système de notifications en temps réel
- [ ] **Statistiques** : Tableaux de bord analytiques pour le suivi académique
- [ ] **Mobile** : Application mobile React Native
- [ ] **Intégrations** : APIs externes (LMS, LinkedIn, etc.)

## 👥 Équipe

Projet développé dans le cadre du Master 2 G2C - Promotion 2025-2026

## 📝 License

Ce projet est la propriété du Master G2C.

## 📞 Contact

Pour toute question concernant le projet :
- **Master G2C** : [Site officiel](https://www.iae.unicaen.fr/formations-fiche.php?id_diplome=159)
- **GitHub** : [Repository du projet](https://github.com/cabraham2/g2c-site-internet)
- **LinkedIn** : [Clément ABRAHAM](www.linkedin.com/in/clément-abraham-530566164)

---

**Master G2C** - Innovation, autonomie et professionnalisme 🎓✨
