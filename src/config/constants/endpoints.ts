const ProfileBase = "/user/profile";

export const publicAuthEndpoints = {
  login: "/login",
  register: "/register",
  verifyOtp: "/verify-otp",
  confirmPassword: "/confirm-password",
};

export const authEndpoints = {
  logout: "/logout",
  authCheck: "/auth-check",
};

export const profileEndpoints = {
  getUserInfo: `${ProfileBase}/get-user-info`,
  uploadProfile: `${ProfileBase}/upload`,
  getMyPhoto: `${ProfileBase}/my-photo`,
  changeName: `${ProfileBase}/change-name`,
  changeEmail: `${ProfileBase}/change-email`,
  changePassword: `${ProfileBase}/change-password`,
};

export const productEndpoints = {
  getProductsByPagination: "/users/infinite/products",
};
