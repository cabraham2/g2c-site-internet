import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  FileText, 
  Globe, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  ArrowRight
} from "lucide-react";

const prerequisites = {
  m1: {
    title: "Master 1 - Gestion et Commerce",
    requirements: [
      {
        category: "Diplôme requis",
        items: [
          "Licence (Bac+3) en gestion, économie, commerce ou équivalent",
          "Licence dans d'autres domaines avec solides bases en gestion",
          "Diplôme étranger équivalent reconnu"
        ]
      },
      {
        category: "Niveau académique",
        items: [
          "Moyenne générale de 12/20 minimum sur la licence",
          "Mention recommandée (Assez Bien minimum)",
          "Classement dans le premier tiers de la promotion"
        ]
      },
      {
        category: "Compétences linguistiques",
        items: [
          "Niveau B2 minimum en anglais",
          "TOEIC 785+ recommandé",
          "Seconde langue vivante appréciée"
        ]
      }
    ]
  },
  m2: {
    title: "Master 2 - Spécialisations",
    requirements: [
      {
        category: "Diplôme requis",
        items: [
          "Master 1 en gestion, commerce ou équivalent",
          "École de commerce (niveau Bac+4)",
          "Diplôme étranger équivalent"
        ]
      },
      {
        category: "Niveau académique",
        items: [
          "Moyenne générale de 13/20 minimum en M1",
          "Mention Bien recommandée",
          "Projet professionnel défini"
        ]
      },
      {
        category: "Compétences linguistiques",
        items: [
          "Niveau B2/C1 en anglais obligatoire",
          "TOEIC 850+ pour Commerce International",
          "Expérience internationale appréciée"
        ]
      }
    ]
  }
};

const applicationProcess = [
  {
    step: 1,
    title: "Candidature en ligne",
    description: "Dépôt du dossier sur la plateforme eCandidat",
    deadline: "30 avril 2025",
    icon: FileText
  },
  {
    step: 2,
    title: "Étude du dossier",
    description: "Examen par la commission pédagogique",
    deadline: "15 mai 2025",
    icon: Users
  },
  {
    step: 3,
    title: "Entretien",
    description: "Entretien de motivation (si sélectionné)",
    deadline: "20-25 mai 2025",
    icon: Calendar
  },
  {
    step: 4,
    title: "Résultats",
    description: "Communication des résultats",
    deadline: "30 mai 2025",
    icon: CheckCircle
  }
];

const requiredDocuments = [
  "CV détaillé",
  "Lettre de motivation",
  "Relevés de notes des 3 dernières années",
  "Diplômes obtenus",
  "Certificat de niveau d'anglais (TOEIC, TOEFL, IELTS...)",
  "Attestations de stage ou d'expérience professionnelle",
  "Deux lettres de recommandation",
  "Copie pièce d'identité"
];

export default function PrerequisitesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Prérequis & Admission
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez les conditions d'admission et préparez votre candidature
            </p>
          </div>
        </div>
      </section>

      {/* Prerequisites by Level */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Conditions d'admission par niveau
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Master 1 */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2" />
                  {prerequisites.m1.title}
                </CardTitle>
                <CardDescription>
                  Première année du Master - Formation généraliste
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {prerequisites.m1.requirements.map((requirement, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {requirement.category}
                    </h4>
                    <ul className="space-y-2">
                      {requirement.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 ml-6">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Master 2 */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2" />
                  {prerequisites.m2.title}
                </CardTitle>
                <CardDescription>
                  Seconde année du Master - Spécialisations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {prerequisites.m2.requirements.map((requirement, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {requirement.category}
                    </h4>
                    <ul className="space-y-2">
                      {requirement.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 ml-6">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Calendrier de candidature 2025
            </h2>
            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-md">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Candidatures ouvertes jusqu'au 30 avril 2025</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationProcess.map((process) => (
              <Card key={process.step} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <process.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg">
                    Étape {process.step}
                  </CardTitle>
                  <CardDescription className="font-medium text-blue-600">
                    {process.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {process.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {process.deadline}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pièces justificatives à fournir
            </h2>
            <p className="text-lg text-gray-600">
              Documents obligatoires pour constituer votre dossier
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Liste des documents requis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requiredDocuments.map((document, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{document}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">
                      Important
                    </h4>
                    <p className="text-sm text-blue-700">
                      Tous les documents doivent être fournis en français ou traduits par un traducteur assermenté. 
                      Les dossiers incomplets ne seront pas examinés.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Questions sur votre candidature ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Notre équipe est là pour vous accompagner dans votre projet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/faq">
                Consulter la FAQ
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Nous contacter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
