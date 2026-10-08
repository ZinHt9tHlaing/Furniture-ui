import z from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be 6 characters.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Current password must contain only letters and numbers."
      ),
    newPassword: z
      .string()
      .min(6, "New password must be 6 characters.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "New password must contain only letters and numbers."
      ),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be 6 characters.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Confirm Password must contain only letters and numbers."
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const updateEmailSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email!" })
    .nonempty({ message: "Email is required!" })
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Only Gmail addresses are allowed",
    }),
});

export const updateNameSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "First name is required!" })
    .min(3, { message: "First name must be at least 3 characters long!" }),
  lastName: z
    .string()
    .nonempty({ message: "Last name is required!" })
    .min(3, { message: "Last name must be at least 3 characters long!" }),
});
