import React from 'react';


interface MiniLoaderProps {
  CustomStyle?: React.CSSProperties
}

const MiniLoader = ({CustomStyle}: MiniLoaderProps) => {
  return (
    <div style={[styles.loaderContainer, CustomStyle]}>
      <span className="spinner" size="large" color="#0000ff" />
    </div>
  );
};

const styles = {
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    zIndex: 1000 // Ensure the loader appears above other content
  }
};

export default MiniLoader;
