import AuthService from "@/features/api/auth.services";
import type {
  ConfirmPasswordRequest,
  VerifyOtpRequest,
} from "@/features/types/requests/auth.request.types";
import useRegisterAuthStore, {
  Status,
} from "@/store/auth/register/registerAuthStore";
import useAuthGuardStore from "@/store/auth/authGuardStore";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

// register
export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const store = useRegisterAuthStore.getState();

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData); // convert form data to object

  const authData = {
    phone: credentials.phone as string,
  };

  try {
    const response = await AuthService.register(authData);

    if (response.status !== 200) {
      return { error: response.data || "Sending OTP failed!" };
    }

    // client state management
    store.setAuth(response.data.phone, response.data.token, Status.otp);
    toast.success(response.data.message || "OTP is successfully sent.");

    return redirect("/register/otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Sending OTP failed!" };
    }
    throw error;
  }
};

// otp
export const otpAction = async ({ request }: ActionFunctionArgs) => {
  const store = useRegisterAuthStore.getState();
  const formData = await request.formData();

  const credentials: VerifyOtpRequest = {
    phone: store.phone as string,
    otp: formData.get("otp") as string,
    token: store.token as string,
  };

  try {
    const response = await AuthService.verifyOtp(credentials);

    if (response.status !== 200) {
      return { error: response.data || "Verifying OTP failed!" };
    }

    // client state management
    store.setAuth(response.data.phone, response.data.token, Status.confirm);
    toast.success(response.data.message || "OTP is successfully verified.");

    return redirect("/register/confirm-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Verifying OTP failed!" };
    }
    throw error;
  }
};

// confirm password
export const confirmPasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const store = useRegisterAuthStore.getState();
  const authGuardStore = useAuthGuardStore.getState();

  const formData = await request.formData();

  const credentials: ConfirmPasswordRequest = {
    phone: store.phone as string,
    password: formData.get("password") as string,
    token: store.token as string,
  };

  try {
    const response = await AuthService.confirmPassword(credentials);

    if (response.status !== 201) {
      return { error: response.data || "Registration failed!" };
    }

    // client state management
    store.clearAuth();
    authGuardStore.setUserInfo({ userId: response.data.userId });
    toast.success(
      response.data.message || "Your account is successfully created."
    );

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Registration failed!" };
    }
    throw error;
  }
};
