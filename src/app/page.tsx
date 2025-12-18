import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Award,
  MapPin,
  Calendar,
  BookOpen
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Master <span className="text-blue-600">G2C</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-4">
              Gestion et Commerce
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              IAE de Caen - Formation d'excellence en management et commerce international
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/login">
                  Accéder à l'intranet
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#presentation">
                  En savoir plus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation Section */}
      <section id="presentation" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Le Master G2C
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une formation de haut niveau qui prépare les futurs managers aux défis 
              du commerce international et de la gestion d'entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Formation d'Excellence</CardTitle>
                <CardDescription>
                  Un cursus rigoureux combinant théorie et pratique professionnelle
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Réseau Alumni</CardTitle>
                <CardDescription>
                  Un réseau de diplômés actif dans les plus grandes entreprises
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Briefcase className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Insertion Professionnelle</CardTitle>
                <CardDescription>
                  95% d'insertion professionnelle dans les 6 mois suivant le diplôme
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Spécialisations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Spécialisations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Commerce International</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Négociation internationale</li>
                  <li>• Marketing global</li>
                  <li>• Logistique internationale</li>
                  <li>• Droit du commerce international</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Management & Gestion</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Gestion financière</li>
                  <li>• Management d'équipe</li>
                  <li>• Stratégie d'entreprise</li>
                  <li>• Innovation & Entrepreneuriat</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Infos Pratiques */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Informations Pratiques
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Localisation</h3>
              <p className="text-gray-600">
                IAE de Caen<br />
                3 Rue Claude Bloch<br />
                14000 Caen, France
              </p>
            </div>

            <div className="text-center">
              <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Durée</h3>
              <p className="text-gray-600">
                2 ans (4 semestres)<br />
                Formation en alternance possible<br />
                Stage de 6 mois en entreprise
              </p>
            </div>

            <div className="text-center">
              <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Admission</h3>
              <p className="text-gray-600">
                Bac+3 validé<br />
                Dossier + Entretien<br />
                Score TOEIC requis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl mb-8">
            Étudiants, Alumni, Professeurs - Connectez-vous sur notre plateforme
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                S'inscrire
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/alumni">
                Réseau Alumni
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
