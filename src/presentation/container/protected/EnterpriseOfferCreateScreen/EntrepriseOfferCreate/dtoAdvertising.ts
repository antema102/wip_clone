export interface IError {
  name: string;
  description: string;
  type: string;
  price: number;
  link: string;
  image: string;
}

export const showErrorValuesDefault = {
  name: false,
  description: false,
  type: false,
  price: false,
  link: false,
  image: false};
export const showErrorValuesSubmit = {
  name: true,
  description: true,
  type: true,
  price: true,
  link: true,
  file: true};

export const defaultValues: IError = {
  name: '',
  description: '',
  type: '',
  price: 0,
  link: '',
  image: ''};
