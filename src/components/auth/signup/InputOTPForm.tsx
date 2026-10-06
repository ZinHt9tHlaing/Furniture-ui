import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { otpSchema } from "@/schema/authSchema";

type formSchema = z.infer<typeof otpSchema>;

function InputOTPForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as {
    message?: string;
    error?: string;
  };

  const submitting = navigation.state === "submitting";

  const form = useForm<formSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: formSchema) {
    submit(values, { method: "post", action: "/register/otp" });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link to="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
            </div>
            <span className="sr-only">OTP Verify Form</span>
          </Link>
          <h1 className="mb-6 text-xl font-bold">
            We've sent OTP to your phone.
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FieldGroup>
              {/* otp */}
              <Controller
                name="otp"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel htmlFor="otp">
                      OTP - One-Time Password
                    </FieldLabel>
                    <InputOTP
                      id="otp"
                      maxLength={6}
                      aria-invalid={fieldState.invalid}
                      {...field}

                      pattern={REGEXP_ONLY_DIGITS} // Only allow digits ( number 0-9 )
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <FieldDescription>
                      Please enter the one-time password sent to your phone.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {actionData && (
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="text-xs text-red-400">{actionData?.message}</p>
                <Link
                  to="/register"
                  className="text-xs underline underline-offset-4 duration-300"
                >
                  Go back to register
                </Link>
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="cursor-pointer duration-200 active:ring-2 active:ring-gray-500"
            >
              {submitting ? (
                <p className="animate-pulse">Verifying...</p>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputOTPForm;
