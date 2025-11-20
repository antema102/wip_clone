import React from 'react'

import { styles } from './styles'
import Label from '../../../../../components/Inputs/Label';

interface itemResultType {
    label:string,
    text?: any;
}
const ItemResult = ({ text,label }: itemResultType) => {
    return (
        <div style={styles.itemResult}>
            <div style={styles.content}>
                <span style={styles.text}>{label }:</span>
                <span >{text}</span>
            </div>
        </div>

    )
}

export default ItemResult