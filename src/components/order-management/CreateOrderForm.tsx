"use client";

import { CreateOrderReq, CreateOrderValidation } from "@/lib/dtos/order.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export default function CreateOrderForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: CreateOrderReq) => any;
  initialData?: CreateOrderReq;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateOrderReq>({
    resolver: zodResolver(CreateOrderValidation),
  });

  return (
    <div className="flex w-full flex-col-reverse gap-5 md:flex-row">
      <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <TextField
            {...register("clientName")}
            label="Client Name"
            placeholder="Client Name"
            variant="outlined"
            defaultValue={initialData?.clientName}
            fullWidth
            error={!!errors.clientName}
            helperText={errors?.clientName?.message}
          />
          <TextField
            {...register("remarks")}
            label="Remarks"
            placeholder="Remarks"
            variant="outlined"
            defaultValue={initialData?.remarks}
            fullWidth
            error={!!errors.remarks}
            helperText={errors?.remarks?.message}
          />
        </div>
        <Button type="submit" fullWidth variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
}
