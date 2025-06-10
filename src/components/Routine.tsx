import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Routine as RoutineType } from '../types/routine';
import Week from './Week';

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

interface RoutineProps {
  routine: RoutineType;
  onAddWorkout: (weekId: string) => void;
  onAddExercise: (weekId: string, workoutId: string) => void;
}

const Routine: React.FC<RoutineProps> = ({ routine, onAddWorkout, onAddExercise }) => {
  return (
    <RoutineContainer>
      <Droppable droppableId="weeks" type="WEEK">
        {(provided) => (
          <WeekList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {routine.weeks.map((week, index) => (
              <Week
                key={week.id}
                week={week}
                index={index}
                onAddWorkout={onAddWorkout}
                onAddExercise={onAddExercise}
              />
            ))}
            {provided.placeholder}
          </WeekList>
        )}
      </Droppable>
    </RoutineContainer>
  );
};

export default Routine; 