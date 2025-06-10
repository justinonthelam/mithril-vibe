import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Routine } from '../types/routine';
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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin: 0;
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
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.success};
    border-color: ${({ theme }) => theme.colors.success};
  }
`;

interface RoutineProps {
  routine: Routine;
  onRoutineChange: (routine: Routine) => void;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  error: string | null;
  onSave: () => void;
  onAddWorkout: (weekId: string) => void;
  onAddExercise: (weekId: string, workoutId: string) => void;
}

const RoutineComponent: React.FC<RoutineProps> = ({
  routine,
  onRoutineChange,
  isDirty,
  isSaving,
  lastSaved,
  error,
  onSave,
  onAddWorkout,
  onAddExercise
}) => {
  const handleTitleChange = (newTitle: string) => {
    onRoutineChange({
      ...routine,
      name: newTitle
    });
  };

  const handleAddWeek = () => {
    onRoutineChange({
      ...routine,
      weeks: [
        ...routine.weeks,
        {
          id: `week-${Date.now()}`,
          name: `Week ${routine.weeks.length + 1}`,
          workouts: [],
          order: routine.weeks.length
        }
      ]
    });
  };

  const formatLastSaved = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(date);
  };

  return (
    <Section>
      <Header>
        <Flex justify="space-between" align="center">
          <EditableTitle
            value={routine.name}
            onChange={handleTitleChange}
          />
          <SaveButton
            isDirty={isDirty}
            isSaving={isSaving}
            lastSaved={lastSaved}
            error={error}
            onSave={onSave}
          />
        </Flex>
      </Header>
      <Droppable droppableId="weeks" type="WEEK">
        {(provided, snapshot) => (
          <WeeksDroppable
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {routine.weeks.map((week, index) => (
              <WeekComponent
                key={week.id}
                week={week}
                index={index}
                onAddWorkout={() => onAddWorkout(week.id)}
                onAddExercise={onAddExercise}
              />
            ))}
            {provided.placeholder}
          </WeeksDroppable>
        )}
      </Droppable>
      <AddWeekButton onClick={handleAddWeek}>
        + Add Week
      </AddWeekButton>
    </Section>
  );
};

export default RoutineComponent; 