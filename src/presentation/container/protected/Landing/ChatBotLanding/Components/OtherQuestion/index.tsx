import React, { useEffect } from 'react';
import './styles.scss';

const OtherQuestion = (props: any) => {
    const { setState , actions , payload } = props;
    const messages = props.state.messages || [];

    const messageUser = [
        {
            id: 1,
            message: 'Non',
            type: 'user',
        },
        {
            id: 2,
            message: 'Merci et à très bientôt 😊🖐',
            type: 'bot',
        },
    ];

    const handleYesClick = () => {
        setState((prevState) => ({
            ...prevState,
            messages: [...messages, ...messageUser],
        }));
    };

    const handleTrue=()=>{
        actions.homeQuestion('Oui',payload);
    }

    return (
        <div className='otherQuestion flex padding-left-40 margin-bottom-20'>
            <button className='chatBotCta__btn' onClick={handleTrue} >
                Oui
            </button>
            <button className='chatBotCta__btn' onClick={handleYesClick}>
                Non
            </button>
        </div>
    );
};

export default OtherQuestion;
