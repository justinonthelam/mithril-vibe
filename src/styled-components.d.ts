import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
      error: string;
      success: string;
      disabled: string;
      border: string;
      hover: string;
    };
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      '3xl': string;
      '4xl': string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      circle: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      inner: string;
    };
    typography: {
      fontFamily: string;
      fontSizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
      };
      fontWeights: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      lineHeights: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
      bounce: string;
    };
    zIndices: {
      base: number;
      dropdown: number;
      sticky: number;
      modal: number;
      tooltip: number;
    };
  }
} 