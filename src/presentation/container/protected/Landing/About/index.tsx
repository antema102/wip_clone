import React, { useState, useEffect} from 'react';
import './index.scss';
import TitleLanding from "../Compoments/Title";
import { images } from '../../../../../resources/constants';

const About: React.FC = () => {
  const data = [
    { images: images.hand, alt: '' },
    { images: images.comptable, alt: '' },
    { images: images.womanDesktop, alt: '' }
  ];

  const [selectedImage, setSelectedImage] = useState<string>(data[0].images);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImage((prevImage) => {
        
        const currentIndex = data.findIndex(item => item.images === prevImage);
        const nextIndex = (currentIndex + 1) % data.length;
        return data[nextIndex].images;
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const openPopup = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className='about' id='about'>
      <TitleLanding
        name="A PROPOS"
        title={
          <>
            WIPwork est une solution qui permet de mettre  <br /> en relation
            facilement et rapidement les acteurs du  <br />  monde du travail.
          </>
        }
      />
      <div className='about__content'>
        <div className='about__text'>
          <p>
            Le marché de l'emploi à Madagascar est en déclin. En 2022,
            plus de 2.000.000 de jeunes Malgaches étaient sans emplois
            non pas en raison d'un manque de compétences, mais
            par inadéquation entre l'offre et la demande.
          </p>
          <p>
            WIPwork a pour mission de résoudre ce déséquilibre en mettant
            en relation les talents et recruteurs grâce à un système de
            matching avancé.
          </p>
          <p>
            En un clic, un candidat postule à une offre, et l'entreprise peut
            instantanément consulter profils les plus compatibles.
          </p>
          <p>
            Notre vision, simplifié le marché du travail en connectant
            les meilleurs talents aux offres les plus appropriés et visse versa.
          </p>
        </div>
        <div className='about__imageGroup'>
          <div className='about__item active' onClick={() => openPopup(selectedImage)}>
            <img src={selectedImage} loading='lazy' alt='' />
          </div>
          {data.map((image, index) => (
            <div key={index} className='about__item' onClick={() => openPopup(image.images)}>
              <img src={image.images} loading='lazy' alt={image.alt} />
              {selectedImage !== image.images && (
                <div className='overlay' />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
