import React from 'react'

import {styles} from './style'

interface TitleRefontType {
    title: string,
    _customStyle?: React.CSSProperties; // Utilisation du bon type pour le style
}

const TitleRefont = ({ title,_customStyle }: TitleRefontType) => {
    return (
        <div style={[styles.content,_customStyle]}>
            <span style={styles.title}>
                {title}
            </span>
        </div>
    )
}

export default TitleRefont;
