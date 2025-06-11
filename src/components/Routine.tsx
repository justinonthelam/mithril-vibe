import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import type { Routine as RoutineType } from '../types/routine';
import { Section, Flex } from '../styles/components/Layout.styles';
import { WeekGrid } from '../styles/components/Grid.styles';
import WeekComponent from './Week';
import EditableTitle from './EditableTitle';
import SaveButton from './SaveButton';

const RoutineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 2rem;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 768px) {
    overflow-x: visible;
  }
`;

const WeekList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: min-content;
  padding: 0.5rem;

  @media (min-width: 768px) {
    min-width: 100%;
    padding: 0;
  }
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TitleInput = styled.input`
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs};
  margin: -${({ theme }) => theme.spacing.xs};
  width: 100%;
  max-width: 500px;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  &:focus {
    background: ${({ theme }) => theme.colors.surface};
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  margin: -${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

const SaveStatus = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const WeeksDroppable = styled(WeekGrid)<{ isDraggingOver: boolean }>`
  min-height: 200px;
  background: ${({ theme, isDraggingOver }) =>
    isDraggingOver ? theme.colors.surface : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  padding: ${({ theme }) => theme.spacing.md};
`;

const AddWeekButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface RoutineProps {
  routine: RoutineType;
  onRoutineChange: (routine: RoutineType) => void;
  onSave: (routine: RoutineType) => Promise<void>;
  onAddWorkout: (weekId: string) => void;
  onAddExercise: (weekId: string, workoutId: string) => void;
}

const Routine: React.FC<RoutineProps> = ({
  routine,
  onRoutineChange,
  onSave,
  onAddWorkout,
  onAddExercise
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | undefined>(undefined);

  const handleTitleChange = (newTitle: string) => {
    const updatedRoutine = { ...routine, name: newTitle };
    onRoutineChange(updatedRoutine);
    setIsDirty(true);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    // Don't do anything if dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedRoutine = structuredClone(routine);

    // Different logic based on what's being dragged
    switch (type) {
      case 'WEEK':
        const newWeeks = Array.from(routine.weeks);
        const [movedWeek] = newWeeks.splice(source.index, 1);
        newWeeks.splice(destination.index, 0, movedWeek);
        updatedRoutine.weeks = newWeeks;
        break;

      case 'WORKOUT':
        const sourceWeek = updatedRoutine.weeks.find(w => w.id === source.droppableId);
        const destWeek = updatedRoutine.weeks.find(w => w.id === destination.droppableId);
        
        if (!sourceWeek || !destWeek) return;

        const [movedWorkout] = sourceWeek.workouts.splice(source.index, 1);
        destWeek.workouts.splice(destination.index, 0, movedWorkout);
        break;

      case 'EXERCISE':
        // Find the source and destination workouts
        const sourceWorkoutWeek = updatedRoutine.weeks.find(week => 
          week.workouts.some(workout => workout.id === source.droppableId)
        );
        const destWorkoutWeek = updatedRoutine.weeks.find(week => 
          week.workouts.some(workout => workout.id === destination.droppableId)
        );

        if (!sourceWorkoutWeek || !destWorkoutWeek) return;

        const sourceWorkout = sourceWorkoutWeek.workouts.find(w => w.id === source.droppableId);
        const destWorkout = destWorkoutWeek.workouts.find(w => w.id === destination.droppableId);

        if (!sourceWorkout || !destWorkout) return;

        // Move the exercise
        const [movedExercise] = sourceWorkout.exercises.splice(source.index, 1);
        destWorkout.exercises.splice(destination.index, 0, movedExercise);
        break;
    }
    
    setIsDirty(true);
    onRoutineChange(updatedRoutine);
  };

  const handleSave = async () => {
    if (!isDirty || isSaving) return;

    setIsSaving(true);
    try {
      await onSave(routine);
      setIsDirty(false);
      setNotification({
        type: 'success',
        message: 'Changes saved successfully'
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save changes';
      setNotification({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Section>
        <Header>
          <Flex justify="space-between" align="center">
            {isEditingTitle ? (
              <TitleInput
                value={routine.name}
                onChange={(e) => handleTitleChange(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={handleTitleKeyDown}
                autoFocus
              />
            ) : (
              <Title onClick={() => setIsEditingTitle(true)}>
                {routine.name}
              </Title>
            )}
            <SaveButton
              hasChanges={isDirty}
              isSaving={isSaving}
              onSave={handleSave}
              notification={notification}
            />
          </Flex>
        </Header>

        <Droppable droppableId="weeks" type="WEEK">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {routine.weeks.map((week, index) => (
                <WeekComponent
                  key={week.id}
                  week={week}
                  index={index}
                  onWeekChange={(updatedWeek) => {
                    const updatedRoutine = structuredClone(routine);
                    updatedRoutine.weeks[index] = updatedWeek;
                    onRoutineChange(updatedRoutine);
                    setIsDirty(true);
                  }}
                  onAddWorkout={() => onAddWorkout(week.id)}
                  onAddExercise={(workoutId) => onAddExercise(week.id, workoutId)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <AddWeekButton onClick={() => onAddWorkout('new')}>
          + Add Week
        </AddWeekButton>
      </Section>
    </DragDropContext>
  );
};

export default Routine; 