import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, BookOpen } from "lucide-react";

const professors = [
  {
    id: 1,
    name: "Dr. Marie Dubois",
    title: "Professeure en Commerce International",
    specializations: ["Négociation internationale", "Marketing global", "Stratégie export"],
    email: "marie.dubois@unicaen.fr",
    linkedin: "marie-dubois-prof",
    image: "/api/placeholder/150/150",
    bio: "15 ans d'expérience en conseil en commerce international. Ancienne directrice export chez Renault."
  },
  {
    id: 2,
    name: "Prof. Jean-Pierre Martin",
    title: "Professeur en Gestion Financière",
    specializations: ["Finance d'entreprise", "Contrôle de gestion", "Analyse financière"],
    email: "jp.martin@unicaen.fr",
    linkedin: "jean-pierre-martin",
    image: "/api/placeholder/150/150",
    bio: "Expert-comptable et commissaire aux comptes. 20 ans en cabinet avant l'enseignement."
  },
  {
    id: 3,
    name: "Dr. Sophie Laurent",
    title: "Maître de Conférences en Management",
    specializations: ["Leadership", "Management d'équipe", "Innovation"],
    email: "sophie.laurent@unicaen.fr",
    linkedin: "sophie-laurent-management",
    image: "/api/placeholder/150/150",
    bio: "Consultante en transformation organisationnelle. Spécialiste du management agile."
  },
  {
    id: 4,
    name: "Prof. Michel Rousseau",
    title: "Professeur en Droit des Affaires",
    specializations: ["Droit commercial", "Droit international", "Propriété intellectuelle"],
    email: "michel.rousseau@unicaen.fr",
    linkedin: "michel-rousseau-droit",
    image: "/api/placeholder/150/150",
    bio: "Avocat au barreau de Paris. Spécialiste des contrats internationaux."
  },
  {
    id: 5,
    name: "Dr. Claire Moreau",
    title: "Maître de Conférences en Logistique",
    specializations: ["Supply Chain", "Logistique internationale", "E-commerce"],
    email: "claire.moreau@unicaen.fr",
    linkedin: "claire-moreau-logistique",
    image: "/api/placeholder/150/150",
    bio: "15 ans chez Amazon en tant que directrice logistique Europe."
  },
  {
    id: 6,
    name: "Prof. Thomas Leroy",
    title: "Professeur en Entrepreneuriat",
    specializations: ["Création d'entreprise", "Business Model", "Financement"],
    email: "thomas.leroy@unicaen.fr",
    linkedin: "thomas-leroy-entrepreneur",
    image: "/api/placeholder/150/150",
    bio: "Serial entrepreneur. Fondateur de 3 startups dont 2 vendues avec succès."
  }
];

export default function ProfessorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Notre Équipe Pédagogique
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des professeurs-chercheurs et professionnels reconnus qui allient excellence académique 
            et expertise terrain pour vous offrir une formation de qualité.
          </p>
        </div>

        {/* Professeurs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professors.map((professor) => (
            <Card key={professor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {professor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <CardTitle className="text-lg">{professor.name}</CardTitle>
                <CardDescription className="text-blue-600 font-medium">
                  {professor.title}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {professor.bio}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Spécialisations :</h4>
                  <div className="flex flex-wrap gap-1">
                    {professor.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-2">
                  <a
                    href={`mailto:${professor.email}`}
                    className="flex items-center text-gray-600 hover:text-blue-600"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://linkedin.com/in/${professor.linkedin}`}
                    className="flex items-center text-gray-600 hover:text-blue-600"
                    title="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Intéressé par nos formations ?
          </h2>
          <p className="text-blue-100 mb-6">
            Découvrez nos programmes et rejoignez une communauté d'excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/programs"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Voir les formations
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
