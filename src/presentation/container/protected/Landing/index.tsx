import './style.scss';
import React from "react";
import Navbar from './Navbar';
import {  useNavigate } from 'react-router-dom';
import { images } from '../../../../resources/constants';
import Offre from './Offre';
import About from './About';
import Footer from './Footer';
import Reason from './Reason';
import HowIsWork from './HowIsWork';
import Testimony from './Testimony';
import ChatBotLanding from './ChatBotLanding';
import Mobile from './Mobile';

const Landing = (props: any): any => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/inscription')
    }
    
    return (
        <>
            <div className='landing'>
                <div className={`container ${props.mobile ? 'padding-0 ' : ''}`}>
                    <Navbar SignedIn={props.isSignedIn} />
                </div>
                <div className='container'>
                    <div className='hero' id='hero'>
                        <div className='hero__left'>
                            <div>
                                <div className='hero__title'>
                                    <div className='hero__group'>
                                        <img src={images.user} alt='' width={40} height={40} loading='lazy' />
                                        <img src={images.user_2} alt='' width={40} height={40} loading='lazy' />
                                        <img src={images.user_3} alt='' width={40} height={40} loading='lazy' />
                                        <img src={images.user_4} alt='' width={40} height={40} loading='lazy' />
                                        <img src={images.user_5} alt='' width={40} height={40} loading='lazy' />
                                        <img src={images.user_6} alt='' width={40} height={40} loading='lazy' />
                                        <img src={images.user_7} alt='' width={40} height={40} loading='lazy' />
                                    </div>
                                    <span> + de 10.000 personnes inscrites </span>
                                </div>
                                <div className='hero__container'>
                                    <h1>Gagnez du temps :
                                        recrutez ou postulez
                                        en quelques clics.</h1>
                                    <p className='hero__text'>
                                        Notre système de matching avancé connecte efficacement les entreprises
                                        avec les talents qui répondent à leurs besoins. Il analyse les compétences
                                        et aspirations des candidats pour faciliter un recrutement rapide et pertinent.
                                    </p>
                                    {
                                        !props.isSignedIn &&
                                        <button className='btn btn__inscription' onClick={handleNavigate}>
                                            Inscrivez-vous
                                            <span className='icon-box'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#000000" className="icon">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                            </span>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="hero__right">
                            <div className="hero__item">
                                <img src={images.interview} alt="" height={250} width={325} loading='lazy' />
                            </div>
                            <div className="hero__item">
                                <img src={images.group} alt="" height={510} width={325}   loading='lazy'/>
                            </div>
                            <div className="hero__item">
                                <img src={images.jobs} alt="" height={250} width={325}  loading='lazy' />
                            </div>
                        </div>  
                    </div>
                    <ChatBotLanding/>
                    <About />
                    <Reason />
                    <HowIsWork />
                    <Mobile/>
                    <Testimony />
                    <Offre />
                </div>
            </div>
            <Footer SignedIn={props.isSignedIn} />
        </>
    )
}
export default Landing;