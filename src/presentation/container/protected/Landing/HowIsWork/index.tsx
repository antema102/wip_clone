import React from 'react'
import './styles.scss'
import TitleLanding from "../Compoments/Title";
import Cards from '../Compoments/cards';
const HowIsWork = () => {
    return (
        <div className='howIsWork'>
            <TitleLanding name={"PROCEDURE"} title={"Comment ça marche ?"} />
            <Cards />
        </div>
    )
}

export default HowIsWork
