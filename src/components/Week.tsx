import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import type { Week } from '../types/routine';
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
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

const WeekTitleInput = styled.input`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs};
  margin: -${({ theme }) => theme.spacing.xs};
  width: 100%;
  max-width: 300px;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  &:focus {
    background: ${({ theme }) => theme.colors.surface};
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const WeekTitle = styled.div`
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

const WeekContent = styled.div<{ isCollapsed: boolean }>`
  display: ${({ isCollapsed }) => isCollapsed ? 'none' : 'block'};
  padding: ${({ theme }) => theme.spacing.md};
`;

const ScrollIndicator = styled.div<{ show: boolean; direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => direction === 'left' ? 'left: 0;' : 'right: 0;'}
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: ${({ show }) => show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  opacity: 0.8;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 1;
  }

  &::before {
    content: "${({ direction }) => direction === 'left' ? '←' : '→'}";
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 24px;
    height: 24px;
  }
`;

const WorkoutListContainer = styled.div`
  position: relative;
  width: 100%;
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
  scroll-behavior: smooth;

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

const CollapseIndicator = styled.span<{ isCollapsed: boolean }>`
  margin-left: ${({ theme }) => theme.spacing.sm};
  transition: transform ${({ theme }) => theme.transitions.fast};
  transform: rotate(${({ isCollapsed }) => isCollapsed ? '180deg' : '0deg'});
  display: inline-block;
  
  &::before {
    content: "▼";
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }
`;

const AddButton = styled.button`
  min-width: 300px;
  height: 200px;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface WeekProps {
  week: Week;
  index: number;
  onWeekChange: (updatedWeek: Week) => void;
  onAddWorkout: () => void;
  onAddExercise: (workoutId: string) => void;
}

const WeekComponent: React.FC<WeekProps> = ({
  week,
  index,
  onWeekChange,
  onAddWorkout,
  onAddExercise
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const workoutListRef = React.useRef<HTMLDivElement>(null);

  const handleTitleChange = (newTitle: string) => {
    onWeekChange({ ...week, name: newTitle });
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    // Only toggle collapse if we're not clicking on the title input
    if (!(e.target as HTMLElement).closest('.week-title')) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <Draggable draggableId={week.id} index={index}>
      {(provided, snapshot) => (
        <WeekContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <WeekHeader 
            {...provided.dragHandleProps}
            onClick={handleHeaderClick}
          >
            <Flex justify="space-between" align="center">
              <Flex align="center" className="week-title">
                {isEditingTitle ? (
                  <WeekTitleInput
                    value={week.name}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={handleTitleKeyDown}
                    autoFocus
                  />
                ) : (
                  <WeekTitle onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingTitle(true);
                  }}>
                    {week.name}
                  </WeekTitle>
                )}
                <CollapseIndicator isCollapsed={isCollapsed} />
              </Flex>
            </Flex>
          </WeekHeader>

          <WeekContent isCollapsed={isCollapsed}>
            <Droppable droppableId={week.id} type="WORKOUT" direction="horizontal">
              {(provided, snapshot) => (
                <WorkoutListContainer>
                  <WorkoutList
                    ref={(el) => {
                      provided.innerRef(el);
                      // @ts-ignore - we know this is an HTMLDivElement
                      workoutListRef.current = el;
                    }}
                    {...provided.droppableProps}
                  >
                    {week.workouts.map((workout, index) => (
                      <WorkoutComponent
                        key={workout.id}
                        workout={workout}
                        index={index}
                        onWorkoutChange={(updatedWorkout) => {
                          const updatedWeek = { ...week };
                          updatedWeek.workouts[index] = updatedWorkout;
                          onWeekChange(updatedWeek);
                        }}
                        onAddExercise={() => onAddExercise(workout.id)}
                      />
                    ))}
                    {provided.placeholder}
                    <AddButton onClick={onAddWorkout}>
                      + Add Workout
                    </AddButton>
                  </WorkoutList>
                </WorkoutListContainer>
              )}
            </Droppable>
          </WeekContent>
        </WeekContainer>
      )}
    </Draggable>
  );
};

export default WeekComponent; 