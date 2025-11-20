import React, { useState, useRef } from 'react';
import { images } from '../../../../resources/constants';
import Footer from '../../../components/Footer';
import { INSCRIPTION, RESET_PASSWORD, STRING_ALL } from '../../../../data/constants/strings';
import { useInscription } from '../../../../service/redux/ducks/inscription';
import { InscriptionService } from '../../../../service/applicatif/Inscription.sa';
import { HttpStatus } from '../../../../data/constants/Http-status';
import { useLocation, useNavigate } from 'react-router-dom';
import CarouselContent from '../../../components/CarouselContent';
import './styles.scss';
import { Toast } from 'primereact/toast';
;
import { time } from 'console';
export const Confirmation = (props: any): any => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const { state } = useLocation();
  const { values } = state;
  const { navigation } = props;
  const texteToUser = `${STRING_ALL.CONFIRMATION} ${values && values?.email}`;
  const { inscription } = useInscription();
  const [visibleModalError, setVisibleModalError] = useState(false);
  const { resendEmail } = InscriptionService();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""))
  const toast = useRef<Toast>(null);
  const resendCode = async () => {
    setIsLoadingResend(true);
    const data = {
      email: values && values?.email};
    await resendEmail(data);
    toast.current?.show({ severity: 'success', summary: 'Success', detail: RESET_PASSWORD.RESEND_MESSAGE, life: 3000 });
    setTimeout(() => {
      setVisibleModalError(true);
    }, 300);
    setTimeout(() => {
      setVisibleModalError(false);
    }, 2000);
    setIsLoadingResend(false);
  };

  const handleSubmit = async () => {
    if (otp.some((digit) => digit === '')) {
      toast.current?.show({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir le code confirmations', life: 3000 });
      return;
    }
    const data = {
      ...values,
      code: otp.join('')
    };

    try {
      setIsLoading(true);
      inscription({ ...data })
        .then((response: any) => {
          if (response.status === HttpStatus.ServerError) {
            setIsLoading(false);
            setErrorMessage(response?.data?.message);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: response?.data?.message, life: 3000 });
          }
          else if (response?.data?.user?.role === 'candidate') {
            setIsLoading(false);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: INSCRIPTION.SUCCESS, life: 5000 });
            setTimeout(() => {
              navigate('/home');
            }, 5000);
          }

          else if (response?.data?.user?.role === 'company') {
            setIsLoading(false);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: INSCRIPTION.SUCCESS, life: 5000 });
            setTimeout(() => {
              navigate('/login');
            }, 5000);
          }
          else {
            setIsLoading(false);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: response?.data?.message, life: 3000 });
          }
        })
        .catch(error => {
          toast.current?.show({ severity: 'success', summary: 'Success', detail: error, life: 3000 });
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const redirection = async () => {
    navigate('/login')
  };
  return (
    <>
      <Toast ref={toast} position='bottom-right' />
      <div className='containerBackground'>
        <div className='containers container'>
          <CarouselContent text={texteToUser} />
          <div className='confirmation'>
            <div className='confirmation__logo'>
              <img onClick={() => navigate('/home')} src={images.WipWork} width={164} height={70} alt='logo' />
            </div>
            <div className='confirmation__formsText'>
              <div className='confirmation__title'>
                <h1>Vérification de l'adresse e-mail</h1>
                <p>Veuillez saisir le code à 6 caractères :</p>
              </div>
              <div className='confirmation__form'>
                {
                  otp.map((data, i) => {
                    return (
                      <input
                        key={i}
                        type='text'
                        maxLength={1}
                        required
                        value={data}
                        className={data ? 'active' : ''}
                        onChange={(e) => {
                          const newOtp = [...otp];
                          newOtp[i] = e.target.value;
                          setOtp(newOtp);
                          if (e.target.value && i < otp.length - 1) {
                            const nextInput = document.querySelector(`input[name='otp-${i + 1}']`);
                            if (nextInput) {
                              (nextInput as HTMLElement).focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace') {
                            if (otp[i]) {
                              const newOtp = [...otp];
                              newOtp[i] = '';
                              setOtp(newOtp);
                            } else if (i > 0) {
                              const prevInput = document.querySelector(`input[name='otp-${i - 1}']`);
                              if (prevInput) {
                                (prevInput as HTMLElement).focus();
                              }
                            }
                          } else if (e.key === 'ArrowLeft' && i > 0) {
                            const prevInput = document.querySelector(`input[name='otp-${i - 1}']`);
                            if (prevInput) {
                              (prevInput as HTMLElement).focus();
                            }
                          } else if (e.key === 'ArrowRight' && i < otp.length - 1) {
                            const nextInput = document.querySelector(`input[name='otp-${i + 1}']`);
                            if (nextInput) {
                              (nextInput as HTMLElement).focus();
                            }
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const pasteData = e.clipboardData.getData('text');
                          const newOtp = [...otp];
                          for (let j = 0; j < pasteData.length && i + j < otp.length; j++) {
                            newOtp[i + j] = pasteData[j];
                          }
                          setOtp(newOtp);
                        }}
                        name={`otp-${i}`}
                      />
                    );
                  })
                }
              </div>
            </div>
            <div className='confirmation__formulaire'>
              <div className='confirmation__btn'>
                <button className='margin-bottom-8' onClick={handleSubmit}>
                  {
                    isLoading ? <span className="spinner" /> : "Confirmer le code de validations"
                  }
                </button>
                <button onClick={resendCode}>
                  {
                    isLoadingResend ? <span className="spinner" /> : "Renvoyer le code de validations"
                  }
                </button>
              </div>
              <div className='confirmation__ligne'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
