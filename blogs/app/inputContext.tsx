'use client'
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction,useContext } from 'react';

interface InputContextProps {
  inputData: string;
  setInputData: Dispatch<SetStateAction<string>>;
}

export const InputContext = createContext<InputContextProps | undefined>(undefined);

interface InputProviderProps {
  children: ReactNode;
}

export const InputProvider: React.FC<InputProviderProps> = ({ children }) => {
  const [inputData, setInputData] = useState<string>('');

  return (
    <InputContext.Provider value={{ inputData, setInputData }}>
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = (): InputContextProps => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('useInputContext must be used within an InputProvider');
  }
  return context;
};

