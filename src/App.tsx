import React, { Suspense, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import RoutinePage from './pages/RoutinePage';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import { Routine } from './types/routine';

function App() {
  const [routine, setRoutine] = useState<Routine>({
    id: '1',
    name: 'My Workout Routine',
    weeks: []
  });

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // Drop outside valid area
    if (!destination) {
      return;
    }

    // Drop in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedRoutine = { ...routine };

    switch (type) {
      case 'WEEK': {
        const weeks = Array.from(routine.weeks);
        const [removed] = weeks.splice(source.index, 1);
        weeks.splice(destination.index, 0, removed);
        updatedRoutine.weeks = weeks;
        break;
      }
      case 'WORKOUT': {
        const sourceWeek = routine.weeks.find(w => w.id === source.droppableId);
        const destWeek = routine.weeks.find(w => w.id === destination.droppableId);

        if (!sourceWeek || !destWeek) return;

        const sourceWorkouts = Array.from(sourceWeek.workouts);
        const [removed] = sourceWorkouts.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
          // Moving within the same week
          sourceWorkouts.splice(destination.index, 0, removed);
          sourceWeek.workouts = sourceWorkouts;
        } else {
          // Moving between weeks
          const destWorkouts = Array.from(destWeek.workouts);
          destWorkouts.splice(destination.index, 0, removed);
          sourceWeek.workouts = sourceWorkouts;
          destWeek.workouts = destWorkouts;
        }
        break;
      }
      case 'EXERCISE': {
        const sourceWeek = routine.weeks.find(w => 
          w.workouts.some(workout => workout.id === source.droppableId)
        );
        const destWeek = routine.weeks.find(w => 
          w.workouts.some(workout => workout.id === destination.droppableId)
        );

        if (!sourceWeek || !destWeek) return;

        const sourceWorkout = sourceWeek.workouts.find(w => w.id === source.droppableId);
        const destWorkout = destWeek.workouts.find(w => w.id === destination.droppableId);

        if (!sourceWorkout || !destWorkout) return;

        const sourceExercises = Array.from(sourceWorkout.exercises);
        const [removed] = sourceExercises.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
          // Moving within the same workout
          sourceExercises.splice(destination.index, 0, removed);
          sourceWorkout.exercises = sourceExercises;
        } else {
          // Moving between workouts
          const destExercises = Array.from(destWorkout.exercises);
          destExercises.splice(destination.index, 0, removed);
          sourceWorkout.exercises = sourceExercises;
          destWorkout.exercises = destExercises;
        }
        break;
      }
    }

    setRoutine(updatedRoutine);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Layout>
              <RoutinePage routine={routine} onRoutineChange={setRoutine} />
            </Layout>
          </DragDropContext>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
