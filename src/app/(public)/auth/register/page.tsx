"use client";

import { Typography, useTheme } from "@mui/material";

import SignupForm from "@/components/auth/SignupForm";
import AppLogo from "@/components/common/logo/AppLogo";
import useAuthAction from "@/hooks/useAuthAction";
import { RouteUrls } from "@/lib/constants/url.config";
import { SignupReq } from "@/lib/dtos/auth.dto";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SignupPage() {
  const router = useRouter();
  const theme = useTheme();
  const { signupMutation, signinMutation } = useAuthAction();

  const onSignup = (data: SignupReq) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully.");
        signinMutation.mutate(
          { email: data.email, password: data.password },
          { onSuccess: () => router.push(RouteUrls.dashboard.index) },
        );
      },
    });
  };

  return (
    <main className="flex">
      <section className="flex min-h-screen flex-1 flex-col items-center justify-center gap-10 px-6">
        <AppLogo />

        <Typography variant="h4" fontWeight={600} textAlign="center">
          Hello New User!
        </Typography>

        <div className="flex w-fit flex-col gap-5 bg-accent sm:w-2/3 md:w-1/2 lg:w-1/4 ">
          <SignupForm onSubmit={onSignup} />

          <Typography textAlign={"center"}>
            Already have an account?{" "}
            <Link
              href={RouteUrls.auth.signin}
              className="font-semibold"
              style={{ color: theme.palette.primary.main }}
            >
              Sign In
            </Link>
          </Typography>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
