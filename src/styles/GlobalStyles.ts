import * as StyledComponents from 'styled-components';

const GlobalStyles = StyledComponents.createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${(props: { theme: StyledComponents.DefaultTheme }) => props.theme.typography.fontFamily};
    color: ${(props: { theme: StyledComponents.DefaultTheme }) => props.theme.colors.text};
    background-color: ${(props: { theme: StyledComponents.DefaultTheme }) => props.theme.colors.background};
    line-height: 1.5;
  }

  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
    background: none;
    padding: 0;

    &:disabled {
      cursor: not-allowed;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props: { theme: StyledComponents.DefaultTheme }) => props.theme.colors.surface};
    border-radius: ${(props: { theme: StyledComponents.DefaultTheme }) => props.theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props: { theme: StyledComponents.DefaultTheme }) => props.theme.colors.secondary};
    border-radius: ${(props: { theme: StyledComponents.DefaultTheme }) => props.theme.borderRadius.sm};
  }

  ::selection {
    background-color: ${(props: { theme: StyledComponents.DefaultTheme }) => props.theme.colors.primary};
    color: white;
  }
`;

export default GlobalStyles; 