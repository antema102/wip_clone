import React from 'react';
;
import styles from './styles';

class FlatInfo extends React.Component {
  render() {
    const variable = this.props.variable;
    return (
      <div style={styles.itemWrapper}>
        <img style={styles.iconActus} src={variable.uriM} />
        <span style={styles.valueActus} numberOfLines={2}>
          {variable.title}
        </span>
      </div>
    );
  }
}

export default FlatInfo;
