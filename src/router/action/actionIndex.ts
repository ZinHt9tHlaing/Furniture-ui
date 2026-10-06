import AuthService from "@/features/api/auth.services";
import { AxiosError } from "axios";

// export const loginAction = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();

//   const authData = {
//     phone: formData.get("phone") as string,
//     password: formData.get("password") as string,
//   };

//   try {
//     const response = await AuthService.login(authData);

//     if (response.status !== 200) {
//       return { error: response.data || "Login failed!" };
//     }

//     const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";

//     return redirect(redirectTo);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       return error.response?.data || { error: "Login failed!" };
//     }
//     throw error;
//   }
// };

export const logoutAction = async () => {
  try {
    const response = await AuthService.logout();
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Logout failed!" };
    }
    throw error;
  }
};
