import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import type { Exercise } from '../types/routine';
import { Card, Flex } from '../styles/components/Layout.styles';
import { DragPreview } from './DragPreview';

const ExerciseContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: grab;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ExerciseTitleInput = styled.input`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs};
  margin: -${({ theme }) => theme.spacing.xs};
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  &:focus {
    background: ${({ theme }) => theme.colors.surface};
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const ExerciseTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin: 0;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  margin: -${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

const ExerciseInput = styled.input`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  margin: 0;
  font-family: inherit;

  &:hover:not(:focus) {
    background: ${({ theme }) => theme.colors.surface};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const DragHandle = styled.div`
  width: 20px;
  height: 20px;
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
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    line-height: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 24px;
    height: 24px;
  }
`;

interface ExerciseProps {
  exercise: Exercise;
  index: number;
  onExerciseChange: (updatedExercise: Exercise) => void;
}

const ExerciseComponent: React.FC<ExerciseProps> = ({
  exercise,
  index,
  onExerciseChange
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleChange = (newTitle: string) => {
    onExerciseChange({ ...exercise, name: newTitle });
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };

  return (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided, snapshot) => (
        <ExerciseContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditingTitle ? (
            <ExerciseTitleInput
              value={exercise.name}
              onChange={(e) => handleTitleChange(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={handleTitleKeyDown}
              autoFocus
            />
          ) : (
            <ExerciseTitle onClick={() => setIsEditingTitle(true)}>
              {exercise.name}
            </ExerciseTitle>
          )}
        </ExerciseContainer>
      )}
    </Draggable>
  );
};

export default ExerciseComponent; 