import { MAIL_VALIDATION } from '../../../common/utils/validation';
import { defaultValues, type IError } from './dto';

export const Validation = (values: IError) => {
  let errors: IError = { ...defaultValues };
  {
    /** mail checking */
  }
  if (!MAIL_VALIDATION.test(values.email)) {
    errors.email = 'Saisir une adresse email valide';
  }

  {
    /** telphone cheking */
  }
  if (!/^.{6}$/.test(values.password)) {
    errors.password = 'Saisir plus de 6 caractères';
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
