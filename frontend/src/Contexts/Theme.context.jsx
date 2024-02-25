import React, { createContext, useContext, useState } from 'react';
import {THEMES} from "../Resources/UTILS/ENUMS";

// Create a context with a default value
const ThemeContext = createContext();

// Create a custom provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.LIGHT); // Default theme

  // Updated function to set the theme directly
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
