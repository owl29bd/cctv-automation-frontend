import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import PasswordField from "@/components/common/input/PasswordField";
import { SignupReq } from "@/lib/dtos/auth.dto";
import { SignupValidation } from "@/lib/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignupFormProps {
  onSubmit: SubmitHandler<SignupReq>;
}

function SignupForm({ onSubmit }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupReq>({
    resolver: zodResolver(SignupValidation),
  });

  return (
    <form
      data-testid="signup-form"
      className="flex w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5 md:flex-row">
        <TextField
          {...register("firstName")}
          type="text"
          label="First Name"
          variant="outlined"
          fullWidth
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />

        <TextField
          {...register("lastName")}
          type="text"
          label="Last Name"
          variant="outlined"
          fullWidth
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
      </div>

      <TextField
        {...register("email")}
        type="email"
        label="Email"
        variant="outlined"
        fullWidth
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

      <PasswordField
        {...register("confirmPassword")}
        label="Confirm Password"
        variant="outlined"
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors?.confirmPassword?.message}
      />

      <Button type="submit" variant="contained" size="large">
        Create Account
      </Button>
    </form>
  );
}

export default SignupForm;
