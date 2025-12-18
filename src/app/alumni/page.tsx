import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Linkedin, 
  Mail,
  Filter,
  Users,
  Building
} from 'lucide-react'

// Mock data pour les alumni
const alumniData = [
  {
    id: 1,
    firstName: 'Marie',
    lastName: 'Dubois',
    promotion: '2020-2022',
    company: 'LVMH',
    position: 'Chef de Produit International',
    location: 'Paris, France',
    industry: 'Luxe',
    linkedin: 'https://linkedin.com/in/marie-dubois',
    email: 'marie.dubois@email.com',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 2,
    firstName: 'Thomas',
    lastName: 'Martin',
    promotion: '2019-2021',
    company: 'Danone',
    position: 'Business Development Manager',
    location: 'Londres, UK',
    industry: 'Agroalimentaire',
    linkedin: 'https://linkedin.com/in/thomas-martin',
    email: 'thomas.martin@email.com',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 3,
    firstName: 'Sophie',
    lastName: 'Leclerc',
    promotion: '2021-2023',
    company: 'BNP Paribas',
    position: 'Analyste Financier',
    location: 'New York, USA',
    industry: 'Finance',
    linkedin: 'https://linkedin.com/in/sophie-leclerc',
    email: 'sophie.leclerc@email.com',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 4,
    firstName: 'Alexandre',
    lastName: 'Petit',
    promotion: '2018-2020',
    company: 'Amazon',
    position: 'Senior Product Manager',
    location: 'Seattle, USA',
    industry: 'Tech',
    linkedin: 'https://linkedin.com/in/alexandre-petit',
    email: 'alexandre.petit@email.com',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 5,
    firstName: 'Julie',
    lastName: 'Moreau',
    promotion: '2020-2022',
    company: 'L\'Oréal',
    position: 'Marketing Manager',
    location: 'Milan, Italie',
    industry: 'Cosmétique',
    linkedin: 'https://linkedin.com/in/julie-moreau',
    email: 'julie.moreau@email.com',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 6,
    firstName: 'Pierre',
    lastName: 'Rousseau',
    promotion: '2017-2019',
    company: 'McKinsey & Company',
    position: 'Consultant Senior',
    location: 'Paris, France',
    industry: 'Conseil',
    linkedin: 'https://linkedin.com/in/pierre-rousseau',
    email: 'pierre.rousseau@email.com',
    avatar: '/api/placeholder/40/40'
  }
]

const industries = ['Tous', 'Finance', 'Tech', 'Luxe', 'Conseil', 'Agroalimentaire', 'Cosmétique']
const locations = ['Toutes', 'Paris', 'Londres', 'New York', 'Seattle', 'Milan']

export default function AlumniPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Réseau Alumni
        </h1>
        <p className="text-gray-600">
          Connectez-vous avec les diplômés du Master G2C
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Depuis 2015
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entreprises</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Entreprises partenaires
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pays</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Présence mondiale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Rechercher des Alumni</CardTitle>
          <CardDescription>
            Utilisez les filtres pour trouver des diplômés selon vos critères
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, entreprise, poste..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>Secteur</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>Localisation</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des Alumni */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumniData.map((alumni) => (
          <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {alumni.firstName[0]}{alumni.lastName[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {alumni.firstName} {alumni.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Promotion {alumni.promotion}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-sm">{alumni.position}</p>
                    <p className="text-sm text-gray-500">{alumni.company}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-600">{alumni.location}</p>
                </div>

                <div>
                  <Badge variant="secondary">{alumni.industry}</Badge>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA pour rejoindre le réseau */}
      <Card className="mt-12 bg-blue-50">
        <CardHeader className="text-center">
          <CardTitle>Vous êtes diplômé du Master G2C ?</CardTitle>
          <CardDescription>
            Rejoignez notre réseau d'alumni et restez connecté avec la communauté
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button size="lg">
            Rejoindre le réseau Alumni
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
