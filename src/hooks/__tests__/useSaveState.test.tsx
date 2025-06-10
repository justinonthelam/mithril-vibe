import { renderHook, act } from '@testing-library/react';
import { useSaveState } from '../useSaveState';

const mockRoutine = {
  id: '1',
  title: 'Test Routine',
  weeks: [],
  hasUnsavedChanges: true
};

describe('useSaveState', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() =>
      useSaveState({
        routine: mockRoutine,
        onRoutineChange: jest.fn()
      })
    );

    expect(result.current.isSaving).toBe(false);
    expect(result.current.lastSaved).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should save routine to localStorage', async () => {
    const onRoutineChange = jest.fn();
    const { result } = renderHook(() =>
      useSaveState({
        routine: mockRoutine,
        onRoutineChange
      })
    );

    act(() => {
      result.current.saveRoutine();
    });

    expect(result.current.isSaving).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workout-routine',
      JSON.stringify(mockRoutine)
    );
    expect(result.current.isSaving).toBe(false);
    expect(result.current.lastSaved).toBeInstanceOf(Date);
    expect(onRoutineChange).toHaveBeenCalledWith({
      ...mockRoutine,
      hasUnsavedChanges: false
    });
  });

  it('should handle localStorage errors', async () => {
    const onRoutineChange = jest.fn();
    const setItemSpy = jest.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('Failed to save routine to local storage');
    });

    const { result } = renderHook(() =>
      useSaveState({
        routine: mockRoutine,
        onRoutineChange
      })
    );

    act(() => {
      result.current.saveRoutine();
    });

    expect(result.current.isSaving).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(setItemSpy).toHaveBeenCalledWith('workout-routine', JSON.stringify(mockRoutine));
    expect(result.current.error).toBe('Failed to save routine to local storage');
    expect(result.current.isSaving).toBe(false);
    expect(onRoutineChange).not.toHaveBeenCalled();

    setItemSpy.mockRestore();
  });

  it('should load routine from localStorage on mount', () => {
    const savedRoutine = {
      ...mockRoutine,
      title: 'Saved Routine'
    };
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(savedRoutine));

    const onRoutineChange = jest.fn();
    renderHook(() =>
      useSaveState({
        routine: mockRoutine,
        onRoutineChange
      })
    );

    expect(getItemSpy).toHaveBeenCalledWith('workout-routine');
    expect(onRoutineChange).toHaveBeenCalledWith({
      ...savedRoutine,
      hasUnsavedChanges: false
    });

    getItemSpy.mockRestore();
  });

  it('should handle keyboard shortcut', async () => {
    const { result } = renderHook(() =>
      useSaveState({
        routine: mockRoutine,
        onRoutineChange: jest.fn()
      })
    );

    act(() => {
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        metaKey: true
      });
      window.dispatchEvent(event);
    });

    expect(result.current.isSaving).toBe(true);
  });

  it('should not save if there are no unsaved changes', async () => {
    const onRoutineChange = jest.fn();
    const setItemSpy = jest.spyOn(localStorage, 'setItem');

    const { result } = renderHook(() =>
      useSaveState({
        routine: { ...mockRoutine, hasUnsavedChanges: false },
        onRoutineChange
      })
    );

    act(() => {
      result.current.saveRoutine();
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(setItemSpy).not.toHaveBeenCalled();
    expect(onRoutineChange).not.toHaveBeenCalled();

    setItemSpy.mockRestore();
  });
}); 