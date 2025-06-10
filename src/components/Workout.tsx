import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Workout } from '../types/routine';
import { Card, Flex } from '../styles/components/Layout.styles';
import { ExerciseGrid, DragDropGrid } from '../styles/components/Grid.styles';

const WorkoutCard = styled(Card)`
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
`;

const WorkoutHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const WorkoutTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
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

const AddButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  width: 100%;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.success};
    border-color: ${({ theme }) => theme.colors.success};
  }
`;

interface WorkoutProps {
  workout: Workout;
  index: number;
  onAddExercise: () => void;
}

const WorkoutComponent: React.FC<WorkoutProps> = ({
  workout,
  index,
  onAddExercise
}) => {
  return (
    <Draggable draggableId={workout.id} index={index}>
      {(provided) => (
        <WorkoutCard
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <WorkoutHeader>
            <Flex justify="space-between" align="center">
              <WorkoutTitle>{workout.name}</WorkoutTitle>
              <DragHandle {...provided.dragHandleProps} />
            </Flex>
          </WorkoutHeader>
          <Droppable droppableId={workout.id} type="EXERCISE">
            {(provided, snapshot) => (
              <DragDropGrid
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <ExerciseGrid>
                  {/* Exercise components will be rendered here */}
                  {provided.placeholder}
                </ExerciseGrid>
                <AddButton onClick={onAddExercise}>
                  + Add Exercise
                </AddButton>
              </DragDropGrid>
            )}
          </Droppable>
        </WorkoutCard>
      )}
    </Draggable>
  );
};

export default WorkoutComponent; 