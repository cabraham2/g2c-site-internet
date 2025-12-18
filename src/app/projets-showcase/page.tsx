export default function ProjetShowcasePage() {
  const projets = [
    {
      title: "E-commerce Bio Local",
      category: "Marketing Digital",
      year: "2023",
      description: "Développement d'une plateforme e-commerce pour les producteurs locaux bio de Normandie.",
      technologies: ["Next.js", "Stripe", "PostgreSQL"],
      image: "/placeholder-project.jpg",
      equipe: ["Sarah M.", "Thomas L.", "Julie R."]
    },
    {
      title: "Application Mobile de Gestion RH",
      category: "Management",
      year: "2023",
      description: "Application mobile pour la gestion des ressources humaines dans les PME.",
      technologies: ["React Native", "Firebase", "Node.js"],
      image: "/placeholder-project.jpg",
      equipe: ["Alex D.", "Marie K.", "Pierre B."]
    },
    {
      title: "Stratégie Export Asie",
      category: "Commerce International",
      year: "2022",
      description: "Étude de marché et stratégie d'expansion pour une entreprise française en Asie.",
      technologies: ["Market Research", "Business Plan", "Cultural Analysis"],
      image: "/placeholder-project.jpg",
      equipe: ["Léa F.", "Hugo M.", "Camille T."]
    },
    {
      title: "Fintech Startup",
      category: "Finance",
      year: "2022",
      description: "Développement d'une solution fintech pour l'épargne automatisée des jeunes.",
      technologies: ["React", "Python", "Machine Learning"],
      image: "/placeholder-project.jpg",
      equipe: ["Nicolas V.", "Emma L.", "Maxime D."]
    },
    {
      title: "Marketplace B2B",
      category: "Gestion Commerciale",
      year: "2023",
      description: "Plateforme de mise en relation entre fournisseurs et distributeurs.",
      technologies: ["Vue.js", "Laravel", "MySQL"],
      image: "/placeholder-project.jpg",
      equipe: ["Sophie R.", "Antoine M.", "Clara N."]
    },
    {
      title: "Audit RSE Digital",
      category: "Management",
      year: "2022",
      description: "Outil d'audit et de suivi des pratiques RSE pour les entreprises.",
      technologies: ["Angular", "Spring Boot", "MongoDB"],
      image: "/placeholder-project.jpg",
      equipe: ["Océane P.", "Julien C.", "Mathilde L."]
    }
  ]

  const categories = ["Tous", "Marketing Digital", "Management", "Commerce International", "Finance", "Gestion Commerciale"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Projets Étudiants
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Découvrez les projets réalisés par nos étudiants du Master G2C
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projets.map((projet, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {projet.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{projet.year}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {projet.title}
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {projet.category}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {projet.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {projet.technologies.map((tech, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Équipe:</h4>
                  <p className="text-sm text-gray-600">
                    {projet.equipe.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Soumettre votre projet
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Vous êtes étudiant du Master G2C et souhaitez présenter votre projet ? 
                Contactez-nous pour l'ajouter à notre showcase.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Critères de sélection :</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Projet réalisé dans le cadre du Master G2C</li>
                  <li>Innovation ou originalité</li>
                  <li>Impact potentiel</li>
                  <li>Qualité de réalisation</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Contact
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: projets@master-g2c.iae-caen.fr</p>
                <p>Tél: 02 31 56 65 12</p>
                <br />
                <p className="text-xs text-gray-500">
                  Délai de traitement: 2-3 semaines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
