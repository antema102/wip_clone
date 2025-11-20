// --------------------------------------------------------
// creation CV

// --------------------------------------------------------
// Data required by FormInfo
export enum civilstatus {
  'single' = 'Célibataire',
  'married' = 'Marié(e)',
  'divorced' = 'Divorcé(e)',
  'widowed' = 'Veuf(ve)',
  'others' = 'Autres',
}

export enum logerOrNot {
  true = 'Oui',
  false = 'Non',
}

export enum candidate {
  passif = 'Passif',
  actif = 'Actif',
}

export enum transport {
  'foot' = 'A pied',
  'bike' = 'Bicyclette',
  'motorbike' = 'Moto',
  'car' = 'Voiture',
  'others' = 'Autres',
}

export enum pet {
  'dog' = 'Chien',
  'cat' = 'Chat',
  'rabit' = 'Lapin',
  'domestic rodent' = 'Rongeur domestique',
  'turtle' = 'Tortue',
  'horse' = 'Cheval',
  'bird' = 'Oiseaux',
  'fish' = 'Poisson',
  'others' = 'Autres',
}

export enum province {
  'tana' = 'Antananarivo',
  'diego' = 'Antsiranana',
  'fianarantsoa' = 'Fianarantsoa',
  'majunga' = 'Mahajanga',
  'tamatave' = 'Toamasina',
  'tulear' = 'Toliara',
}

// --------------------------------------------------------
// data required by Form Job

const faculty = [
  'Informatique',
  'Mathématiques',
  'Droit',
  'Économie',
  'Gestion',
  'Médecine',
  'Hôtellerie et Restauration',
  'Les langues',
  'Sciences humaines et sociales',
  'Physique chimie ',
  'Biologie',
  'Agroalimentaire ',
  'Maths',
  'Pharmacie',
  'Sciences pour l’ingénieur',
  'Littérature',
  'Informations communication ',
  'Art',
  'Sociologie ',
  'Psychologie ',
  'Histoire géographie',
  'AES ',
  'Economie ',
  'Banque finance assurance ',
  'Comptabilité ',
  'Management ',
  'Marketing ',
  'Commerce international',
  'Science politiques ',
  'Relations internationales',
  'Autres',
];
export const facultyField = faculty.map((value) => ({ value, label: value }));

export enum levelOfStudy {
  '8' = 'Master II',
  '7' = 'Master',
  '6' = 'Licence',
  '5' = 'Technicien Superieur',
  '4' = 'Baccalauréat',
  '3' = 'BEPC',
  '2' = 'CEPE',
  '1' = 'Autres',
}

export enum activityArea {
  'agrifood' = 'Agroalimentaire',
  'chemistry' = 'Chimie / Parachimie',
  'communication' = 'Édition / Communication / Multimédia',
  'machinery' = 'Machines et équipements / Automobile',
  'clothing' = 'Textile / Habillement / Chaussure',
  'construction' = 'BTP / Matériaux de construction',
  'trade' = 'Commerce / Négoce',
  'electronics' = 'Électronique / Électricité',
  'it' = 'Informatique / Télécoms',
  'hotels' = 'Tourisme / Hôtellerie',
  'others' = 'Autres',
}

// Year of experience
export enum yearOfExp {
  '0' = '0 année',
  '1' = '1 an',
  '2' = '2 ans',
  '3' = '3 ans',
  '4' = '4 ans',
  '5' = '5 ans',
  '6' = '6 ans',
  '7' = '7 ans',
  '8' = '8 ans',
  '9' = '9 ans et plus',
  'others' = 'Autres',
}
// ----------------------

// Availablity
export enum availability {
  'fulltimeDay' = 'Plein-temps - Jour',
  'fulltimeNight' = 'Plein-temps - Nuit',
  'halftimeDay' = 'Demi-journée - Jour',
  'halfTimeNight' = 'Demi-journée - Nuit',
  'indifferent' = 'Indifférent',
  'onDemand' = 'A la demande',
  'other' = 'Autres',
}

export enum publicity {
  'cible' = 'Ciblé',
  'global' = 'Global',
}

export enum tarifs {
  'video' = 'Popup vidéo',
  'image' = 'Popup image',
  'spot' = 'Spot vidéo',
  'banner' = 'Bannière',
}

export const profilData = [
  {
    label: 'Stagiaire',
    value: 'Stagiaire',
  },
  {
    label: 'Junior',
    value: 'Junior',
  },
  {
    label: 'Intermédiaire',
    value: 'Intermédiaire',
  },
  {
    label: 'Confirmé',
    value: 'Confirmé',
  },
  {
    label: 'Senior',
    value: 'Senior',
  },
  {
    label: 'Autres',
    value: 'others',
  },
];
export const contratData = [
  {
    label: 'CDI',
    value: 'CDI',
  },
  {
    label: 'CDD',
    value: 'CDD',
  },
  {
    label: 'Télé travail',
    value: 'Télétravail',
  },
  {
    label: 'Autres',
    value: 'others',
  },
];

