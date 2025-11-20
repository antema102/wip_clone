import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  defaultValues,
  defaultErrorValues,
  IError,
  showErrorValuesDefault,
  showErrorValuesSubmit,
} from './dto';
import {transformData} from './format';
import { MatchingService } from '../../../../../service/applicatif/Matching.sa';
import { MATCHING } from '../../../../../data/constants/strings';
import {useNavigate} from 'react-router'

export const useForm = (
  data: any,
  Validate: any,
  setIsLoading: any,
  navigation: any,
  setIsLayerEditable: any,
) => {
  const {filterMatchingJob} = MatchingService();
  const [values, setValues] = useState<any>(defaultValues);
  const [showErrors, setShowErrors] = useState(showErrorValuesDefault);
  const [error, setError] = useState(true);
  const [errors, setErrors] = useState<IError>(defaultErrorValues);
  const [popupData, setPopupData] = useState({visibility: false, message: ''});
  const navigate = useNavigate();

  const setVisiblePopup = (newState: boolean) => {
    setPopupData(previousState => ({...previousState, visibility: newState}));
  };

  const handleChange = (name: string, value: any, fired: boolean) => {
    let _value = value;
    if (value === 'INVALID INPUT') {
      setValues(previousValues => ({
        ...previousValues,
        [name]: 'INVALID INPUT',
      }));
    } else {
      if (Platform.OS !== 'web' && name === 'image') {
        _value = {
          uri: value.uri,
          type: value.type,
          name: value.fileName,
        };
      }
      setValues(previousValues => ({...previousValues, [name]: value}));
    }

    setShowErrors({...showErrors, [name]: value !== fired});
  };

  const handleInit = () => {
    setValues(data);
  };

  const checkOrNot = (element, toCompare, score) => {
    if (!element) {
      return 'vide';
    } else {
      if (element === toCompare) {
        return score;
      } else {
        return 0;
      }
    }
  };

  const noError = (errors: any) => Object.values(errors).every(error => !error);

  const getListMatchedJob = async (filtered: any) => {
    let res: any = null;
    try {
      let total = 0;
      Object.values(filtered).forEach((item: any) => {
        total += item.score;
        return total;
      });

      const point0 = filtered?.jobWish?.score ? 100 : 0;
      const point1 = filtered?.activitySector?.score ? 100 : 0;
      const point2 = filtered?.disponibility?.score ? 100 : 0;
      const point3 = filtered?.salaryExpectation?.score ? 100 : 0;
      filtered.jobWish.value = filtered?.jobWish?.value.trim();
      res = await filterMatchingJob(filtered);
      const activity = filtered?.activitySector?.value;
      const salary = filtered?.salaryExpectation?.value;
      const disponibility = filtered?.disponibility?.value;
      
      const variables = res.data.map(item => {
        let matching = {
          'Poste souhaité': point0,
          "Secteur d'activité": checkOrNot(activity, item?.type, point1),
          'Disponibilité de travail': checkOrNot(
            disponibility,
            item?.disponibility,
            point2,
          ),
          'Prétention salariale (Ariary)': checkOrNot(salary, item?.salaire, point3),
        };
        let keys = Object.keys(matching);
        for (let i = 0; i < keys.length; i++) {
          if (matching[keys[i]] === 'vide') {
            delete matching[keys[i]];
          }
        }
        return {
          ...item,
          data: matching,
        };
      });

      if (res?.data?.length) {
        navigate('/SearchEntResultScreen', {state: {
          data: variables.filter(item => item.score > 20),
        }});
      } else {
        navigate('/SearchEntResultScreen', {state: {data: []}});
      }
    } catch (error) {
      navigate('/SearchEntResultScreen', {state: {data: []}});
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    const layerEditable = {};
    Object.entries(Validate(values)).forEach(element => {
      if (element[1]) {
        layerEditable[element[0]] = true;
      }
    });
    setIsLayerEditable(previousState => ({...previousState, ...layerEditable}));

    setShowErrors(showErrorValuesSubmit);
    setErrors(Validate(values));

    if (noError(Validate(values))) {
      setError(false);

      if (Object.keys(values).length) {
        setIsLoading(true);

        const data = transformData(values);

        const filtered = Object.keys(data).reduce((obj, key) => {
          if (data[key].value && data[key].value !== 'string') {
            obj[key] = data[key];
          }
          return obj;
        }, {});

        getListMatchedJob(filtered);
      } else {
        setPopupData({visibility: true, message: MATCHING.FILL_AT_LEAST_ONE});
      }
    } else {
      setPopupData({visibility: true, message: MATCHING.FILL_THE_FIELD});
    }
  };

  useEffect(() => {
    setErrors(Validate(values));
  }, [values]);

  return {
    popupData,
    setVisiblePopup,
    handleChange,
    handleSubmit,
    values,
    errors,
    showErrors,
    handleInit,
    error,
  };
};
