import * as React from 'react';
import myFile from './terms';
import './styles.css';

const Terms = () => {
  const MyComponent = () => <div dangerouslySetInnerHTML={{ __html: myFile }} />;
  return (
    <div>
      <MyComponent />
    </div>
  );
};

export default Terms;
