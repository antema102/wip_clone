import { useEffect, useState } from 'react';
import {
  defaultValues,
  type IError,
  showErrorValuesDefault,
  showErrorValuesSubmit,
} from './dtoInfo';
export const useForm = (
  dataInfo: any,
  Validate: any,
  handleSave: any,
  setData: any
) => {
  const [dto, setDto] = useState({ error: true, dataInfo });
  const [showErrors, setShowErrors] = useState(showErrorValuesDefault);
  const [showError, setShowError] = useState(true);
  const [errors, setErrors] = useState<IError>(defaultValues);

  const handleChange = (name: string, value: any, fired: boolean) => {
    setShowError(false);
    let _value = value;
    if (value === 'INVALID INPUT') {
      setData('info', { ...dataInfo, [name]: 'INVALID INPUT' });
    } else {
      if (Platform.OS !== 'web' && name === 'image') {
        _value = {
          uri: value.uri,
          type: value.type,
          name: value.fileName,
        };
      }
      setData('info', { ...dataInfo, [name]: _value });
    }
    setErrors(Validate({ ...dataInfo, [name]: _value }));

    if (errors[name]) {
      setShowErrors({ ...showErrors, [name]: value !== fired });
    }
  };

  const noError = () => Object.values(errors).every((error) => !error);

  const handleSubmit = () => {
    setShowErrors(showErrorValuesSubmit);
    setErrors(Validate(dataInfo));
    if (noError()) {
      setDto({ error: false, dataInfo });
    } else {
      setDto({ error: true, dataInfo: {} });
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
    dataInfo,
    errors,
    showErrors,
    dto,
    showError,
  };
};
