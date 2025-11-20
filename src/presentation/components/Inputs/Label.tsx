import React from 'react';
import { Text, View, Platform } from 'react-native';
import  styles  from './style';

interface Props {
  title: string;
  type?: string;
}

export default ({ title, type }: Props) => {
  return (
    <View>
      {type && type === 'mainTitle' && (
        <Text style={styles.mainTitle}>{title}</Text>
      )}
      {type && type === 'secondTitle' && (
        <Text style={styles.secondTitle}>{title}</Text>
      )}
      {type && type === 'thirdTitle' && (
        <Text style={styles.thirdTitle}>{title}</Text>
      )}
      {type && type === 'titleGreen' && (
        <Text style={styles.titleGreen}>{title}</Text>
      )}
      {type && type === 'titleGreenCenter' && (
        <Text style={styles.titleGreenCenter}>{title}</Text>
      )}
      {type && type === 'titleGreen11' && (
        <Text style={styles.titleGreen11}>{title}</Text>
      )}
      {type && type === 'titleGreen14' && (
        <Text style={styles.titleGreen14}>{title}</Text>
      )}
      {type && type === 'paragraph' && (
        <Text style={styles.paragraph}>{title}</Text>
      )}
      {type && type === 'password' && (
        <Text style={styles.password}>{title}</Text>
      )}
      {type && type === 'black_paragraph' && (
        <Text style={styles.black_paragraph}>{title}</Text>
      )}
      {type && type === 'link' && <Text style={styles.link}>{title}</Text>}
      {type && type === 'linkUnderline' && (
        <Text style={styles.linkUnderline}>{title}</Text>
      )}
      {type && type === 'error' && <Text style={styles.error}>{title}</Text>}
      {!type && <Text style={styles.label}>{title}</Text>}
    </View>
  );
};
