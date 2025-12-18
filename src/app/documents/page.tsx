import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  FileText, 
  Upload, 
  Download, 
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  FolderOpen
} from 'lucide-react'

// Mock data pour les documents
const documentsData = [
  {
    id: 1,
    title: 'Cours Marketing International - Chapitre 1',
    description: 'Introduction aux stratégies marketing globales',
    fileName: 'marketing_international_ch1.pdf',
    fileSize: '2.4 MB',
    type: 'COURSE',
    uploadedBy: 'Prof. Dubois',
    uploadDate: '2024-09-10',
    downloads: 45,
    class: 'Marketing International'
  },
  {
    id: 2,
    title: 'TP Analyse Financière',
    description: 'Exercices pratiques sur l\'analyse des ratios',
    fileName: 'tp_analyse_financiere.xlsx',
    fileSize: '1.8 MB',
    type: 'ASSIGNMENT',
    uploadedBy: 'Prof. Martin',
    uploadDate: '2024-09-09',
    downloads: 32,
    class: 'Gestion Financière'
  },
  {
    id: 3,
    title: 'Étude de cas Négociation',
    description: 'Cas pratique de négociation B2B',
    fileName: 'etude_cas_negociation.docx',
    fileSize: '856 KB',
    type: 'RESOURCE',
    uploadedBy: 'Prof. Leclerc',
    uploadDate: '2024-09-08',
    downloads: 28,
    class: 'Négociation Commerciale'
  },
  {
    id: 4,
    title: 'Annales Examen Supply Chain',
    description: 'Sujets d\'examens des années précédentes',
    fileName: 'annales_supply_chain.pdf',
    fileSize: '3.2 MB',
    type: 'EXAM',
    uploadedBy: 'Prof. Rousseau',
    uploadDate: '2024-09-07',
    downloads: 67,
    class: 'Supply Chain Management'
  },
  {
    id: 5,
    title: 'Guide Méthodologique',
    description: 'Méthodes de recherche en gestion',
    fileName: 'guide_methodologique.pdf',
    fileSize: '4.1 MB',
    type: 'RESOURCE',
    uploadedBy: 'Administration',
    uploadDate: '2024-09-05',
    downloads: 89,
    class: 'Méthodologie'
  },
  {
    id: 6,
    title: 'Projet de Groupe - Consignes',
    description: 'Instructions pour le projet de fin de semestre',
    fileName: 'consignes_projet_groupe.pdf',
    fileSize: '1.2 MB',
    type: 'ASSIGNMENT',
    uploadedBy: 'Prof. Dubois',
    uploadDate: '2024-09-04',
    downloads: 52,
    class: 'Marketing International'
  }
]

const documentTypes = [
  { value: 'all', label: 'Tous les types' },
  { value: 'COURSE', label: 'Cours' },
  { value: 'ASSIGNMENT', label: 'Devoirs' },
  { value: 'RESOURCE', label: 'Ressources' },
  { value: 'EXAM', label: 'Examens' }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'COURSE': return 'bg-blue-100 text-blue-800'
    case 'ASSIGNMENT': return 'bg-green-100 text-green-800'
    case 'RESOURCE': return 'bg-purple-100 text-purple-800'
    case 'EXAM': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'COURSE': return 'Cours'
    case 'ASSIGNMENT': return 'Devoir'
    case 'RESOURCE': return 'Ressource'
    case 'EXAM': return 'Examen'
    default: return type
  }
}

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Documents Pédagogiques
        </h1>
        <p className="text-gray-600">
          Accédez aux cours, devoirs et ressources de votre formation
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              Ce semestre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Téléchargements</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              Total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stockage</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8 GB</div>
            <p className="text-xs text-muted-foreground">
              Utilisé
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Rechercher des Documents</CardTitle>
          <CardDescription>
            Utilisez les filtres pour trouver rapidement vos documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par titre, description, nom de fichier..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>Tous les cours</option>
                <option>Marketing International</option>
                <option>Gestion Financière</option>
                <option>Négociation Commerciale</option>
                <option>Supply Chain Management</option>
              </select>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Uploader
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des documents */}
      <div className="space-y-4">
        {documentsData.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">{document.title}</h3>
                    <Badge className={getTypeColor(document.type)}>
                      {getTypeLabel(document.type)}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{document.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{document.uploadedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(document.uploadDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{document.downloads} téléchargements</span>
                    </div>
                    <div>
                      <span className="font-medium">{document.class}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-sm text-gray-500">
                    {document.fileName} • {document.fileSize}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Aperçu
                    </Button>
                    <Button size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload area */}
      <Card className="mt-12 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
        <CardContent className="p-12 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Uploader un document</h3>
          <p className="text-gray-600 mb-4">
            Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
          </p>
          <Button>
            Choisir des fichiers
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Formats acceptés: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX (Max 10MB)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
