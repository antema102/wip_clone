import React from 'react';
import globalStyle from '../../../globalStyle/globalStyle';
import { COLORS, icons } from '../../../../resources/constants';
import { Tooltip } from 'primereact/tooltip';

interface FixedButtonProps {
  activeTooltip?: boolean;
  tooltipValue?: any;
  iconImage?: any;
  handleNavigate: any;
  styles?: any;
}

const FixedButtonCircle = ({
  handleNavigate,
  iconImage,
  styles,
  activeTooltip = false,
  tooltipValue,
}: FixedButtonProps) => {
  const winHeight = window.innerHeight;
  const tooltipActive = (
    <Tooltip
      target=".custom-tooltip-btn"
      position="top"
      mouseTrack
      mouseTrackLeft={10}
    >
      <span style={{ color: 'white' }}>{tooltipValue}</span>
    </Tooltip>
  );
  return (
    <>
      {activeTooltip && tooltipActive}
      <div
        style={
          styles || {
            height: 400,
            flex: 1,
            position: 'absolute',
            top: winHeight - 600,
            justifyContent: 'center',
            right: 60,
          }
        }
      >
        <div className="custom-tooltip-btn">
          <button
            onClick={handleNavigate}
            style={[
              {
                marginRight: 22,
                width: 48,
                height: 48,
                borderRadius: 26,
                backgroundColor: COLORS.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
              },
              globalStyle.shadowButtonCircular,
            ]}
          >
            <img
              src={iconImage || icons.plus}
              style={{ justifyContent: 'center', width: 18, height: 18 }}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default FixedButtonCircle;
