import './styles.scss';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { COLORS, images, icons } from '../../../../resources/constants';
import Footer from '../../../components/Footer';
import { MAIL_VALIDATION } from '../../../../common/utils/validation';
import { ERROR, HOME, ROLEACCOUNT } from '../../../../data/constants/strings';
import { useAuth } from '../../../../service/redux/ducks/auth';
import { useUser } from '../../../../service/redux/ducks/user';
import { getGoogleToken } from '../../../../service/technique/firebaseWeb';
import { Toast } from 'primereact/toast';
import CarouselContent from '../../../components/CarouselContent';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';

interface User {
  active: boolean,
  role: string;
  id: string;
  createdAt: Date,
  email: string,
  soldeWip: Number,
  lastName: string,
  isSubscribed: Boolean,
}
interface data {
  message: string,
  data: {
    accessToken: string,
    refreshToken: string,
    user: User;
  },
  isError: boolean
}

interface ValuesProps {
  email: string,
  password: string;
  role: string
}

interface TitleLabels {
  Login: {
    email: string;
    password: string;
  };
  ForgotPwd: {
    email: string;
  };
}

export const Login = (): any => {
  const CLIENT_ID: string = "951404007538-q0lk92om16g7t0li5bhr60ec6mkqi8cj.apps.googleusercontent.com";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isServerDown } = useSelector(({ app }) => app);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPwd, setErrorPwd] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const [values, setValues] = useState<ValuesProps>({
    email: '',
    password: '',
    role: 'candidate',
  });

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/inscription');
  };
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const { updateUser } = useUser();

  const TitleLabels: TitleLabels = {
    Login: {
      email: 'Entrez votre email',
      password: 'Entrez votre mot de passe',
    },

    ForgotPwd: {
      email: 'Insérez votre email',
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (name === 'email') {
      if (value !== '') {
        setErrorEmail(false);
      } else {
        setErrorEmail(true);
      }
      setEmail(value);
    } else if (name === 'password') {
      if (value !== '') {
        setErrorPwd(false);
      }
      setPassword(value);
    }
  };
  const checkEmptyEmail = () => !email.trim();
  const checkPwd = () => !password.trim();
  const checkValidMail = () => !MAIL_VALIDATION.test(values.email);
  const handleSubmit = async () => {
    if (checkEmptyEmail()) {
      toast.current?.show({ severity: 'error', summary: 'Erreur', detail: ERROR.EMPTY_EMAIL, life: 3000 });
    }
    if (checkPwd()) {
      toast.current?.show({ severity: 'error', summary: 'Erreur', detail: ERROR.EMPTY_PWD, life: 3000 });
    }
    if (email !== '') {
      if (checkValidMail()) {
        toast.current?.show({ severity: 'error', summary: 'Erreur', detail: ERROR.EMAIL_INVALID, life: 3000 });
        return;
      }
    } else {
      return;
    }
    if (!errorEmail && !errorPwd) {
      setIsLoading(true);
      try {
        const response: any = await loginWithEmail({ ...values })
        if (!response?.data?.isError) {
          const currentUser = response?.data?.user;
          values.email = '';
          values.password = '';
          if (currentUser.role === ROLEACCOUNT.company && !currentUser?.abonnementId) {
            navigate('/MyAccount');
            setIsLoading(false);
            return;
          } else {
            const googleToken = await getGoogleToken();
            if (googleToken) {
              try {
                const updateResponse = await updateUser(currentUser?.accessToken, currentUser?.id, { googleToken: googleToken });
                if (updateResponse) {
                  console.log('Utilisateur mis à jour avec succès.');
                } else {
                  console.error('Erreur lors de la mise à jour de l\'utilisateur.');
                }
              } catch (error) {
                console.error('Erreur lors de l\'appel à updateUser:', error);
              }
            } else {
              console.error('Aucun token Google reçu.');
            }
            navigate('/home');
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.current?.show({
            severity: 'error',
            summary: 'Erreur',
            detail: response?.data?.message || 'Erreur serveur',
            life: 3000
          });
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.current?.show({
          severity: 'error',
          summary: 'Erreur',
          detail: error.toString(),
          life: 3000
        });
      }
    }
  };

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        return;
      }
      const data = { token: credentialResponse.credential };
      const response = await loginWithGoogle(data) as data;
      setIsLoading(true);
      if (!response?.isError) {
        const currentUser = response?.data;
        const googleToken = await getGoogleToken();
        if (googleToken) {
          try {
            const updateResponse = await updateUser(currentUser?.accessToken, currentUser?.user?.id, { googleToken: googleToken });
            if (updateResponse) {
              console.log('');
            }
          } catch (error) {
            console.error('Erreur lors de l\'appel à updateUser:', error);
          }
        } else {
          console.error('');
        }
        navigate('/home');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.current?.show({
          severity: 'error',
          summary: 'Erreur',
          detail: response?.message || 'Erreur serveur',
          life: 3000
        });
      }
    } catch (error) {
      console.error("Erreur lors du login Google :", error);
      setIsLoading(false);
    }
  };

  const handleError = () => {
    console.error("Échec de la connexion Google");
  };

  useEffect(() => {
    if (isServerDown) {
      navigate('/Maintenance');
    }
  }, [isServerDown]);

  return (
    <>
      <Toast ref={toast} position='bottom-right' />
      <div className='containerBackground'>
        <div className='containers container'>
          <CarouselContent text={"WIP work,la plateforme pour trouver votre job de rêve et vos futurs collaborateurs en un simples clics."} />
          <div className='login'>
            <div className='login__logo'>
              <img onClick={() => navigate('/home')} src={images.WipWork} width={164} height={70} alt='logo' />
            </div>
            <div className='login__formsText'>
              <div className='login__title'>
                <h1>Connectez-vous</h1>
                <p>Bienvenue , saisissez vos informations.</p>
              </div>
              <div className='login__form'>
                <div className='login__input'>
                  <input type='text' name='email' placeholder={TitleLabels.Login.email} value={values.email} onChange={handleChange} maxLength={50} required />
                  <div className='login__svg'>
                    <img src={icons.email} alt='email' width={15} height={15} />
                  </div>
                </div>
                <div className='login__input'>
                  <input placeholder={TitleLabels.Login.password} value={values.password} name="password"
                    type={isVisible ? 'text' : 'password'} onChange={handleChange} maxLength={50} required />
                  <div className='login__svg'>
                    <img src={icons.verrouillage} alt='password' width={15} height={15} />
                  </div>
                  <div className='login__visibility' onClick={() => setVisible(!isVisible)}>
                    <img src={isVisible ? icons.novisibility : icons.visibility} alt='visibility' width={15} height={15} />
                  </div>
                </div>
              </div>
              <div className='login__formulaire'>
                <div className='login__checkbox'>
                  <input type='checkbox' />
                  <div className='login__checkboxText'>
                    <span>Se souvenir de moi</span>
                    <span onClick={(e: any) => navigate('/forgetPassword')}>Mot de passe oublié ?</span>
                  </div>
                </div>
                <div className='login__btn'>
                  <button onClick={handleSubmit}>
                    {
                      isLoading ? <ActivityIndicator color={COLORS.white} /> : 'Connexion'
                    }
                  </button>
                </div>
                <div className='login__ligne'>
                </div>
                <Footer
                  onPress={handleNavigation}
                  infoText={HOME.INFORMATIONS}
                  linkText={HOME.REDIRECT}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GoogleOAuthProvider clientId={CLIENT_ID}>
                    <GoogleLogin
                      onSuccess={handleSuccess}
                      onError={handleError}
                      size='large'
                      width='200'
                      theme='outline'
                    />
                  </GoogleOAuthProvider>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};