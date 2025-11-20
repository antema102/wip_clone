
import './styles.scss'
;
import React, { useState, useRef } from 'react';
import { RESET_PASSWORD } from '../../../../data/constants/strings';
import { MAIL_VALIDATION } from '../../../../common/utils/validation';
import { HttpStatus } from '../../../../data/constants/Http-status';
import { UserSA } from '../../../../service/applicatif/User.sa';
import { COLORS, images } from '../../../../resources/constants';
import Footer from '../../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import CarouselContent from '../../../components/CarouselContent';
import { icons } from '../../../../resources/constants';

export const ForgetPassword = (props: any) => {
    const [email, setEmail] = useState('');
    const { resetUserPassword } = UserSA();
    const [isLoading, setIsLoading] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/inscription');
    };
    const toast = useRef<Toast>(null)
    const sendingEmail = async () => {
        if (emailValidation) {
            setIsLoading(true)
            resetUserPassword(email)
                .then(response => {
                    if (response.status === HttpStatus.OK) {
                        toast.current?.show({ severity: 'success', summary: 'Success', detail: RESET_PASSWORD.USER_DOES_EXIST, life: 3000 });
                        setEmail('');
                        setIsLoading(false)
                    }
                    else {
                        toast.current?.show({ severity: 'error', summary: 'Error', detail: RESET_PASSWORD.USER_DOES_NOT_EXIST, life: 3000 });
                        setIsLoading(false)
                    }
                })
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: RESET_PASSWORD.WRONG_FORMAT, life: 3000 });
            setIsLoading(false)
        }
    }
    const validateEmail = (text) => {
        if (MAIL_VALIDATION.test(text) === false) {
            setEmailValidation(false)
            setEmail(text)
            return false
        }
        else {
            setEmail(text);
            setEmailValidation(true);
        }
    }
    return (
        <>
            <Toast ref={toast} position='bottom-right' />
            <div className='containerBackground' >
                <div className='containers container'>
                    <CarouselContent text={'Bonjour et bienvenue dans le système de récupération de mot de passe. Veuillez entrer votre adresse e-mail associée à votre compte afin de procéder à la réinitialisation de votre mot de passe. Merci !'} />
                    <div className='forgetPassword'>
                        <div className='forgetPassword__logo'>
                            <img onClick={() => navigate('/home')} src={images.WipWork} width={164} height={70} alt='logo' />
                        </div>
                        <div className='forgetPassword__formsText'>
                            <div className='forgetPassword__title'>
                                <h1>REINITIALISATION</h1>
                                <p> Veuillez saisir votre adresse email :</p>
                            </div>
                            <div className='forgetPassword__form'>
                                <div className='forgetPassword__input'>
                                    <input type='text'
                                        placeholder="Entrez votre email" name="email" value={email} onChange={(e) => validateEmail(e.target.value)}
                                        maxLength={50} required />
                                    <div className='forgetPassword__svg'>
                                        <img src={icons.email} alt='email' width={15} height={15} />
                                    </div>
                                </div>
                            </div>
                            <div className='forgetPassword__formulaire'>
                                <div className='forgetPassword__btn'>
                                    <button onClick={sendingEmail}>
                                        {
                                            isLoading ? <span className="spinner" color={COLORS.white} /> : 'Envoyer email de récuperations'
                                        }
                                    </button>
                                </div>
                                <div className='forgetPassword__ligne'>
                                </div>
                                <Footer
                                    onClick={handleNavigation}
                                    infoText={'Pas encore inscrit ? '}
                                    linkText={'Crée votre compte'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
