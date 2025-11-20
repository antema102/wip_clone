import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

class FlatInfo extends React.Component {
  render() {
    const variable = this.props.variable;
    return (
      <View style={styles.itemWrapper}>
        <Image style={styles.iconActus} source={variable.uriM} />
        <Text style={styles.valueActus} numberOfLines={2}>
          {variable.title}
        </Text>
      </View>
    );
  }
}

export default FlatInfo;
