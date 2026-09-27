import { Link } from "react-router";
import type { User } from "@/types/user-type";
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

interface UserProps {
  user: User;
}

const AuthDropDown = ({ user }: UserProps) => {
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
          <Button variant="secondary" className={"size-8 rounded-full"} />
        }
      >
        <Avatar className={"size-8"}>
          <AvatarImage src={user.imageUrl} alt={user.username ?? ""} />
          <AvatarFallback>{initialName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-50"} align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-muted-foreground text-sm leading-none">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="group"
            render={
              <Link to="#">
                <Icons.dashboard
                  className="mr-2 size-4 transition-all duration-300 ease-in-out group-hover:scale-110"
                  aria-hidden="true"
                />
                Dashboard
                {/* <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut> */}
              </Link>
            }
          />
          <DropdownMenuItem
            render={
              <Link to="/account-setting/password-security">
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

        <DropdownMenuItem
          render={
            <Link to="/login" className="text-red-600">
              <Icons.exit
                className="mr-2 size-4 text-red-600 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-95"
                aria-hidden="true"
              />
              Log out
              {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
            </Link>
          }
          className="group"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthDropDown;
