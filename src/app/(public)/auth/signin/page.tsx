"use client";

import { Typography } from "@mui/material";

import SigninForm from "@/components/auth/SigninForm";
import AppLogo from "@/components/common/logo/AppLogo";
import useAuthAction from "@/hooks/useAuthAction";
import { RouteUrls } from "@/lib/constants/url.config";
import { SigninReq } from "@/lib/dtos/auth.dto";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { FcGoogle as GoogleIcon } from "react-icons/fc";

function SigninPage() {
  const router = useRouter();
  // const theme = useTheme();

  const { signinMutation } = useAuthAction();

  const onSignin = async (data: SigninReq) => {
    signinMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Signed In");
        router.push(RouteUrls.dashboard.index);
      },
    });
  };

  // const onGoogleSignin = () => {
  //   signIn("google", { callbackUrl: RouteUrls.dashboard.index });
  // };

  return (
    <main className="flex">
      <section className="flex min-h-screen flex-1 flex-col items-center justify-center gap-10 px-6 ">
        <AppLogo />

        <Typography variant="h3" fontWeight={600} textAlign="center">
          Hello! Welcome Back.
        </Typography>

        <div className="flex w-fit flex-col gap-5 bg-accent sm:w-2/3 md:w-1/2 lg:w-1/4 ">
          {/* <Button
            variant="outlined"
            size="large"
            color="ghost"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={onGoogleSignin}
          >
            Continue with Google
          </Button> */}

          {/* <Divider>OR</Divider> */}

          <SigninForm onSubmit={onSignin} />

          {/* <Typography textAlign={"center"}>
            Don&apos;t have an account?{" "}
            <Link
              href={RouteUrls.auth.signup}
              className="font-semibold"
              style={{ color: theme.palette.primary.main }}
            >
              Sign Up
            </Link>
          </Typography> */}
        </div>
      </section>
      {/* <section className="hidden min-h-screen flex-[1.5] items-center justify-center border-x border-slate-200 bg-slate-50 p-4 lg:flex ">
        <object type="image/svg+xml" data={"/signin.svg"} className="w-3/4" />
      </section> */}
    </main>
  );
}

export default SigninPage;
