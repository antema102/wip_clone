import React from 'react'

import { images } from '../../../resources/constants'
import { styles } from './style'

interface typeBanner {
    _customStyle?: StyleProp<ImageStyle>;
}
const BannerRefonte = ({ _customStyle }: typeBanner) => {
    return (
        <div style={styles.containerImage}>
            <img src={{ uri: images.header_gif }} style={[styles.image, _customStyle]} />
        </div>
    )
}

export default BannerRefonte
