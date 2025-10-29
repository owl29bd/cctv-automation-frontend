import { Tokens, UserAuth } from "@/lib/types/next-auth";
import {
  ForgotPasswordValidation,
  ResetPasswordValidation,
  SigninValidation,
  SignupValidation,
} from "@/lib/validators/auth.validator";

import { z } from "zod";

export type SigninReq = z.infer<typeof SigninValidation>;

export type SignupReq = z.infer<typeof SignupValidation>;

export type GoogleSigninReq = {
  oAuthId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
};

export type ForgotPasswordReq = z.infer<typeof ForgotPasswordValidation>;

export type ResetPasswordReq = z.infer<typeof ResetPasswordValidation>;

export type SigninRes = {
  user: UserAuth;
  tokens: Tokens;
};