import { Button, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import PasswordField from "@/components/common/input/PasswordField";
import { RouteUrls } from "@/lib/constants/url.config";
import { SigninReq } from "@/lib/dtos/auth.dto";
import { SigninValidation } from "@/lib/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

interface SigninFormProps {
  onSubmit: SubmitHandler<SigninReq>;
}

function SigninForm({ onSubmit }: SigninFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninReq>({ resolver: zodResolver(SigninValidation) });

  return (
    <form
      data-testid="signin-form"
      className="flex w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("email")}
        type="email"
        label="Email"
        variant="outlined"
        fullWidth
        autoFocus
        error={!!errors.email}
        helperText={errors?.email?.message}
      />

      <PasswordField
        {...register("password")}
        label="Password"
        variant="outlined"
        fullWidth
        error={!!errors.password}
        helperText={errors?.password?.message}
      />

      <Typography fontWeight={600} color={"primary"} ml={"auto"}>
        <Link href={RouteUrls.auth.forgotPassword}>Forgot password?</Link>
      </Typography>

      <Button type="submit" variant="contained" size="large">
        Sign In
      </Button>
    </form>
  );
}

export default SigninForm;
