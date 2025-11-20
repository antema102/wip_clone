import React, { useState, useEffect } from 'react';
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
  setIsAll}: Props) => {
  return (
    <div
      style={{
        flex: 1,
        flexDirection: 'row',
        marginTop: 20}}>
      <>
        {list
          ? list.map((item: string, index: number) => (
            <button
              onClick={() => {
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
              <span
                style={
                  click === index && !isAll
                    ? styles.textMenuActive
                    : styles.textMenu
                }>
                {item}
              </span>
            </button>
          ))
          : null}
        <button
          onClick={() => {
            setIsAll(true);
            setItem('');
          }}
          style={isAll ? styles.activeBtn : styles.simpleBtn}>
          <span style={isAll ? styles.textMenuActive : styles.textMenu}>
            {'Toutes'}
          </span>
        </button>
      </>
    </div>
  );
};

export default HorizontalDynamicBox;
