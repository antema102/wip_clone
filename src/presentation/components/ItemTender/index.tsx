import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';

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

export const ItemTender = ({
    item1,
    item2,
    item,
    action,
    isDelete,
    actionDelete,
}: Props) => {
    const direction = async () => {
        action(item?.id);
    };
    return (
        <View style={styles.subscriptionContainer}>
            <View
                style={[
                    styles.subscriptionDetailsContainer,
                    isDelete ? {} : styles.noStyle,
                ]}>
                <View style={styles.abonnementList}>
                    <Text style={styles.subscriptionName} numberOfLines={2}>
                        {item1}
                    </Text>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>{item2}</Text>
                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
                    <View>
                        <CustomButton
                            color={COLORS.orange}
                            title="Voir l'appel d'offre"
                            onPress={direction}
                            _style={styles.smallButtonContainer}
                            styleBtnTxt={styles.smallBtnTxt}
                        />
                    </View>
                    {isDelete && (
                        <View>
                            <CustomButton
                                color={COLORS.red_color}
                                title="Supprimer"
                                onPress={actionDelete}
                                _style={styles.smallButtonContainer}
                                styleBtnTxt={styles.smallBtnTxt}
                            />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};
