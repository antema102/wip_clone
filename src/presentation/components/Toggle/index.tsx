import React, { useState, useEffect } from 'react';
;
import { COLORS } from '../../../resources/constants';

const Toggle = (props: any) => {
  const { actif, passif, invisible, handleChange } = props;
  const STATES = ['Invisible', 'Passif', 'Actif'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePress = (index: number) => {
    setSelectedIndex(index);
    const status = index === 0 ? 'invisible' : index === 1 ? 'passif' : 'actif';
    handleChange(status);
  };

  useEffect(() => {
    const index = invisible ? 0 : actif ? 2 : passif ? 1 : 0;
    setSelectedIndex(index);
  }, [invisible, actif, passif]);

  return (
    <div style={styles.container}>
        {STATES.map((label, index) => (
          <button key={index} style={styles.item} onClick={() => handlePress(index)}>
            <span style={styles.label}>{label}</span>
            <div style={[styles.checkbox, selectedIndex === index && styles.checkedBox]} />
          </button>
        ))}
    </div>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    marginLeft:10
  },
   titleGroup: {
    fontWeight: '600',
    fontSize: 22,
    color: COLORS.black,
    marginBottom:10
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: '#fff',
    marginLeft:10
  },
  checkedBox: {
    backgroundColor: COLORS.primary},
  label: {
    fontSize: 18,
    color: COLORS.black}});

export default Toggle;
