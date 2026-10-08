import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useChangeNameMutation } from "@/features/hooks/profile.queries";
import { updateNameSchema } from "@/schema/profileSchema";

interface NameUpdateFormProps {
  firstName: string;
  lastName: string;
}

type FormInput = z.infer<typeof updateNameSchema>;

const NameUpdateForm = ({ firstName, lastName }: NameUpdateFormProps) => {
  const { mutateAsync: changeName } = useChangeNameMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormInput>({
    resolver: zodResolver(updateNameSchema),
    values: {
      firstName,
      lastName,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    try {
      const res = await changeName(values);
      toast.success(res.message || "Profile name updated successfully");
      // Reset dirty state to current values so the button disables again
      reset(values);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || "Failed to update profile name";
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
        <CardTitle className="text-lg">Profile name</CardTitle>
        <CardDescription className="mb-3 text-xs">
          You can view or edit your profile name here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 md:w-2/3"
        >
          <FieldGroup>
            {/* First Name */}
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input
                {...register("firstName")}
                id="firstName"
                placeholder="Your first name"
                className="rounded-md border-2 border-gray-200 py-4.5 pr-10 text-sm"
              />
              {errors.firstName && <FieldError errors={[errors.firstName]} />}
            </Field>

            {/* Last Name */}
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                {...register("lastName")}
                id="lastName"
                placeholder="Your last name"
                className="rounded-md border-2 border-gray-200 py-4.5 pr-10 text-sm"
              />
              {errors.lastName && <FieldError errors={[errors.lastName]} />}
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="mb-9 flex cursor-pointer items-center gap-2 duration-150 active:ring-1 active:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin text-white" />
                <span>Updating...</span>
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

export default NameUpdateForm;
