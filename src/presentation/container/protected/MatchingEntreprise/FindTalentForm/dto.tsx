export interface IError {
  desiredPost: string;
  desiredPost_level: string;
}

export const showErrorValuesDefault = {
  activitySector: false,
  desiredPost: false,
  salary: false,
  filiere: false,
  level: false,
  disponibility: false,
  transport: false,
  adrsProvince: false,
  dateofBirth: false,
  statut: false,
  adrsCountry: false,
  adrsRegion: false,
  adrsZone: false,
  jobCountry: false,
  jobRegion: false,
  jobZone: false,
  yearOfExp: false,
  lastjobType: false,
  lastjobPlace: false,
  lastjobDescription: false,
  language: false,
  sport: false,
  interest: false,
  loger: false,
  recommandation: false,
};

export const showErrorValuesSubmit = {
  activitySector: true,
  desiredPost: true,
  salary: true,
  filiere: true,
  level: true,
  disponibility: true,
  transport: true,
  adrsProvince: true,
  dateofBirth: true,
  statut: true,
  adrsCountry: true,
  adrsRegion: true,
  adrsZone: true,
  jobCountry: true,
  jobRegion: true,
  jobZone: true,
  yearOfExp: true,
  lastjobType: true,
  lastjobPlace: true,
  language: true,
  sport: true,
  interest: true,
  loger: true,
  recommandation: true,
};

export const defaultValues: IError = {
  desiredPost: '',
  desiredPost_level: '5',
};

export const defaultErrorsValues: IError = {
  desiredPost: '',
  desiredPost_level: '',
};
