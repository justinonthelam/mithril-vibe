import React from 'react';
import styled from 'styled-components';

const SaveButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

interface ButtonProps {
  $hasUnsavedChanges: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${props => props.$hasUnsavedChanges ? '#36b37e' : '#dfe1e6'};
  color: ${props => props.$hasUnsavedChanges ? 'white' : '#42526e'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: ${props => props.$hasUnsavedChanges ? 'pointer' : 'default'};
  font-size: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.$hasUnsavedChanges ? '#2da066' : '#dfe1e6'};
  }
`;

interface SaveButtonProps {
  hasUnsavedChanges: boolean;
  onClick: () => void;
  isSaving: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  hasUnsavedChanges,
  onClick,
  isSaving
}) => {
  const handleClick = () => {
    if (hasUnsavedChanges && !isSaving) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && hasUnsavedChanges && !isSaving) {
      onClick();
    }
  };

  return (
    <SaveButtonContainer>
      <Button
        $hasUnsavedChanges={hasUnsavedChanges}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={!hasUnsavedChanges || isSaving}
      >
        {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
      </Button>
    </SaveButtonContainer>
  );
};

export default SaveButton; 