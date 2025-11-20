export interface IError {
  name: string;
  description: string;
  taches: string;
  disponipility: string;
  place: string;
  contrat:  string;
  profil: string;
  experience: string;
  prestation: string;
}

export const showErrorValuesDefault = {
  name: false,
  description:false,
  taches: false,
  disponipility: false,
  place: false,
  contrat: false,
  profil: false,
  experience:false,
  prestation: false,
};
export const showErrorValuesSubmit = {
  name:  true,
  description:  true,
  taches:true,
  disponipility:true,
  place: true,
  contrat: true,
  profil:  true,
  experience:  true,
  prestation: true,
};

export const defaultValues: IError = {
  name:  '',
  description:  '',
  taches: '',
  disponipility:'',
  place: '',
  contrat:'',
  profil: '',
  experience: '',
  prestation: '',
};
