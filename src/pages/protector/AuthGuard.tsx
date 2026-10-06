import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import SuspenseFallback from "@/components/loading/SuspenseFallback";
import useAuthGuardStore from "@/store/auth/authGuardStore";
import { useAuthCheckQuery, userQueryKeys } from "@/features/hooks/auth.queries";

interface Props {
  children?: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const userInfo = useAuthGuardStore((state) => state.userInfo);
  const clearUserInfo = useAuthGuardStore((state) => state.clearUserInfo);
  const isAuthenticated = useAuthGuardStore((state) => state.isAuthenticated);

  // if user is not null, then user is authenticated is true (client side only)
  const hasLocalAuth = Boolean(userInfo && isAuthenticated);

  // Track if the user was authenticated when this component mounted
  const wasAuth = useRef(hasLocalAuth);

  // Verify with the server (user may be deleted / session expired / cookie removed)
  const { isPending, isError } = useAuthCheckQuery(hasLocalAuth);

  const isAuth = hasLocalAuth && !isError;

  useEffect(() => {
    if (!isAuth) {
      if (isError) {
        toast.error("Your session has expired. Please login again.", {
          id: "auth-guard-error",
        });
      } else if (!wasAuth.current) {
        // Only show error toast if the user did NOT just log out
        toast.error("Please login to access this page", {
          id: "auth-guard-error",
        });
      }
      clearUserInfo();
      // remove cached error so the next login is not kicked out immediately
      queryClient.removeQueries({ queryKey: userQueryKeys.authCheck });
    }
  }, [isAuth, isError, clearUserInfo, queryClient]);

  if (!isAuth) {
    return (
      <>
        <SuspenseFallback />
        <Navigate to="/login" state={{ from: location }} replace />
      </>
    );
  }

  // waiting for server verification
  if (isPending) {
    return <SuspenseFallback />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default AuthGuard;
