import React from 'react';
import styled from 'styled-components';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

const HandleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: grab;
  color: #6b778c;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f4f5f7;
    color: #172b4d;
  }

  &:active {
    cursor: grabbing;
    background-color: #ebecf0;
  }

  @media (max-width: 767px) {
    width: 32px;
    height: 32px;
  }
`;

const DragIcon = styled.svg`
  width: 16px;
  height: 16px;

  @media (max-width: 767px) {
    width: 20px;
    height: 20px;
  }
`;

interface DragHandleProps {
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

const DragHandle: React.FC<DragHandleProps> = ({ dragHandleProps }) => {
  return (
    <HandleContainer {...dragHandleProps}>
      <DragIcon
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 6H16M8 12H16M8 18H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </DragIcon>
    </HandleContainer>
  );
};

export default DragHandle; 