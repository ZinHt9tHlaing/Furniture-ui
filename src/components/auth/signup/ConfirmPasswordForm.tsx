import { useState } from "react";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import PasswordInput from "../password-input";
import { confirmPasswordSchema } from "@/schema/authSchema";

type formSchema = z.infer<typeof confirmPasswordSchema>;

function ConfirmPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as {
    message?: string;
    error?: string;
  };

  const [clientError, setClientError] = useState<string | null>(null);

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<formSchema>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: formSchema) {
    if (values.password !== values.confirmPassword) {
      setClientError("Passwords do not match!");
      return;
    }
    setClientError(null);
    submit(values, { method: "post", action: "/register/confirm-password" });
  }

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              to="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
              </div>
              <span className="sr-only">Confirm Password</span>
            </Link>
            <h1 className="text-xl font-bold">Please confirm your password</h1>
            <div className="text-center text-sm">
              Passwords must be at least 6 characters and they
              must match.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
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

                {actionData && (
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-xs text-red-400">
                      {actionData?.message}
                    </p>
                    <Link
                      to="/register"
                      className="text-xs underline underline-offset-4 duration-300"
                    >
                      Go back to register
                    </Link>
                  </div>
                )}

                {clientError && (
                  <p className="text-xs text-red-400">{clientError}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full cursor-pointer duration-200 active:ring-1 active:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      <span className="animate-pulse">Submitting...</span>
                    </>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmPasswordForm;
