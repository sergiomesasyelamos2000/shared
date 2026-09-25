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
    notes?: Array<{
        id?: string;
        text: string;
        createdAt?: string | Date;
    }>;
    restSeconds?: string;
    weightUnit?: "kg" | "lbs";
    repsType?: "reps" | "range";
    supersetWith?: string;
    order?: number;
    videoUrl?: string;
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
    notes?: Array<{
        id: string;
        text: string;
        createdAt: string | Date;
    }>;
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
    sortOrder?: number;
    /** Present when the routine belongs to a folder; null/undefined = root. */
    folderId?: string | null;
    totalSets?: number;
    totalExercises?: number;
    isPublic?: boolean;
    routineExercises?: RoutineExerciseResponse[];
    _isPending?: boolean;
}
export type RoutineLayoutItemType = "routine" | "folder";
export interface RoutineLayoutItem {
    type: RoutineLayoutItemType;
    id: string;
}
export interface RoutineFolderLayoutEntry {
    id: string;
    title: string;
    routineIds: string[];
}
export interface RoutineLayoutRequest {
    rootOrder: RoutineLayoutItem[];
    folders: RoutineFolderLayoutEntry[];
}
export interface RoutineFolderResponse extends EntityTimestamps {
    id: string;
    title: string;
    sortOrder: number;
    routineIds: string[];
}
export interface CreateRoutineFolderRequest {
    title: string;
}
export interface RenameRoutineFolderRequest {
    title: string;
}
export interface RoutineSessionExercise {
    exerciseId: string;
    name: string;
    imageUrl?: string;
    giftUrl?: string;
    restSeconds?: string;
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
    /** Average heart rate (bpm) during the session, if available. */
    avgHeartRate?: number | null;
    /** Peak heart rate (bpm) during the session, if available. */
    maxHeartRate?: number | null;
    /** Active calories burned during the session (kcal). */
    caloriesBurned?: number | null;
    /** Where calories/HR came from: healthkit | health_connect | met_estimate */
    healthMetricsSource?: string | null;
    createdAt: string | Date;
    _isPending?: boolean;
}
/** Lightweight session row for macros burn / TDEE suggestion (no exercises payload). */
export interface RoutineSessionBurnSummary {
    id: string;
    createdAt: string | Date;
    caloriesBurned?: number | null;
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
    avgHeartRate?: number | null;
    maxHeartRate?: number | null;
    caloriesBurned?: number | null;
    healthMetricsSource?: string | null;
    exercises?: Array<{
        exerciseId: string;
        exerciseName?: string;
        name?: string;
        imageUrl?: string;
        giftUrl?: string;
        restSeconds?: string;
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
export type SetRequestDto = SetRequest;
export type SetResponseDto = SetRequest;
export type ExerciseRequestDto = ExerciseRequest;
export type RoutineRequestDto = RoutineRequest;
export type RoutineResponseDto = RoutineResponse;
export type RoutineExerciseResponseDto = RoutineExerciseResponse;
export type RoutineSessionEntity = RoutineSession;
export type RoutineSessionRequestDto = RoutineSessionRequest;
export type RoutineHealthResponseDto = RoutineHealthResponse;
export type RoutineFolderResponseDto = RoutineFolderResponse;
export type RoutineLayoutRequestDto = RoutineLayoutRequest;
export type CreateRoutineFolderRequestDto = CreateRoutineFolderRequest;
export type RenameRoutineFolderRequestDto = RenameRoutineFolderRequest;
//# sourceMappingURL=routine.d.ts.map