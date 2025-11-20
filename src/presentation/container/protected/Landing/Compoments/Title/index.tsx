import React from 'react';
import './style.scss';
interface title {
  name: string,
  title: string
}
const TitleLanding: React.FC<title> = ({ name, title }) => {
  return (
    <div className="title">
      <p>[{name}]</p>
      <h2>{title}</h2>
    </div>
  );
};

export default TitleLanding;
