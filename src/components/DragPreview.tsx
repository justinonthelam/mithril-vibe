import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

interface DragPreviewProps {
  isDragging: boolean;
  type: string;
  theme?: DefaultTheme;
}

interface DropZonePreviewProps {
  isOver: boolean;
  isValid: boolean;
  theme?: DefaultTheme;
}

const getPreviewStyles = (type: string) => {
  switch (type) {
    case 'week':
      return `
        width: 100%;
        min-height: 100px;
        padding: 16px;
      `;
    case 'workout':
      return `
        width: 300px;
        min-height: 80px;
        padding: 12px;
        @media (max-width: 768px) {
          width: 85vw;
        }
      `;
    case 'exercise':
      return `
        width: 100%;
        min-height: 40px;
        padding: 8px;
      `;
    default:
      return '';
  }
};

export const DragPreview = styled.div<DragPreviewProps>`
  opacity: ${({ isDragging }) => (isDragging ? 0.9 : 1)};
  transform: ${({ isDragging }) => isDragging ? 'scale(1.02)' : 'scale(1)'};
  box-shadow: ${({ theme, isDragging }) => 
    isDragging ? theme.shadows.lg : 'none'};
  transition: all ${({ theme }) => theme.transitions.fast};
  ${({ type }) => getPreviewStyles(type)}
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme, isDragging }) => 
    isDragging ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  ${({ isDragging, theme }) => isDragging && `
    pointer-events: none;
    position: relative;
    z-index: ${theme.zIndices.dragPreview};
  `}
`;

export const DropZonePreview = styled.div<DropZonePreviewProps>`
  background: ${({ theme, isOver, isValid }) =>
    isOver
      ? isValid
        ? theme.colors.success + '20'
        : theme.colors.error + '20'
      : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  pointer-events: none;
  min-height: ${({ isOver }) => isOver ? '100px' : 'auto'};
  border: ${({ theme, isOver, isValid }) =>
    isOver
      ? `2px dashed ${isValid ? theme.colors.success : theme.colors.error}`
      : 'none'};

  & > * {
    pointer-events: auto;
  }
`; 