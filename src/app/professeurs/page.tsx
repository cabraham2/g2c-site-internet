export default function ProfesseursPage() {
  const professeurs = [
    {
      name: "Dr. Marie Dubois",
      speciality: "Marketing Digital",
      image: "/placeholder-prof.jpg",
      description: "Experte en stratégies digitales avec 15 ans d'expérience dans l'e-commerce.",
      contact: "marie.dubois@iae-caen.fr"
    },
    {
      name: "Prof. Jean Martin",
      speciality: "Gestion Commerciale", 
      image: "/placeholder-prof.jpg",
      description: "Ancien directeur commercial, spécialiste en négociation et développement commercial.",
      contact: "jean.martin@iae-caen.fr"
    },
    {
      name: "Dr. Sophie Leroy",
      speciality: "Management",
      image: "/placeholder-prof.jpg",
      description: "Consultante en management, experte en leadership et gestion d'équipes.",
      contact: "sophie.leroy@iae-caen.fr"
    },
    {
      name: "Prof. Pierre Durand",
      speciality: "Finance d'Entreprise",
      image: "/placeholder-prof.jpg",
      description: "Expert-comptable et contrôleur de gestion, spécialiste en analyse financière.",
      contact: "pierre.durand@iae-caen.fr"
    },
    {
      name: "Dr. Anne Moreau",
      speciality: "Droit des Affaires",
      image: "/placeholder-prof.jpg",
      description: "Avocate en droit commercial, spécialisée dans les contrats d'entreprise.",
      contact: "anne.moreau@iae-caen.fr"
    },
    {
      name: "Prof. Luc Bernard",
      speciality: "Commerce International",
      image: "/placeholder-prof.jpg",
      description: "Consultant en développement international, expert des marchés européens.",
      contact: "luc.bernard@iae-caen.fr"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Équipe Pédagogique
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Découvrez nos professeurs et leurs domaines d'expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professeurs.map((prof, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {prof.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {prof.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {prof.speciality}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {prof.description}
                </p>
                <div className="text-sm text-gray-500">
                  <p>{prof.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Coordonnées du secrétariat
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Secrétariat Master G2C
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>IAE de Caen</p>
                <p>3 Rue Claude Bloch</p>
                <p>14000 Caen</p>
                <p>Tél: 02 31 56 65 00</p>
                <p>Email: master-g2c@iae-caen.fr</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Horaires d'ouverture
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Lundi - Vendredi: 9h00 - 17h00</p>
                <p>Samedi: 9h00 - 12h00</p>
                <p>Dimanche: Fermé</p>
                <br />
                <p className="text-sm text-blue-600">
                  Rendez-vous sur demande
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
