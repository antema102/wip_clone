const yearExp = [{label: "Choisir Année d'expérience", value: ''}];
for (let i = 0; i <= 10; i++) {
  yearExp.push({
    label: i > 9 ? '10+' : (i + 1).toString(),
    value: i > 9 ? '10+' : (i + 1).toString(),
  });
}

export default {
  studyLevel: [
    {
      label: 'Master II',
      value: 'master2',
    },
    {
      label: 'Master',
      value: 'master',
    },
    {
      label: 'Licence',
      value: 'bachelor',
    },
    {
      label: 'Technicien Superieur',
      value: 'hightech',
    },
    {
      label: 'Baccalauréat',
      value: 'baccalaureat',
    },
    {
      label: 'BEPC',
      value: 'bepc',
    },
    {
      label: 'CEPE',
      value: 'cepe',
    },
  ],

  career: [
    {
      label: 'Informatique',
      value: 'it',
    },
    {
      label: 'RH & Gestion',
      value: 'management',
    },
    {
      label: 'Marketing & Communication',
      value: 'communication',
    },
    {
      label: 'Pédagogie',
      value: 'education',
    },
  ],

  activitySector: [
    {
      label: 'Agroalimentaire',
      value: 'agrifood',
    },
    {
      label: 'Chimie / Parachimie',
      value: 'chemistry',
    },
    {
      label: 'Édition / Communication / Multimédia',
      value: 'communication',
    },
    {
      label: 'Machines et équipements / Automobile',
      value: 'machinery',
    },
    {
      label: 'Textile / Habillement / Chaussure',
      value: 'clothing',
    },
    {
      label: 'BTP / Matériaux de construction',
      value: 'construction',
    },
    {
      label: 'Commerce / Négoce',
      value: 'trade',
    },
    {
      label: 'Électronique / Électricité',
      value: 'electronics',
    },
    {
      label: 'Informatique / Télécoms',
      value: 'it',
    },
  ],

  // Job Sought
  jobSought: [
    {
      label: 'Ux Design',
      value: 'uxDesign',
    },
    {
      label: 'Developpeur JavaScript',
      value: 'devReact',
    },
    {
      label: 'Développeur PHP/Symfony',
      value: 'devPhp',
    },
    {
      label: 'Data Analyst',
      value: 'dataAnalyst',
    },
    {
      label: 'Entrepreneur',
      value: 'entrepreneur',
    },
  ],

  // Localisation
  country: [
    {
      label: 'Madagascar',
      value: 'madagascar',
    },
    {
      label: 'Afrique du Sud',
      value: 'afriqueSud',
    },
    {
      label: 'Algérie',
      value: 'algerie',
    },
  ],

  region: [
    {
      label: '-- -- -- -- -- -- --',
      value: '',
    },
    {
      country: 'madagascar',
      label: 'Analamanga',
      value: 'analamanga',
    },
    {
      country: 'madagascar',
      label: 'Itasy',
      value: 'itasy',
    },
    {
      country: 'afriqueSud',
      label: 'Afrique Sud Region 1',
      value: 'afriqueSudRegion1',
    },
    {
      country: 'afriqueSud',
      label: 'Afrique Sud Region 2',
      value: 'afriqueSudRegion2',
    },
    {
      country: 'algerie',
      label: 'Region Algerie 1',
      value: 'regionAlg1',
    },
    {
      country: 'algerie',
      label: 'Region Algerie 2',
      value: 'regionAlg2',
    },
  ],

  town: [
    {
      label: '-- -- -- -- -- -- --',
      value: '',
    },
    {
      region: 'analamanga',
      label: 'Antananarivo Renivohitra',
      value: 'tanaCentre',
    },
    {
      region: 'analamanga',
      label: 'Antananarivo Avaradrano',
      value: 'tanaNord',
    },
    {
      region: 'analamanga',
      label: 'Antananarivo Atsimondrano',
      value: 'tanaSud',
    },
    {
      region: 'itasy',
      label: 'Arivonimamo',
      value: 'arivonimamo',
    },
    {
      region: 'itasy',
      label: 'Miarinarivo',
      value: 'miarinarivo',
    },
  ],
  arrondissement: [
    {
      label: '-- -- -- -- -- -- --',
      value: '',
    },
    {
      town: 'tanaCentre',
      label: '1',
      value: '1',
    },
    {
      town: 'tanaCentre',
      label: '2',
      value: '2',
    },
    {
      town: 'tanaCentre',
      label: '3',
      value: '3',
    },
    {
      town: 'tanaCentre',
      label: '4',
      value: '4',
    },
  ],

  province: [
    {
      label: 'Antananarivo',
      value: 'tana',
    },
    {
      label: 'Antsiranana',
      value: 'diego',
    },
    {
      label: 'Fianarantsoa',
      value: 'fianarantsoa',
    },
    {
      label: 'Mahajanga',
      value: 'majunga',
    },
    {
      label: 'Toamasina',
      value: 'tamatave',
    },
    {
      label: 'Toliara',
      value: 'tulear',
    },
  ],

  zone: [
    {
      country: 'madagascar',
      label: 'Analamanga',
      value: 'analamanga',
    },
    {
      country: 'madagascar',
      label: 'Itasy',
      value: 'itasy',
    },
    {
      country: 'afriqueSud',
      label: 'Afrique Sud Region 1',
      value: 'afriqueSudRegion1',
    },
    {
      country: 'afriqueSud',
      label: 'Afrique Sud Region 2',
      value: 'afriqueSudRegion2',
    },
    {
      country: 'algerie',
      label: 'Region Algerie 1',
      value: 'regionAlg1',
    },
    {
      country: 'algerie',
      label: 'Region Algerie 2',
      value: 'regionAlg2',
    },
  ],

  // Disponibility
  disponibility: [
    {
      label: 'Plein-temps - Jour',
      value: 'fulltime',
    },
    {
      label: 'Demi-journée - Jour',
      value: 'halftime',
    },
  ],

  // Statut
  statut: [
    {
      label: 'Sous-contrat',
      value: 'underContract',
    },
    {
      label: 'Disponible',
      value: 'available',
    },
  ],

  // Transport
  transport: [
    {
      label: '----------',
      value: '',
    },
    {
      label: 'Voiture Personnelle',
      value: 'car',
    },
    {
      label: 'A pied',
      value: 'foot',
    },
    {
      label: 'Bicyclette',
      value: 'bike',
    },
    {
      label: 'Moto',
      value: 'motorbike',
    },
  ],

  // Years Of experience
  yearExp: yearExp,

  // Civil Status
  civilstatus: [
    {
      label: 'Célibataire',
      value: 'single',
    },
    {
      label: 'Marié(e)',
      value: 'married',
    },
    {
      label: 'Divorcé(e)',
      value: 'divorced',
    },
    {
      label: 'Veuf(ve)',
      value: 'widowed',
    },
  ],

  // Language
  language: [
    {
      label: 'Malagasy',
      value: 'mg',
    },
    {
      label: 'Français',
      value: 'fr',
    },
    {
      label: 'Anglais',
      value: 'en',
    },
  ],

  // Sports
  sport: [
    {
      label: 'Natation',
      value: 'swim',
    },
    {
      label: 'BasketBall',
      value: 'basket',
    },
    {
      label: 'FootBall',
      value: 'foot',
    },
  ],
};
