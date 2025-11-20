import React from 'react'

import { images } from '../../../resources/constants'
import { styles } from './style'
const AdsSideBar = () => {
    return (
        <div style={styles.content}>
            <img src={images.recrute_gif } style={styles.imagesSideBar} />
        </div>
    )
}

export default AdsSideBar
