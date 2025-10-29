"use client";

import { Button, Paper, Typography } from "@mui/material";

import { RiArrowLeftLine as ArrowBackIcon } from "react-icons/ri";
import Link from "next/link";
import ParentOnboardingForm from "@/components/onboarding/forms/ParentOnboardingForm";
import { ParentOnboardingReq } from "@/lib/dtos/onboarding.dto";
import toast from "react-hot-toast";
import useOnboardingAction from "@/hooks/useOnboardingAction";
import { useRouter } from "next/navigation";

export default function ParentOnboardingPage() {
  const { parentOnboardingMutation } = useOnboardingAction();
  const router = useRouter();

  const onSubmit = async (values: ParentOnboardingReq) => {
    parentOnboardingMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Account details saved successfully!");
        router.push("/parent/dashboard");
      },
    });
  };

  return (
    <div className="flex items-center justify-center p-6 md:p-20">
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <Button
          LinkComponent={Link}
          href="/onboarding"
          variant="text"
          startIcon={<ArrowBackIcon />}
          sx={{ alignSelf: "flex-start" }}
        >
          Go Back
        </Button>
        <Typography variant="h5" fontWeight={700}>
          Welcome New Parent!
        </Typography>
        <Typography variant="h6">
          Please fill out the form below to get started
        </Typography>
        <Paper className="p-6" variant="outlined">
          <ParentOnboardingForm onSubmit={onSubmit} />
        </Paper>
      </div>
    </div>
  );
}
