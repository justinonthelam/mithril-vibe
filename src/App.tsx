import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import RoutinePage from './pages/RoutinePage';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <Layout>
            <RoutinePage />
          </Layout>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
