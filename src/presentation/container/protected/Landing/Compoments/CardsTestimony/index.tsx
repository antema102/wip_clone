import React from 'react'
import './style.scss'

interface TestimonyCardProps {
    headerText: string;
    userImage: string;
    userName: string;
    userWork: string;
}
const CardsTestimony: React.FC<TestimonyCardProps> = ({ headerText, userImage, userName, userWork }) => {

    return (
        <div className='testimonyCardsItem'>
            <p className='testimonyCardsItem__cardsHeader'>
                {headerText}
            </p>
            <div className='testimonyCardsItem__cardsFooter'>
                <div className='testimonyCardsItem__cardsAvatar'>
                    <img src={userImage} alt='' loading='lazy' height={80} width={80}/>
                </div>
                <div className='testimonyCardsItem__cardsText'>
                    <p className='testimonyCardsItem__cardsName'>
                        {userName}
                    </p >
                    <p className='testimonyCardsItem__cardsWork'>
                        {userWork}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardsTestimony