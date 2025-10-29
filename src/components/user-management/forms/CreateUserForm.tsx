"use client";

import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  capitalize,
} from "@mui/material";

import { CreateUserReq } from "@/lib/dtos/user-management.dto";
import { CreateUserValidation } from "@/lib/validators/user-management.validator";
import { Role } from "@/lib/enums/role.enum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface CreateUserFormProps {
  onSubmit: (data: CreateUserReq) => any;
  initialData?: CreateUserReq;
}

export default function CreateUserForm({
  onSubmit,
  initialData,
}: CreateUserFormProps) {
  const [role, setRole] = useState(Role.User);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateUserReq>({ resolver: zodResolver(CreateUserValidation) });

  // password visibility maintain
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <div className="flex w-full flex-col-reverse gap-5 md:flex-row">
      <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <TextField
            {...register("firstName")}
            label="First name"
            placeholder="First name"
            variant="outlined"
            defaultValue={initialData?.firstName}
            fullWidth
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
          />

          <TextField
            {...register("lastName")}
            label="Last name"
            placeholder="Last name"
            variant="outlined"
            defaultValue={initialData?.lastName}
            fullWidth
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
          />
        </div>
        <TextField
          select
          label="Select role"
          variant="outlined"
          value={initialData?.role}
          fullWidth
          error={!!errors.role}
          helperText={errors?.role?.message}
          onChange={(e) => {
            setRole(e.target.value as Role);
            setValue("role", e.target.value as Role);
          }}
        >
          {Object.values(Role).map((role) => (
            <MenuItem key={role} value={role}>
              {capitalize(role)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          {...register("email")}
          type="email"
          label="Email"
          variant="outlined"
          defaultValue={initialData?.email}
          fullWidth
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField
          {...register("password")}
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          defaultValue={initialData ? initialData.password : null}
          fullWidth
          error={!!errors.password}
          helperText={errors?.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" fullWidth variant="contained">
          {initialData ? "Update User" : "Add new user"}
        </Button>
      </form>
    </div>
  );
}
