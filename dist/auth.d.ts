import { EntityTimestamps } from "./common";
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
}
export interface UserResponse extends EntityTimestamps {
    id: string;
    email: string;
    name: string;
    picture?: string;
    googleId?: string;
    appleId?: string;
}
export interface AuthResponse {
    user: UserResponse;
    tokens: AuthTokens;
}
export interface AuthMessageResponse {
    message: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}
export interface RefreshTokenRequest {
    refreshToken: string;
}
export interface ForgotPasswordRequest {
    email: string;
}
export interface ForgotPasswordResponse {
    message: string;
}
export interface ResetPasswordRequest {
    email: string;
    code: string;
    newPassword: string;
}
export interface UpdateUserProfileRequest {
    name?: string;
    email?: string;
    picture?: string;
}
export interface GoogleLoginRequest {
    idToken: string;
    token?: string;
    email?: string;
    name?: string;
    picture?: string;
}
export interface GoogleAuthUserInfo {
    id: string;
    email: string;
    name: string;
    picture?: string;
}
export interface GoogleAuthCallbackRequest {
    accessToken: string;
    userInfo: GoogleAuthUserInfo;
}
export interface OAuthLoginResponse {
    accessToken: string;
    user: UserResponse;
}
export interface ResetPasswordResponse {
    message: string;
}
export interface LogoutResponse {
    message: string;
}
export interface UserContext {
    id: string;
    email: string;
    name: string;
}
export type AuthResponseDto = AuthResponse;
export type UserResponseDto = UserResponse;
export type AuthTokensDto = AuthTokens;
export type LoginRequestDto = LoginRequest;
export type RegisterRequestDto = RegisterRequest;
export type RefreshTokenRequestDto = RefreshTokenRequest;
export type ForgotPasswordRequestDto = ForgotPasswordRequest;
export type ForgotPasswordResponseDto = ForgotPasswordResponse;
export type ResetPasswordRequestDto = ResetPasswordRequest;
export type UpdateUserProfileDto = UpdateUserProfileRequest;
export type GoogleAuthRequestDto = GoogleAuthCallbackRequest;
export type GoogleLoginRequestDto = GoogleLoginRequest;
export type OAuthLoginResponseDto = OAuthLoginResponse;
export type AuthMessageResponseDto = AuthMessageResponse;
export type ResetPasswordResponseDto = ResetPasswordResponse;
export type LogoutResponseDto = LogoutResponse;
//# sourceMappingURL=auth.d.ts.map