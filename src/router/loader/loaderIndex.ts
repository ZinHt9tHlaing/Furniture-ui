import authApiClient from "@/api/clients/authClient";
import { productEndpoints } from "@/config/constants/endpoints";
import AuthService from "@/features/api/auth.services";
import useRegisterAuthStore, {
  Status,
} from "@/store/auth/register/registerAuthStore";
import { redirect } from "react-router";

export const homeLoader = async () => {
  try {
    const response = await authApiClient.get(
      productEndpoints.getProductsByPagination
    );
    return response.data;
  } catch (error) {
    console.log("HomeLoader error: ", error);
  }
};

export const loginLoader = async () => {
  try {
    const response = await AuthService.authCheck();
    if (response.status !== 200) {
      return null;
    }
    return redirect("/");
  } catch (error) {
    console.log("LoginLoader error: ", error);
    return null;
  }
};

export const otpLoader = async () => {
  const store = useRegisterAuthStore.getState();

  if (store.status !== Status.otp) {
    return redirect("/register");
  }

  return null;
};

export const confirmPasswordLoader = async () => {
  const store = useRegisterAuthStore.getState();

  if (store.status !== Status.confirm) {
    return redirect("/register");
  }

  return null;
};
