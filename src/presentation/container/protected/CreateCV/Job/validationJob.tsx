import {defaultValues, IError} from './dtoJob';

export const Validation = (values: IError) => {
  let errors: IError = {...defaultValues};

  {
    /** minimumWageRequired cheking */
  }
  if (
    !/^[0-9 ]{1}(([aA]{1}r(iary)?)|([fF]{1}mg))?$/.test(
      values.minimumWageRequired,
    )
  ) {
    errors.minimumWageRequired = 'Saisir un salaire brut (Ariary) valide';
  }

  {
    /** checking all values */
  }
  Object.entries(values).forEach(element => {
    if (
      element[0] !== 'faculty' ||
      (values.levelOfStudy !== 'cepe' && values.levelOfStudy !== 'bepc')
    ) {
      if (
        element[1] === '' ||
        element[1] === null ||
        element[1] === 'INVALID INPUT'
      ) {
        errors = {...errors, [element[0]]: 'Ce champ est obligatoire'};
      }
    }
  });
  errors.portfolio = '';
  return errors;
};
