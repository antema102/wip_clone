import React from 'react';
import './style.scss';
import { useState,useEffect } from 'react';
const Popup = ({ props }) => {
    
  const [selectedImage, setSelectedImage] = useState<string | null>(images.hand);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openPopup = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  
  return <div className="popup"></div>;
};

export default Popup;
