import React from 'react';
import './styles.scss';
interface Props {
  onPress: () => void;
  infoText: string;
  linkText: string;
}

export const Footer = ({ onPress, infoText, linkText }: Props): any => {
  return (
    <div className="footer__register">
      <p>{infoText}</p>
      <p
        onClick={() => {
          onPress();
        }}
      >
        {linkText}
      </p>
    </div>
  );
};

export default Footer;
