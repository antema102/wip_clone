import React from 'react';
import './style.scss';
import { images } from '../../../../../resources/constants';
import TitleLanding from '../Compoments/Title';
import CardsTestimony from '../Compoments/CardsTestimony';

interface TestimonyProps {
  headerText: string;
  userImage: string;
  userName: string;
  userWork: string;
}

const Testimony: React.FC = () => {
  const testimonies: TestimonyProps[] = [
    {
      headerText:
        'WIPwork a transformé notre recrutement en nous offrant des candidats parfaitement qualifiés, grâce à son algorithme de matching ultra-précis',
      userImage: images.logoCarnivore,
      userName: 'LE CARNIVORE',
      userWork: 'Lounge Bar Restaurant',
    },
    {
      headerText:
        'Cela  nous fait gagner un temps précieux dans le recrutement. Un outil incontournable !!',
      userImage: images.logoAgroTech,
      userName: 'AGRO TECH',
      userWork: 'Distributeur- Import et Export',
    },
    {
      headerText:
        'La plateforme combine une interface facile à utiliser avec des résultats de recrutement rapides et précis. Impressionnante 👌',
      userImage: images.LogoLaHalle,
      userName: 'GOOD VIB’S',
      userWork: 'Boutique de vêtements, chaussures et accessoires.',
    },
    {
      headerText:
        'Nous avons recruté des talents rares correspondant exactement à nos critères, avec une plateforme intuitive et des résultats toujours fiables',
      userImage: images.LogoIkywi,
      userName: 'IKYWI',
      userWork: 'Créateur des vêtements sur mesure',
    },
  ];

  const groupedTestimonies: TestimonyProps[][] = [];
  for (let i = 0; i < testimonies.length; i += 2) {
    groupedTestimonies.push(testimonies.slice(i, i + 2));
  }

  return (
    <div className="testimony">
      <TitleLanding name={'TEMOINAGES'} title={"Ce qu'ils pensent de nous"} />
      {groupedTestimonies.map((group, index) => (
        <div className="testimonyCards" key={index}>
          {group.map((testimony, subIndex) => (
            <CardsTestimony
              key={subIndex}
              headerText={testimony.headerText}
              userImage={testimony.userImage}
              userName={testimony.userName}
              userWork={testimony.userWork}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Testimony;
