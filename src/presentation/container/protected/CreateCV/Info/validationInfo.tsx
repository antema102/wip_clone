import { defaultValues, type IError } from './dtoInfo';

export const Validation = (values: IError) => {
  let errors: IError = { ...defaultValues };
  {
    /** name checking */
  }
  if (
    values.name &&
    !/^[a-zA-Z \u00C0-\u00FF\u0100-\u017F]+$/.test(values.name)
  ) {
    errors.name = "Saisir un nom valide, il n'y a pas de chiffre";
  }

  {
    /** firstname cheking */
  }
  if (!/^[a-zA-Z \u00C0-\u00FF\u0100-\u017F]+$/.test(values.firstname)) {
    errors.firstname = "Saisir un prénom valide, il n'y a pas de chiffre";
  }

  {
    /** child checking */
  }
  if (
    values.child &&
    (parseInt(values.child) < 0 || parseInt(values.child) > 10)
  ) {
    errors.child = "Saisir un nombre d'enfant valide";
  }

  {
    /** phone number checking */
  }
  if (!/(^0[0-9]{9}$)|(^\+[0-9]{11,12}$)/.test(values.phone)) {
    errors.phone = 'Saisir un numéro de téléphone valide';
  }

  {
    /** checking all values */
  }
  Object.entries(values).forEach((element) => {
    if (
      element[1] === '' ||
      element[1] === null ||
      element[1] === 'INVALID INPUT'
    ) {
      errors = { ...errors, [element[0]]: 'Ce champ est obligatoire' };
    }
  });

  return errors;
};
