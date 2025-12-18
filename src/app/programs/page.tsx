import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Users, 
  Award, 
  TrendingUp,
  Globe,
  Briefcase,
  Calendar,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const programs = [
  {
    id: 1,
    title: "Master 1 - Gestion et Commerce",
    description: "Première année du master axée sur les fondamentaux du management et du commerce international.",
    duration: "1 an",
    students: "30 étudiants",
    level: "Bac+4",
    type: "Formation initiale",
    modules: [
      "Management général",
      "Marketing international", 
      "Droit des affaires",
      "Comptabilité-gestion",
      "Langues vivantes",
      "Négociation commerciale"
    ]
  },
  {
    id: 2,
    title: "Master 2 - Commerce International",
    description: "Spécialisation en commerce international avec stage obligatoire de 6 mois en entreprise.",
    duration: "1 an",
    students: "25 étudiants",
    level: "Bac+5",
    type: "Formation initiale/Alternance",
    modules: [
      "Stratégie export",
      "Logistique internationale",
      "Finance internationale",
      "Négociation interculturelle",
      "E-business",
      "Projet professionnel"
    ]
  },
  {
    id: 3,
    title: "Master 2 - Management & Gestion",
    description: "Spécialisation en management d'entreprise et gestion financière avec possibilité d'alternance.",
    duration: "1 an", 
    students: "25 étudiants",
    level: "Bac+5",
    type: "Formation initiale/Alternance",
    modules: [
      "Contrôle de gestion",
      "Management d'équipe",
      "Stratégie d'entreprise",
      "Innovation & Entrepreneuriat",
      "Audit et conseil",
      "Mémoire professionnel"
    ]
  }
];

const advantages = [
  {
    icon: Award,
    title: "Diplôme reconnu",
    description: "Master délivré par l'Université de Caen Normandie, grade de Master reconnu par l'État"
  },
  {
    icon: Briefcase,
    title: "Insertion professionnelle",
    description: "95% d'insertion dans les 6 mois - Salaires moyens de 35K€ à 45K€"
  },
  {
    icon: Globe,
    title: "International",
    description: "Partenariats avec 15 universités étrangères - Stages à l'international possibles"
  },
  {
    icon: Users,
    title: "Réseau Alumni",
    description: "Plus de 500 diplômés dans les plus grandes entreprises françaises et internationales"
  }
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Nos Formations
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Des programmes d'excellence pour former les managers et commerciaux de demain
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Programmes
            </h2>
            <p className="text-lg text-gray-600">
              Un cursus progressif sur 2 ans avec spécialisation en M2
            </p>
          </div>

          <div className="space-y-8">
            {programs.map((program, index) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={index === 0 ? "secondary" : "default"}>
                          {program.type}
                        </Badge>
                        <Badge variant="outline">{program.level}</Badge>
                      </div>
                      <CardTitle className="text-2xl text-blue-900">
                        {program.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {program.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">{program.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          <span className="text-sm">{program.students}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">Sept - Juin</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                  
                  <div className="md:w-1/3 bg-gray-50 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Modules principaux</h4>
                    <div className="space-y-2">
                      {program.modules.map((module, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {module}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir le Master G2C ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <advantage.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Processus d'admission
            </h2>
            <p className="text-lg text-gray-600">
              Un processus sélectif pour garantir la qualité de la formation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Candidature</h3>
              <p className="text-gray-600 text-sm">
                Dossier de candidature avec relevés de notes, CV et lettre de motivation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Entretien</h3>
              <p className="text-gray-600 text-sm">
                Entretien de motivation avec l'équipe pédagogique (30 minutes)
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Admission</h3>
              <p className="text-gray-600 text-sm">
                Réponse sous 15 jours et confirmation d'inscription
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à candidater ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez notre prochaine promotion et donnez un élan à votre carrière
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/prerequisites">
                Voir les prérequis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
