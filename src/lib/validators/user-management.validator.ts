import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";
import { phoneRegex } from "./onboarding.validator";
import { z } from "zod";

export const CreateUserValidation = z.object({
  firstName: z.string().trim().min(2, { message: "First name is too short." }),
  lastName: z.string().trim().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Enter a valid email." }),
  role: z.nativeEnum(Role),
  password: z.string().min(6, { message: "Password must be at least 6 characters." })
});

export const UpdateUserValidation = z.object({
  id: z.string().min(1, { message: "Invalid ID." }),
  firstName: z.string().trim().min(2, { message: "First name is too short." }),
  lastName: z.string().trim().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Enter a valid email." }),
  // phone: z.string().regex(phoneRegex, "Invalid Number").optional(),
  // gender: z.nativeEnum(Gender).optional(),
  role: z.nativeEnum(Role),
  // password: z.string().min(6, { message: "Password must be at least 6 characters." })
});

export const GetUserValidation = z.object({
  id: z.string().min(1, { message: "Invalid ID." }),
  firstName: z.string().trim().min(2, { message: "First name is too short." }),
  lastName: z.string().trim().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Enter a valid email." }),
  role: z.nativeEnum(Role),
  // password: z.string().min(6, { message: "Password must be at least 6 characters." })
})

export const CreateGroupValidation = z.object({
  groupName: z.string().trim().min(2, { message: "Group name is too short." }),
  groupType: z.string().min(1, { message: "Select a Group Type" }),
  groupLeader: z.string().min(1, { message: "Select a Group Leader" }),
  groupMembers: z.array(z.string()).min(1, { message: 'Select at least one member' })
});

export const UpdateGroupValidation = z.object({
  id: z.string().min(1, { message: "Invalid ID." }),
  groupName: z.string().trim().min(2, { message: "Group name is too short." }),
  groupType: z.string(),
  groupLeader: z.string().min(1, { message: "Invalid ID." }),
  groupMembers: z.array(z.string()).min(1, { message: 'Select at least one member' })
});
