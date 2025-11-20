import {useState} from 'react';

// --------------------------------------------------------
// Data required by FormInfo
export const civilstatus = [
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
  {
    label: 'Autres',
    value: 'others',
  }
];

export const logerOrNot = [
  {
    label: 'Oui',
    value: true
  },
  {
    label: 'Non',
    value: false
  }
]

export const audienceList = [
  {
    label: 'Candidats',
    value: '0'
  },
  {
    label: 'Entreprises',
    value: '1' 
  },
  {
    label: 'Candidats & Entreprises',
    value: '2' 
  }
]

export const transport = [
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
  {
    label: 'Voiture',
    value: 'car',
  },
  {
    label: 'Autres',
    value: 'others',
  }
];

export const province = [
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
];

export const zonage = [
  {
    label: 'Analakely',
    value: 'analakely',
  },
  {
    label: 'Anosy',
    value: 'anosy',
  },
  {
    label: 'Mahamasina',
    value: 'mahamasina',
  },
  {
    label: 'Ampefiloha',
    value: 'ampefiloha',
  },
  {
    label: 'Antanimena',
    value: 'antanimena',
  },
  {
    label: 'Behoririka',
    value: 'behoririka',
  },
];

// --------------------------------------------------------
// data required by Form Job

export const levelOfStudy = [
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
  {
    label: 'Autres',
    value: 'others',
  }
];

export const activityArea = [
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
  {
    label: 'Tourisme / Hôtellerie',
    value: 'hotels',
  },
  {
    label: 'Autres',
    value: 'others',
  },
];

// Year of experience
export const yearOfExp: any[] = [
];
for (let i = 0; i <= 10; i++) {
  if (i < 10) {
    yearOfExp.push({label: i.toString(), value: i.toString()});
  } else {
    yearOfExp.push({label: i.toString() + ' et plus', value: i.toString()});
  }
}
// ----------------------

// Availablity
export const availability = [
  {
    label: 'Plein-temps - Jour',
    value: 'fulltime',
  },
  {
    label: 'Plein-temps - Nuit',
    value: 'fulltimeNight',
  },
  {
    label: 'Demi-journée - Jour',
    value: 'halftime',
  },
  {
    label: 'Demi-journée - Nuit',
    value: 'halfTimeNight',
  },
  {
    label: 'Indifférent',
    value: 'indifferent',
  },
  {
    label: 'A la demande',
    value: 'onDemand',
  },
  {
    label: 'Autres',
    value: 'other',
  },
];

// Status
export const status = [
  {
    label: 'Sous-contrat',
    value: 'underContract',
  },
  {
    label: 'Disponible',
    value: 'available',
  },
  {
    label: 'Les deux',
    value: 'both',
  },
  {
    label: 'CDI',
    value: 'cdi',
  },
  {
    label: 'CDD',
    value: 'cdd',
  },
  {
    label: 'Stagiaire',
    value: 'intern',
  },
  {
    label: 'Intérimaire',
    value: 'interim',
  },
  {
    label: 'Travail à la journée',
    value: 'byDay',
  },
  {
    label: 'Travail à l\'heure',
    value: 'byHour',
  },
  {
    label: 'Télétravail',
    value: 'teletravail',
  },
  {
    label: 'Autres',
    value: 'others',
  },
];

// Country
export const country = [
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
];

export const localisation = {
  region: [
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
};

// --------------------------------------------------------
// data required by Form Other

export const language = [
  {
    label: '-- -- -- -- -- -- --',
    value: '',
  },
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
];

export const level = [
  {
    label: 'Maternelle',
    value: 'natif',
  },
  {
    label: 'Débutant',
    value: 'beginner',
  },
  {
    label: 'Intermediaire',
    value: 'intermediate',
  },
  {
    label: 'Avancé',
    value: 'advanced',
  },
];

export const sport = [
  {
    label: '-- -- -- -- -- -- --',
    value: '',
  },
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
];
