import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#6366f1',
    secondary: '#64748b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    error: '#ef4444',
    success: '#22c55e',
    disabled: '#cbd5e1',
    border: '#e2e8f0',
    hover: '#f1f5f9',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSizes: {
      xs: 'clamp(0.75rem, 2vw, 0.875rem)',
      sm: 'clamp(0.875rem, 2vw, 1rem)',
      md: 'clamp(1rem, 2.5vw, 1.125rem)',
      lg: 'clamp(1.125rem, 3vw, 1.25rem)',
      xl: 'clamp(1.25rem, 3.5vw, 1.5rem)',
      '2xl': 'clamp(1.5rem, 4vw, 1.875rem)',
      '3xl': 'clamp(1.875rem, 5vw, 2.25rem)',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xxs: '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    circle: '50%',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
    bounce: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  zIndices: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    tooltip: 1400,
    dragPreview: 1500,
  },
  touchTargets: {
    min: '44px', // Minimum size for touch targets
    icon: '32px', // Size for icon buttons
    button: '48px', // Size for primary buttons
  },
};

export default theme; 