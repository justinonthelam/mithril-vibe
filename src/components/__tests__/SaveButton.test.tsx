import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SaveButton from '../SaveButton';
import 'jest-styled-components';

describe('SaveButton', () => {
  const defaultProps = {
    onClick: jest.fn(),
    isSaving: false,
    hasUnsavedChanges: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render in saved state', () => {
    render(<SaveButton {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('Saved');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render in unsaved state', () => {
    render(<SaveButton {...defaultProps} hasUnsavedChanges={true} />);
    expect(screen.getByRole('button')).toHaveTextContent('Save Changes');
    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('should render in saving state', () => {
    render(<SaveButton {...defaultProps} isSaving={true} hasUnsavedChanges={true} />);
    expect(screen.getByRole('button')).toHaveTextContent('Saving...');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should call onClick when clicked with unsaved changes', () => {
    render(<SaveButton {...defaultProps} hasUnsavedChanges={true} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should not call onClick when clicked without unsaved changes', () => {
    render(<SaveButton {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when clicked while saving', () => {
    render(<SaveButton {...defaultProps} isSaving={true} hasUnsavedChanges={true} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('should handle Enter key press with unsaved changes', () => {
    render(<SaveButton {...defaultProps} hasUnsavedChanges={true} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should not handle Enter key press without unsaved changes', () => {
    render(<SaveButton {...defaultProps} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('should have correct enabled/disabled state', () => {
    const { rerender } = render(<SaveButton {...defaultProps} />);
    expect(screen.getByRole('button')).toBeDisabled();

    rerender(<SaveButton {...defaultProps} hasUnsavedChanges={true} />);
    expect(screen.getByRole('button')).toBeEnabled();

    rerender(<SaveButton {...defaultProps} isSaving={true} hasUnsavedChanges={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
}); 