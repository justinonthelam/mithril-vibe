import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Week } from '../types/routine';
import { Card, Flex } from '../styles/components/Layout.styles';
import { WorkoutGrid, DragDropGrid, WeekContainer } from '../styles/components/Grid.styles';
import WorkoutComponent from './Workout';
import { DragPreview, DropZonePreview } from './DragPreview';

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

const WeekContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const WorkoutList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.sm};
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  min-height: 200px;
  align-items: flex-start;
  position: relative;
  pointer-events: auto;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.circle};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.circle};
  }
`;

const AddButton = styled.button.attrs({ type: 'button' })`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  min-width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  scroll-snap-align: start;
  flex-shrink: 0;
  align-self: stretch;
  position: relative;
  z-index: 10;
  pointer-events: auto;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.success};
    border-color: ${({ theme }) => theme.colors.success};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.success};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.success}40;
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
  const handleAddWorkout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddWorkout();
  };

  return (
    <Draggable draggableId={week.id} index={index}>
      {(provided, snapshot) => (
        <WeekContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <WeekHeader {...provided.dragHandleProps}>
            <Flex justify="space-between" align="center">
              <WeekTitle>{week.name}</WeekTitle>
              <DragHandle />
            </Flex>
          </WeekHeader>
          <WeekContent>
            <Droppable droppableId={week.id} type="WORKOUT" direction="horizontal">
              {(provided, snapshot) => (
                <DropZonePreview
                  isOver={snapshot.isDraggingOver}
                  isValid={!snapshot.draggingFromThisWith}
                >
                  <WorkoutList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {week.workouts.map((workout, index) => (
                      <WorkoutComponent
                        key={workout.id}
                        workout={workout}
                        index={index}
                        onAddExercise={() => onAddExercise(week.id, workout.id)}
                      />
                    ))}
                    {provided.placeholder}
                    <AddButton type="button" onClick={handleAddWorkout}>
                      + Add Workout
                    </AddButton>
                  </WorkoutList>
                </DropZonePreview>
              )}
            </Droppable>
          </WeekContent>
        </WeekContainer>
      )}
    </Draggable>
  );
};

export default WeekComponent; 