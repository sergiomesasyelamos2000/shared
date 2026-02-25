import { EntityTimestamps } from "./common";

export type SetType = "warmup" | "normal" | "failed" | "drop";

export interface SetRequest {
  id: string;
  order: number;
  weight: number;
  reps: number;
  assistedReps?: number;
  setType?: SetType;
  repsMin?: number;
  repsMax?: number;
  completed?: boolean;
  isRecord?: boolean;
  previousWeight?: number;
  previousReps?: number;
  weightUnit?: "kg" | "lbs";
  repsType?: "reps" | "range";
}

export interface ExerciseRequest {
  id: string;
  name: string;
  muscularGroup?: string;
  imageUrl?: string;
  giftUrl?: string;
  sets?: SetRequest[];
  notes?: Array<{ id?: string; text: string; createdAt?: string | Date }>;
  restSeconds?: string;
  weightUnit?: "kg" | "lbs";
  repsType?: "reps" | "range";
  supersetWith?: string;
  order?: number;
}

export interface RoutineRequest {
  id?: string;
  title: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  exercises?: ExerciseRequest[];
}

export interface RoutineExerciseResponse {
  id: string;
  exercise: ExerciseRequest;
  sets: SetRequest[];
  notes?: Array<{ id: string; text: string; createdAt: string | Date }>;
  restSeconds?: string;
  weightUnit?: "kg" | "lbs";
  repsType?: "reps" | "range";
  order?: number;
  supersetWith?: string | null;
}

export interface RoutineResponse extends EntityTimestamps {
  id: string;
  userId?: string;
  title: string;
  createdAt: string | Date;
  totalSets?: number;
  totalExercises?: number;
  isPublic?: boolean;
  routineExercises?: RoutineExerciseResponse[];
  _isPending?: boolean;
}

export interface RoutineSessionExercise {
  exerciseId: string;
  name: string;
  imageUrl?: string;
  giftUrl?: string;
  sets: Array<{
    weight: number;
    reps: number;
    completed: boolean;
    isRecord?: boolean;
    setType?: SetType;
  }>;
}

export interface RoutineSession {
  id: string;
  routineId?: string;
  routine?: {
    id: string;
    title: string;
  };
  exercises: RoutineSessionExercise[];
  totalTime: number;
  totalWeight: number;
  completedSets: number;
  createdAt: string | Date;
  _isPending?: boolean;
}

export interface RoutineHealthResponse {
  message: string;
  timestamp: string;
}

export interface RoutineSessionRequest {
  routineId?: string;
  totalTime: number;
  totalWeight: number;
  completedSets: number;
  exercises?: Array<{
    exerciseId: string;
    exerciseName?: string;
    name?: string;
    imageUrl?: string;
    giftUrl?: string;
    totalWeight?: number;
    totalReps?: number;
    sets: Array<{
      weight: number;
      reps: number;
      completed: boolean;
      isRecord?: boolean;
      setType?: SetType;
    }>;
  }>;
}

export interface GlobalRoutineStats {
  totalTime: number;
  totalWeight: number;
  completedSets: number;
  totalDuration?: number;
  totalVolume?: number;
  totalSessions?: number;
}

// Backward-compatible aliases (temporary during migration)
export type SetRequestDto = SetRequest;
export type SetResponseDto = SetRequest;
export type ExerciseRequestDto = ExerciseRequest;
export type RoutineRequestDto = RoutineRequest;
export type RoutineResponseDto = RoutineResponse;
export type RoutineExerciseResponseDto = RoutineExerciseResponse;
export type RoutineSessionEntity = RoutineSession;
export type RoutineSessionRequestDto = RoutineSessionRequest;
export type RoutineHealthResponseDto = RoutineHealthResponse;
