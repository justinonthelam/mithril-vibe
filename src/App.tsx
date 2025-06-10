import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import RoutinePage from './pages/RoutinePage';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const handleDragEnd = (result: DropResult) => {
    // Drag and drop logic will be implemented here
    // For now, we'll just log the result
    console.log('Drag ended:', result);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Layout>
              <RoutinePage />
            </Layout>
          </DragDropContext>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
