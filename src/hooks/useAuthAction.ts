"use client";

import { ResetPasswordReq, SigninReq } from "@/lib/dtos/auth.dto";
import { signIn, signOut } from "next-auth/react";

import authService from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export default function useAuthAction() {
  const signinMutation = useMutation({
    mutationFn: async (data: SigninReq) => {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });

      if (!res?.ok) {
        throw new Error("Invalid credentials.");
      }

      return res;
    },
  });

  const signupMutation = useMutation({
    mutationFn: authService.signup,
  });

  const signoutMutation = useMutation({
    mutationFn: async () =>
      await signOut({
        callbackUrl: "/auth/signin",
      }),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({
      resetToken,
      data,
    }: {
      resetToken: string;
      data: ResetPasswordReq;
    }) => await authService.resetPassword(resetToken, data),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: authService.forgotPassword,
  });

  return {
    signinMutation,
    signupMutation,
    signoutMutation,
    resetPasswordMutation,
    forgotPasswordMutation,
  };
}
