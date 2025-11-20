import { MAIL_VALIDATION } from '../../../common/utils/validation';
import { defaultValues, type IError } from './dto';

export const Validation = (values: IError) => {
  let errors: IError = { ...defaultValues };
  {
    /** name checking */
  }
  // if (values.name && !/^[A-Za-z]+$/.test(values.name)) {
  //     errors.name = 'Saisir un nom valide, pas de chiffre'
  // }

  {
    /** firstname cheking */
  }
  // if (!/^[A-Za-z ]+$/.test(values.firstname)) {
  //     errors.firstname = 'Saisir un prénom valide, pas de chiffre'
  // }

  {
    /** birthdate cheking */
  }
  // if (!/^[0-9]{1,2}$/.test(values.child)) {
  //     errors.child = 'Saisir un nombre uniquement'
  // }

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
