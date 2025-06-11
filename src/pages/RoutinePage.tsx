import React, { useState } from 'react';
import styled from 'styled-components';
import type { Routine } from '../types/routine';
import RoutineComponent from '../components/Routine';

const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const RoutinePage: React.FC = () => {
  const [routine, setRoutine] = useState<Routine>({
    id: 'routine-1',
    name: 'My Workout Routine',
    weeks: []
  });

  const handleRoutineChange = (updatedRoutine: Routine) => {
    setRoutine(updatedRoutine);
  };

  const handleSave = async (routineToSave: Routine): Promise<void> => {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be an API call
    try {
      // Save to localStorage for now
      localStorage.setItem('workout-routine', JSON.stringify(routineToSave));
      setRoutine(routineToSave);
    } catch (error) {
      console.error('Failed to save routine:', error);
      throw new Error('Failed to save routine');
    }
  };

  const handleAddWorkout = (weekId: string) => {
    const updatedRoutine = { ...routine };
    
    if (weekId === 'new') {
      // Add new week
      updatedRoutine.weeks.push({
        id: `week-${Date.now()}`,
        name: `Week ${updatedRoutine.weeks.length + 1}`,
        workouts: [],
        order: updatedRoutine.weeks.length
      });
    } else {
      // Add workout to existing week
      const week = updatedRoutine.weeks.find(w => w.id === weekId);
      if (week) {
        week.workouts.push({
          id: `workout-${Date.now()}`,
          name: `Workout ${week.workouts.length + 1}`,
          exercises: [],
          order: week.workouts.length
        });
      }
    }
    
    setRoutine(updatedRoutine);
  };

  const handleAddExercise = (weekId: string, workoutId: string) => {
    const updatedRoutine = structuredClone(routine);
    const week = updatedRoutine.weeks.find(w => w.id === weekId);
    if (!week) return;

    const workout = week.workouts.find(w => w.id === workoutId);
    if (!workout) return;

    workout.exercises.push({
      id: `exercise-${Date.now()}`,
      name: `Exercise ${workout.exercises.length + 1}`,
      order: workout.exercises.length
    });

    setRoutine(updatedRoutine);
  };

  return (
    <PageContainer>
      <RoutineComponent
        routine={routine}
        onRoutineChange={handleRoutineChange}
        onSave={handleSave}
        onAddWorkout={handleAddWorkout}
        onAddExercise={handleAddExercise}
      />
    </PageContainer>
  );
};

export default RoutinePage; 