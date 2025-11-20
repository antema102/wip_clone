const yearExp = [{ label: '-- -- -- --', value: '' }];
for (let i = 0; i <= 10; i++) {
  yearExp.push({
    label: i > 9 ? '10+' : (i + 1).toString(),
    value: i > 9 ? '10+' : (i + 1).toString(),
  });
}

export default {
  studyLevel: [
    {
      label: '-- -- -- --',
      value: '',
    },
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
      label: '-- -- -- --',
      value: '',
    },
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
      label: '-- -- -- --',
      value: '',
    },
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
      label: '-- -- -- --',
      value: '',
    },
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

  // Disponibility
  disponibility: [
    {
      label: '-- -- -- --',
      value: '',
    },
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
      label: '-- -- -- --',
      value: '',
    },
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
      label: '-- -- -- --',
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
  yearExp,

  // Civil Status
  civilstatus: [
    {
      label: '-- -- -- --',
      value: '',
    },
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
};
