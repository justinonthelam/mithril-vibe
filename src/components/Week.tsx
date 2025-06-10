import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Week } from '../types/routine';
import { Card, Flex } from '../styles/components/Layout.styles';
import { WorkoutGrid, DragDropGrid } from '../styles/components/Grid.styles';
import WorkoutComponent from './Workout';

const WeekCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const WeekHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.md};
`;

const WeekTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  margin: 0;
`;

const DragHandle = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.5;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 1;
  }

  &:before {
    content: "⋮⋮";
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    line-height: 1;
  }
`;

const WorkoutContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.colors.secondary} ${theme.colors.surface}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const AddButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.success};
    border-color: ${({ theme }) => theme.colors.success};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: ${({ theme }) => theme.spacing.sm};
  }
`;

interface WeekProps {
  week: Week;
  index: number;
  onAddWorkout: () => void;
  onAddExercise: (weekId: string, workoutId: string) => void;
}

const WeekComponent: React.FC<WeekProps> = ({
  week,
  index,
  onAddWorkout,
  onAddExercise
}) => {
  return (
    <Draggable draggableId={week.id} index={index}>
      {(provided) => (
        <WeekCard
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <WeekHeader {...provided.dragHandleProps}>
            <Flex justify="space-between" align="center">
              <WeekTitle>{week.name}</WeekTitle>
              <DragHandle />
            </Flex>
          </WeekHeader>
          <WorkoutContainer>
            <Droppable droppableId={week.id} type="WORKOUT" direction="horizontal">
              {(provided, snapshot) => (
                <DragDropGrid
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <WorkoutGrid>
                    {week.workouts.map((workout, index) => (
                      <WorkoutComponent
                        key={workout.id}
                        workout={workout}
                        index={index}
                        onAddExercise={() => onAddExercise(week.id, workout.id)}
                      />
                    ))}
                    {provided.placeholder}
                  </WorkoutGrid>
                </DragDropGrid>
              )}
            </Droppable>
          </WorkoutContainer>
          <AddButton onClick={onAddWorkout}>
            + Add Workout
          </AddButton>
        </WeekCard>
      )}
    </Draggable>
  );
};

export default WeekComponent; 