import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Title = styled.h1<{ isEditing: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin: 0;
  padding: ${({ theme }) => theme.spacing.xs};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, isEditing }) =>
      isEditing ? 'transparent' : theme.colors.surface};
  }
`;

const TitleInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  outline: none;
  font-family: inherit;

  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

interface EditableTitleProps {
  value: string;
  onChange: (value: string) => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() !== '') {
      onChange(editValue);
    } else {
      setEditValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  return (
    <TitleContainer>
      <Title isEditing={isEditing} onClick={handleClick}>
        {value}
      </Title>
      {isEditing && (
        <TitleInput
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      )}
    </TitleContainer>
  );
};

export default EditableTitle; 