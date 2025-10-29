"use client";

import { Button, Typography } from "@mui/material";

import AppLogo from "@/components/common/logo/AppLogo";
import PasswordField from "@/components/common/input/PasswordField";
import { ResetPasswordReq } from "@/lib/dtos/auth.dto";
import { ResetPasswordValidation } from "@/lib/validators/auth.validator";
import toast from "react-hot-toast";
import useAuthAction from "@/hooks/useAuthAction";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

function ResetPasswordPage({ params: { token } }: ResetPasswordPageProps) {
  const router = useRouter();

  const { resetPasswordMutation } = useAuthAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordReq>({
    resolver: zodResolver(ResetPasswordValidation),
  });

  const onSubmit = (data: ResetPasswordReq) => {
    resetPasswordMutation.mutate(
      { data, resetToken: token },
      {
        onSuccess: () => {
          toast.success("Password reset successful");
          router.replace("/auth/signin");
        },
      },
    );
  };

  return (
    <main className="flex flex-col items-center justify-center gap-6 p-8">
      <AppLogo />
      <object
        type="image/svg+xml"
        data={"/resetPassword.svg"}
        className="max-h-80"
      />
      <Typography variant="h5" textAlign="center">
        Reset your password
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        className="max-w-2xl text-center"
      >
        Create a new strong password for your account. Make sure it&apos;s
        something you can remember, or save it in a secure place
      </Typography>

      <form
        className="flex w-full max-w-lg flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PasswordField
          {...register("password")}
          label="New Password"
          variant="outlined"
          fullWidth
          error={!!errors.password}
          helperText={errors?.password?.message}
        />

        <PasswordField
          {...register("confirmPassword")}
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
        />

        <Button type="submit" variant="contained" size="large">
          Change Password
        </Button>
      </form>
    </main>
  );
}

export default ResetPasswordPage;
