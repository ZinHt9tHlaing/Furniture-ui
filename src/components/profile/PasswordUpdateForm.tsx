import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../auth/password-input";
import { Button } from "../ui/button";
import { updatePasswordSchema } from "@/schema/profileSchema";
import { useChangePasswordMutation } from "@/features/hooks/profile.queries";
import { toast } from "sonner";
import { AxiosError } from "axios";

type FormInput = z.infer<typeof updatePasswordSchema>;

const PasswordUpdateForm = () => {
  const { mutateAsync: changePassword } = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormInput) => {
    try {
      const res = await changePassword(values);
      toast.success(res.message || "Successfully changed password");
      reset(values);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || "Failed to update profile password";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex flex-col gap-6">
        <FieldGroup>
          {/* current password */}
          <Field className="space-y-1">
            <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
            <PasswordInput
              id="currentPassword"
              inputMode="numeric" // show numeric keyboard on mobile
              // minLength={6}
              // maxLength={6}
              placeholder="*********"
              autoComplete="off"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <FieldError errors={[errors.currentPassword]} />
            )}
          </Field>

          {/* new password */}
          <Field className="space-y-1">
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
            <PasswordInput
              id="newPassword"
              inputMode="numeric" // show numeric keyboard on mobile
              // minLength={6}
              // maxLength={6}
              placeholder="*********"
              autoComplete="off"
              {...register("newPassword")}
            />
            {errors.newPassword && <FieldError errors={[errors.newPassword]} />}
          </Field>

          {/* confirm password */}
          <Field className="space-y-1">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <PasswordInput
              id="confirmPassword"
              inputMode="numeric" // show numeric keyboard on mobile
              // minLength={6}
              // maxLength={6}
              placeholder="*********"
              autoComplete="off"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <FieldError errors={[errors.confirmPassword]} />
            )}
          </Field>
        </FieldGroup>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="h-10 cursor-pointer bg-gray-900 px-6 py-2 font-semibold text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200/90"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              <span className="animate-pulse">Updating...</span>
            </>
          ) : (
            "Update password"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-10 cursor-pointer border-gray-300 px-6 py-2 font-semibold dark:border-gray-500"
          onClick={() => {
            reset(() => ({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }));
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PasswordUpdateForm;
