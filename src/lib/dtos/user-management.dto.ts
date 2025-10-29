import {
  CreateUserValidation,
  GetUserValidation,
  UpdateUserValidation,
} from "@/lib/validators/user-management.validator";

import { z } from "zod";

export type GetUserRes = z.infer<typeof GetUserValidation>;

export type CreateUserReq = z.infer<typeof CreateUserValidation>;

export type UpdateUserReq = z.infer<typeof UpdateUserValidation>;
