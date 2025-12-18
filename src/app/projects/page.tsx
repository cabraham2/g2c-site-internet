import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Clock, 
  Users, 
  Flag,
  Plus,
  CheckCircle,
  AlertCircle,
  Timer,
  User
} from 'lucide-react'

// Mock data pour les projets
const projectsData = [
  {
    id: 1,
    title: 'Étude de Marché - Expansion Internationale',
    description: 'Analyse du potentiel d\'expansion d\'une entreprise française sur le marché asiatique',
    class: 'Marketing International',
    deadline: '2024-09-25T23:59:00',
    status: 'En cours',
    priority: 'Haute',
    progress: 65,
    team: [
      { name: 'Marie Dubois', role: 'Chef d\'équipe' },
      { name: 'Thomas Martin', role: 'Analyste' },
      { name: 'Sophie Leclerc', role: 'Rédactrice' },
      { name: 'Vous', role: 'Analyste marché' }
    ],
    tasks: [
      { id: 1, title: 'Recherche documentaire', completed: true },
      { id: 2, title: 'Analyse concurrentielle', completed: true },
      { id: 3, title: 'Enquête consommateurs', completed: false },
      { id: 4, title: 'Rédaction rapport', completed: false },
      { id: 5, title: 'Présentation finale', completed: false }
    ]
  },
  {
    id: 2,
    title: 'Business Plan - Startup FinTech',
    description: 'Création d\'un business plan complet pour une startup dans le domaine de la fintech',
    class: 'Gestion Financière',
    deadline: '2024-10-05T23:59:00',
    status: 'En cours',
    priority: 'Moyenne',
    progress: 40,
    team: [
      { name: 'Alexandre Petit', role: 'Chef d\'équipe' },
      { name: 'Julie Moreau', role: 'Analyste financier' },
      { name: 'Pierre Rousseau', role: 'Stratège' },
      { name: 'Vous', role: 'Analyste marché' }
    ],
    tasks: [
      { id: 1, title: 'Étude de marché', completed: true },
      { id: 2, title: 'Modèle économique', completed: false },
      { id: 3, title: 'Prévisions financières', completed: false },
      { id: 4, title: 'Plan marketing', completed: false },
      { id: 5, title: 'Pitch deck', completed: false }
    ]
  },
  {
    id: 3,
    title: 'Simulation de Négociation B2B',
    description: 'Négociation d\'un contrat commercial international entre deux entreprises',
    class: 'Négociation Commerciale',
    deadline: '2024-09-20T14:00:00',
    status: 'Urgent',
    priority: 'Haute',
    progress: 80,
    team: [
      { name: 'Emma Laurent', role: 'Négociateur principal' },
      { name: 'Lucas Bernard', role: 'Support juridique' },
      { name: 'Vous', role: 'Analyste commercial' }
    ],
    tasks: [
      { id: 1, title: 'Préparation stratégie', completed: true },
      { id: 2, title: 'Analyse partenaire', completed: true },
      { id: 3, title: 'Simulation round 1', completed: true },
      { id: 4, title: 'Ajustement stratégie', completed: true },
      { id: 5, title: 'Négociation finale', completed: false }
    ]
  },
  {
    id: 4,
    title: 'Optimisation Supply Chain',
    description: 'Projet d\'optimisation de la chaîne d\'approvisionnement d\'une entreprise industrielle',
    class: 'Supply Chain Management',
    deadline: '2024-10-15T23:59:00',
    status: 'Planifié',
    priority: 'Basse',
    progress: 15,
    team: [
      { name: 'Camille Durand', role: 'Chef d\'équipe' },
      { name: 'Antoine Moreau', role: 'Analyste logistique' },
      { name: 'Vous', role: 'Analyste coûts' }
    ],
    tasks: [
      { id: 1, title: 'Audit supply chain', completed: true },
      { id: 2, title: 'Identification goulots', completed: false },
      { id: 3, title: 'Solutions optimisation', completed: false },
      { id: 4, title: 'Calcul ROI', completed: false },
      { id: 5, title: 'Plan d\'implémentation', completed: false }
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'En cours': return 'bg-blue-100 text-blue-800'
    case 'Urgent': return 'bg-red-100 text-red-800'
    case 'Planifié': return 'bg-gray-100 text-gray-800'
    case 'Terminé': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Haute': return 'text-red-600'
    case 'Moyenne': return 'text-orange-600'
    case 'Basse': return 'text-green-600'
    default: return 'text-gray-600'
  }
}

const getDaysUntilDeadline = (deadline: string) => {
  const now = new Date()
  const deadlineDate = new Date(deadline)
  const diffTime = deadlineDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mes Projets
          </h1>
          <p className="text-gray-600">
            Gérez vos projets de groupe et suivez les échéances
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau projet
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets actifs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Ce semestre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">À rendre</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progression</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50%</div>
            <p className="text-xs text-muted-foreground">
              Moyenne générale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En équipe</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Collaborateurs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des projets */}
      <div className="space-y-6">
        {projectsData.map((project) => {
          const daysLeft = getDaysUntilDeadline(project.deadline)
          const isUrgent = daysLeft <= 3
          
          return (
            <Card key={project.id} className={`hover:shadow-lg transition-shadow ${isUrgent ? 'border-red-200' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Flag className={`h-4 w-4 ${getPriorityColor(project.priority)}`} />
                        <span className={`text-sm ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                    </div>
                    
                    <CardDescription className="text-base mb-4">
                      {project.description}
                    </CardDescription>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{project.class}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Timer className="h-4 w-4" />
                        <span className={isUrgent ? 'text-red-600 font-medium' : ''}>
                          {daysLeft > 0 ? `${daysLeft} jours restants` : 'Échéance dépassée'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{project.team.length} membres</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {project.progress}%
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Équipe */}
                  <div>
                    <h4 className="font-semibold mb-3">Équipe</h4>
                    <div className="space-y-2">
                      {project.team.map((member, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tâches */}
                  <div>
                    <h4 className="font-semibold mb-3">Tâches ({project.tasks.filter(t => t.completed).length}/{project.tasks.length})</h4>
                    <div className="space-y-2">
                      {project.tasks.map((task) => (
                        <div key={task.id} className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded ${task.completed ? 'bg-green-500' : 'bg-gray-300'} flex items-center justify-center`}>
                            {task.completed && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Échéance: {new Date(project.deadline).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                    <Button size="sm">
                      Travailler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
