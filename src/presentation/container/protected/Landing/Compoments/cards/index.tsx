import React from 'react'
import './styles.scss'
import { images } from '../../../../../../resources/constants'
const Cards = () => {
    const data = [
        {
            title: "Pour les candidats en recherche d'opportunités",
            content: [{
                url: images.inscription,
                subText:
                    <>
                        Inscription <br /> ou Connexion
                    </>,
                textContent:
                    "En tant que candidat, accède à des offres d'emploi correspondant à tes compétences grâce à des filtres avancés, ce qui te permet de touver  rapidement des opportunités adaptées à ton profil."
            },
            {
                url: images.personnalise,
                subText:
                    <>
                        Personnalise <br /> ton profil
                    </>,
                textContent:
                    "Crée un profil détaillé, incluant tes expériences, compétences, et un CV vidéo, pour maximiser ta visibilité auprès des recruteurs."
            },
            {
                url: images.candidatureAccepte,
                subText:
                    <>
                        Postule <br /> directement
                    </>,
                textContent:
                    'Un système de matching intelligent te propose des offres compatibles avec ton profil,postuler en un clic aux opportunités pertinentes.'
            },
            {
                url: images.alarm,
                subText:
                    <>
                        Sois notifié aux <br />nouvelles opportunités
                    </>,
                textContent: 'Tu reçois des notifications régulières des nouvelles offres correspondant à tes critères de recherche, assurant une veille constante des opportunités disponibles.'
            }
            ]
        },
        {
            title: "Pour les entreprises en quête de talents",
            content: [
                {
                    url: images.relationPublique,
                    subText:
                        <>
                            Publication  <br /> d'offres d'emploi
                        </>,
                    textContent: "Créez et publiez rapidement des offres d'emploi ciblées, touchant un large vivier de candidats qualifiés via la plateforme."
                },
                {
                    url: images.searchTalent,
                    subText:
                        <>
                            Recherche de profils <br /> adaptés
                        </>,
                    textContent: "La recherche est affinée par des filtres avancés pour trouver les talents correspondant à vos critères spécifiques, comme le secteur d'activité, l'expérience,ou la localisation des talents."
                },
                {
                    url: images.puzzle,
                    subText: <>
                        Matching avancé et <br />triage de candidatures
                    </>,
                    textContent: "Grâce au système de matching, vous accédez instantanément aux meilleurs profils avec un taux de compatibilité élevé, facilitant votre processus de sélection."
                },
                {
                    url: images.imageDeMarque,
                    subText: <>Promotion <br />de votre entreprise</>,
                    textContent: "Attirez les meilleurs profils ou, tout simplement, faites connaître  votre entreprise aux autres  entreprises partenaires de  WipWork. Lancez des campagnes publicitaires globales ou ciblées"
                }
            ]
        }
    ]
    return (
        <div className='cards'>
            {
                data.map((item, index) => (
                    <div className='cards__group' key={index}>
                        <h2 className='cards__title'>
                            {item.title}
                        </h2>

                        <div className='cards__content' >
                            {item.content.map((itemContent, index) => (
                                <div className='cards__items' key={index}>
                                    <div className='cards__img'>
                                        <img src={itemContent.url} loading='lazy' alt='' height={80} width={80}/>
                                    </div>
                                    <div className='cards__text'>
                                        <p className='cards__subText'>{itemContent.subText}</p>
                                        <p className='cards__textContent'>
                                            {itemContent.textContent}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Cards