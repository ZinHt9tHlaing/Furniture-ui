import { Link, useNavigate } from "react-router";
// import type { User } from "@/types/user-type";
import { Icons } from "@/components/Icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLogoutMutation } from "@/features/hooks/auth.queries";
import { AxiosError } from "axios";
import useAuthGuardStore from "@/store/auth/authGuardStore";
import type { GetUserInfoResponse } from "@/features/types/responses/profile.response.types";
import { UserRole } from "@/types/enum";

interface UserProps {
  user: GetUserInfoResponse["userInfo"] | undefined;
  isLoading?: boolean;
}

const AuthDropDown = ({ user, isLoading }: UserProps) => {
  const navigate = useNavigate();
  const clearUserInfo = useAuthGuardStore((state) => state.clearUserInfo);
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

  if (isLoading) {
    return (
      <Avatar className="relative size-8">
        <Loader2 className="size-5 text-gray-300 dark:text-gray-600  animate-spin top-1.5 left-1.5 absolute rounded-full" />
      </Avatar>
    );
  }

  const logoutHandler = () => {
    logout(undefined, {
      onSuccess: () => {
        clearUserInfo();
        toast.success("Logout successful");
        navigate("/login", { replace: true });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.error("logout error : ", error.response?.data?.message);
          toast.error(error.response?.data?.message);
          return;
        }
        console.error("logout error : ", error);
        toast.error(error.message);
      },
    });
  };

  if (!user) {
    return (
      <Button size={"sm"}>
        <Link to="/signin">
          Sign In
          <span className="sr-only">Sign in</span>
        </Link>
      </Button>
    );
  }

  const initialName = `${user.firstName.charAt(0) ?? ""}${user.lastName.charAt(0) ?? ""}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="secondary"
            disabled={isLoggingOut}
            className="relative size-8 rounded-full disabled:cursor-not-allowed disabled:opacity-60"
          />
        }
      >
        <Avatar className={"size-8"}>
          <AvatarImage
            src={user.image?.image_url ?? ""}
            alt={user.fullName ?? ""}
          />
         <AvatarFallback delay={600}>{initialName}</AvatarFallback>
        </Avatar>

        {/* loading state */}
        {isLoggingOut && (
          <div className="bg-background/80 absolute flex size-8 items-center justify-center rounded-full backdrop-blur-xs">
            <Loader2 className="text-primary size-5 animate-spin" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-50"} align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-muted-foreground text-xs leading-none">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Dashboard */}
          {(user.role === UserRole.ADMIN || user.role === UserRole.AUTHOR) && (
            <DropdownMenuItem
              className="group"
              render={
                <a
                  href={
                    user.role === UserRole.ADMIN ||
                    user.role === UserRole.AUTHOR
                      ? "http://127.0.0.1:8000/dashboard"
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.dashboard
                    className="mr-2 size-4 transition-all duration-300 ease-in-out group-hover:scale-110"
                    aria-hidden="true"
                  />
                  Dashboard
                  {/* <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut> */}
                </a>
              }
            />
          )}

          {/* Settings */}
          <DropdownMenuItem
            render={
              <Link to="/account-setting">
                <Icons.gear
                  className="mr-2 size-4 transition-all duration-300 ease-in-out group-hover:rotate-90"
                  aria-hidden="true"
                />
                Settings
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </Link>
            }
            className="group"
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Log out */}
        <DropdownMenuItem
          variant="destructive"
          disabled={isLoggingOut}
          onClick={logoutHandler}
          className="group flex cursor-pointer gap-4 focus:bg-red-500 focus:text-red-100 dark:focus:bg-red-600"
        >
          {isLoggingOut ? (
            <>
              <Loader2
                className="size-4 animate-spin text-red-600 transition-all duration-200 ease-in-out group-hover:translate-x-1 group-hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-500"
                aria-hidden="true"
              />
              <span className="text-red-600 dark:text-red-500">
                Logging out...
              </span>
            </>
          ) : (
            <>
              <Icons.exit
                className="size-4 text-red-600 transition-all duration-200 ease-in-out group-hover:translate-x-1 group-hover:scale-95 dark:text-red-500"
                aria-hidden="true"
              />
              <span className="text-red-600 dark:text-red-500">Log out</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthDropDown;
