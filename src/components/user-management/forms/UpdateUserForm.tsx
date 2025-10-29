"use client";

import { UpdateUserReq } from "@/lib/dtos/user-management.dto";
import { Role } from "@/lib/enums/role.enum";
import { UpdateUserValidation } from "@/lib/validators/user-management.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, capitalize, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UpdateUserFormProps {
  onSubmit: (data: UpdateUserReq) => any;
  initialData?: UpdateUserReq;
}

export default function UpdateUserForm({
  onSubmit,
  initialData,
}: UpdateUserFormProps) {
  const [role, setRole] = useState(Role.User);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateUserReq>({
    resolver: zodResolver(UpdateUserValidation),
    defaultValues: {
      firstName: initialData?.firstName,
      lastName: initialData?.lastName,
      email: initialData?.email,
      role: initialData?.role,
    },
  });

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
            autoFocus
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
          value={role}
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
        <Button type="submit" fullWidth variant="contained">
          Update User
        </Button>
      </form>
    </div>
  );
}
