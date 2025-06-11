import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Workout } from '../types/routine';
import { Flex } from '../styles/components/Layout.styles';
import { ExerciseGrid } from '../styles/components/Grid.styles';
import ExerciseComponent from './Exercise';
import { DragPreview, DropZonePreview } from './DragPreview';

const WorkoutCard = styled.div`
  width: 300px;
  height: 100%;
  scroll-snap-align: start;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 85vw;
  }
`;

const WorkoutHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.md};
`;

const WorkoutTitleInput = styled.input`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  margin: 0;
  font-family: inherit;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
  }
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

const ExercisesContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const AddButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm};
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
  onTitleChange?: (newTitle: string) => void;
}

const WorkoutComponent: React.FC<WorkoutProps> = ({
  workout,
  index,
  onAddExercise,
  onTitleChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.name);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (title.trim() !== '' && onTitleChange) {
      onTitleChange(title);
    } else {
      setTitle(workout.name);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTitle(workout.name);
    }
  };

  const handleAddExercise = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddExercise();
  };

  return (
    <Draggable draggableId={workout.id} index={index}>
      {(provided, snapshot) => (
        <WorkoutCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <WorkoutHeader>
            <Flex justify="space-between" align="center" gap="sm">
              {isEditing ? (
                <WorkoutTitleInput
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  autoFocus
                />
              ) : (
                <WorkoutTitleInput
                  value={title}
                  readOnly
                  onClick={() => setIsEditing(true)}
                  style={{ cursor: 'pointer' }}
                />
              )}
              <DragHandle />
            </Flex>
          </WorkoutHeader>
          <ExercisesContainer>
            <Droppable droppableId={workout.id} type="EXERCISE">
              {(provided, snapshot) => (
                <DropZonePreview
                  isOver={snapshot.isDraggingOver}
                  isValid={!snapshot.draggingFromThisWith}
                >
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ExerciseGrid>
                      {workout.exercises.map((exercise, index) => (
                        <ExerciseComponent
                          key={exercise.id}
                          exercise={exercise}
                          index={index}
                        />
                      ))}
                      {provided.placeholder}
                    </ExerciseGrid>
                  </div>
                </DropZonePreview>
              )}
            </Droppable>
            <AddButton onClick={handleAddExercise}>
              + Add Exercise
            </AddButton>
          </ExercisesContainer>
        </WorkoutCard>
      )}
    </Draggable>
  );
};

export default WorkoutComponent; 