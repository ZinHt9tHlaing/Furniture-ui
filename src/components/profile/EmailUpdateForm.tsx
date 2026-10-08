"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateEmailSchema } from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useChangEmailMutation } from "@/features/hooks/profile.queries";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface EmailUpdateFormProps {
  email: string;
}

type FormInput = z.infer<typeof updateEmailSchema>;

const EmailUpdateForm = ({ email }: EmailUpdateFormProps) => {
  const { mutateAsync: changeEmail } = useChangEmailMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormInput>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    try {
      const res = await changeEmail(values);
      toast.success(res.message || "Email updated successfully");
      reset(values);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || "Failed to update profile email";
        console.error("Profile update error:", message);
        toast.error(message);
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Email address</CardTitle>
        <CardDescription className="mb-3 text-xs">
          You can view or edit your email address here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 md:w-2/3"
        >
          <FieldGroup>
            {/* email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                placeholder="example@eshop.com"
                className="rounded-md border-2 border-gray-200 py-4.5 pr-10 text-sm"
              />
              {errors.email && <FieldError errors={[errors.email]} />}
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="mb-9 cursor-pointer duration-150 active:ring-1 active:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin text-white" />
                <span className="animate-pulse">Updating...</span>
              </>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailUpdateForm;
