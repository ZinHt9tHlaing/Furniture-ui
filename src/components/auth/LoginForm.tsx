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
import { Link } from "react-router";
import { Icons } from "../Icons";

type formInput = z.infer<typeof loginSchema>;

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const form = useForm<formInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: formInput) => {
    console.log("data", data);
  };

  return (
    <div className={cn("mx-auto w-full max-w-sm py-5", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your phone number below to login to your account
          </CardDescription>
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
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline underline-offset-4"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      {...field}
                    />
                    {/* <PasswordInput
                      id="password"
                      aria-invalid={fieldState.invalid}
                      inputMode="numeric" // show numeric keyboard on mobile
                      placeholder="*********"
                      autoComplete="off"
                      {...field}
                    /> */}
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
                // disabled={isSubmitting}
                className="mt-4 w-full cursor-pointer duration-200 active:ring-1 active:ring-gray-500"
              >
                {/* {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    <span className="animate-pulse">Submitting...</span>
                  </>
                ) : (
                  "Sign In"
                              )} */}
                Sign In
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
