import { useState, useEffect } from 'react';
import { Routine, SaveState } from '../types/routine';

interface UseSaveStateProps {
  routine: Routine;
  onRoutineChange: (routine: Routine) => void;
}

type UseSaveStateReturn = SaveState & {
  saveRoutine: () => void;
  loadRoutine: () => void;
};

export const useSaveState = ({
  routine,
  onRoutineChange
}: UseSaveStateProps): UseSaveStateReturn => {
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load routine from local storage on mount
  useEffect(() => {
    try {
      const savedRoutine = localStorage.getItem('workout-routine');
      if (savedRoutine) {
        onRoutineChange(JSON.parse(savedRoutine));
        setIsDirty(false);
      }
    } catch (err) {
      setError('Failed to load routine from local storage');
    }
  }, [onRoutineChange]);

  // Save routine to local storage
  const saveRoutine = () => {
    if (!isDirty) return;

    setIsSaving(true);
    setError(null);

    setTimeout(() => {
      try {
        localStorage.setItem('workout-routine', JSON.stringify(routine));
        setLastSaved(new Date());
        setIsDirty(false);
      } catch (err) {
        setError('Failed to save routine to local storage');
      } finally {
        setIsSaving(false);
      }
    }, 1000); // Simulate network delay
  };

  // Mark as dirty when routine changes
  useEffect(() => {
    setIsDirty(true);
  }, [routine]);

  // Add keyboard shortcut for saving
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        saveRoutine();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [routine]);

  return {
    isDirty,
    isSaving,
    lastSaved,
    error,
    saveRoutine,
    loadRoutine: () => {}
  };
}; 