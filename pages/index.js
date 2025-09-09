import React, { useState, useMemo } from 'react';
import Head from 'next/head';

const Bibliography = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  const bibliographyData = [
    // Ouvrages et études
    { year: 2024, type: 'livre', title: 'Grande distribution et société : une histoire de reconfiguration', publisher: 'ACRF – Femmes en milieu rural', pages: '52 p.', category: 'Ouvrages et études', url: 'https://www.acrf.be/post/grande-distribution-et-soci%C3%A9t%C3%A9-une-histoire-de-reconfiguration' },
    { year: 2024, type: 'livre', title: 'Cornelius Castoriadis : penser la démocratie radicale', publisher: 'ACRF – Études', pages: '46 p.', category: 'Ouvrages et études', url: 'https://www.acrf.be/post/cornelius-castoriadis-penser-la-d%C3%A9mocratie-radicale' },
    { year: 2024, type: 'livre', title: 'Les conceptions des relations internationales : réalisme, multilatéralisme, internationalisme', publisher: 'ACRF – Études', pages: '60 p.', category: 'Ouvrages et études', url: 'https://www.acrf.be/post/les-conceptions-des-relations-internationales-r%C3%A9alisme-multilat%C3%A9ralisme-internationalisme-etude' },
    { year: 2023, type: 'livre', title: 'Baptême étudiant, que triste est la fête', publisher: 'ACRF – Femmes en milieu rural', pages: '39 p.', category: 'Ouvrages et études', url: 'https://www.acrf.be/post/bapt%C3%AAme-%C3%A9tudiant-que-triste-est-la-f%C3%AAte' },
    { year: 2023, type: 'livre', title: 'Le défi de l\'eau : analyse', publisher: 'ACRF – Femmes en milieu rural', pages: '28 p.', category: 'Ouvrages et études' },
    { year: 2020, type: 'livre', title: 'Délinquance juvénile & réponses sociales', publisher: 'ACRF – Femmes en milieu rural', pages: '87 p.', category: 'Ouvrages et études' },
    { year: 2018, type: 'livre', title: 'La famille monoparentale : retour sur la construction d\'un problème social', publisher: 'ACRF – Eclairages', pages: '40 p.', category: 'Ouvrages et études' },
    { year: 2015, type: 'livre', title: 'Que peut la culture à Molenbeek ?', publisher: 'PAC', pages: '32 p.', category: 'Ouvrages et études' },

    // Analyses PAC
    { year: 2023, type: 'analyse', title: 'Plongée au cœur d\'un sac de nœuds', publisher: 'PAC', category: 'Analyses PAC', url: 'https://www.pac-g.be/docs/analyses2023/analyse_06.pdf' },
    { year: 2022, type: 'analyse', title: 'L\'e-commerce, une adaptation numérique au temps de la destruction narcissique', publisher: 'PAC', category: 'Analyses PAC', url: 'https://www.pac-g.be/docs/analyses2022/analyse_18.pdf' },
    { year: 2022, type: 'analyse', title: 'De la bio au bio', publisher: 'PAC', category: 'Analyses PAC', url: 'https://www.pac-g.be/docs/analyses2022/analyse_12.pdf' },
    { year: 2022, type: 'analyse', title: 'Le DSM, un désastre médical et humain', publisher: 'PAC', category: 'Analyses PAC', url: 'https://www.pac-g.be/docs/analyses2022/analyse_03.pdf' },
    { year: 2021, type: 'analyse', title: '« Génération », un concept toujours-déjà périmé…', publisher: 'PAC', category: 'Analyses PAC', url: 'https://www.pac-g.be/docs/analyses2021/analyse_06.pdf' },
    { year: 2021, type: 'analyse', title: 'L\'école comme institution des affects tristes aux affects joyeux ?', publisher: 'PAC', category: 'Analyses PAC', url: 'https://www.pac-g.be/docs/analyses2021/analyse_02.pdf' },
    { year: 2020, type: 'analyse', title: 'Le carnaval institutionnel, une baudruche socio-politique ?', publisher: 'PAC', category: 'Analyses PAC', url: 'https://www.pac-g.be/docs/analyses2020/analyse_02.pdf' },
    { year: 2019, type: 'analyse', title: 'Nouveaux mouvements sociaux : le retournement des stéréotypes', publisher: 'PAC', category: 'Analyses PAC', url: 'https://www.pac-g.be/docs/analyses2019/analyse_03.pdf' },
    { year: 2018, type: 'analyse', title: 'La violence du quotidien', publisher: 'PAC', category: 'Analyses PAC' },
    { year: 2018, type: 'analyse', title: 'La lutte pour les mots : la proie pour l\'ombre', publisher: 'PAC', category: 'Analyses PAC', url: 'https://www.pac-g.be/docs/analyses2018/analyse_07.pdf' },

    // Articles Agir par la culture
    { year: 2025, type: 'article', title: 'BD : Les notes rouges', publisher: 'Agir par la culture', category: 'Articles Agir par la culture' },
    { year: 2025, type: 'article', title: 'MEGA – Make Europe Great Again', publisher: 'Agir par la culture (n°75)', category: 'Articles Agir par la culture' },
    { year: 2025, type: 'article', title: 'Inflation(s) : les travailleurs passent à la caisse', publisher: 'Agir par la culture (Popcorn)', category: 'Articles Agir par la culture' },
    { year: 2023, type: 'article', title: 'Les miracles de l\'IA', publisher: 'Agir par la culture', category: 'Articles Agir par la culture' },
    { year: 2022, type: 'article', title: 'Résister, rebondir et la fermer…', publisher: 'Agir par la culture (n°69)', category: 'Articles Agir par la culture' },
    { year: 2021, type: 'article', title: 'Pour une « conscience de génération »', publisher: 'Agir par la culture (n°64)', category: 'Articles Agir par la culture' },
    { year: 2021, type: 'article', title: 'Devenir des Terrestres parmi les Terrestres : Où atterrir', publisher: 'Agir par la culture (Popcorn)', category: 'Articles Agir par la culture' },

    // Articles scientifiques
    { year: 2022, type: 'article_scientifique', title: '« Le féminisme est un muscle, entraîne-toi ! »', publisher: 'Les cahiers de l\'éducation permanente, n°58', pages: 'p. 25-34', category: 'Articles scientifiques' },
    { year: 2015, type: 'article_scientifique', title: '« Tournons le dos au mirage nucléaire »', publisher: 'Academia.edu', category: 'Articles scientifiques' },

    // Tribunes publiques
    { year: 2007, type: 'tribune', title: 'Nobel de la Paix : pour la science du climat ou pour la croissance à tout prix ?', publisher: 'La Libre Belgique', category: 'Tribunes publiques' },
    { year: 2011, type: 'tribune', title: 'Tournons le dos au mirage nucléaire (pétition)', publisher: '3 000 signatures', category: 'Tribunes publiques' }
  ];

  const authorBio = {
    name: 'Jean-François Pontégnie',
    role: 'Chargé d\'études à l\'ACRF – Femmes en milieu rural et analyste à Présence & Action Culturelles (PAC)',
    description: 'Auteur engagé dans les milieux associatifs et culturels de la Fédération Wallonie-Bruxelles, Jean-François Pontégnie construit une œuvre à la croisée de la critique sociale, de la ruralité, de l\'éducation populaire et de la démocratie radicale.',
    themes: [
      'Justice sociale & inégalités',
      'Ruralité, agriculture & consommation', 
      'Écologie critique & modèles productivistes',
      'Démocratie radicale & mouvements sociaux',
      'Culture, éducation & critique des institutions',
      'Féminismes & rapports de genre'
    ],
    production: 'Plus de 60 textes publiés depuis 2007, de la courte chronique militante à l\'étude philosophique'
  };

  const years = [...new Set(bibliographyData.map(item => item.year))].sort((a, b) => b - a);
  const types = [
    { value: 'all', label: 'Tous les types' },
    { value: 'livre', label: 'Ouvrages & études' },
    { value: 'analyse', label: 'Analyses PAC' },
    { value: 'article', label: 'Articles revue' },
    { value: 'article_scientifique', label: 'Articles scientifiques' },
    { value: 'tribune', label: 'Tribunes publiques' }
  ];

  const filteredData = useMemo(() => {
    return bibliographyData.filter(item => {
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesYear = selectedYear === 'all' || item.year.toString() === selectedYear;
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.publisher.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesType && matchesYear && matchesSearch;
    });
  }, [selectedType, selectedYear, searchTerm]);

  const stats = {
    total: bibliographyData.length,
    byType: types.slice(1).map(type => ({
      label: type.label,
      count: bibliographyData.filter(item => item.type === type.value).length
    })),
    yearRange: `${Math.min(...years)} - ${Math.max(...years)}`
  };

  return (
    <>
      <Head>
        <title>Jean-François Pontégnie - Bibliographie complète</title>
        <meta name="description" content="Bibliographie exhaustive de Jean-François Pontégnie, auteur engagé dans l'éducation permanente et analyste socio-politique en Belgique francophone." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Jean-François Pontégnie
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Bibliographie complète & analyse critique
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Mise à jour : septembre 2025
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sidebar - Bio & Stats */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Profil de l'auteur</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Fonctions actuelles</h3>
                    <p className="text-sm text-gray-600 mt-1">{authorBio.role}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700">Description</h3>
                    <p className="text-sm text-gray-600 mt-1">{authorBio.description}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Thématiques principales</h3>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {authorBio.themes.map((theme, index) => (
                        <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Production</h3>
                    <p className="text-sm text-gray-600 mt-1">{authorBio.production}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total publications</span>
                    <span className="text-sm font-medium">{stats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Période</span>
                    <span className="text-sm font-medium">{stats.yearRange}</span>
                  </div>
                  <hr className="my-3" />
                  {stats.byType.map((stat, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <span className="text-sm font-medium">{stat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Filtres et recherche</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recherche
                    </label>
                    <input
                      type="text"
                      placeholder="Titre ou éditeur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de publication
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {types.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Année
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Toutes les années</option>
                      {years.map(year => (
                        <option key={year} value={year.toString()}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  {filteredData.length} publication(s) trouvée(s)
                </div>
              </div>

              {/* Bibliography List */}
              <div className="space-y-4">
                {filteredData.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {item.year}
                          </span>
                          <span className={`inline-block text-xs px-2 py-1 rounded ${
                            item.type === 'livre' ? 'bg-green-100 text-green-800' :
                            item.type === 'analyse' ? 'bg-blue-100 text-blue-800' :
                            item.type === 'article' ? 'bg-orange-100 text-orange-800' :
                            item.type === 'article_scientifique' ? 'bg-purple-100 text-purple-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {types.find(t => t.value === item.type)?.label || item.type}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {item.url ? (
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-blue-600 transition-colors"
                            >
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                        </h3>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Éditeur :</strong> {item.publisher}</p>
                          {item.pages && <p><strong>Pages :</strong> {item.pages}</p>}
                        </div>
                      </div>
                      
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Lire →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredData.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-500">Aucune publication trouvée avec ces critères.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-sm text-gray-600">
              <p>Bibliographie compilée dans le cadre de l'éducation populaire</p>
              <p className="mt-1">Sources : ACRF, PAC, Academia.edu, catalogues KBR et archives en ligne</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Bibliography;
