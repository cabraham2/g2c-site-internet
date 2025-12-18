import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Target, Users, Award, BookOpen, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos de G2C
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              École supérieure d'excellence dédiée à former les leaders de demain dans un monde en constante évolution.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  <span>Notre Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  G2C s'engage à fournir une éducation de qualité supérieure qui prépare nos étudiants 
                  à exceller dans leurs domaines respectifs. Nous cultivons l'innovation, la créativité 
                  et l'esprit critique pour former des professionnels compétents et éthiques.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-purple-600" />
                  <span>Notre Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Être reconnue comme une institution d'enseignement supérieur de référence, 
                  formant des diplômés capables de relever les défis du monde moderne et 
                  de contribuer positivement au développement de la société.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre approche éducative et notre engagement envers nos étudiants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                Nous visons l'excellence dans tous nos programmes et services, 
                en maintenant les plus hauts standards académiques.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                Nous favorisons un environnement collaboratif où étudiants, 
                professeurs et partenaires travaillent ensemble.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Nous embrassons l'innovation pédagogique et technologique 
                pour préparer nos étudiants au monde de demain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Histoire</h2>
            
            <Card>
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Fondée en 2010, G2C (Graduate to Career) a vu le jour avec une vision claire : 
                    créer un pont entre l'enseignement supérieur et le monde professionnel. 
                    Notre approche unique combine formation théorique rigoureuse et expérience pratique 
                    pour garantir l'employabilité de nos diplômés.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Au fil des années, nous avons développé des partenariats solides avec des entreprises 
                    leaders dans différents secteurs, permettant à nos étudiants de bénéficier de stages, 
                    de projets concrets et d'opportunités d'emploi privilégiées.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Aujourd'hui, G2C compte plus de 2000 diplômés qui occupent des postes clés 
                    dans des entreprises nationales et internationales, témoignant de la qualité 
                    de notre formation et de notre engagement envers la réussite de nos étudiants.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chiffres Clés */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">G2C en Chiffres</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2000+</div>
              <div className="text-gray-600">Diplômés</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Taux d'insertion</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-gray-600">Entreprises partenaires</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Professeurs experts</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
