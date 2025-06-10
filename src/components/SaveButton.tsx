import React from 'react';
import styled from 'styled-components';
import { SaveState } from '../types/routine';

const Button = styled.button<{ isDirty: boolean }>`
  background: ${({ theme, isDirty }) =>
    isDirty ? theme.colors.primary : theme.colors.disabled};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: ${({ isDirty }) => (isDirty ? 'pointer' : 'default')};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme, isDirty }) =>
      isDirty ? theme.colors.success : theme.colors.disabled};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SaveStatus = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ShortcutHint = styled.span`
  color: ${({ theme }) => theme.colors.background};
  opacity: 0.8;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  padding-left: ${({ theme }) => theme.spacing.sm};
  border-left: 1px solid ${({ theme }) => theme.colors.background};
`;

interface SaveButtonProps extends SaveState {
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  isDirty,
  isSaving,
  lastSaved,
  error,
  onSave
}) => {
  const formatLastSaved = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(date);
  };

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcutKey = isMac ? '⌘' : 'Ctrl';

  return (
    <Container>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : lastSaved ? (
        <SaveStatus>Last saved at {formatLastSaved(lastSaved)}</SaveStatus>
      ) : null}
      <Button
        onClick={onSave}
        disabled={!isDirty || isSaving}
        isDirty={isDirty}
        title={!isDirty ? 'No changes to save' : `${shortcutKey}+Enter to save`}
      >
        <span>{isSaving ? 'Saving...' : 'Save'}</span>
        {isDirty && !isSaving && (
          <ShortcutHint>{shortcutKey}+↵</ShortcutHint>
        )}
      </Button>
    </Container>
  );
};

export default SaveButton; 