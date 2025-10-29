"use client";

import {
  CreateProfileReq,
  CreateProfileValidation,
} from "@/lib/dtos/create-profile.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const BlockEditor = dynamic(
  () => import("@/components/common/blockEditor/BlockEditor"),
  {
    ssr: false,
  },
);

export default function CreateProfileForm({
  initialData,
  onSubmit,
}: {
  onSubmit: (data: CreateProfileReq) => void;
  initialData?: CreateProfileReq;
}) {
  const formMethods = useForm<CreateProfileReq>({
    resolver: zodResolver(CreateProfileValidation),
    defaultValues: {
      name: initialData?.name,
      email: initialData?.email,
      phone: initialData?.phone,
      address: initialData?.address,
      details: initialData?.details,
      remarks: initialData?.remarks,
      ...initialData,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData]);

  return (
    <div className="flex w-full flex-col-reverse gap-5 md:flex-row">
      <FormProvider {...formMethods}>
        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name")}
            label="Name"
            placeholder="Name"
            variant="outlined"
            defaultValue={initialData?.name}
            fullWidth
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <TextField
            {...register("email")}
            label="Email"
            placeholder="Email"
            variant="outlined"
            defaultValue={initialData?.email}
            fullWidth
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <TextField
            {...register("phone")}
            label="phone"
            placeholder="phone"
            variant="outlined"
            defaultValue={initialData?.phone}
            fullWidth
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
          <TextField
            {...register("address")}
            label="Address"
            placeholder="Address"
            variant="outlined"
            defaultValue={initialData?.address}
            fullWidth
            error={!!errors.address}
            helperText={errors?.address?.message}
          />
          <TextField
            {...register("details")}
            label="Details"
            placeholder="Details"
            variant="outlined"
            defaultValue={initialData?.details}
            fullWidth
            error={!!errors.details}
            helperText={errors?.details?.message}
          />
          <div className="border-2">
            <Typography variant="h6">Remarks</Typography>
            <BlockEditor
              placeholder="Add Remarks..."
              onData={(data) => setValue("remarks", data?.blocks)}
              data={{ blocks: initialData?.remarks || [] }}
            />
          </div>
          <Button type="submit" fullWidth variant="contained">
            {initialData ? "Update" : "Create"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
