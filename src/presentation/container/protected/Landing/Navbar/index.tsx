import React from 'react'
import './style.scss'
import { images } from '../../../../../resources/constants';
import { icons } from '../../../../../resources/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { scrollToSection } from "../Compoments/Utils";

import { useSelector } from 'react-redux';

interface SignedInType {
    SignedIn: boolean
}

const Navbar = (SignedIn: SignedInType) => {
    const { user, accessToken } = useSelector(({ auth }: any) => auth);
    const { hasCV } = useSelector(({ cv }: any) => cv);

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = (url: string) => {
        navigate(`/${url}`)
    }

    const handleRedirectionCv = () => {
        hasCV
            ? navigate('/CreateCV', { state: { type: 'read' } })
            : navigate('/IntermediateCvScreen');
    };

    const handleInformations = () => {
        navigate('/EnterpriseInformations', { state: { type: 'read' } })
    };

    return (
        <div className='nav'>
            <div className='nav__dektop'>
                <ul className='nav__left'>
                    <li className='nav__item'>
                        <img src={images.WipWork} className='' alt='logo ' width={144} height={48} />
                    </li>

                    <li className='nav__item'>
                        <a onClick={() => scrollToSection("about")}>
                            À propos
                        </a>
                    </li>
                    <li className='nav__item'>
                        <a onClick={() => scrollToSection('offre')}>
                            Dernières opportunités
                        </a>
                    </li>
                    <li className='nav__item' >
                        {
                            SignedIn ?
                                <Link to="/home">
                                    Les offres
                                </Link> :
                                <Link to="/inscription">
                                    Diffuser une offre
                                </Link>
                        }
                    </li>
                    <li className='nav__item'>
                        <a onClick={() => scrollToSection('footer')}>
                            Contact
                        </a>
                    </li>
                </ul>
                <ul className='nav__right'>
                    <li>
                        {
                            accessToken &&
                                SignedIn ?
                                <button className='btn btn--white' onClick={() => handleLogin('home')}>Mon compte</button>
                                :
                                <button className='btn btn--white' onClick={() => handleLogin('login')}>Connexion</button>
                        }
                    </li>
                    <li>
                        {
                            accessToken &&
                                SignedIn ?
                                <button onClick={user?.role == 'candidate' ? handleRedirectionCv : handleInformations} className='btn btn--orange'>Profil</button>
                                :
                                <button onClick={() => handleLogin('inscription')} className='btn btn--orange'>S'inscrire</button>
                        }
                    </li>
                </ul>
            </div>
            <div className='nav__mobile'>
                <ul>
                    <li>
                        <img src={images.WipWork} alt='logo' loading='lazy' width={144} height={88} />
                    </li>
                    <li>
                        {
                            SignedIn ?
                                <button className='btn btn--white' onClick={() => handleLogin('home')}>Mon compte</button>
                                :
                                <button className='btn btn--white' onClick={() => handleLogin('login')}>Connexion</button>
                        }
                        <div className='nav__burgeur' onClick={toggleMenu}>
                            {isMenuOpen ? < img src={icons.closeWhite} width={14} height={14} /> : <img src={images.menuBurgeur} alt='' width={14} height={14} loading='lazy' />}
                        </div>
                    </li>
                </ul>
                <ul className={`nav__menu ${isMenuOpen ? 'nav__menu--open' : ''}`}>
                    <li className=''>
                        <a onClick={() => scrollToSection("apropos")}>
                            À propos
                        </a>
                    </li>
                    <li className=''>
                        <a onClick={() => scrollToSection("offre")}>
                            Dernières opportunités
                        </a>
                    </li>
                    <li className=''>
                        <a onClick={() => scrollToSection('footer')}>
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;