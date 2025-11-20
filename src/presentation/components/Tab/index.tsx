import React, { useState, useEffect } from 'react';
;
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
    <div style={{ position: 'relative' }}>
      {props.type === 'candidate' ? (
        <>
          <div style={styles.search1}>
            <button
              style={styles.container}
              onClick={() => handleShow('Offers')}
            >
              <span style={{...styles.text, ...(!isActive ? { fontWeight: '700' } : {})}}>
                {props.title1}
              </span>
              {!isActive && <div style={styles.linesSearch} />}
            </button>
          </div>

          <div style={styles.search2}>
            <button
              style={styles.container}
              onClick={() => handleShow('Formations')}
            >
              <span style={{...styles.text, ...(isActive ? { fontWeight: '700' } : {})}}>
                {props.title2}
              </span>
              {isActive && <div style={styles.linesSearch} />}
            </button>
          </div>

          <div style={styles.textContent}>
            <span style={styles.textTitle}>Trouvez des talents</span>
          </div>
        </>
      ) : (
        <div>
          <div style={[styles.tabContent, { left: 25 }]}>
            <button
              onClick={() => handleShow('Offers')}
              style={styles.content}
            >
              <span style={isActive ? styles.ButtonTabs : styles.active}>
                {props.title1}
              </span>
              {!isActive && <div style={styles.lines} />}
            </button>
          </div>

          <div style={[styles.tabContent, { right: 25 }]}>
            <button
              onClick={() => handleShow('Formations')}
              style={styles.content}
            >
              <span style={!isActive ? styles.ButtonTabs : styles.active}>
                {props.title2}
              </span>
              {isActive && <div style={styles.lines} />}
            </button>
          </div>
        </div>
      )}

      {/* Affichage du contenu via JSX plutôt que de l'exécuter directement */}
      <div>
        {show === 'Offers' ? <props.Offers /> : <props.Formations />}
      </div>
    </div>
  );
};

export default Tabs;
