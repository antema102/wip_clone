// LangContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface LangContextType {
  lang: string;
  setLang: (lang: string) => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [lang, setLang] = useState('fr');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
/**
 * Utilisez ce composant pour englober votre application afin de fournir le contexte de langue.
 * Exemple :
 * <LangProvider>
 *   <App />
 * </LangProvider>
 */
export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};
