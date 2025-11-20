import {MAIL_VALIDATION} from '../../../common/utils/validation';
import {defaultValues, IError} from './dto';

export const Validation = (values: IError) => {
  let errors: IError = {...defaultValues};
  Object.entries(values).forEach(element => {
    if (
      element[1] === '' ||
      element[1] === null ||
      element[1] === 'INVALID INPUT'
    ) {
      errors = {...errors, [element[0]]: 'Ce champ est obligatoire'};
    }
  });

  return errors;
};
