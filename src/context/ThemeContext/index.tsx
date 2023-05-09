import React, { FunctionComponent, PropsWithChildren } from 'react';
import ThemeProvider from './ThemeContext';

const ThemeProviderWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <ThemeProvider>
      <>{children}</>
  </ThemeProvider>
);

export default ThemeProviderWrapper;
