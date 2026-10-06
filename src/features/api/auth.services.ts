import publicApiClient from "@/api/clients/publicClient";
import type {
  ConfirmPasswordRequest,
  LoginRequest,
  RegisterRequest,
  VerifyOtpRequest,
} from "../types/requests/auth.request.types";
import {
  authEndpoints,
  publicAuthEndpoints,
} from "@/config/constants/endpoints";
import type {
  AuthCheckResponse,
  ConfirmPasswordResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  VerifyOtpResponse,
} from "../types/responses/auth.response.types";
import authApiClient from "@/api/clients/authClient";

const AuthService = {
  login: async (request: LoginRequest) => {
    const response = await publicApiClient.post<LoginResponse>(
      publicAuthEndpoints.login,
      request
    );

    return response.data;
  },

  register: async (request: RegisterRequest) => {
    const response = await publicApiClient.post<RegisterResponse>(
      publicAuthEndpoints.register,
      request
    );

    return response;
  },

  verifyOtp: async (request: VerifyOtpRequest) => {
    const response = await publicApiClient.post<VerifyOtpResponse>(
      publicAuthEndpoints.verifyOtp,
      request
    );

    return response;
  },

  confirmPassword: async (request: ConfirmPasswordRequest) => {
    const response = await publicApiClient.post<ConfirmPasswordResponse>(
      publicAuthEndpoints.confirmPassword,
      request
    );

    return response;
  },

  logout: async () => {
    const response = await authApiClient.post<LogoutResponse>(
      authEndpoints.logout
    );
    return response.data;
  },

  authCheck: async () => {
    const response = await publicApiClient.get<AuthCheckResponse>(
      authEndpoints.authCheck
    );
    // return response.data;
    return response;
  },
};

export default AuthService;
