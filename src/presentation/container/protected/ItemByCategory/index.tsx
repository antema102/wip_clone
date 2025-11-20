import React, { useState } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import HorizontalDynamicBox from '../../../components/HorizontalDynamicBox';
import Announces from '../Announces';
import ListItem from '../../../components/ListItem';
import { useLocation } from 'react-router-dom';
import MainPageHeader from '../../../components/MainPageHeader';
import styles from './styles';
import { COLORS } from '../../../../resources/constants';

const ItemByCategoryScreen = (props: any) => {
  const { state } = useLocation();
  const list = state?.list;
  const isFormation = state?.isFormation || false;
  const [click, setClick] = useState(
    isFormation ? 0 : state?.isClicked,
  );

  const [item, setItem] = useState(isFormation ? '' : state?.item);
  const [isAll, setIsAll] = useState(isFormation ? true : false);
  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <View style={styles.containers}>
          <HorizontalDynamicBox
            click={click}
            list={list}
            setClick={setClick}
            setItem={setItem}
            setIsAll={setIsAll}
            isAll={isAll}
          />
          {isFormation ? (
            <ListItem item={item} isAll={isAll} />
          ) : (
            <Announces item={item} isAll={isAll} />
          )}

        </View>
      </ScrollView>
    </View>
  );
};

export default ItemByCategoryScreen;
