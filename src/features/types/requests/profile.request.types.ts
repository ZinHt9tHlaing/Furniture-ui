export interface ChangeNameRequest {
  firstName: string;
  lastName: string;
}

export interface ChangEmailRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
