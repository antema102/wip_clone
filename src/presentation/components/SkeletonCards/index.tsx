import React from 'react';
import './styles.css';
const SkeletonCards = () => {
  return (
    <>
      <div className="skeletons-card">
        <div className="skeleton skeleton-date"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
      </div>
      <div className="skeletons-card">
        <div className="skeleton skeleton-date"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
      </div>
      <div className="skeletons-card">
        <div className="skeleton skeleton-date"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
      </div>
    </>
  );
};

export default SkeletonCards;
