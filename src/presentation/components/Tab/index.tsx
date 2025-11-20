import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useLocation } from 'react-router';
import { COLORS } from '../../../resources/constants';

const Tabs = (props: any) => {
  const { state } = useLocation();

  const [isFormation, setIsFormation] = useState(props?.isFormation || state?.isFormation || false);
  const [show, setShow] = useState(isFormation ? 'Formations' : 'Offers');

  const [isActive, setIsActive] = useState(isFormation || false);

  const handleShow = (name: string) => {
    setShow(name);
    setIsActive(!isActive);
    if (props?.setIsVisible) {
      props.setIsVisible(!isActive);
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      {props.type === 'candidate' ? (
        <>
          <View style={styles.search1}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => handleShow('Offers')}
            >
              <Text style={[styles.text, !isActive ? { fontWeight: '700' } : {}]}>
                {props.title1}
              </Text>
              {!isActive && <View style={styles.linesSearch} />}
            </TouchableOpacity>
          </View>

          <View style={styles.search2}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => handleShow('Formations')}
            >
              <Text style={[styles.text, isActive ? { fontWeight: '700' } : {}]}>
                {props.title2}
              </Text>
              {isActive && <View style={styles.linesSearch} />}
            </TouchableOpacity>
          </View>

          <View style={styles.textContent}>
            <Text style={styles.textTitle}>Trouvez des talents</Text>
          </View>
        </>
      ) : (
        <View>
          <View style={[styles.tabContent, { left: 25 }]}>
            <TouchableOpacity
              onPress={() => handleShow('Offers')}
              style={styles.content}
            >
              <Text style={isActive ? styles.ButtonTabs : styles.active}>
                {props.title1}
              </Text>
              {!isActive && <View style={styles.lines} />}
            </TouchableOpacity>
          </View>

          <View style={[styles.tabContent, { right: 25 }]}>
            <TouchableOpacity
              onPress={() => handleShow('Formations')}
              style={styles.content}
            >
              <Text style={!isActive ? styles.ButtonTabs : styles.active}>
                {props.title2}
              </Text>
              {isActive && <View style={styles.lines} />}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Affichage du contenu via JSX plutôt que de l'exécuter directement */}
      <View>
        {show === 'Offers' ? <props.Offers /> : <props.Formations />}
      </View>
    </View>
  );
};

export default Tabs;
