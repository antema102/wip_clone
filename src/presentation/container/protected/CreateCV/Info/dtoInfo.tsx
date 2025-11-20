export interface IError {
  name: string;
  firstname: string;
  child: string;
  phone: string;
  birthdate: string;
  civilstatus: string;
  transport: string;
  pet: string;
  country: string;
  province: string;
  zone: string;
  loger: boolean;
}

export const showErrorValuesDefault = {
  name: false,
  firstname: false,
  child: false,
  phone: false,
  birthdate: false,
  civilstatus: false,
  transport: false,
  pet: false,
  country: false,
  province: false,
  zone: false,
  loger: false,
};

export const showErrorValuesSubmit = {
  name: true,
  firstname: true,
  child: true,
  phone: true,
  birthdate: true,
  civilstatus: true,
  transport: true,
  pet: true,
  country: true,
  province: true,
  zone: true,
  loger: false,
};

export const defaultValues: IError = {
  name: '',
  firstname: '',
  child: '',
  phone: '',
  birthdate: '',
  civilstatus: '',
  transport: '',
  pet: '',
  country: '',
  province: '',
  zone: '',
  loger: false,
};
