import {useEffect, useState} from 'react';
;
import {
  defaultValues,
  IError,
  showErrorValuesDefault,
  showErrorValuesSubmit} from './dtoOther';

export const useForm = (
  dataOther: any,
  Validate: any,
  handleSave: any,
  setData: any,
) => {
  const [dto, setDto] = useState({error: true, dataOther});
  const [showErrors, setShowErrors] = useState(showErrorValuesDefault);
  const [errors, setErrors] = useState<IError>(defaultValues);
  const [languageError, setLanguageError] = useState(false);

  const handleChange = (name: string, value: any, fired: boolean) => {
    let _value = value;
    if (value === 'INVALID INPUT') {
      setData('other', {...dataOther, [name]: 'INVALID INPUT'});
    } else {
      if (Platform.OS !== 'web' && name === 'image') {
        _value = {
          uri: value.uri,
          type: value.type,
          name: value.fileName};
      }
      setData('other', {...dataOther, [name]: _value});
    }

    setErrors(Validate({...dataOther, [name]: _value}));
    if (dataOther?.listLanguages.length !== 0) {
      setLanguageError(false);
    }
    if (errors[name]) {
      setShowErrors({...showErrors, [name]: value !== fired});
    }
  };

  const noError = () => Object.values(errors).every(error => !error);

  const handleSubmit = () => {
    if (dataOther?.listLanguages.length === 0) {
      setLanguageError(true);
    } else {
      setShowErrors(showErrorValuesSubmit);
      setErrors(Validate(dataOther));
      if (noError()) {
        setDto({error: false, dataOther: dataOther});
      } else {
        setDto({error: true, dataOther: {}});
      }
    }
  };

  useEffect(() => {
    if (!dto.error) {
      handleSave();
    }
  }, [dto]);

  return {
    handleChange,
    handleSubmit,
    noError,
    dataOther,
    errors,
    showErrors,
    dto,
    languageError};
};
