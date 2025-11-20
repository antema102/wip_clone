import {useEffect, useState} from 'react';
;
import {
  defaultValues,
  IError,
  showErrorValuesDefault,
  showErrorValuesSubmit} from './dto';

export const useLogin = (
  /*data: any, Validate: any,handleCancel: any,handleSave: any*/ props: any,
) => {
  const handleInscription = () => {};

  const handleSubmit = () => {
    /*setShowErrors(showErrorValuesSubmit)
        setErrors(Validate(values))
        if (noError()) {
            setDto({ error: false, data: values })
        }
        else {
            setDto({ error: true, data: {} })
        }*/
  };
  const handleCancel = () => {
    //handleCancel()
  };

  return {handleSubmit, handleInscription, handleCancel};
};
