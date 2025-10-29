import { z } from "zod";

export const SignupValidation = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, { message: "First name is too short." }),
    lastName: z.string().trim().min(2, { message: "Last name is too short." }),
    email: z.string().email({ message: "Invalid email." }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const SigninValidation = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z.string().min(6, { message: "Invalid password" }),
});

export const ForgotPasswordValidation = z.object({
  email: z.string().email({ message: "Invalid email." }),
});

export const ResetPasswordValidation = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
