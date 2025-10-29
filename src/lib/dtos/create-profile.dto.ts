import { z } from "zod";

export const CreateProfileValidation = z.object({
  name: z.string().min(1, { message: "Invalid Name." }),
  email: z.string().email({ message: "Invalid Email." }),
  phone: z.string().min(1, { message: "Invalid Phone." }),
  address: z.string().min(1, { message: "Invalid Address." }),
  details: z.string().min(1, { message: "Invalid Details." }),
  remarks: z.array(z.any()).optional(),
});

export type CreateProfileReq = z.infer<typeof CreateProfileValidation>;

export const UpdateProfileValidation = z.object({
  id: z.string().min(1, { message: "Invalid ID." }),
  name: z.string().min(1, { message: "Invalid Name." }),
  email: z.string().email({ message: "Invalid Email." }),
  phone: z.string().min(1, { message: "Invalid Phone." }),
  address: z.string().min(1, { message: "Invalid Address." }),
  details: z.string().min(1, { message: "Invalid Details." }),
  remarks: z.array(z.any()).optional(),
});

export type UpdateProfileReq = z.infer<typeof UpdateProfileValidation>;

export interface ProfileReq {
  name: string;
  email: string;
  phone: string;
  address: string;
  details: string;
  remarks?: any[] | undefined;
  orderId: string;
}
