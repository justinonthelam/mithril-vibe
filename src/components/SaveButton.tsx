import React from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { Flex } from '../styles/components/Layout.styles';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndices.sticky};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
  }
`;

const Button = styled.button<{ hasChanges: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.touchTargets.button};
  height: ${({ theme }) => theme.touchTargets.button};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme, hasChanges }) => hasChanges ? theme.colors.primary : theme.colors.disabled};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: ${({ hasChanges }) => hasChanges ? 'pointer' : 'not-allowed'};
  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  &:hover {
    transform: ${({ hasChanges }) => hasChanges ? 'translateY(-2px)' : 'none'};
    box-shadow: ${({ theme, hasChanges }) => hasChanges ? theme.shadows.xl : theme.shadows.lg};
  }

  &:active {
    transform: ${({ hasChanges }) => hasChanges ? 'translateY(0)' : 'none'};
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.background};
  border-top-color: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  animation: ${spin} 0.8s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndices.tooltip};
`;

const Notification = styled.div<{ type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, type }) => type === 'success' ? theme.colors.success : theme.colors.error};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${fadeIn} 0.3s ease-out forwards, ${fadeOut} 0.3s ease-out forwards 2.7s;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: calc(100vw - ${({ theme }) => theme.spacing.xl} * 2);
  }
`;

const NotificationIcon = styled.span`
  margin-right: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
`;

interface SaveButtonProps {
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
  notification?: {
    type: 'success' | 'error';
    message: string;
  };
}

const SaveButton: React.FC<SaveButtonProps> = ({
  hasChanges,
  isSaving,
  onSave,
  notification
}) => {
  const theme = useTheme();

  return (
    <>
      <ButtonContainer>
        <Button
          hasChanges={hasChanges}
          onClick={hasChanges ? onSave : undefined}
          disabled={!hasChanges || isSaving}
          title={hasChanges ? 'Save changes (Enter)' : 'No changes to save'}
        >
          <Flex align="center" gap="sm">
            {isSaving && <LoadingSpinner />}
            {hasChanges ? 'Save Changes' : 'No Changes'}
          </Flex>
        </Button>
      </ButtonContainer>

      {notification && (
        <NotificationContainer>
          <Notification type={notification.type}>
            <NotificationIcon>
              {notification.type === 'success' ? '✓' : '✕'}
            </NotificationIcon>
            {notification.message}
          </Notification>
        </NotificationContainer>
      )}
    </>
  );
};

export default SaveButton; 