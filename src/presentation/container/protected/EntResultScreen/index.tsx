import React from 'react'
import { EntResult } from './EntResult'
import { useLocation } from 'react-router-dom'

const EntResultScreen = () => {
    const {state} = useLocation();
    
    return <EntResult stateValue={state}/>
}

export default EntResultScreen;