import React, { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "cn";
import { Button } from "../ui/button";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleOnClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        ref={ref}
        className={cn("pr-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 h-full cursor-pointer px-3 py-1 duration-300 hover:bg-transparent disabled:cursor-not-allowed"
        onClick={handleOnClick}
        disabled={props.value === "" || props.disabled}
      >
        {showPassword ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOff className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Show password" : "Hide password"}
        </span>
      </Button>
    </div>
  );
});

export default PasswordInput;
