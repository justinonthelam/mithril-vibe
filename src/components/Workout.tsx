import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Workout as WorkoutType } from '../types/routine';
import Exercise from './Exercise';
import DragHandle from './DragHandle';

const WorkoutContainer = styled.div`
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
  min-width: 280px;
  max-width: 400px;
  margin: 0 auto;
  scroll-snap-align: start;

  @media (min-width: 768px) {
    margin: 0;
  }
`;

const WorkoutHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;

const WorkoutTitle = styled.h3`
  font-size: 1.125rem;
  color: #172b4d;
  margin: 0;
  flex-grow: 1;
  min-width: 120px;
`;

const AddExerciseButton = styled.button`
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

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 50px;
  padding: 0.5rem;
  margin: -0.5rem;
  border-radius: 4px;

  &:empty {
    background-color: #f4f5f7;
  }
`;

interface WorkoutProps {
  workout: WorkoutType;
  weekId: string;
  index: number;
  onAddExercise: (weekId: string, workoutId: string) => void;
}

const Workout: React.FC<WorkoutProps> = ({
  workout,
  weekId,
  index,
  onAddExercise
}) => {
  return (
    <Draggable draggableId={workout.id} index={index}>
      {(provided) => (
        <WorkoutContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <WorkoutHeader>
            <DragHandle {...provided.dragHandleProps} />
            <WorkoutTitle>{workout.name}</WorkoutTitle>
            <AddExerciseButton onClick={() => onAddExercise(weekId, workout.id)}>
              Add Exercise
            </AddExerciseButton>
          </WorkoutHeader>
          <Droppable droppableId={`${weekId}-${workout.id}`} type="EXERCISE">
            {(provided) => (
              <ExerciseList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {workout.exercises.map((exercise, index) => (
                  <Exercise
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </ExerciseList>
            )}
          </Droppable>
        </WorkoutContainer>
      )}
    </Draggable>
  );
};

export default Workout; 