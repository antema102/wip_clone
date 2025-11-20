import moment from 'moment';

export const DateToddmmyyyyFormat = (date: Date, _type = '') => {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  } else {
    return '';
  }
};

export const stringToDate = (date: string) => {
  const dateParts = date.split('/');
  const result = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

  return result;
};

export const convertDateWithoutHours = (dateToConvert: string) => {
  const date = new Date(dateToConvert);
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(1);
  const convertedDate = date.toISOString();
  return convertedDate;
};

export const stringHourToDate = (date: string) => {
  const dateParts = date.split(':');
  const result = new Date();
  result.setHours(+dateParts[0], +dateParts[1], 0);
  return result;
};

export const dateToString = (date: Date) => {
  moment.locale('fr', {
    months:
      'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
        '_'
      ),
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans',
    },
  });
  moment.locale('fr');
  const resultDate = moment(date).format(' DD MMMM YYYY ');
  return resultDate[0].toUpperCase() + resultDate.slice(1);
};

export const dateToStringMoreAccurate = (date: Date) => {
  moment.locale('fr', {
    months:
      'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
        '_'
      ),
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans',
    },
  });
  // moment.locale('fr');
  const resultDate = moment(date).format('DD MMMM YYYY à HH:mm:ss');
  return resultDate[0].toUpperCase() + resultDate.slice(1);
};

export const thousandSeparator = (value: string, separator: string) => {
  value = '' + value;
  separator = separator || ' ';
  let result = '';
  let temp = 0;
  while (value.match(/^0[0-9]/) != null) {
    value = value.substr(1);
  }
  for (let i = value.length - 1; i >= 0; i--) {
    result =
      temp !== 0 && temp % 3 === 0
        ? value[i] + separator + result
        : value[i] + result;
    temp++;
  }
  return result;
};

export const dateDiff = (date1: Date) => {
  const date2 = new Date();
  const diff = {}; // Initialisation du retour
  let tmp = date2 - date1;
  tmp = Math.floor(tmp / 1000); // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60; // Extraction du nombre de secondes

  tmp = Math.floor((tmp - diff.sec) / 60); // Nombre de minutes (partie entière)
  diff.min = tmp % 60; // Extraction du nombre de minutes

  tmp = Math.floor((tmp - diff.min) / 60); // Nombre d'heures (entières)
  diff.hour = tmp % 24; // Extraction du nombre d'heures

  tmp = Math.floor((tmp - diff.hour) / 24); // Nombre de jours restants
  diff.day = tmp;

  return diff;
};
export const resultDate = (date1: string) => {
  const date = new Date(date1);
  const diff = dateDiff(date);
  if (diff.day <= 1) {
    if (diff.hour <= 1) {
      return `il y a ${diff.min} minutes`;
    }
    return `il y a ${diff.hour} heures`;
  }
  return `il y a ${diff.day} jours`;
};

export const calculateAge = (birthdate: any) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const ageInMilliseconds = today - birthDate;
  const ageInYears = ageInMilliseconds / 31557600000;
  return Math.floor(ageInYears);
};
