import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface Props {
  click?: any;
  list?: any;
  setClick?: any;
  setItem?: any;
  isAll?: boolean;
  setIsAll?: any;
}

const HorizontalDynamicBox = ({
  click,
  list,
  setClick,
  setItem,
  isAll,
  setIsAll,
}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
      }}>
      <>
        {list
          ? list.map((item: string, index: number) => (
            <TouchableOpacity
              onPress={() => {
                setClick(index);
                setIsAll(false);
                setItem(item);
              }}
              key={index}
              style={
                click === index && !isAll
                  ? styles.activeBtn
                  : styles.simpleBtn
              }>
              <Text
                style={
                  click === index && !isAll
                    ? styles.textMenuActive
                    : styles.textMenu
                }>
                {item}
              </Text>
            </TouchableOpacity>
          ))
          : null}
        <TouchableOpacity
          onPress={() => {
            setIsAll(true);
            setItem('');
          }}
          style={isAll ? styles.activeBtn : styles.simpleBtn}>
          <Text style={isAll ? styles.textMenuActive : styles.textMenu}>
            {'Toutes'}
          </Text>
        </TouchableOpacity>
      </>
    </View>
  );
};

export default HorizontalDynamicBox;
