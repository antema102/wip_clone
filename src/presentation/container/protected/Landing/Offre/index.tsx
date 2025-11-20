import React from 'react';
import './style.scss';
import OffreContent from './OffreItem';
import { images } from '../../../../../resources/constants';
import TitleLanding from "../Compoments/Title";

const offreData = [
  {
    imageUrl: images.comptable,
    title: 'Comptable',
    description:
      <>
        <p>Nous recherchons un(e) comptable pour renforcer
          notre équipe. Vos missions incluront :</p>
        <ul style={{ listStyleType: 'initial', paddingTop: 5 }}>
          <li style={{ marginLeft: 25 }}>Gestion des comptes et opérations financières</li>
          <li style={{ marginLeft: 25 }}>Préparation des déclarations fiscales et sociales</li>
          <li style={{ marginLeft: 25 }}>Suivi de la trésorerie et des budgets ....</li>
        </ul>
      </>
  },
  {
    imageUrl: images.web,
    title: 'Développement web',
    description:
      <>
        <p> Vous êtes passionné(e) par le développement web et
          la création d'expériences utilisateur innovantes ?</p>
        <ul style={{ listStyleType: 'initial', paddingTop: 5 }}>
          <li style={{ marginLeft: 25 }}>Développement front-end et back-end</li>
          <li style={{ marginLeft: 25 }}>Optimisation des performances des sites web</li>
          <li style={{ marginLeft: 25 }}>Collaboration avec les équipes de design ....</li>
        </ul>
      </>
  }
  ,
  {
    imageUrl: images.community,
    title: 'Community Manager',
    description:
      <>
        <p>Vous avez le flair pour les tendances et savez
          engager les communautés comme personne ?</p>
        <ul style={{ listStyleType: 'initial', paddingTop: 5 }}>
          <li style={{ marginLeft: 25 }}>Création de contenus originaux et captivants.</li>
          <li style={{ marginLeft: 25 }}>Gestion des interactions et développements.</li>
          <li style={{ marginLeft: 25 }}>Mise en place de stratégies ....</li>
        </ul>
      </>
  }
];

const Offre = () => {
  return (
    <div className='offre' id='offre'>
      <TitleLanding name={"OFFRES"} title={"Les postes fraichement publiés"} />
      <OffreContent data={offreData} />
    </div>
  )
}

export default Offre;
