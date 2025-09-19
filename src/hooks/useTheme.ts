import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('travel-explorer-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
      
      setIsDark(shouldBeDark);
      document.documentElement.classList.toggle('dark', shouldBeDark);
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
    }
  }, []);

  const toggleTheme = () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      document.documentElement.classList.toggle('dark', newTheme);
      localStorage.setItem('travel-explorer-theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.warn('Error saving theme preference:', error);
    }
  };

  return { isDark, toggleTheme };
};