"use client";

import { Button, Paper, Typography } from "@mui/material";

import { RiArrowLeftLine as ArrowBackIcon } from "react-icons/ri";
import Link from "next/link";
import { TeacherOnboardingReq } from "@/lib/dtos/onboarding.dto";
import TutorDetailsForm from "@/components/onboarding/forms/TutorOnboardingForm";
import toast from "react-hot-toast";
import useOnboardingAction from "@/hooks/useOnboardingAction";
import { useRouter } from "next/navigation";

export default function TutorOnboardingPage() {
  const { tutorOnboardingMutation } = useOnboardingAction();
  const router = useRouter();

  const onSubmit = async (values: TeacherOnboardingReq) => {
    tutorOnboardingMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Account details saved successfully!");
        router.push("/teacher/dashboard");
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
          Welcome New Tutor!
        </Typography>
        <Typography variant="h6">
          Please fill out the form below to get started
        </Typography>
        <Paper className="p-6" variant="outlined">
          <TutorDetailsForm onSubmit={onSubmit} />
        </Paper>
      </div>
    </div>
  );
}
