// src/context/LanguageContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTranslations } from 'Api/fetchTranslations';

// Tipagem dos textos
type Texts = Record<string, string>;

// Tipagem das línguas disponíveis
type Language = 'en' | 'pt' | 'es';

// Tipagem do contexto
interface LanguageContextProps {
  texts: Texts;
  language: Language;
  switchLanguage: (lang: Language) => void;
  loading: boolean;
}

// Inicialização do contexto
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Provedor do contexto
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'pt');

  const { data: texts = {}, isLoading: loading } = useQuery({ queryKey: ['translations', language], queryFn: () => fetchTranslations(language) })

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);    
  };

  return (
    <LanguageContext.Provider value={{ texts, switchLanguage, language, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
