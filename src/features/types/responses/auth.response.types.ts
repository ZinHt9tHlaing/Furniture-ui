import type { BaseMessageResponse } from "./base.response";

export interface LoginResponse extends BaseMessageResponse {
  userId: string;
}

export interface RegisterResponse extends BaseMessageResponse {
  phone: string;
  token: string;
}

export type LogoutResponse = BaseMessageResponse;

export interface AuthCheckResponse extends BaseMessageResponse {
  userId: string;
  fullName: string;
}

export interface VerifyOtpResponse extends BaseMessageResponse {
  phone: string;
  token: string;
}

export interface ConfirmPasswordResponse extends BaseMessageResponse {
  userId: string;
}
