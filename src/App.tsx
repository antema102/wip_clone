import React from 'react';
import './assets/scss/shared.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Provider } from 'react-redux';
import { store } from './service/store';
import Navigation from './presentation/navigation';
import { LangProvider } from './data/translation';

const App = (): any => {
  return (
    <LangProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </LangProvider>
  );
};
 
export default App;