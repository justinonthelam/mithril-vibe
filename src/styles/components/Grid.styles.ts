import styled from 'styled-components';

export const WeekGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const WorkoutGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 300px;
  gap: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.md};
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-auto-columns: 85vw;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const ExerciseGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const DragDropGrid = styled.div<{ isDraggingOver?: boolean }>`
  min-height: 100px;
  background: ${({ theme, isDraggingOver }) =>
    isDraggingOver ? theme.colors.surface : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  padding: ${({ theme }) => theme.spacing.sm};
`; 