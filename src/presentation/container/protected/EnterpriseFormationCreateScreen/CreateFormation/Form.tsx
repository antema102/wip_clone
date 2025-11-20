import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import CurrencyInput from 'react-native-currency-input';
import { useFormation } from '../../../../../service/redux/ducks/formation';
import { MAIL_VALIDATION, TELEPHONE_VALIDATION } from '../../../../../common/utils/validation';
import { getDynamicListByKey } from '../../../../../service/technique/dynamicService';
import { ERROR } from '../../../../../data/constants/strings';
import { COLORS, SIZES } from '../../../../../resources/constants';
import { styles } from './styles';
import { InputField } from '../../../../components/Inputs/InputField';
import { InputSelect } from '../../../../components/Inputs/InputSelect';
import { formsStyles } from '../../../../globalStyle/formStyles';
import { SubmitButtons } from '../../../../components/Inputs/SubmitButtons';
import Popup from '../../../../components/CreateCV/Popup';
import Loader from '../../../../components/Loader';
import Checkbox from '../../../../components/Checkbox';
import { useNavigate } from 'react-router-dom';

export const Form = (props: any) => {
  const navigation = useNavigate();
  const {user} = useSelector(({auth}) => auth);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState('');
  const [place, setPlace] = useState('');
  const [theme, setTheme] = useState('');
  const [categorie, setCategorie] = useState('');
  const [activityList, setActivityList] = useState<any>();

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [prixError, setPrixError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [placeError, setPlaceError] = useState(false);
  const [themeError, setThemeError] = useState(false);
  const [categorieError, setCategorieError] = useState(false);

  const [titleTextError, setTitleTextError] = useState('');
  const [descriptionTextError, setDescriptionTextError] = useState('');
  const [prixTextError, setPrixTextError] = useState('');
  const [phoneTextError, setPhoneTextError] = useState('');
  const [emailTextError, setEmailTextError] = useState('');
  const [durationTextError, setDurationTextError] = useState('');
  const [placeTextError, setPlaceTextError] = useState('');
  const [themeTextError, setThemeTextError] = useState('');

  const [isPayant, setIsPayant] = useState(false);

  const {createFormation} = useFormation();

  const [values, setValues] = useState({
    email: '',
    title: '',
    description: '',
    phone: '',
    prix: '0',
    duration: '',
    place: '',
    theme: '',
    categorie: '',
  });

  const handleCancel = () => {
    setValues({
      email: '',
      title: '',
      description: '',
      phone: '',
      prix: '0',
      duration: '',
      place: '',
      theme: '',
      categorie: '',
    });
    navigation('/home', {state:{isFormation: true}});
  };

  const handleChange = (name: string, value: any) => {
    setValues({...values, [name]: value});

    switch (name) {
      case 'title':
        setTitleError(!value.length);
        setTitle(value);
        break;
      case 'description':
        setDescriptionError(!value.length);
        setDescription(value);
        break;
      case 'phone':
        setPhoneError(!value.length);
        setPhone(value);
        break;
      case 'email':
        setEmailError(!value.length);
        setEmail(value);
        break;
      case 'prix':
        setPrixError(!value.length);
        setPrix(value);
        break;
      case 'duration':
        setDurationError(!value.length);
        setDuration(value);
        break;
      case 'place':
        setPlaceError(!value.length);
        setPlace(value);
        break;
      case 'theme':
        setThemeError(!value.length);
        setTheme(value);
        break;
      case 'categorie':
        setCategorieError(!value.length);
        setCategorie(value);
        break;
      default:
        break;
    }
  };

  const checkEmptyTitle = () => !title.trim();
  const checkEmptyEmail = () => !email.trim();
  const checkEmptyDescription = () => !description.trim();
  const checkEmptyPrix = () => values.prix === '0';
  const checkEmptyPlace = () => !place.trim();
  const checkEmptyDuration = () => !duration.trim();
  const checkEmptyTheme = () => !theme.trim();

  const checkEmptyPhone = () => !phone.trim();
  const checkValidMail = () => !MAIL_VALIDATION.test(email);
  const checkValidPhone = () => !TELEPHONE_VALIDATION.test(phone);

  const getDynamic = async () => {
    setIsLoading(true);
    const data = await localStorage.getItem('dynamic');
    const dataJSON = JSON.parse(data);
    const activity = getDynamicListByKey('secteurFormations', dataJSON);
    setActivityList(activity);
    setIsLoading(false);
  };

  useEffect(() => {
    getDynamic();
  }, []);

  // -------------------
  const handleSubmit = async () => {
    if (checkEmptyTitle()) {
      setTitleError(true);
      setTitleTextError(ERROR.EMPTY_FIELD);
    }
    if (checkEmptyDescription()) {
      setDescriptionError(true);
      setDescriptionTextError(ERROR.EMPTY_FIELD);
    }
    if (isPayant && checkEmptyPrix()) {
      setPrixError(true);
      setPrixTextError('Le prix doit être supérieur à 0');
    } else {
      setPrixError(false);
      setPrixTextError('');
    }

    if (checkEmptyEmail()) {
      setEmailError(true);
      setEmailTextError(ERROR.EMPTY_FIELD);
    }
    if (checkValidMail()) {
      setEmailError(true);
      setEmailTextError('Email invalide');
    }
    if (checkEmptyPhone()) {
      setPhoneError(true);
      setPhoneTextError(ERROR.EMPTY_FIELD);
    }
    if (checkValidPhone()) {
      setPhoneError(true);
      setPhoneTextError('Téléphone invalide');
    }

    if (checkEmptyDuration()) {
      setDurationError(true);
      setDurationTextError('Ce champ ne doit pas être vide');
    }

    if (checkEmptyPlace()) {
      setPlaceError(true);
      setPlaceTextError('Ce champ ne doit pas être vide');
    }

    if (checkEmptyTheme()) {
      setThemeError(true);
      setThemeTextError('Ce champ ne doit pas être vide');
    }

    if (values.categorie === '') {
      setCategorieError(true);
    }

    if (
      !checkEmptyTitle() &&
      !checkEmptyDescription() &&
      !checkEmptyPhone() &&
      !checkEmptyEmail() &&
      !checkEmptyDuration() &&
      !checkEmptyPlace() &&
      !checkEmptyTheme() &&
      values.categorie
    ) {
      if (
        ((isPayant && !checkEmptyPrix()) || !isPayant) &&
        !checkValidMail() &&
        !checkValidPhone()
      ) {
        setIsLoading(true);
        const dataToPost = {
          ...values,
          isPayant,
          proprietaire: user,
        };

        createFormation(dataToPost).then(res => {
          setIsLoading(false);
          setValues({
            email: '',
            title: '',
            description: '',
            phone: '',
            prix: '0',
            duration: '',
            place: '',
            theme: '',
            categorie: '',
          });
          setTitle('');
          setDescription('');
          setPhone('');
          setPrix(0);
          setEmail('');
          setIsPayant(false);
          setMessage('La formation a bien été ajoutée');
          setModalVisible(true);
        });
      }
    }
  };

  const settingPrix = formattedValue => {
    if (formattedValue) {
      values.prix = prix.toString();
    } else {
      values.prix = '';
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        justifyContent: 'space-between',
      }}>
      <View style={styles.inputWrap}>
        <InputField
          label="Titre"
          value={values.title}
          name="title"
          onChange={handleChange}
          required
          maxLength={150}
        />
      </View>
      {titleError && (
        <Text style={{color: COLORS.red_color}}>{titleTextError}</Text>
      )}
      <View style={styles.inputWrap}>
        <InputField
          label="Thème"
          value={values.theme}
          name="theme"
          onChange={handleChange}
          required
          maxLength={150}
        />
      </View>
      {themeError && (
        <Text style={{color: COLORS.red_color}}>{themeTextError}</Text>
      )}
      <View style={[{marginBottom: 20}, styles.inputWrap]}>
        <InputField
          label="Description"
          value={values.description}
          name="description"
          onChange={handleChange}
          type="textArea"
          required
        />
      </View>
      {descriptionError && (
        <Text style={{color: COLORS.red_color}}>{descriptionTextError}</Text>
      )}
      <View style={styles.inputWrap}>
        <InputField
          label="Lieu"
          value={values.place}
          name="place"
          onChange={handleChange}
          required
          maxLength={150}
        />
      </View>
      {placeError && (
        <Text style={{color: COLORS.red_color}}>{placeTextError}</Text>
      )}
      <View style={styles.inputWrap}>
        <InputField
          label="Durée"
          value={values.duration}
          name="duration"
          onChange={handleChange}
          required
          maxLength={150}
        />
      </View>
      {durationError && (
        <Text style={{color: COLORS.red_color}}>{durationTextError}</Text>
      )}
      <View style={[{marginBottom: 20}, styles.inputWrap]}>
        <InputField
          label="email"
          required
          value={values.email}
          name="email"
          onChange={handleChange}
          typekeyboard="email-address"
          maxLength={50}
        />
      </View>
      {emailError && (
        <Text style={{color: COLORS.red_color}}>{emailTextError}</Text>
      )}
      <View style={styles.inputWrap}>
        <InputField
          label="Numéro téléphone"
          value={values.phone}
          name="phone"
          onChange={handleChange}
          type={'numeric'}
          typekeyboard="numeric"
          required
          maxLength={10}
        />
      </View>
      {phoneError && (
        <Text style={{color: COLORS.red_color}}>{phoneTextError}</Text>
      )}

      {activityList && (
        <View style={styles.inputWrap}>
          <InputSelect
            label={'Catégorie'}
            name="categorie"
            value={values.categorie}
            onChange={handleChange}
            isEditable={true}
            data={activityList}
          />
        </View>
      )}

      {categorieError && (
        <Text style={{color: COLORS.red_color}}>{ERROR.EMPTY_PICK}</Text>
      )}

      <View style={styles.checkBoxContaint}>
        <Checkbox
          checked={isPayant}
          onChange={() => setIsPayant(!isPayant)}
          styles={styles.checkBox}
          // tintColors={{true: COLORS.orange, false: COLORS.blue_border}}
        />

        <Text style={[formsStyles.labelStyle]}>{'Payante'}</Text>
      </View>
      {isPayant && (
        <View style={styles.inputWrap}>
          <View>
            <Text style={[formsStyles.labelStyle]}>{'Prix'}</Text>
          </View>
          <CurrencyInput
            value={prix}
            onChangeValue={setPrix}
            delimiter=","
            separator="."
            precision={0}
            name="prix"
            onChangeText={formattedValue => {
              settingPrix(formattedValue);
            }}
            style={styles.textInput}
          />
        </View>
      )}
      {isPayant && prixError && (
        <Text style={{color: COLORS.red_color}}>{prixTextError}</Text>
      )}

      <View
        style={{
          flex: 1,
          height: 150,
        }}>
        <SubmitButtons
          underlineType={true}
          submitAction={handleSubmit}
          cancelAction={handleCancel}
          submitTitle="Enregistrer"
        />
      </View>
      <Popup
        message={message}
        visible={modalVisible}
        validation={setModalVisible}
        navigation={navigation}
        navigateTo="/home"
        btnTitle={'OK'}
        isFormation={true}
      />
      {isLoading && <Loader />}
    </View>
  );
};
