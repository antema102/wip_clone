import React from 'react';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { IError, defaultErrorsValues, defaultValues, showErrorValuesDefault, showErrorValuesSubmit } from './dto';
import { useMatching } from '../../../../../service/redux/ducks/matching';
import { MATCHING } from '../../../../../data/constants/strings';

export const useForm = (
  data: any,
  Validate: any,
  navigate: any,
  handleSave: any,
  setIsLayerEditable: any,
) => {
  const [values, setValues] = useState<any>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorSalary, setErrorSalary] = useState('');
  const [errorAge, setErrorAge] = useState('');
  const [dto, setDto] = useState({ error: true, data });
  const [showErrors, setShowErrors] = useState(showErrorValuesDefault);
  const [showError, setShowError] = useState(true);
  const [errors, setErrors] = useState<IError>(defaultErrorsValues);
  const [dataMatching, setDataMatching] = useState([]);
  const [noMatching, setNoMatching] = useState(false);
  const { filterMatching } = useMatching();
  const [popupData, setPopupData] = useState({ visibility: false, message: '' });

  const setVisiblePopup = (newState: boolean) => {
    setPopupData(previousState => ({ ...previousState, visibility: newState }));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    setDataMatching([]);
    setNoMatching(false);
  }, []);

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
      setValues(previousValue => ({ ...previousValue, [name]: _value }));
    }
    setShowErrors({ ...showErrors, [name]: value !== fired });
  };

  const handleBlur = (name: string) => {
    if (values[`${name}max`] && values[`${name}min`]) {
      const max = parseInt(values[`${name}max`], 10);
      const min = parseInt(values[`${name}min`], 10);
      if (name === 'salary') {
        setErrorSalary(min > max ? MATCHING.ERROR_SALARY : '');
      } else if (name === 'dateofBirth') {
        setErrorAge(min > max ? MATCHING.ERROR_AGE : '');
      }
    }
  };
  const handlePopup = () => {
    setIsError(false);
  };

  const transformData = obj => {
    type DataType = {
      [key: string]: {
        value?: string;
        valueMin?: number;
        valueMax?: number;
        score: number;
      };
    };

    const data: DataType = {
      activitySector: {
        value: 'string',
        score: 0,
      },
      desiredPost: {
        value: 'string',
        score: 0,
      },
      salary: {
        valueMin: 0,
        valueMax: 0,
        score: 0,
      },
      dateofBirth: {
        valueMin: 0,
        valueMax: 0,
        score: 0,
      },
      language: {
        value: 'string',
        score: 0,
      },
      sport: {
        value: 'string',
        score: 0,
      },
      interest: {
        value: 'string',
        score: 0,
      },
      filiere: {
        value: 'string',
        score: 0,
      },
      level: {
        value: 'string',
        score: 0,
      },
      disponibility: {
        value: 'string',
        score: 0,
      },
      province: {
        value: 'string',
        score: 0,
      },
      transport: {
        value: 'string',
        score: 0,
      },
      zone: {
        value: 'string',
        score: 0,
      },
      statut: {
        value: 'string',
        score: 0,
      },

      adrsCountry: {
        value: 'string',
        score: 0,
      },
      adrsRegion: {
        value: 'string',
        score: 0,
      },
      adrsProvince: {
        value: 'string',
        score: 0,
      },
      adrsZone: {
        value: 'string',
        score: 0,
      },
      jobCountry: {
        value: 'string',
        score: 0,
      },
      jobRegion: {
        value: 'string',
        score: 0,
      },
      jobProvince: {
        value: 'string',
        score: 0,
      },
      jobZone: {
        value: 'string',
        score: 0,
      },
      yearOfExp: {
        value: 'string',
        score: 0,
      },
      jobType: {
        value: 'string',
        score: 0,
      },
      jobPlace: {
        value: 'string',
        score: 0,
      },
      lastjobType: {
        value: 'string',
        score: 0,
      },
      lastjobPlace: {
        value: 'string',
        score: 0,
      },
      loger: {
        value: 'string',
        score: 0,
      },
      recommandation: {
        value: 'string',
        score: 0,
      },
      candidat: {
        value: 'string',
        score: 0
      },
    };
    for (const property in obj) {
      if (!property.includes('_level')) {
        if (property.includes('min')) {
          data[property.slice(0, -3)].valueMin = parseInt(obj[property], 10);
        } else if (property.includes('max')) {
          data[property.slice(0, -3)].valueMax = parseInt(obj[property], 10);
        }
        else {
          data[property].value = obj[property];
        }
      } else {
        const key = property.replace('_level', '');
        data[key].score = parseInt(obj[property]);
      }
    }
    return data;
  };

  const noError = errors => Object.values(errors).every(error => !error);

  const handleInit = () => {
    setValues(previousState =>
      Object.keys(previousState).reduce(
        (res, key) => ({ ...res, [key]: '' }),
        {},
      ),
    );
  };

  const checkOrNot = (element, toCompare, score) => {
    if (element === 'indifferent') {
      return score;
    }
    if (element === undefined) {
      return 'vide';
    } else {
      if (element === toCompare) {
        return score;
      } else {
        return 0;
      }
    }
  };

  const searchInAnArray = (element, toCompare, score) => {
    if (!element) {
      return 'vide';
    }
    const result = toCompare.find(obj => obj?.name === element);
    if (result) {
      return score;
    } else {
      return 0;
    }
  };

  const isBetween = (x, a, b, score, date?) => {
    if (!a) {
      return 'vide';
    } else {
      if (date) {
        x = calculateAge(x);
      }
      if (x >= a && x <= b) {
        return score;
      } else {
        return 0;
      }
    }
  };

  function calculateAge(birthdate) {
    var today = new Date();
    var birthDate = new Date(birthdate);
    var ageInMilliseconds = today - birthDate;
    var ageInYears = ageInMilliseconds / 31557600000;
    return Math.floor(ageInYears);
  }

  const handleSubmit = async () => {
    const layerEditable = {};
    Object.entries(Validate(values)).forEach(element => {
      if (element[1]) {
        layerEditable[element[0]] = true;
      }
    });
    setIsLayerEditable(previousState => ({ ...previousState, ...layerEditable }));

    setShowErrors(showErrorValuesSubmit);
    setErrors(Validate(values));

    if (noError(Validate(values)) && !errorSalary && !errorAge) {
      if (Object.keys(values).length) {
        setIsLoading(true);
        if (values.loger === 'true') {
          values.loger = true;
        }
        if (values.loger === 'false') {
          values.loger = false;
        }
        if (values.recommandation === 'true') {
          values.recommandation = true;
        }
        if (values.recommandation === 'false') {
          values.recommandation = false;
        }
        const data = transformData(values);
        if (values.loger === true) {
          values.loger = 'true';
        }
        if (values.loger === false) {
          values.loger = 'false';
        }
        if (values.recommandation === true) {
          values.recommandation = 'true';
        }
        if (values.recommandation === false) {
          values.recommandation = 'false';
        }
        let filtered = Object.keys(data).reduce((obj, key) => {
          if (
            data[key].valueMin !== 0 &&
            data[key].valueMax !== 0 &&
            data[key].value !== 'string' &&
            data[key].valueMin !== 'string' &&
            data[key].valueMax !== 'string'
          ) {
            obj[key] = data[key];
          }
          return obj;
        }, {});
        try {
          let type = "";
          if (filtered.candidat) {
            type = filtered.candidat.value;
            type=type.toLowerCase();
            delete filtered.candidat;
          } else {
            type = "";
          }
          filtered.desiredPost.value = filtered.desiredPost.value.trim();
          const response: any = await filterMatching(type,filtered);
          let total = 0;
          Object.values(filtered).forEach((item: any) => {
            total += item.score;
            return total;
          });
          const point0 = filtered?.desiredPost?.score ? 100 : 0;
          const point1 = filtered?.activitySector?.score ? 100 : 0;
          const point2 = filtered?.level?.score ? 100 : 0;
          const point3 = filtered?.disponibility?.score ? 100 : 0;
          const point4 = filtered?.transport?.score ? 100 : 0;
          const point5 = filtered?.statut?.score ? 100 : 0;
          const point6 = filtered?.adrsCountry?.score ? 100 : 0;
          const point7 = filtered?.adrsProvince?.score ? 100 : 0;
          const point8 = filtered?.adrsZone?.score ? 100 : 0;
          const point9 = filtered?.salary?.score ? 100 : 0;
          const point10 = filtered?.dateofBirth?.score ? 100 : 0;
          const point11 = filtered?.yearOfExp?.score ? 100 : 0;
          const point12 = filtered?.lastjobType?.score ? 100 : 0;
          const point13 = filtered?.lastjobPlace?.score ? 100 : 0;
          const point14 = filtered?.jobCountry?.score ? 100 : 0;
          const point15 = filtered?.jobProvince?.score ? 100 : 0;
          const point16 = filtered?.jobZone?.score ? 100 : 0;
          const point17 = filtered?.language?.score ? 100 : 0;
          const point18 = filtered?.sport?.score ? 100 : 0;
          const point19 = filtered?.interest?.score ? 100 : 0;
          const point20 = filtered?.loger?.score ? 100 : 0;
          const point21 = filtered?.recommandation?.score ? 100 : 0;

          const activity = filtered?.activitySector?.value;
          const disponibility = filtered?.disponibility?.value;
          const level = filtered?.level?.value;
          const transport = filtered?.transport?.value;
          const statut = filtered?.statut?.value;
          const country = filtered?.adrsCountry?.value;
          const province = filtered?.adrsProvince?.value;
          const zone = filtered?.adrsZone?.value;
          const salaryMin = filtered?.salary?.valueMin;
          const salaryMax = filtered?.salary?.valueMax;
          const ageMax = filtered?.dateofBirth?.valueMax;
          const ageMin = filtered?.dateofBirth?.valueMin;
          const yearOfExp = filtered?.yearOfExp?.value;
          const lastjobType = filtered?.lastjobType?.value;
          const lastjobDescription = filtered?.lastjobDescription?.value;
          const lastjobPlace = filtered?.lastjobPlace?.value;
          const countryDEST = filtered?.jobCountry?.value;
          const provinceDEST = filtered?.jobProvince?.value;
          const zoneDEST = filtered?.jobZone?.value;
          const language = filtered?.language?.value;
          const sport = filtered?.sport?.value;
          const interest = filtered?.interest?.value;
          const loger = filtered?.loger?.value;
          const recommandation = filtered?.recommandation?.value;

          if (!response.isError) {
            setIsError(true);
            setDto({ error: true, data: values });
            const result = response.data.filter(x => x.score > 9);
            const variables = result.map(item => {
              let matching = {
                'Poste recherché': point0,
                "Secteur d'activité": checkOrNot(
                  activity,
                  item?.jobWish?.sector,
                  point1,
                ),
                "Niveau d'étude": checkOrNot(
                  level,
                  item?.studyArea[0]?.level,
                  point2,
                ),
                Disponibilité: checkOrNot(
                  disponibility,
                  item?.disponibility,
                  point3,
                ),
                Transport: checkOrNot(transport, item?.transport, point4),
                Contrat: checkOrNot(statut, item?.statut, point5),
                Loger: checkOrNot(loger, item?.loger, point20),
                Pays: checkOrNot(country, item?.adress?.country?.id, point6),
                Province: checkOrNot(
                  province,
                  item?.adress?.province?.id,
                  point7,
                ),
                zone: checkOrNot(zone, item?.adress?.zone, point8),
                'Salaire brut (Ariary)': isBetween(
                  item?.jobWish?.salaryExpectation,
                  salaryMin,
                  salaryMax,
                  point9,
                ),
                Age: isBetween(
                  item?.user?.birthDate,
                  ageMin,
                  ageMax,
                  point10,
                  true,
                ),
                "Nombre d'année d'expérience": checkOrNot(
                  yearOfExp,
                  item?.jobWish?.yearOfExperience,
                  point11,
                ),
                'Ancien Travail': checkOrNot(
                  lastjobType,
                  item?.lastExperience[0]?.jobType,
                  point12,
                ),
                'Ancienne Entreprise': checkOrNot(
                  lastjobPlace,
                  item?.lastExperience[0]?.jobPlace,
                  point13,
                ),
                'Description tâches': checkOrNot(
                  lastjobDescription,
                  item?.lastExperience[0]?.jobDescription,
                ),
                'Pays souhaité': checkOrNot(
                  countryDEST,
                  item?.jobLocalisation[0]?.country?.id,
                  point14,
                ),
                'Province souhaité': checkOrNot(
                  provinceDEST,
                  item?.jobLocalisation[0]?.province?.id,
                  point15,
                ),
                'Quartier ou Commune souhaitée': checkOrNot(
                  zoneDEST,
                  item?.jobLocalisation[0]?.zone,
                  point16,
                ),
                Langue: searchInAnArray(language, item?.languages, point17),
                Sports: checkOrNot(
                  sport,
                  item?.sport ? item?.sport[0] : 'vide',
                  point18,
                ),
                "Centre d'intérêt": checkOrNot(
                  interest,
                  item?.interest,
                  point19,
                ),
                Recommandation: checkOrNot(
                  recommandation,
                  item?.isRecommandation,
                  point21,
                ),
              };
              let keys = Object.keys(matching);
              for (let i = 0; i < keys.length; i++) {
                if (matching[keys[i]] === 'vide') {
                  delete matching[keys[i]];
                }
              }
              return { data: matching };
            });

            if (!result.length) {
              setNoMatching(true);
            }
            setIsLoading(false);
            setDataMatching(variables);
            navigate('/FindTalentListScreen', {
              state: {
                dataList: variables,
                matching: variables,
                response: response
              }
            });
          }
        } catch (error) {
          setIsLoading(false);
        }
        setDto({ error: false, data: values });
      } else {
        setDto({ error: true, data: values });
        setIsLoading(false);
        setPopupData({ visibility: true, message: MATCHING.FILL_AT_LEAST_ONE });
      }
    } else {
      setPopupData({
        visibility: true,
        message: errorSalary
          ? MATCHING.ERROR_SALARY
          : errorAge
            ? MATCHING.ERROR_AGE
            : MATCHING.FILL_THE_FIELD,
      });
      handleSave(errors);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setErrors(Validate(values));
  }, [values]);

  useEffect(() => {
    if (!dto.error && dataMatching.length) {
      handleSave();
      setIsLoading(false);
    }
  }, [dto, dataMatching]);

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    handleInit,
    values,
    errors,
    showErrors,
    dto,
    showError,
    dataMatching,
    isLoading,
    setIsLoading,
    isError,
    handlePopup,
    noMatching,
    popupData,
    setVisiblePopup,
    errorSalary,
    errorAge,
  };
};
