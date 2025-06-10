import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Exercise } from '../types/routine';
import { Card, Flex } from '../styles/components/Layout.styles';

const ExerciseCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: none;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const ExerciseName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
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

interface ExerciseProps {
  exercise: Exercise;
  index: number;
}

const ExerciseComponent: React.FC<ExerciseProps> = ({ exercise, index }) => {
  return (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided, snapshot) => (
        <ExerciseCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1
          }}
        >
          <Flex justify="space-between" align="center">
            <ExerciseName>{exercise.name}</ExerciseName>
            <DragHandle {...provided.dragHandleProps} />
          </Flex>
        </ExerciseCard>
      )}
    </Draggable>
  );
};

export default ExerciseComponent; 