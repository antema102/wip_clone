import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { icons, images } from '../../../../../resources/constants';
import { scrollToSection } from '../Compoments/Utils';
interface SignedInType {
  SignedIn: boolean;
}
const Footer: React.FC<SignedInType> = ({ SignedIn }): any => {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__title">
          <p>Nous contacter</p>
          <div className="footer__mail">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
              />
            </svg>
            <a href="mailto:coordi@wipwork.com">
              <p>coordi@wipwork.com</p>
            </a>
          </div>
        </div>
        <div className="footer__content ">
          <ul className="footer__item">
            <li>
              <a
                onClick={() => {
                  scrollToSection('hero');
                }}
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  scrollToSection('about');
                }}
              >
                À propos
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  scrollToSection('offre');
                }}
              >
                Dernières opportunités
              </a>
            </li>
            <li>
              {SignedIn ? (
                <Link to="/home">Les offres</Link>
              ) : (
                <Link to="/inscription">Diffuser une offre</Link>
              )}
            </li>
          </ul>

          <ul className="footer__item">
            <li>
              <div>
                <p>Adresse</p>
                <p>
                  Antananarivo, Madagascar
                  <br />
                  Village des jeux Akorondrano , box E3
                </p>
                <p>Tél : 038 29 456 38</p>
              </div>
              <div className="footer__application">
                <p>Disponible sur </p>
                <div>
                  <Link
                    to="https://play.google.com/store/apps/details?id=com.wipwork&hl=fr&pli=1"
                    target="_blank"
                  >
                    <img
                      src={images.android}
                      width={143}
                      height={47}
                      loading="lazy"
                    />
                  </Link>
                  <Link
                    to="https://apps.apple.com/fr/app/wipwork/id6443874679"
                    target="_blank"
                  >
                    <img
                      src={images.apple}
                      width={143}
                      height={47}
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            </li>

            <ul className="footer__cookie">
              <p
                className="margin-bottom-10"
                style={{ textTransform: 'uppercase' }}
              >
                Mention légale et Politique
              </p>
              <li>
                {' '}
                <Link to="/terms">CGU</Link>{' '}
              </li>
              <li>
                {' '}
                <Link to="/terms"> Politique de confidentialité</Link>
              </li>
              <li>
                <Link to="/terms">Politique de cookies</Link>
              </li>
            </ul>
          </ul>
        </div>
        <div className="footer__resauxSocial">
          <Link to="https://www.facebook.com/profile.php?id=100092615205995">
            <img
              src={icons.facebookBlack}
              alt="facebook"
              height={16}
              width={16}
              style={{ objectFit: 'contain' }}
              loading="lazy"
            />
          </Link>
          <Link to="https://www.linkedin.com/company/wipwork/">
            <img
              src={icons.linkedinBlack}
              alt="facebook"
              height={16}
              width={16}
              style={{ objectFit: 'contain' }}
              loading="lazy"
            />
          </Link>
        </div>
        <span>© 2024 World Intermediation Platform . Tout droit résérvé</span>
      </div>
    </footer>
  );
};

export default Footer;
