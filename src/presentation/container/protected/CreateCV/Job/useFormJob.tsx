import { useEffect, useState } from 'react';
import {
  defaultValues,
  type IError,
  showErrorValuesDefault,
  showErrorValuesSubmit,
} from './dtoJob';
export const useForm = (
  dataJob: any,
  Validate: any,
  handleSave: any,
  setData: any
) => {
  const [dto, setDto] = useState({ error: true, dataJob });
  const [showErrors, setShowErrors] = useState(showErrorValuesDefault);
  const [errors, setErrors] = useState<IError>(defaultValues);
  const [salaryError, setSalaryError] = useState(false);

  const handleChange = (name: string, value: any, fired: boolean) => {
    let _value = value;
    if (value === 'INVALID INPUT') {
      setData('job', { ...dataJob, [name]: 'INVALID INPUT' });
    } else {
      if (Platform.OS !== 'web' && name === 'image') {
        _value = {
          uri: value.uri,
          type: value.type,
          name: value.fileName,
        };
      }
      setData('job', { ...dataJob, [name]: _value });
    }

    setErrors(Validate({ ...dataJob, [name]: _value }));
    if (dataJob.minimumWageRequired) {
      setSalaryError(false);
    }

    if (errors[name]) {
      setShowErrors({ ...showErrors, [name]: value !== fired });
    }
  };

  const noError = () => Object.values(errors).every((error) => !error);

  const handleSubmit = () => {
    if (dataJob?.minimumWageRequired === '') {
      setSalaryError(true);
    } else {
      setShowErrors(showErrorValuesSubmit);
      setErrors(Validate(dataJob));
      if (noError()) {
        setDto({ error: false, dataJob });
      } else {
        setDto({ error: true, dataJob: {} });
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
    dataJob,
    errors,
    showErrors,
    dto,
    salaryError,
  };
};
