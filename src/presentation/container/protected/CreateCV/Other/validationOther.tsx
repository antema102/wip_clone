import { defaultValues, IError } from './dtoOther';

export const Validation = (values: IError) => {
  let errors: IError = {...defaultValues};
  
  {/** checking all values */}
  Object.entries(values).forEach(element => {
    if (element[0] !== 'centerIntrest' && element[0] !== 'somethingAboutU' && (element[1] === '' || element[1] === null || element[1] === 'INVALID INPUT')) {
      errors = {...errors, [element[0]]: 'Ce champ est obligatoire'};
    }
  });

    return errors;
}
