import React, { useState, useEffect } from 'react';
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

const winWidth = window.innerWidth;

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
    <div style={styles.viewContainer}>
      <div style={styles.sliderWrapper}>
        <div style={styles.labelWrapper}>
          <span style={styles.labelText}>
            {thousandSeparator(parseInt(multiSliderValue[0]), ' ')}
          </span>
          <span style={styles.labelText}>{maxVlue}</span>
        </div>
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
      </div>
    </div>
  );
};

export default MultiSlider;
