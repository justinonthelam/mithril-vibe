import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Exercise } from '../types/routine';
import { Card, Flex } from '../styles/components/Layout.styles';
import { DragPreview } from './DragPreview';

const ExerciseCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
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
  onNameChange?: (newName: string) => void;
}

const ExerciseComponent: React.FC<ExerciseProps> = ({
  exercise,
  index,
  onNameChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(exercise.name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (name.trim() !== '' && onNameChange) {
      onNameChange(name);
    } else {
      setName(exercise.name);
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setName(exercise.name);
    }
  };

  return (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided, snapshot) => (
        <ExerciseCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex justify="space-between" align="center" gap="sm">
            {isEditing ? (
              <ExerciseInput
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                onKeyDown={handleNameKeyDown}
                autoFocus
              />
            ) : (
              <ExerciseInput
                value={name}
                readOnly
                onClick={() => setIsEditing(true)}
                style={{ cursor: 'pointer' }}
              />
            )}
            <DragHandle {...provided.dragHandleProps} />
          </Flex>
        </ExerciseCard>
      )}
    </Draggable>
  );
};

export default ExerciseComponent; 