import { createContext, Dispatch, SetStateAction } from 'react';

export interface TemaContextoProps {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const TemaContexto = createContext<TemaContextoProps>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});