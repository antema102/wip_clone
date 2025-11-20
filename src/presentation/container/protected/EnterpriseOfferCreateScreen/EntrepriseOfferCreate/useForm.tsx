import { useEffect, useState } from 'react';
import {
  defaultValues,
  type IError,
  showErrorValuesDefault,
  showErrorValuesSubmit,
} from './dto';
import { post } from '../../../services/technique/api';
export const useForm = (
  data: any,
  Validate: any,
  handleCancel: any,
  handleSave: any,
  props
) => {
  const [valuesForm, setValues] = useState(data);
  const [dto, setDto] = useState({ error: true, data });
  const [showErrors, setShowErrors] = useState(showErrorValuesDefault);
  const [showError, setShowError] = useState(true);
  const [errors, setErrors] = useState<IError>(defaultValues);
  const { navigation } = props;

  const handleChangeForm = (name: string, value: any, fired: boolean) => {
    setShowError(false);
    let _value = value;
    if (value === 'INVALID INPUT') {
      setValues({ ...valuesForm, [name]: 'INVALID INPUT' });
    } else {
      if (Platform.OS !== 'web' && name === 'image') {
        _value = {
          uri: value.uri,
          type: value.type,
          name: value.fileName,
        };
      }
      setValues({ ...valuesForm, [name]: _value });
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

  const handleSubmitForm = () => {
    setShowErrors(showErrorValuesSubmit);
    setErrors(Validate(valuesForm));
    if (noError()) {
      setDto({ error: false, data: valuesForm });
      post('/api/inscription', valuesForm).then(
        (res) => res && navigation.navigate('/Login')
      );
    } else {
      setDto({ error: true, data: {} });
    }
  };
  const cancel = () => {};

  useEffect(() => {
    setErrors(Validate(valuesForm));
  }, [valuesForm]);

  useEffect(() => {
    if (!dto.error) {
      handleSave();
    }
  }, [dto]);

  useEffect(() => {}, [showError]);

  return {
    handleChangeForm,
    handleSubmitForm,
    valuesForm,
    errors,
    showErrors,
    dto,
    showError,
    cancel,
  };
};
