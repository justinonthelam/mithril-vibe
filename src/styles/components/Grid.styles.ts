import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const WeekContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;
  min-height: 250px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const WeekGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
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
  pointer-events: auto;

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
  width: 100%;
`;

export const DragDropGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  min-height: 100px;
  pointer-events: auto;
`; 