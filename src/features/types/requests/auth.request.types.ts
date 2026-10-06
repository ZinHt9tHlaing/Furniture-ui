export interface RegisterRequest {
  phone: string;
}

export interface LoginRequest extends RegisterRequest {
  password: string;
}

export interface VerifyOtpRequest extends RegisterRequest {
  otp: string;
  token: string;
}

export interface ConfirmPasswordRequest extends RegisterRequest {
  password: string;
  token: string;
}


