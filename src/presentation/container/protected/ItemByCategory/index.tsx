import React, { useState } from 'react';
;
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
    <div style={styles.container}>
      <div style={{overflowY: "auto"}} style={{ backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <div style={styles.containers}>
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

        </div>
      </div>
    </div>
  );
};

export default ItemByCategoryScreen;
