"use client";

import { Button, TextField, Typography, useTheme } from "@mui/material";

import AppLogo from "@/components/common/logo/AppLogo";
import useAuthAction from "@/hooks/useAuthAction";
import { RouteUrls } from "@/lib/constants/url.config";
import { ForgotPasswordReq } from "@/lib/dtos/auth.dto";
import { ForgotPasswordValidation } from "@/lib/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ForgotPasswordPage() {
  const theme = useTheme();
  const router = useRouter();

  const { forgotPasswordMutation } = useAuthAction();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordReq>({
    resolver: zodResolver(ForgotPasswordValidation),
  });

  const onSubmit = (data: ForgotPasswordReq) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("A recovery email has been sent to your email address");
        router.back();
      },
    });
  };

  return (
    <main className="flex flex-col items-center justify-center gap-6 p-8">
      <AppLogo />
      <object
        type="image/svg+xml"
        data={"/forgotPassword.svg"}
        className="max-h-80"
      />

      <Typography variant="h5" textAlign="center">
        Forgot your password?
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        className="max-w-2xl text-center"
      >
        Don&apos;t worry, it happens to the best of us. Just enter your email
        address below and we&apos;ll send you a recovery link
      </Typography>

      <form
        className="flex w-full max-w-lg flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("email")}
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <Button variant="contained" size="large" type="submit">
          Send Recovery Email
        </Button>

        <Typography textAlign={"center"}>
          Remember your password?{" "}
          <Link
            href={RouteUrls.auth.signin}
            className="font-semibold"
            style={{ color: theme.palette.primary.main }}
          >
            Sign In
          </Link>
        </Typography>
      </form>
    </main>
  );
}

export default ForgotPasswordPage;
