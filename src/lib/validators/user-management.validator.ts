import { z } from "zod";
import { Role } from "../enums/role.enum";

export const CreateUserValidation = z.object({
  firstName: z.string().trim().min(2, { message: "First name is too short." }),
  lastName: z.string().trim().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Enter a valid email." }),
  role: z.nativeEnum(Role),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const UpdateUserValidation = z.object({
  id: z.string().min(1, { message: "Invalid ID." }),
  firstName: z.string().trim().min(2, { message: "First name is too short." }),
  lastName: z.string().trim().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Enter a valid email." }),
  role: z.nativeEnum(Role),
});

export const GetUserValidation = z.object({
  id: z.string().min(1, { message: "Invalid ID." }),
  firstName: z.string().trim().min(2, { message: "First name is too short." }),
  lastName: z.string().trim().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Enter a valid email." }),
  role: z.nativeEnum(Role),
});
