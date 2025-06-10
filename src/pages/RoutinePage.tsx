import React, { useState } from 'react';
import { Container } from '../styles/components/Layout.styles';
import { Routine as RoutineType } from '../types/routine';
import { useSaveState } from '../hooks/useSaveState';
import RoutineComponent from '../components/Routine';

const RoutinePage: React.FC = () => {
  const [routine, setRoutine] = useState<RoutineType>({
    id: '1',
    name: 'My Workout Routine',
    weeks: []
  });

  const { isDirty, isSaving, lastSaved, error, saveRoutine } = useSaveState({
    routine,
    onRoutineChange: setRoutine
  });

  const handleAddWorkout = (weekId: string) => {
    const updatedRoutine = { ...routine };
    const week = updatedRoutine.weeks.find(w => w.id === weekId);
    if (week) {
      week.workouts.push({
        id: `workout-${Date.now()}`,
        name: `Workout ${week.workouts.length + 1}`,
        exercises: [],
        order: week.workouts.length
      });
      setRoutine(updatedRoutine);
    }
  };

  const handleAddExercise = (weekId: string, workoutId: string) => {
    const updatedRoutine = { ...routine };
    const week = updatedRoutine.weeks.find(w => w.id === weekId);
    const workout = week?.workouts.find(w => w.id === workoutId);
    if (workout) {
      workout.exercises.push({
        id: `exercise-${Date.now()}`,
        name: `Exercise ${workout.exercises.length + 1}`,
        order: workout.exercises.length
      });
      setRoutine(updatedRoutine);
    }
  };

  return (
    <Container>
      <RoutineComponent
        routine={routine}
        onRoutineChange={setRoutine}
        isDirty={isDirty}
        isSaving={isSaving}
        lastSaved={lastSaved}
        error={error}
        onSave={saveRoutine}
        onAddWorkout={handleAddWorkout}
        onAddExercise={handleAddExercise}
      />
    </Container>
  );
};

export default RoutinePage; 