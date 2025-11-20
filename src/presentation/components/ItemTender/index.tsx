import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';


import { styles } from './styles';
import CustomButton from '../Button/Pressable';
import { COLORS } from '../../../resources/constants';

interface Props {
    item1: string;
    item2: string;
    item?: any;
    action?: any;
    isDelete?: boolean;
    actionDelete?: any;
}

export const ItemTender = {
    item1,
    item2,
    item,
    action,
    isDelete,
    actionDelete}: Props) => {
    const direction = async () => {
        action(item?.id);
    };
    return (
        <div style={styles.subscriptionContainer}>
            <div
                style={{...styles.subscriptionDetailsContainer, ...(isDelete ? {} : styles.noStyle), ...}}>
                <div style={styles.abonnementList}>
                    <span style={styles.subscriptionName} numberOfLines={2}>
                        {item1}
                    </span>
                    <div style={styles.description}>
                        <span style={styles.descriptionText}>{item2}</span>
                    </div>
                </div>

                <div style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
                    <div>
                        <CustomButton
                            color={COLORS.orange}
                            title="Voir l'appel d'offre"
                            onClick={direction}
                            _style={styles.smallButtonContainer}
                            styleBtnTxt={styles.smallBtnTxt}
                        />
                    </div>
                    {isDelete && (
                        <div>
                            <CustomButton
                                color={COLORS.red_color}
                                title="Supprimer"
                                onClick={actionDelete}
                                _style={styles.smallButtonContainer}
                                styleBtnTxt={styles.smallBtnTxt}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
