export type ExerciseWeightUnit = "kg" | "lb" | "lbs";
export type ExerciseRepsType = "reps" | "range";

export interface ExerciseNote {
  id?: string;
  text: string;
  createdAt?: string | Date;
}

export interface ExerciseSet {
  id: string;
  order: number;
  weight: number;
  reps: number;
  repsMin?: number;
  repsMax?: number;
  completed?: boolean;
  isRecord?: boolean;
  previousWeight?: number;
  previousReps?: number;
  weightUnit?: "kg" | "lbs";
  repsType?: ExerciseRepsType;
}

export interface ExerciseListItem {
  id: string;
  name: string;
  muscularGroup?: string;
  imageUrl?: string;
  giftUrl?: string;
  gifUrl?: string;
  equipments: string[];
  bodyParts: string[];
  targetMuscles: string[];
  secondaryMuscles?: string[];
  instructions: string[];
  exerciseType?: string;
  videoUrl?: string;
  keywords?: string[];
  overview?: string;
  exerciseTips?: string[];
  variations?: string[];
  relatedExerciseIds?: string[];
  order?: number;
  supersetWith?: string;
  notes?: ExerciseNote[];
  restSeconds?: string;
  sets?: ExerciseSet[];
  weightUnit?: "kg" | "lbs";
  repsType?: ExerciseRepsType;
}

export interface EquipmentItem {
  id: string;
  name: string;
  image?: string;
}

export interface MuscleItem {
  id: string;
  name: string;
  image?: string;
}

export interface ExerciseTypeItem {
  id: string;
  name: string;
  image?: string;
}

export interface CreateExerciseRequest {
  name: string;
  equipment: string;
  primaryMuscle: string;
  otherMuscles?: string[];
  type?: string;
  imageBase64?: string;
}

export interface SyncCatalogResponse {
  message: string;
  count: number;
}

export interface SearchExercisesQuery {
  name: string;
}

// Backward-compatible aliases (temporary during migration)
export type ExerciseListItemDto = ExerciseListItem;
export type ExerciseCatalogResponseDto = ExerciseListItem;
export type EquipmentDto = EquipmentItem;
export type MuscleDto = MuscleItem;
export type ExerciseTypeDto = ExerciseTypeItem;
export type CreateExerciseDto = CreateExerciseRequest;
