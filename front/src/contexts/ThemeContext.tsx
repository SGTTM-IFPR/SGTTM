import { createContext, Dispatch, SetStateAction } from 'react';

export interface ThemeContextProps {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});