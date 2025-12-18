import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Users,
  Award,
  ExternalLink,
  TrendingUp,
  Globe,
  Lightbulb,
  Target
} from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "NormandyExport - Plateforme d'export régional",
    description: "Développement d'une plateforme digitale pour accompagner les PME normandes dans leur stratégie export.",
    category: "Commerce International",
    year: "2024",
    team: ["Marie Dupont", "Thomas Martin", "Sarah Chen", "Alex Dubois"],
    partner: "Région Normandie",
    technologies: ["Next.js", "PostgreSQL", "Stripe"],
    results: [
      "50+ entreprises accompagnées",
      "15 nouveaux marchés identifiés",
      "Augmentation de 30% des exports"
    ],
    image: "/api/placeholder/400/250",
    status: "Déployé"
  },
  {
    id: 2,
    title: "Green Supply Chain Analytics",
    description: "Solution d'analyse et d'optimisation des chaînes logistiques pour réduire l'empreinte carbone.",
    category: "Logistique & Environnement",
    year: "2024",
    team: ["Julie Rousseau", "Kevin Lefebvre", "Emma Wilson"],
    partner: "Renault Trucks",
    technologies: ["Python", "Tableau", "IoT Sensors"],
    results: [
      "Réduction de 25% des émissions CO2",
      "Économies de 150K€/an",
      "Certification ISO 14001"
    ],
    image: "/api/placeholder/400/250",
    status: "En production"
  },
  {
    id: 3,
    title: "FinTech Caen - Néobanque étudiante",
    description: "Application mobile de gestion financière dédiée aux étudiants avec fonctionnalités d'épargne et de budget.",
    category: "Finance & Innovation",
    year: "2023",
    team: ["Paul Leclerc", "Camille Moreau", "Lucas Bernard"],
    partner: "Crédit Agricole Normandie",
    technologies: ["React Native", "Node.js", "Blockchain"],
    results: [
      "2000+ utilisateurs actifs",
      "Économies moyennes de 200€/mois",
      "Prix Innovation Fintech 2023"
    ],
    image: "/api/placeholder/400/250",
    status: "Primé"
  }
];

const projectCategories = [
  {
    name: "Commerce International",
    count: 12,
    color: "bg-blue-100 text-blue-800",
    icon: Globe
  },
  {
    name: "Finance & Innovation",
    count: 8,
    color: "bg-green-100 text-green-800",
    icon: TrendingUp
  },
  {
    name: "Management & RH",
    count: 6,
    color: "bg-purple-100 text-purple-800",
    icon: Users
  },
  {
    name: "Entrepreneuriat",
    count: 10,
    color: "bg-orange-100 text-orange-800",
    icon: Lightbulb
  },
  {
    name: "Consulting",
    count: 9,
    color: "bg-red-100 text-red-800",
    icon: Target
  }
];

const achievements = [
  {
    number: "45+",
    label: "Projets réalisés",
    description: "Depuis 2020"
  },
  {
    number: "30+",
    label: "Entreprises partenaires",
    description: "PME et grands groupes"
  },
  {
    number: "85%",
    label: "Projets menés à terme",
    description: "Taux de réussite"
  },
  {
    number: "5",
    label: "Prix & distinctions",
    description: "Reconnaissance nationale"
  }
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Projets Étudiants
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez les réalisations concrètes de nos étudiants en partenariat avec des entreprises
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {achievement.label}
                </div>
                <div className="text-sm text-gray-600">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Domaines d'expertise
            </h2>
            <p className="text-lg text-gray-600">
              Nos étudiants travaillent sur des projets variés et innovants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {projectCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <category.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <Badge className={category.color}>
                    {category.count} projets
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Projets Remarquables
            </h2>
            <p className="text-lg text-gray-600">
              Sélection de projets ayant marqué notre formation
            </p>
          </div>

          <div className="space-y-12">
            {featuredProjects.map((project, index) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`md:flex ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2">
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-500">Image du projet</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{project.category}</Badge>
                      <Badge 
                        className={
                          project.status === 'Primé' ? 'bg-yellow-100 text-yellow-800' :
                          project.status === 'Déployé' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {project.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Année
                        </h4>
                        <p className="text-sm text-gray-600">{project.year}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Équipe
                        </h4>
                        <p className="text-sm text-gray-600">
                          {project.team.join(', ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Partenaire
                      </h4>
                      <p className="text-sm text-blue-600 font-medium">
                        {project.partner}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Résultats
                      </h4>
                      <ul className="space-y-1">
                        {project.results.map((result, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <Award className="w-3 h-3 mr-2 text-green-500" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Intéressé par nos projets ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez notre formation et participez à des projets concrets avec des entreprises
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/programs">
                Découvrir la formation
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Partenariat entreprise
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
