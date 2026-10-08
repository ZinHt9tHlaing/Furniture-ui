import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "sonner";
import SuspenseFallback from "@/components/loading/SuspenseFallback";
import useAuthGuardStore from "@/store/auth/authGuardStore";

interface Props {
  children?: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const location = useLocation();

  const userInfo = useAuthGuardStore((state) => state.userInfo);
  const clearUserInfo = useAuthGuardStore((state) => state.clearUserInfo);
  const isAuthenticated = useAuthGuardStore((state) => state.isAuthenticated);

  // if user is not null, then user is authenticated is true (client side only)
  const isAuth = Boolean(userInfo && isAuthenticated);

  // Track if the user was authenticated when this component mounted
  const wasAuth = useRef(isAuth);

  useEffect(() => {
    if (!isAuth) {
      if (!wasAuth.current) {
        // Only show error toast if the user did NOT just log out
        toast.error("Please login to access this page", {
          id: "auth-guard-error",
        });
      }
      clearUserInfo();
    }
  }, [isAuth, clearUserInfo]);

  if (!isAuth) {
    return (
      <>
        <SuspenseFallback />
        <Navigate to="/login" state={{ from: location }} replace />
      </>
    );
  }

  return children ? <>{children}</> : <Outlet />;
};

export default AuthGuard;
