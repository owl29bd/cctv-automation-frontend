import {
  CreateUserValidation,
  UpdateUserValidation,
  CreateGroupValidation, 
  UpdateGroupValidation,
  GetUserValidation
} from "@/lib/validators/user-management.validator";

import { z } from "zod";

export type GetUserRes = z.infer<typeof GetUserValidation>;

export type CreateUserReq = z.infer<typeof CreateUserValidation>;

export type UpdateUserReq = z.infer<typeof UpdateUserValidation>;

export type CreateGroupReq = z.infer<typeof CreateGroupValidation>;

export type UpdateGroupReq = z.infer<typeof UpdateGroupValidation>;