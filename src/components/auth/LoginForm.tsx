import { loginSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { Icons } from "../Icons";
import PasswordInput from "./password-input";
import { toast } from "sonner";
import { useLoginMutation } from "@/features/hooks/auth.queries";
import { AxiosError } from "axios";
import useAuthGuardStore from "@/store/auth/authGuardStore";

type formInput = z.infer<typeof loginSchema>;

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const navigate = useNavigate();
  const setUserInfo = useAuthGuardStore((state) => state.setUserInfo);

  const {
    mutateAsync: loginMutation,
    isPending,
    isError,
    error: loginError,
  } = useLoginMutation();

  // const isSubmitting = navigation.state === "submitting";

  const form = useForm<formInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: formInput) => {
    // submit(values, { method: "post", action: "/login" });
    await loginMutation(values, {
      onSuccess: (res) => {
        if (res?.userId) {
          setUserInfo({ userId: res.userId });
          form.reset();
          toast.success(res.message || "Logged in successfully");
          navigate("/", { replace: true });
        }
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const message =
            error.response?.data?.message || "Invalid credentials";
          console.error("login error : ", message);
          toast.error(message);
          return;
        }
        console.error("login error : ", error);
        toast.error(error.message);
      },
    });
  };

  return (
    <div className={cn("mx-auto w-full max-w-sm py-5", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your phone number below to login to your account
          </CardDescription>

          {/* Error message display */}
          {isError && (
            <p className="mt-2 rounded-md bg-red-50 p-2 text-center text-xs font-medium text-red-600">
              {loginError instanceof AxiosError
                ? loginError.response?.data?.message
                : loginError?.message}
            </p>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* phone */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      aria-invalid={fieldState.invalid}
                      placeholder="09********"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <PasswordInput
                      id="password"
                      aria-invalid={fieldState.invalid}
                      inputMode="numeric" // show numeric keyboard on mobile
                      // minLength={6}
                      // maxLength={6}
                      placeholder="*********"
                      autoComplete="off"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* confirm password */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <div className="flex items-center">
                      <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FieldLabel>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm hover:underline hover:underline-offset-4"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <PasswordInput
                      id="confirmPassword"
                      aria-invalid={fieldState.invalid}
                      inputMode="numeric" // show numeric keyboard on mobile
                      // minLength={6}
                      // maxLength={6}
                      placeholder="*********"
                      autoComplete="off"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="grid gap-4">
              <Button
                type="submit"
                disabled={isPending}
                className="mt-4 w-full cursor-pointer duration-200 active:ring-1 active:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    <span className="animate-pulse">Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <Button
                variant="outline"
                className="mb-2 flex w-full cursor-pointer items-center duration-200 active:ring-1 active:ring-gray-500"
              >
                <Icons.google />
                Continue with Google
              </Button>
            </div>
          </form>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold underline underline-offset-4"
            >
              Sign up
            </Link>
          </FieldDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
