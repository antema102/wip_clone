import React from 'react'
import './styles.scss'
import TitleLanding from "../Compoments/Title";
import { images } from '../../../../../resources/constants';
const Reason = () => {
    return (
        <div className='reason'>
            <TitleLanding
                name={"RAISONS"}
                title={"Pourquoi choisir WIPwork ?"} />
            <div className='reason__content'>
                <div className='reason__item'>
                    <div className='reason__img'>
                        <img src={images.Entretien} />
                    </div>
                    <div className='reason__text'>
                        <p className='reason__title'>Efficacité opérationnelle</p>
                        <p className='reason__txt'>
                            En quelques clics, façonnez le modèle de votre futur collaborateur. Remplissez les critères préétablis de votre fiche de poste en fonction du niveau d'importance que vous accordez à chacun d'entre eux.
                        </p>
                        <div className='reason__cta'>
                            <span className='reason__ctaItem'>
                                Nouvelle technologie                     </span>
                            <span className='reason__ctaItem reason__ctaItem--white'>
                                Sélection intelligente
                            </span>
                        </div>
                    </div>
                </div>
                <div className='reason__item'>
                    <div className='reason__text'>
                        <p className='reason__title'>Matching</p>
                        <p className='reason__txt'>Grâce à son algorithme de matching, notre plateforme connecte
                            instantanément recruteurs et candidats, sans intermédiaire.<br />
                            WipWork vous fournira instantanément un classement des CV
                            disponibles avec leurs pourcentages de compatibilité décroissants,
                            ainsi qu'un reporting détaillé.
                        </p>
                        <div className='reason__cta'>
                            <span className='reason__ctaItem'>
                                Optimisation de temps
                            </span>
                            <span className='reason__ctaItem reason__ctaItem--white'>
                                Intelligence artificielle
                            </span>
                        </div>
                    </div>
                    <div className='reason__img'>
                        <img src={images.Desktop} />
                    </div>
                </div>

            </div>
            <div className='reason__visibilite'>
                <div className='reason__visibiliteImg'>
                    <img src={images.Cv} alt='cv' />
                </div>
                <div className='reason__item'>
                    <div className='reason__text'>
                        <p className='reason__title'>
                            Optimisation de la visibilité</p>
                        <p className='reason__txt'>
                            Les entreprises partenaires, en plus de la publication d'offres d'emploi, ont la possibilité de diffuser des vidéos de marque employeur afin d'accroître leur attractivité et d'attirer les meilleurs profils.
                            <br />
                            Elles pourront également mettre en ligne des insertions publicitaires globales ou ciblées, ce qui leur permettra d'avoir un meilleur impact dans leurs campagnes.
                        </p>
                        <div className='reason__cta'>
                            <span className='reason__ctaItem'>
                                Présence amplifiée
                            </span>
                            <span className='reason__ctaItem reason__ctaItem--white'>
                                Publicité ciblée
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Reason;