export default function PrerequisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Prérequis et Admission
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Conditions d'admission au Master Gestion et Commerce (G2C)
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Master 1 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Master 1 (M1)
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Diplômes requis
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Licence en Économie-Gestion</li>
                  <li>• Licence en Commerce/Marketing</li>
                  <li>• Licence AES (Administration Économique et Sociale)</li>
                  <li>• Licence LEA (Langues Étrangères Appliquées)</li>
                  <li>• Bachelor en Management</li>
                  <li>• Autres licences avec validation d'acquis</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Compétences recommandées
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Bases en économie et gestion</li>
                  <li>• Anglais niveau B2 minimum</li>
                  <li>• Mathématiques et statistiques</li>
                  <li>• Capacités rédactionnelles</li>
                  <li>• Esprit d'analyse et de synthèse</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Moyenne minimum
                </h4>
                <p className="text-blue-800 text-sm">
                  12/20 minimum en licence recommandé
                </p>
              </div>
            </div>
          </div>

          {/* Master 2 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Master 2 (M2)
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Diplômes requis
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Master 1 en Gestion/Commerce</li>
                  <li>• Master 1 en Marketing</li>
                  <li>• Master 1 en Management</li>
                  <li>• Master 1 en Finance</li>
                  <li>• Diplôme d'école de commerce (Bac+4)</li>
                  <li>• Validation d'acquis professionnels</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Expérience professionnelle
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Stage minimum 3 mois en entreprise</li>
                  <li>• Expérience commerciale appréciée</li>
                  <li>• Projet professionnel défini</li>
                  <li>• Capacité à travailler en équipe</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">
                  Sélectivité
                </h4>
                <p className="text-green-800 text-sm">
                  Admission sur dossier et entretien
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Processus d'admission */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Processus d'Admission
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Candidature</h3>
              <p className="text-sm text-gray-600">
                Dépôt du dossier via Parcoursup (M1) ou e-candidat (M2)
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Étude du dossier</h3>
              <p className="text-sm text-gray-600">
                Examen des notes, CV, lettre de motivation et recommandations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Entretien</h3>
              <p className="text-sm text-gray-600">
                Entretien de motivation avec l'équipe pédagogique (M2 uniquement)
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Admission</h3>
              <p className="text-sm text-gray-600">
                Résultat et inscription administrative
              </p>
            </div>
          </div>
        </div>

        {/* Calendrier */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Calendrier des Admissions 2024-2025
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Master 1</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ouverture Parcoursup</span>
                  <span className="font-medium">17 janvier 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fin des candidatures</span>
                  <span className="font-medium">14 mars 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Réponses</span>
                  <span className="font-medium">30 mai - 12 juillet</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Master 2</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ouverture e-candidat</span>
                  <span className="font-medium">1er février 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fin des candidatures</span>
                  <span className="font-medium">31 mars 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entretiens</span>
                  <span className="font-medium">Avril - Mai 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Résultats</span>
                  <span className="font-medium">15 juin 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Besoin d'aide ?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Service Admissions
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Email: admissions@iae-caen.fr</p>
                <p>Tél: 02 31 56 65 00</p>
                <p>Permanences: Lundi-Vendredi 9h-17h</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Responsable Pédagogique
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Dr. Marie Dubois</p>
                <p>Email: marie.dubois@iae-caen.fr</p>
                <p>Rendez-vous sur demande</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
