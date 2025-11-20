import React from 'react';
import TitleLanding from "../Compoments/Title";
import { images } from '../../../../../resources/constants';
import { Link } from 'react-router-dom';
import './style.scss';

const Mobile = () => {
  return (
    <div className="mobile-container">
      <TitleLanding name={"APPLICATION"} title={
        <>
          Découvrez notre  application mobile
        </>
      } />
      <div className="mobile-content">
        <div className='mobile__left'>
          <div className="text-section">
            <p>
              <b>Recrutez plus rapidement</b> et <b>plus efficacement
              sans intermédiaire</b> grâce à notre système de <b>matching.</b>
            </p>
            <div className="mobile__application">
              <div>
                <Link to="https://play.google.com/store/apps/details?id=com.wipwork&hl=fr&pli=1" target='_blank'>
                  <img src={images.android} alt="Android App" loading="lazy" width={143} height={47} />
                </Link>
                <Link to="https://apps.apple.com/fr/app/wipwork/id6443874679" target='_blank' width={143} height={47}>
                  <img src={images.apple} alt="iOS App" loading="lazy" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile__right">
          <img src={images.iphoneWipWork} alt="" width={400} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Mobile;
