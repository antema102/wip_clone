
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';

import styles from './styles';
import { COLORS } from '../../../resources/constants';
import { useMobile } from '../../../service/hooks/useMobile';

interface PopupProps {
    message?: string;
    visible?: boolean;
    validation?: any;
    btnTitle: string;
    navigation?: any;
    navigateTo?: string;
    cancel?: boolean;
    navigationParams?: any;
    expired?: any,
    data?: any,
    score?: any,
    onPress?: any,
    onPressEntreprise?: any
}

const ScoreDetails = (props: PopupProps) => {
    const { isMobile} = useMobile()

    const {
        score,
        visible,
        validation,
        data,
        onPress,
        onPressEntreprise
    } = props

    useEffect(() => {
    }, [data])

    const getCompatibilityColor = (compatibility) => {
        if (compatibility >= 70) return COLORS.secondary
        else if (compatibility >= 40 && compatibility < 70) return COLORS.primary
        else return COLORS.orange
    }

    const getCompatibilityBackgroundColor = (compatibility) => {
        if (compatibility >= 70) return "rgba(1, 18, 158, 0.2)"
        else if (compatibility >= 40 && compatibility < 70) return "rgba(44, 165, 255, 0.2);";
        else return "rgba(254, 109, 2, 0.2)"

    }

    const handleCancel = () => validation(!visible);

    const redirection = () => {
        handleCancel()
        if (onPress) {
            onPress()
        } else {
            onPressEntreprise()
        }
    }

    return (
        <div style={styles.centeredView}>
            <Dialog
                animationType="none"
                transparent={true}
                visible={visible}
                onRequestClose={handleCancel}>

                <div style={styles.centeredView}>
                    {data ?
                        <div style={{...styles.modalView, ...(isMobile ? { width: '85%'), ...padding: 30 } : { width: '40%', ...height: '80%', ...padding: 60 }}}>
                            <div style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <span style={{ fontSize: 20, fontStyle: 'normal', color: "#1C1C1C" }} >Compatibilité : </span>
                                <span style={{ fontSize: 20, fontStyle: 'normal', fontWeight: '500', color: "#1C1C1C" }} >{`${score?.toFixed(2)}%`}</span>
                            </div>
                            <div style={{overflowY: "auto"}}
                                showsVerticalScrollIndicator={isMobile ? false : true}
                                style={{
                                    maxHeight: '50%',
                                    flex: 1,
                                    width: '100%'
                                }}
                            >
                                {Object.entries(data).map(([key, value]) => (
                                    <div key={key} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', width: '100%', paddingTop: 25, justifyContent: 'space-between' }}>
                                        <div>
                                            <span style={{ color: 'black' }}>{key}</span>
                                        </div>
                                        <div style={[{
                                            width: "15%",
                                            height: 25,
                                            borderRadius: 50,
                                            backgroundColor: getCompatibilityBackgroundColor(value)}]}>
                                            <span style={{ color: getCompatibilityColor(value), paddingTop: "2%", textAlign: 'center', fontWeight: "600", fontSize: 14 }}>{value}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ flexDirection: 'column', width: '100%', marginTop: '10%' }}>
                                <button
                                    style={[styles.buttonAnnuler2]}
                                    onClick={() => redirection()}
                                >
                                    <span style={styles.textBtnSecondary2}>Voir profil</span>
                                </button>
                                <button
                                    style={[styles.buttonAnnuler]}
                                    onClick={() => {
                                        handleCancel()
                                    }}
                                >
                                    <span style={styles.textBtnSecondary}>Annuler</span>
                                </button>

                            </div>
                        </div> : null}

                </div>
            </Dialog>
        </div>
    );
};

export default ScoreDetails;





