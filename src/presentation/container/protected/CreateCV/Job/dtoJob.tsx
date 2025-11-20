export interface IError {
  // job
  levelOfStudy: string;
  faculty: string;
  activityArea: string;
  university: string;
  desiredPosition: string;
  yearOfExp: string;
  availability: string;
  status: string;
  minimumWageRequired: string;
  portfolio: string;
  recommandation: any;
  fileCv: string;
  socioLink: string;
}

export const showErrorValuesDefault = {
  // job
  levelOfStudy: false,
  faculty: false,
  activityArea: false,
  university: false,
  desiredPosition: false,
  yearOfExp: false,
  availability: false,
  status: false,
  minimumWageRequired: false,
  portfolio: false,
  recommandation: false,
  fileCv: false,
  socioLink: false,
};

export const showErrorValuesSubmit = {
  // job
  levelOfStudy: true,
  faculty: true,
  activityArea: true,
  university: true,
  desiredPosition: true,
  yearOfExp: true,
  availability: true,
  status: true,
  minimumWageRequired: true,
  portfolio: true,
  recommandation: false,
  fileCv: true,
  socioLink: true,
};

export const defaultValues: IError = {
  // job
  levelOfStudy: '',
  faculty: '',
  activityArea: '',
  university: '',
  desiredPosition: '',
  yearOfExp: '',
  availability: '',
  status: '',
  minimumWageRequired: '',
  portfolio: '',
  recommandation: '',
  fileCv: '',
  socioLink: '',
};
