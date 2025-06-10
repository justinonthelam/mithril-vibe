export interface Exercise {
  id: string;
  name: string;
  order: number;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  order: number;
}

export interface Week {
  id: string;
  name: string;
  workouts: Workout[];
  order: number;
}

export interface Routine {
  id: string;
  name: string;
  weeks: Week[];
}

export interface DragItem {
  id: string;
  type: 'EXERCISE' | 'WORKOUT' | 'WEEK';
  index: number;
  parentId?: string;
}

export interface DragResult {
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
  type: string;
}

export interface SaveState {
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  error: string | null;
} 