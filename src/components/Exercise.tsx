import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Exercise as ExerciseType } from '../types/routine';
import DragHandle from './DragHandle';

const ExerciseContainer = styled.div`
  background: white;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #f4f5f7;
  }

  &:active {
    transform: scale(0.99);
  }

  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding: 0.5rem;
  }
`;

const ExerciseTitle = styled.h4`
  font-size: 1rem;
  color: #172b4d;
  margin: 0;
  flex-grow: 1;
  min-width: 120px;

  @media (max-width: 767px) {
    width: 100%;
    order: -1;
  }
`;

interface ExerciseProps {
  exercise: ExerciseType;
  index: number;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise, index }) => {
  return (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided) => (
        <ExerciseContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <DragHandle {...provided.dragHandleProps} />
          <ExerciseTitle>{exercise.name}</ExerciseTitle>
        </ExerciseContainer>
      )}
    </Draggable>
  );
};

export default Exercise; 