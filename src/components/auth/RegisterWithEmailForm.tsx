import { registerWithEmailSchema } from "@/schema/authSchema";
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

type formInput = z.infer<typeof registerWithEmailSchema>;

const RegisterWithEmailForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const form = useForm<formInput>({
    resolver: zodResolver(registerWithEmailSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
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
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your phone number below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
            <FieldGroup>
              {/* first name */}
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                    <Input
                      id="firstName"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="First Name"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* last name */}
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <Input
                      id="lastName"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Last Name"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Email"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* phone */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
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
                // disabled={isSubmitting}
                className="mt-4 w-full cursor-pointer duration-200 active:ring-1 active:ring-gray-500"
              >
                {/* {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    <span className="animate-pulse">Submitting...</span>
                  </>
                ) : (
                  "Sign Up"
                )} */}
                Sign Up
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline underline-offset-4"
            >
              Sign In
            </Link>
          </FieldDescription>
        </CardContent>
      </Card>
      <div className="text-muted-foreground hover:[&_a]:text-primary mt-8 text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default RegisterWithEmailForm;
