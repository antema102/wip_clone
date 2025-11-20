
import React, { useEffect, useState } from 'react';
import { Modal, Text, Pressable, View, ScrollView } from 'react-native';
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
        <View style={styles.centeredView}>
            <Modal
                animationType="none"
                transparent={true}
                visible={visible}
                onRequestClose={handleCancel}>

                <View style={styles.centeredView}>
                    {data ?
                        <View style={[styles.modalView, isMobile ? { width: '85%', padding: 30 } : { width: '40%', height: '80%', padding: 60 }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontSize: 20, fontStyle: 'normal', color: "#1C1C1C" }} >Compatibilité : </Text>
                                <Text style={{ fontSize: 20, fontStyle: 'normal', fontWeight: '500', color: "#1C1C1C" }} >{`${score?.toFixed(2)}%`}</Text>
                            </View>
                            <ScrollView
                                showsVerticalScrollIndicator={isMobile ? false : true}
                                style={{
                                    maxHeight: '50%',
                                    flex: 1,
                                    width: '100%'
                                }}
                            >
                                {Object.entries(data).map(([key, value]) => (
                                    <View key={key} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', width: '100%', paddingTop: 25, justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ color: 'black' }}>{key}</Text>
                                        </View>
                                        <View style={[{
                                            width: "15%",
                                            height: 25,
                                            borderRadius: 50,
                                            backgroundColor: getCompatibilityBackgroundColor(value),
                                        }]}>
                                            <Text style={{ color: getCompatibilityColor(value), paddingTop: "2%", textAlign: 'center', fontWeight: "600", fontSize: 14 }}>{value}%</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                            <View style={{ flexDirection: 'column', width: '100%', marginTop: '10%' }}>
                                <Pressable
                                    style={[styles.buttonAnnuler2]}
                                    onPress={() => redirection()}
                                >
                                    <Text style={styles.textBtnSecondary2}>Voir profil</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.buttonAnnuler]}
                                    onPress={() => {
                                        handleCancel()
                                    }}
                                >
                                    <Text style={styles.textBtnSecondary}>Annuler</Text>
                                </Pressable>

                            </View>
                        </View> : null}

                </View>
            </Modal>
        </View>
    );
};

export default ScoreDetails;





