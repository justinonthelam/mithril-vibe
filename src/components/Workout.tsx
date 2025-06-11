import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import type { Workout } from '../types/routine';
import { Card } from '../styles/components/Layout.styles';
import ExerciseComponent from './Exercise';

const WorkoutContainer = styled(Card)`
  min-width: 300px;
  margin-right: ${({ theme }) => theme.spacing.lg};
  padding: 0;
  overflow: hidden;
`;

const WorkoutHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const WorkoutTitleInput = styled.input`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs};
  margin: -${({ theme }) => theme.spacing.xs};
  width: 100%;
  max-width: 250px;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  &:focus {
    background: ${({ theme }) => theme.colors.surface};
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const WorkoutTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  margin: 0;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  margin: -${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

const ExerciseList = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const AddButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

interface WorkoutProps {
  workout: Workout;
  index: number;
  onWorkoutChange: (updatedWorkout: Workout) => void;
  onAddExercise: () => void;
}

const WorkoutComponent: React.FC<WorkoutProps> = ({
  workout,
  index,
  onWorkoutChange,
  onAddExercise
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleChange = (newTitle: string) => {
    onWorkoutChange({ ...workout, name: newTitle });
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };

  return (
    <Draggable draggableId={workout.id} index={index}>
      {(provided, snapshot) => (
        <WorkoutContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <WorkoutHeader {...provided.dragHandleProps}>
            {isEditingTitle ? (
              <WorkoutTitleInput
                value={workout.name}
                onChange={(e) => handleTitleChange(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={handleTitleKeyDown}
                autoFocus
              />
            ) : (
              <WorkoutTitle onClick={() => setIsEditingTitle(true)}>
                {workout.name}
              </WorkoutTitle>
            )}
          </WorkoutHeader>

          <Droppable droppableId={workout.id} type="EXERCISE">
            {(provided, snapshot) => (
              <ExerciseList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {workout.exercises.map((exercise, index) => (
                  <ExerciseComponent
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                    onExerciseChange={(updatedExercise) => {
                      const updatedWorkout = { ...workout };
                      updatedWorkout.exercises[index] = updatedExercise;
                      onWorkoutChange(updatedWorkout);
                    }}
                  />
                ))}
                {provided.placeholder}
                <AddButton onClick={onAddExercise}>
                  + Add Exercise
                </AddButton>
              </ExerciseList>
            )}
          </Droppable>
        </WorkoutContainer>
      )}
    </Draggable>
  );
};

export default WorkoutComponent; 