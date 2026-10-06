import { Navigate, Outlet } from "react-router";
import SuspenseFallback from "@/components/loading/SuspenseFallback";
import useAuthGuardStore from "@/store/auth/authGuardStore";

interface Props {
  children?: React.ReactNode;
}

const GuestGuard = ({ children }: Props) => {
  const userInfo = useAuthGuardStore((state) => state.userInfo);
  const isAuthenticated = useAuthGuardStore((state) => state.isAuthenticated);

  const isAuth = Boolean(userInfo && isAuthenticated);

  if (isAuth) {
    return (
      <>
        <SuspenseFallback />
        <Navigate to="/" replace />
      </>
    );
  }

  return children ? <>{children}</> : <Outlet />;
};

export default GuestGuard;