// Status
export enum status {
  'underContract' = 'Sous-contrat',
  'available' = 'Disponible',
  'both' = 'Les deux',
  'cdi' = 'CDI',
  'cdd' = 'CDD',
  'intern' = 'Stagiaire',
  'interim' = 'Intérimaire',
  'byDay' = 'Travail à la journée',
  'byHour' = "Travail à l'lheure",
  'teletravail' = 'Télétravail',
  'others' = 'Autres',
}

// --------------------------------------------------------
// data required by Form Other

export enum language {
  'mg' = 'Malagasy',
  'fr' = 'Français',
  'en' = 'Anglais',
  'de' = 'Allemand',
  'es' = 'Espagnol',
  'zh' = 'Chinois',
  'ja' = 'Japonais',
  'hi' = 'Hindi',
  'ar' = 'Arabe',
  'pt' = 'Portugais',
  'bn' = 'Bengali',
  'ru' = 'Russe',
  'pa' = 'Pendjabi',
  'others' = 'Autres',
}

export enum level {
  'natif' = 'Maternelle',
  'beginner' = 'Débutant',
  'intermediate' = 'Intermediaire',
  'advanced' = 'Avancé',
  'others' = 'Autres',
}

const sport = [
  'Aikido',
  'Alpinisme',
  'Apnée / Plongée libre',
  'Aquagym / Aquafitness / Aquabike',
  'Athlétisme',
  'Badminton',
  'Baseball',
  'Basket-ball',
  'Billard',
  'Billetterie sportive',
  'Bodyboard',
  'Bowling',
  'Boxes',
  'Camping',
  'Canoë Kayak',
  'Canyoning',
  'Course à pied route',
  'Course à pied trail',
  "Course d'orientation",
  'Cricket',
  'CrossFit',
  'Danse classique',
  'Danse moderne jazz',
  'Danse urbaine / fitness',
  'Dossards épreuves',
  'Equitation',
  'Escalade',
  'Escrime',
  'Fitness / Cardio training',
  'Fléchettes',
  'Football',
  'Football Américain',
  'Golf',
  'Gymnastique',
  'Handball',
  'Hockey roller',
  'Hockey sur gazon',
  'Hockey sur glace',
  "Jeux d'extérieur",
  'Jiu-jitsu',
  'Judo',
  'Karaté',
  'Kitesurf',
  'Librairie du sportif',
  'Luge',
  'Lutte',
  'Marche athlétique',
  'Marche nordique',
  'Moto cross',
  'Moto route',
  'Musculation',
  'Natation',
  'Nautisme',
  'Nutrition sportive',
  'Padel',
  'Patinage',
  'Pêche',
  'Pelote basque',
  'Pétanque',
  'Pilates / Gym douce',
  'Planche à voile',
  'Plongée sous marine',
  'Power kite',
  'Rafting',
  'Randonnée / Trek',
  'Roller',
  'Rugby',
  'Skateboard / Longboard',
  'Ski alpin',
  'Ski de fond',
  'Ski de randonnée',
  'Ski nautique / Wakeboard',
  'Slacklines',
  'Snorkeling',
  'Snowboard',
  'Spéléologie',
  'Sports automobile',
  'Sportswear',
  'Squash',
  'Stand-up paddle',
  'Surf',
  'Swimrun',
  'Taekwondo',
  'Tennis',
  'Tennis de table',
  'Trampoline',
  'Triathlon',
  'Trottinette',
  'Vélo BMX freestyle / race',
  'Vélo électrique',
  'Vélo loisir / urbain',
  'Vélo route',
  'Vélo tout terrain - VTT',
  'Volley ball',
  'Water Polo',
  'Yoga',
  'Autres',
];
export const sportField = sport.map((value) => ({ value, label: value }));

// --------------------------------------------------------
//
export enum criterionLevel {
  '3' = 'Faible',
  '5' = 'Moyen',
  '7' = 'Elevé',
}
export const permissionTypes = {
  // job
  Perm_create_job: 'Création emploi',
  Perm_update_job: 'Modification emploi',
  Perm_delete_job: 'Suppression emploi',

  // cv
  Perm_create_cv: 'Création CV',
  Perm_update_cv: 'Mise à jour CV',
  Perm_delete_cv: 'Suppression CV',
  Perm_add_presentation_video: 'Ajout Présention Vidéo',

  // matching
  Perm_matching_job: 'Matching emploi',
  Perm_matching_cv: 'Matching CV',

  // publicity
  Perm_create_publicity: 'Création publicité',
  Perm_update_publicity: 'Modification publicité',
  Perm_delete_publicity: 'Suppression publicité',
};
