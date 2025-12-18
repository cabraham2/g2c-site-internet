import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Clock, 
  Users, 
  Calendar,
  Play,
  Download,
  FileText,
  Video
} from 'lucide-react'

// Mock data pour les cours
const coursesData = [
  {
    id: 1,
    title: 'Marketing International',
    description: 'Stratégies marketing pour les marchés internationaux',
    teacher: 'Prof. Dubois',
    duration: '3h',
    students: 25,
    progress: 75,
    nextSession: '2024-09-15T14:00:00',
    status: 'En cours',
    modules: [
      { id: 1, title: 'Introduction au marketing international', completed: true, type: 'video' },
      { id: 2, title: 'Analyse des marchés étrangers', completed: true, type: 'document' },
      { id: 3, title: 'Stratégies d\'entrée sur les marchés', completed: false, type: 'video' },
      { id: 4, title: 'Adaptation du mix marketing', completed: false, type: 'document' }
    ]
  },
  {
    id: 2,
    title: 'Gestion Financière Internationale',
    description: 'Finance d\'entreprise dans un contexte international',
    teacher: 'Prof. Martin',
    duration: '4h',
    students: 22,
    progress: 60,
    nextSession: '2024-09-16T10:00:00',
    status: 'En cours',
    modules: [
      { id: 1, title: 'Principes de finance internationale', completed: true, type: 'video' },
      { id: 2, title: 'Gestion du risque de change', completed: true, type: 'document' },
      { id: 3, title: 'Financement des opérations internationales', completed: false, type: 'video' },
      { id: 4, title: 'Évaluation des investissements étrangers', completed: false, type: 'document' }
    ]
  },
  {
    id: 3,
    title: 'Négociation Commerciale',
    description: 'Techniques de négociation en contexte B2B',
    teacher: 'Prof. Leclerc',
    duration: '2h',
    students: 28,
    progress: 45,
    nextSession: '2024-09-17T16:00:00',
    status: 'En cours',
    modules: [
      { id: 1, title: 'Fondamentaux de la négociation', completed: true, type: 'video' },
      { id: 2, title: 'Préparation et stratégie', completed: false, type: 'document' },
      { id: 3, title: 'Techniques de persuasion', completed: false, type: 'video' },
      { id: 4, title: 'Négociation interculturelle', completed: false, type: 'document' }
    ]
  },
  {
    id: 4,
    title: 'Supply Chain Management',
    description: 'Gestion de la chaîne d\'approvisionnement globale',
    teacher: 'Prof. Rousseau',
    duration: '3h',
    students: 20,
    progress: 30,
    nextSession: '2024-09-18T09:00:00',
    status: 'Bientôt',
    modules: [
      { id: 1, title: 'Introduction à la supply chain', completed: true, type: 'video' },
      { id: 2, title: 'Logistique internationale', completed: false, type: 'document' },
      { id: 3, title: 'Optimisation des coûts', completed: false, type: 'video' },
      { id: 4, title: 'Durabilité et supply chain', completed: false, type: 'document' }
    ]
  }
]

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mes Cours
        </h1>
        <p className="text-gray-600">
          Suivez vos formations et accédez aux ressources pédagogiques
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cours actifs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Heures totales</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12h</div>
            <p className="text-xs text-muted-foreground">
              De formation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progression</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58%</div>
            <p className="text-xs text-muted-foreground">
              Moyenne générale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prochaine session</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Demain</div>
            <p className="text-xs text-muted-foreground">
              14h00
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des cours */}
      <div className="space-y-6">
        {coursesData.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <Badge variant={course.status === 'En cours' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-base mb-4">
                    {course.description}
                  </CardDescription>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.teacher}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} étudiants</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {course.progress}%
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Modules */}
                <div>
                  <h4 className="font-semibold mb-3">Modules du cours</h4>
                  <div className="space-y-2">
                    {course.modules.map((module) => (
                      <div key={module.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className={`w-2 h-2 rounded-full ${module.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <div className="flex items-center space-x-2 flex-1">
                          {module.type === 'video' ? (
                            <Video className="h-4 w-4 text-blue-500" />
                          ) : (
                            <FileText className="h-4 w-4 text-green-500" />
                          )}
                          <span className={`text-sm ${module.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                            {module.title}
                          </span>
                        </div>
                        {!module.completed && (
                          <Button size="sm" variant="ghost">
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="font-semibold mb-3">Actions</h4>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <Play className="h-4 w-4 mr-2" />
                      Continuer le cours
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger les ressources
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Prochaine session: {new Date(course.nextSession).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
