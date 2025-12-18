import { CheckCircle, Clock, Mail, Phone } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PendingValidationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <CardTitle className="text-2xl text-amber-600">
              Compte en attente de validation
            </CardTitle>
            <CardDescription className="text-lg">
              Votre inscription a été enregistrée avec succès !
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 mb-2">
                Prochaines étapes :
              </h3>
              <div className="space-y-2 text-sm text-amber-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Votre compte a été créé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>En attente de validation par un administrateur</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Vous recevrez un email de confirmation</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                Que pouvez-vous faire en attendant ?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Explorez les formations</strong> - Découvrez le contenu pédagogique et les spécialisations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Consultez l'équipe pédagogique</strong> - Faites connaissance avec vos futurs professeurs
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Découvrez les projets</strong> - Inspirez-vous des réalisations des anciens étudiants
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Button asChild variant="outline">
                <Link href="/formations">
                  Voir les formations
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/professeurs">
                  Équipe pédagogique
                </Link>
              </Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Délai de validation habituel
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                La validation des comptes étudiants prend généralement <strong>2-3 jours ouvrables</strong>. 
                Nos administrateurs vérifient chaque demande manuellement pour garantir la sécurité de la plateforme.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">
                  Validation urgente ?
                </h4>
                <p className="text-sm text-blue-700 mb-3">
                  Si vous avez besoin d'un accès rapide (rentrée imminente, cours commencés), 
                  contactez directement le secrétariat.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 text-sm">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Mail className="w-4 h-4" />
                    <span>master-g2c@iae-caen.fr</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Phone className="w-4 h-4" />
                    <span>02 31 56 65 00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button asChild>
                <Link href="/">
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
