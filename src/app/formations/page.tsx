export default function FormationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Formations du Master G2C
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Découvrez les formations proposées dans le cadre du Master Gestion et Commerce
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Marketing Digital
            </h3>
            <p className="text-gray-600 mb-4">
              Stratégies digitales, réseaux sociaux, e-commerce et transformation numérique des entreprises.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• SEO/SEA</li>
              <li>• Analytics</li>
              <li>• Social Media</li>
              <li>• E-commerce</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Gestion Commerciale
            </h3>
            <p className="text-gray-600 mb-4">
              Techniques de vente, négociation, relation client et développement commercial.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Négociation commerciale</li>
              <li>• CRM</li>
              <li>• Business Development</li>
              <li>• Gestion de portefeuille</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Management
            </h3>
            <p className="text-gray-600 mb-4">
              Leadership, gestion d'équipes, stratégie d'entreprise et management de projets.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Leadership</li>
              <li>• Gestion d'équipes</li>
              <li>• Stratégie</li>
              <li>• Gestion de projets</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Finance d'Entreprise
            </h3>
            <p className="text-gray-600 mb-4">
              Analyse financière, contrôle de gestion, budget et pilotage de la performance.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Analyse financière</li>
              <li>• Contrôle de gestion</li>
              <li>• Budget prévisionnel</li>
              <li>• Tableaux de bord</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Droit des Affaires
            </h3>
            <p className="text-gray-600 mb-4">
              Aspects juridiques du commerce, contrats, propriété intellectuelle et réglementation.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Droit commercial</li>
              <li>• Contrats</li>
              <li>• Propriété intellectuelle</li>
              <li>• Réglementation</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              International
            </h3>
            <p className="text-gray-600 mb-4">
              Commerce international, export, marchés étrangers et développement à l'international.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Commerce international</li>
              <li>• Export</li>
              <li>• Marchés étrangers</li>
              <li>• Négociation interculturelle</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Structure du Master
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Master 1 (M1)</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Fondamentaux du commerce et de la gestion</li>
                <li>• Marketing et communication</li>
                <li>• Comptabilité et finance</li>
                <li>• Droit des affaires</li>
                <li>• Stage de 3 mois minimum</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Master 2 (M2)</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Spécialisation avancée</li>
                <li>• Management stratégique</li>
                <li>• Projet professionnel</li>
                <li>• Mémoire de recherche</li>
                <li>• Stage de 6 mois ou alternance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
