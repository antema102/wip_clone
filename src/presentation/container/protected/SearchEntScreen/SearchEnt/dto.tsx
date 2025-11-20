export interface IError {
  jobWish: string;
  jobWish_level: string;
}

export const showErrorValuesDefault = {
  activitySector: false,
  jobWish: false,
  disponibility: false,
  salaryExpectation: false,
  activitySector_level: false,
  jobWish_level: false,
  disponibility_level: false,
  salaryExpectation_level: false,
};

export const showErrorValuesSubmit = {
  activitySector: true,
  jobWish: true,
  disponibility: true,
  salaryExpectation: true,
  activitySector_level: true,
  jobWish_level: true,
  disponibility_level: true,
  salaryExpectation_level: true,
};

export const defaultValues: IError = {
  jobWish: '',
  jobWish_level: '5',
};

export const defaultErrorValues: IError = {
  jobWish: '',
  jobWish_level: '',
};
