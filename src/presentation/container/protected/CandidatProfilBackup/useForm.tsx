import { useEffect, useState } from 'react';
import {
  defaultValues,
  type IError,
  showErrorValuesDefault,
  showErrorValuesSubmit,
} from './dto';
export const useForm = (data: any, Validate: any, handleSave: any) => {
  const [values, setValues] = useState(data);
  const [dto, setDto] = useState({ error: true, data });
  const [showErrors, setShowErrors] = useState(showErrorValuesDefault);
  const [showError, setShowError] = useState(true);
  const [errors, setErrors] = useState<IError>(defaultValues);

  const handleChange = (name: string, value: any, fired: boolean) => {
    setShowError(false);
    let _value = value;
    if (value === 'INVALID INPUT') {
      setValues({ ...values, [name]: 'INVALID INPUT' });
    } else {
      if (Platform.OS !== 'web' && name === 'image') {
        _value = {
          uri: value.uri,
          type: value.type,
          name: value.fileName,
        };
      }
      setValues({ ...values, [name]: _value });
    }

    setShowErrors({ ...showErrors, [name]: value !== fired });
  };

  const noError = () => {
    let bNoError = true;
    Object.values(errors).forEach((element) => {
      if (element !== '') {
        bNoError = false;
      }
    });
    return bNoError;
  };

  const handleSubmit = () => {
    setShowErrors(showErrorValuesSubmit);
    setErrors(Validate(values));
    if (noError()) {
      setDto({ error: false, data: values });
    } else {
      setDto({ error: true, data: {} });
    }
  };

  useEffect(() => {
    setErrors(Validate(values));
  }, [values]);

  useEffect(() => {
    if (!dto.error) {
      handleSave();
    }
  }, [dto]);

  useEffect(() => {}, [showError]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    showErrors,
    dto,
    showError,
  };
};
