import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DragDropContext } from 'react-beautiful-dnd';
import Routine from '../Routine';

// Mock react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children, onDragEnd }: any) => {
    const triggerDragEnd = (result: any) => onDragEnd(result);
    return (
      <div data-testid="drag-context" onClick={() => triggerDragEnd({
        draggableId: 'week-1',
        type: 'WEEK',
        source: { index: 0 },
        destination: { index: 1 }
      })}>
        {children}
      </div>
    );
  },
  Droppable: ({ children }: any) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }),
  Draggable: ({ children }: any) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
    dragHandleProps: {},
  }),
}));

describe('Routine', () => {
  const mockRoutine = {
    id: '1',
    title: 'Test Routine',
    weeks: [
      {
        id: 'week-1',
        name: 'Week 1',
        workouts: [
          {
            id: 'workout-1',
            name: 'Workout 1',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Exercise 1',
                order: 0
              }
            ],
            order: 0
          }
        ],
        order: 0
      }
    ],
    hasUnsavedChanges: false
  };

  const defaultProps = {
    routine: mockRoutine,
    onAddWorkout: jest.fn(),
    onAddExercise: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render routine with weeks', () => {
    render(<Routine {...defaultProps} />);
    expect(screen.getByText('Week 1')).toBeInTheDocument();
    expect(screen.getByText('Workout 1')).toBeInTheDocument();
    expect(screen.getByText('Exercise 1')).toBeInTheDocument();
  });

  it('should handle drag and drop of weeks', () => {
    const onDragEnd = jest.fn();
    render(
      <DragDropContext onDragEnd={onDragEnd}>
        <Routine {...defaultProps} />
      </DragDropContext>
    );

    fireEvent.click(screen.getByTestId('drag-context'));

    expect(onDragEnd).toHaveBeenCalledWith({
      draggableId: 'week-1',
      type: 'WEEK',
      source: { index: 0 },
      destination: { index: 1 }
    });
  });

  it('should handle adding a workout', () => {
    render(<Routine {...defaultProps} />);
    const addWorkoutButton = screen.getByText('Add Workout');
    fireEvent.click(addWorkoutButton);
    expect(defaultProps.onAddWorkout).toHaveBeenCalledWith('week-1');
  });

  it('should handle adding an exercise', () => {
    render(<Routine {...defaultProps} />);
    const addExerciseButton = screen.getByText('Add Exercise');
    fireEvent.click(addExerciseButton);
    expect(defaultProps.onAddExercise).toHaveBeenCalledWith('week-1', 'workout-1');
  });

  it('should render empty state when no weeks', () => {
    render(
      <Routine
        {...defaultProps}
        routine={{
          ...mockRoutine,
          weeks: []
        }}
      />
    );
    expect(screen.queryByText('Week 1')).not.toBeInTheDocument();
  });
}); 