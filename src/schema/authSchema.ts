import z from "zod";

export const loginSchema = z
  .object({
    phone: z
      .string()
      .min(1, "Phone number is required.")
      .min(7, "Phone number is too short.")
      .max(12, "Phone number is too long.")
      .regex(/^\d+$/, "Phone number must be numbers."),
    password: z
      .string()
      .min(6, "Password must be 6 characters.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Password must contain only letters and numbers."
      ),
    confirmPassword: z
      .string()
      .min(6, "Password must be 6 characters.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Password must contain only letters and numbers."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const registerWithEmailSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "First name is required!" })
    .min(3, { message: "First name must be at least 3 characters long!" }),
  lastName: z
    .string()
    .nonempty({ message: "Last name is required!" })
    .min(3, { message: "Last name must be at least 3 characters long!" }),
  email: z
    .email({ message: "Please enter a valid email!" })
    .nonempty({ message: "Email is required!" })
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Only Gmail addresses are allowed",
    }),
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .min(7, "Phone number is too short.")
    .max(12, "Phone number is too long.")
    .regex(/^\d+$/, "Phone number must be numbers."),
  password: z
    .string()
    .min(6, "Password must be 6 digits.")
    .min(6, "Password must be 6 digits."),
  // .regex(/^\d+$/, "Password must be numbers."),
});

export const registerWithPhoneSchema = z
  .object({
    phone: z
      .string()
      .min(1, "Phone number is required.")
      .min(7, "Phone number is too short.")
      .max(12, "Phone number is too long.")
      .regex(/^\d+$/, "Phone number must be numbers."),
    password: z
      .string()
      .min(6, "Password must be 6 digits.")
      .min(6, "Password must be 6 digits."),
    // .regex(/^\d+$/, "Password must be numbers."),
    confirmPassword: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be 6 digits."),
    // .regex(/^\d+$/, "Password must be numbers."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const registerSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .min(7, "Phone number is too short.")
    .max(12, "Phone number is too long.")
    .regex(/^\d+$/, "Phone number must be numbers."),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Your one-time password must be 6 characters.")
    .regex(/^\d+$/, "Password must be numbers."),
});

export const confirmPasswordSchema = z
  .object({
    password: z
      .string()
      // .length(6, "Password must be 6 characters.") // cleaner than .min(6).max(6)
      .min(6, "Password must be 6 characters.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Password must contain only letters and numbers."
      ),
    confirmPassword: z
      .string()
      .min(6, "Password must be 6 characters.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Confirm Password must contain only letters and numbers."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });
