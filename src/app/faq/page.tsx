'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";

const faqCategories = [
  {
    id: "admission",
    name: "Admission",
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "formation",
    name: "Formation",
    color: "bg-green-100 text-green-800"
  },
  {
    id: "stages",
    name: "Stages & Alternance",
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: "vie",
    name: "Vie étudiante",
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: "diplome",
    name: "Diplôme & Débouchés",
    color: "bg-red-100 text-red-800"
  }
];

const faqs = [
  {
    id: 1,
    category: "admission",
    question: "Quels sont les prérequis pour intégrer le Master 1 ?",
    answer: "Pour intégrer le Master 1, vous devez être titulaire d'une licence (Bac+3) en gestion, économie, commerce ou équivalent. Une moyenne de 12/20 minimum est requise, ainsi qu'un niveau B2 en anglais. Les candidats avec d'autres formations peuvent être acceptés s'ils démontrent de solides bases en gestion."
  },
  {
    id: 2,
    category: "admission",
    question: "Comment se déroule la procédure d'admission ?",
    answer: "L'admission se fait en plusieurs étapes : 1) Candidature en ligne via eCandidat avant le 30 avril, 2) Examen du dossier par la commission pédagogique, 3) Entretien de motivation pour les candidats sélectionnés (20-25 mai), 4) Communication des résultats fin mai."
  },
  {
    id: 3,
    category: "admission",
    question: "Faut-il passer le TOEIC pour candidater ?",
    answer: "Le TOEIC n'est pas obligatoire pour candidater, mais il est fortement recommandé. Un score de 785+ est apprécié pour le M1 et 850+ pour le M2 Commerce International. Tout certificat attestant d'un niveau B2/C1 en anglais est accepté (TOEFL, IELTS, Cambridge...)."
  },
  {
    id: 4,
    category: "formation",
    question: "Quelle est la différence entre les deux spécialisations de M2 ?",
    answer: "Le M2 Commerce International se concentre sur l'export, la négociation interculturelle et la logistique internationale. Le M2 Management & Gestion privilégie le contrôle de gestion, le management d'équipe et l'entrepreneuriat. Les deux parcours partagent un tronc commun en stratégie d'entreprise."
  },
  {
    id: 5,
    category: "formation",
    question: "Y a-t-il des cours en anglais ?",
    answer: "Oui, environ 30% des cours sont dispensés en anglais, notamment en commerce international, négociation interculturelle et marketing global. Des conférences avec des intervenants anglophones sont également organisées régulièrement."
  },
  {
    id: 6,
    category: "formation",
    question: "Le master est-il accessible en formation continue ?",
    answer: "Oui, le master peut être suivi en formation continue. Nous accueillons chaque année des professionnels en reconversion ou en évolution de carrière. Un accompagnement spécifique est proposé pour la prise en charge financière (CPF, OPCO...)."
  },
  {
    id: 7,
    category: "stages",
    question: "Le stage de M2 est-il obligatoire ?",
    answer: "Oui, le stage de fin d'études en M2 est obligatoire. Il dure 6 mois minimum (avril à septembre) et donne lieu à la rédaction d'un mémoire professionnel. Les étudiants en alternance sont dispensés de ce stage."
  },
  {
    id: 8,
    category: "stages",
    question: "L'alternance est-elle possible ?",
    answer: "L'alternance est possible en M2 uniquement, dans les deux spécialisations. Le rythme est de 3 semaines en entreprise / 1 semaine en formation. Nous avons un réseau de plus de 50 entreprises partenaires en Normandie et région parisienne."
  },
  {
    id: 9,
    category: "stages",
    question: "L'école aide-t-elle à trouver un stage ?",
    answer: "Absolument ! Nous organisons un forum stages-emplois en novembre, des ateliers CV/entretiens, et notre réseau alumni propose régulièrement des offres. Un responsable des relations entreprises accompagne chaque étudiant dans sa recherche."
  },
  {
    id: 10,
    category: "vie",
    question: "Y a-t-il des associations étudiantes ?",
    answer: "Oui, le Bureau des Étudiants (BDE) organise de nombreux événements : soirées, tournois sportifs, voyage d'études, gala de fin d'année. L'association G2C Alumni maintient le lien avec les diplômés et organise des événements networking."
  },
  {
    id: 11,
    category: "vie",
    question: "Peut-on étudier à l'étranger ?",
    answer: "Oui, nous avons des partenariats avec 15 universités (Canada, Allemagne, Espagne, Italie, Pologne...). Les étudiants peuvent partir un semestre en M1 ou M2 dans le cadre d'Erasmus+ ou effectuer leur stage à l'étranger."
  },
  {
    id: 12,
    category: "diplome",
    question: "Le diplôme est-il reconnu ?",
    answer: "Oui, c'est un Master universitaire délivré par l'Université de Caen Normandie, avec grade de Master reconnu par l'État. Le diplôme est également reconnu dans l'espace européen (système LMD) et à l'international."
  },
  {
    id: 13,
    category: "diplome",
    question: "Quels sont les débouchés ?",
    answer: "95% de nos diplômés trouvent un emploi dans les 6 mois. Les principaux débouchés : responsable export, chef de produit, consultant, contrôleur de gestion, chef de projet, responsable commercial. Salaires moyens : 35-45K€ en début de carrière."
  },
  {
    id: 14,
    category: "diplome",
    question: "Peut-on poursuivre en doctorat ?",
    answer: "Oui, les meilleurs étudiants peuvent poursuivre en doctorat, notamment dans notre équipe de recherche NIMEC (Normandie Innovation Marché Entreprise Consommation). Des bourses doctorales sont disponibles chaque année."
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Questions Fréquentes
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur le Master G2C
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory('all')}
              >
                Toutes les catégories
              </Badge>
              {faqCategories.map(category => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucune question trouvée pour votre recherche.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="hover:shadow-md transition-shadow">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleExpanded(faq.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant="secondary"
                            className={faqCategories.find(cat => cat.id === faq.category)?.color}
                          >
                            {faqCategories.find(cat => cat.id === faq.category)?.name}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-left">
                          {faq.question}
                        </CardTitle>
                      </div>
                      <div className="ml-4">
                        {expandedItems.includes(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {expandedItems.includes(faq.id) && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Notre équipe est là pour répondre à toutes vos questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Nous contacter
            </a>
            <a
              href="mailto:info@master-g2c.fr"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Envoyer un email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
