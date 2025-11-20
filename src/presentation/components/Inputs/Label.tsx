import React from 'react';
import styles from './style';
interface Props {
  title: string;
  type?: string;
}

export default ({ title, type }: Props) => {
  return (
    <div>
      {type && type === 'mainTitle' && (
        <span style={styles.mainTitle}>{title}</span>
      )}
      {type && type === 'secondTitle' && (
        <span style={styles.secondTitle}>{title}</span>
      )}
      {type && type === 'thirdTitle' && (
        <span style={styles.thirdTitle}>{title}</span>
      )}
      {type && type === 'titleGreen' && (
        <span style={styles.titleGreen}>{title}</span>
      )}
      {type && type === 'titleGreenCenter' && (
        <span style={styles.titleGreenCenter}>{title}</span>
      )}
      {type && type === 'titleGreen11' && (
        <span style={styles.titleGreen11}>{title}</span>
      )}
      {type && type === 'titleGreen14' && (
        <span style={styles.titleGreen14}>{title}</span>
      )}
      {type && type === 'paragraph' && (
        <span style={styles.paragraph}>{title}</span>
      )}
      {type && type === 'password' && (
        <span style={styles.password}>{title}</span>
      )}
      {type && type === 'black_paragraph' && (
        <span style={styles.black_paragraph}>{title}</span>
      )}
      {type && type === 'link' && <span style={styles.link}>{title}</span>}
      {type && type === 'linkUnderline' && (
        <span style={styles.linkUnderline}>{title}</span>
      )}
      {type && type === 'error' && <span style={styles.error}>{title}</span>}
      {!type && <span style={styles.label}>{title}</span>}
    </div>
  );
};
