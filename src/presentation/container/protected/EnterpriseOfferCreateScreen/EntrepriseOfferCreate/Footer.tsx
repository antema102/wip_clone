import React from 'react';
import { buttonsStyles } from '../../boutonStyle';
import Label from '../../components/Inputs/Label';
import { formsStyles } from '../../formStyles';
import { SIZES, icons } from '../../resources/constants';
export const Footer = (props: any) => {
  const { navigation } = props;
  return (
    <div style={{ marginTop: -55, marginBottom: -10 }}>
      <div style={{ justifyContent: 'center' }}>
        <div style={[buttonsStyles.displaySpacedBtween]}>
          <div style={formsStyles.line} />
          <Label title="OU" type="paragraph" />
          <div style={formsStyles.line} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <button>
            <div style={buttonsStyles.bkg_socio}>
              <img
                src={icons.facebook}
                style={{ width: 16, height: 28, objectFit: 'cover' as const }}
              />
            </div>
          </button>
          <button>
            <div style={buttonsStyles.bkg_socio}>
              <img
                src={icons.google}
                style={{ width: 27, height: 27, objectFit: 'cover' as const }}
              />
            </div>
          </button>
          <button>
            <div style={buttonsStyles.bkg_socio}>
              <img
                src={icons.linkedin}
                style={{ width: 29, height: 28, objectFit: 'cover' as const }}
              />
            </div>
          </button>
        </div>

        <div style={[{ marginTop: 30 }, buttonsStyles.displayHorizontal]}>
          <span
            style={{
              fontFamily: 'Oxygen-Regular',
              fontSize: SIZES.body4,
              marginRight: 10,
            }}
          >
            Vous avez déjà un compte ?
          </span>
          <button onClick={() => navigation.navigate('LoginScreen')}>
            <Label title="Se connecter" type="link" />
          </button>
        </div>
      </div>
    </div>
  );
};
