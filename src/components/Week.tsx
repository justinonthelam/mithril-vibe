import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Week as WeekType } from '../types/routine';
import Workout from './Workout';
import DragHandle from './DragHandle';

const WeekContainer = styled.div`
  background: #f4f5f7;
  border-radius: 8px;
  padding: 1rem;
  position: relative;
`;

const WeekHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;

const WeekTitle = styled.h2`
  font-size: 1.25rem;
  color: #172b4d;
  margin: 0;
  flex-grow: 1;
  min-width: 150px;
`;

const AddWorkoutButton = styled.button`
  background-color: #0052cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background-color: #0047b3;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const WorkoutList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  min-height: 100px;
  overflow-x: auto;
  padding: 0.5rem;
  margin: -0.5rem;

  @media (min-width: 768px) {
    grid-auto-flow: column;
    grid-auto-columns: minmax(280px, 1fr);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #666;
    }
  }
`;

interface WeekProps {
  week: WeekType;
  index: number;
  onAddWorkout: (weekId: string) => void;
  onAddExercise: (weekId: string, workoutId: string) => void;
}

const Week: React.FC<WeekProps> = ({ week, index, onAddWorkout, onAddExercise }) => {
  return (
    <Draggable draggableId={week.id} index={index}>
      {(provided) => (
        <WeekContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <WeekHeader>
            <DragHandle {...provided.dragHandleProps} />
            <WeekTitle>{week.name}</WeekTitle>
            <AddWorkoutButton onClick={() => onAddWorkout(week.id)}>
              Add Workout
            </AddWorkoutButton>
          </WeekHeader>
          <Droppable droppableId={week.id} type="WORKOUT" direction="horizontal">
            {(provided) => (
              <WorkoutList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {week.workouts.map((workout, index) => (
                  <Workout
                    key={workout.id}
                    workout={workout}
                    weekId={week.id}
                    index={index}
                    onAddExercise={onAddExercise}
                  />
                ))}
                {provided.placeholder}
              </WorkoutList>
            )}
          </Droppable>
        </WeekContainer>
      )}
    </Draggable>
  );
};

export default Week; 