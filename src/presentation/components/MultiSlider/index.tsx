import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Slider } from 'primereact/slider'; // Import PrimeReact Slider
import { thousandSeparator } from '../../../data/factory';
import { styles } from './styles';

interface Props {
  setMin: any;
  setMax: any;
  min: number;
  max: number;
  isPrice?: boolean;
}

const winWidth = Dimensions.get('window').width;

const MultiSlider = ({ setMin, setMax, min, max, isPrice }: Props) => {
  const [multiSliderValue, setMultiSliderValue] = useState([min, max]);
  const maxVlue = isPrice
    ? `${thousandSeparator(parseInt(multiSliderValue[1]), ' ')} et plus`
    : `${thousandSeparator(parseInt(multiSliderValue[1]), ' ')}`;

  const multiSliderValuesChange = (e: any) => {
    setMultiSliderValue(e.value); // Use e.value to get the new slider value
    setMin(e.value[0]);
    setMax(e.value[1]);
  };

  useEffect(() => {}, [min, max]);

  return (
    <View style={styles.viewContainer}>
      <View style={styles.sliderWrapper}>
        <View style={styles.labelWrapper}>
          <Text style={styles.labelText}>
            {thousandSeparator(parseInt(multiSliderValue[0]), ' ')}
          </Text>
          <Text style={styles.labelText}>{maxVlue}</Text>
        </View>
        <Slider
          style={{ width: winWidth / 2.5 }}
          value={multiSliderValue} // Use value instead of initial values
          onChange={multiSliderValuesChange} // Use onChange instead of onValueChange
          range // PrimeReact's Slider uses range for a two-thumb slider
          min={0} // Set the minimum value
          max={isPrice ? 7000000 : 100} // Set the maximum value
          step={1}
          sliderStyle={{ borderColor: '#1792E8' }} // Adjust styles as needed
        />
      </View>
    </View>
  );
};

export default MultiSlider;
