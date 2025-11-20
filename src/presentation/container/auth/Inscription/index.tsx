import './styles.scss';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../components/Inputs/InputField';
import { styles } from './styles';
import { FONTS, SIZES, COLORS, images, icons } from '../../../../resources/constants';
import { Loader } from '../../../components/Loader';
import Popup from '../../../components/Popup2';
import Footer from '../../../components/Footer';
import { MAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../../common/utils/validation';
import { ERROR, HOME, INSCRIPTION, ROLEACCOUNT } from '../../../../data/constants/strings';
import CustomBtn from '../../../components/Button/button';
import { InscriptionService } from '../../../../service/applicatif/Inscription.sa';
import { HttpStatus } from '../../../../data/constants/Http-status';
import SwitchSelector from '../../../components/SwitchSelector';
import { useMobile } from '../../../../service/hooks/useMobile';
import MiniLoader from '../../../components/MiniLoader';
import CarouselContent from '../../../components/CarouselContent';
import { Toast } from 'primereact/toast';
export const Inscription = (props: any): any => {
  const [isCandidat, setIsCandidat] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState('');
  const [errorPwd, setErrorPwd] = useState(false);
  const [errorConfirmPwd, setErrorConfirmPwd] = useState(false);
  const [errorEntreprise, setErrorEntreprise] = useState(false);
  const [txtErrorMail, setTextErrorMail] = useState('');
  const [txtErrorConfirmPwd, setTxtErrorConfirmPwd] = useState('');
  const [txtErrorEntreprise, setTxtErrorEntreprise] = useState('');
  const [txtErrorPwd, setTxtErrorPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleModalError, setVisibleModalError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const toast = useRef<Toast>(null);
  const options = [
    { label: 'Candidat', value: 'candidate' },
    { label: 'Entreprise', value: 'company' },
  ];
  const { postSendEmail } = InscriptionService();
  const handleChangeButtonText = (value: any): any => {
    value === 'company' ? setIsCandidat(false) : setIsCandidat(true);
    values.role = value;
    setValues({
      email: '',
      password: '',
      confirmPwd: '',
      entreprise: '',
      role: value,
    });
  };

  // Test create values
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPwd: '',
    entreprise: '',
    role: 'candidate',
  });
  const navigate = useNavigate();
  const handleNavigation = (): any => {
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (name == 'email') {
      if (value !== '') {
        setErrorEmail(false);
      } else {
        setErrorEmail(true);
      }
      setEmail(value);
    } else if (name == 'password') {
      if (value !== '') {
        setErrorPwd(false);
      }
      setPassword(value);
    } else if (name == 'confirmPwd') {
      if (value !== '') {
        setErrorConfirmPwd(false);
      }
      setConfirmPwd(value);
    } else if (name == 'entreprise') {
      if (value !== '') {
        setErrorEntreprise(false);
      }
      setEntreprise(value);
    }
  };

  const checkEmptyEmail = () => !email.trim();
  const checkPwd = () => !password.trim();
  const checkValidMail = () => !MAIL_VALIDATION.test(values.email);
  const checkValidPwd = () => !PASSWORD_VALIDATION.test(values.password);
  const checkConfirmPwd = () => confirmPwd !== password;
  const checkEntreprise = () => !entreprise.trim();
  // -------------------
  const handleSubmit = async () => {
    
    if (checkEmptyEmail()) {
      setErrorEmail(true);
      setTextErrorMail(ERROR.EMPTY_EMAIL);
    }
    if (checkPwd()) {
      setErrorPwd(true);
      setTxtErrorPwd(ERROR.EMPTY_PWD);
    }
    if (checkEntreprise()) {
      setErrorEntreprise(true);
      setTxtErrorEntreprise(ERROR.EMPTY_ENTREPRISE);
    }
    if (checkConfirmPwd()) {
      setErrorConfirmPwd(true);
      setTxtErrorConfirmPwd(ERROR.CONFIRM_PWD);
    } else {
      setErrorConfirmPwd(false);
    }

    if (email !== '') {
      if (checkValidMail()) {
        setErrorEmail(true);
        setTextErrorMail(ERROR.EMAIL_INVALID);
      }
    }
    if (password !== '') {
      if (checkValidPwd()) {
        setErrorPwd(true);
        setTxtErrorPwd(ERROR.INVALID_PWD);
      }
    }

    if (
      !checkEmptyEmail() &&
      !checkPwd() &&
      !checkConfirmPwd() &&
      !checkValidMail() &&
      !checkValidPwd()
    ) {
      if (values.role === ROLEACCOUNT.candidate) {
        setIsLoading(true);
        const data = {
          email: values.email,
          password: values.password,
          entreprise: values.entreprise,
          confirmationPassword: values.confirmPwd,
          role: values.role,
        };
        const response = await postSendEmail(data);
        if (response?.status === HttpStatus.ServerError) {
          setIsLoading(false);
          setErrorMessage(response?.data?.message);
          toast.current?.show({ severity: 'error', summary: 'Erreur', detail: response?.data?.message, life: 3000 });
          setModalVisible(true);
        } else {
          setIsLoading(false);
          navigate('confirmation', { state: { values: data } });
        }
      } else {
        setIsLoading(false);
        navigate('/inscription/validation', { state: { valuesToPass: values } });
      }
    }
  };
  return (
    <>
      <Toast ref={toast} position='bottom-right' />
      <div className='containerBackground'>
        <div className='containers container'>
          <CarouselContent text={"WIP work,la plateforme pour trouver votre job de rêve et vos futurs collaborateurs en un simples clics."} />
          <div className='inscription'>
            <div className='inscription__logo'>
              <img onClick={() => navigate('/home')} src={images.WipWork} width={164} height={70} alt='logo' />
            </div>
            <div className='inscription__formsText'>
              <div className='inscription__title'>
                <h1>Inscription</h1>
                <p>{isCandidat ? "Inscrivez-vous et trouvez un job en 1 minute." : "Inscrivez-vous et trouvez un collaborateur en 1 minute."}</p>
              </div>
              <div className='inscription__SwitchSelector'>
                <SwitchSelector
                  options={options}
                  selectedOption={values.role}
                  onChange={(value: any) => {
                    handleChangeButtonText(value);
                  }}
                />
              </div>

              <div className='inscription__form'>

                {
                  !isCandidat && (
                    <div className='inscription__input'>
                      <input type='text' name="entreprise" placeholder="Entrez le nom de votre entreprise" value={values.entreprise} maxLength={50}
                        onChange={handleChange} required />
                      <div className='inscription__svg'>
                        <img src={icons.immeuble} alt='email' width={15} height={15} />
                      </div>
                    </div>
                  )}

                <div className='inscription__input'>
                  <input type='email' name="email" placeholder="Entrez votre email" value={values.email} maxLength={50} onChange={handleChange} required className={`${errorEmail ? 'error' : ' '} `} />
                  <div className='inscription__svg'>
                    <img src={icons.email} alt='email' width={15} height={15} />
                  </div>
                  {errorEmail && (
                    <span className='inscription__error'>{txtErrorMail}</span>
                  )}
                </div>

                <div className='inscription__input'>
                  <input name="password"
                    maxLength={50} type={showPassword ? 'text' : 'password'} value={values.password} placeholder="Entrez votre mot de passe" onChange={handleChange} required className={`${errorPwd ? 'error' : ' '} `} />
                  <div className='inscription__svg'>
                    <img src={icons.verrouillage} alt='password' width={15} height={15} />
                  </div>
                  <div className='inscription__visibility' onClick={() => setShowPassword(!showPassword)}>
                    <img src={showPassword ? icons.novisibility : icons.visibility} alt='visibility' width={15} height={15} />
                  </div>
                  {
                    errorPwd && (
                      <span className='inscription__error'>{txtErrorPwd}</span>
                    )
                  }
                </div>
                <div className='inscription__input'>
                  <input name="confirmPwd"
                    maxLength={50} required type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmez votre mot de passe" value={values.confirmPwd} onChange={handleChange} className={`${errorConfirmPwd ? 'error ' : ' '}`} />
                  <div className='inscription__svg'>
                    <img src={icons.verrouillage} alt='password' width={15} height={15} />
                  </div>
                  <div className='inscription__visibility' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <img src={showConfirmPassword ? icons.novisibility : icons.visibility} alt='visibility' width={15} height={15} />
                  </div>
                  {
                    confirmPwd &&
                    (
                      <span className='inscription__error'>
                        {
                          txtErrorConfirmPwd
                        }
                      </span>
                    )
                  }
                </div>
              </div>

              <div className='inscription__formulaire'>
                <div className='inscription__checkbox'>
                  <input type='checkbox' onChange={() => setIsChecked(!isChecked)} />
                  <div className='inscription__checkboxText'>
                    <span>En cochant cette case, j'accepte les termes et <a href='https://www.wipwork.com/terms'> conditions d'utilisation. </a></span>
                  </div>
                </div>
                <div className='inscription__btn'>
                  <button onClick={handleSubmit} disabled={!isChecked}>
                    {
                      isLoading ? <ActivityIndicator /> : INSCRIPTION.CONTINUE
                    }

                  </button>
                </div>
                <div className='inscription__ligne'>
                </div>
                <Footer
                  onPress={handleNavigation}
                  infoText={'Vous avez déjà un compte ? '}
                  linkText={'Se connecter'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
