"use client";

import StudentOnboardingForm from "@/components/onboarding/forms/StudentOnboardingForm";
import useOnboardingAction from "@/hooks/useOnboardingAction";
import { StudentOnboardingReq } from "@/lib/dtos/onboarding.dto";
import { Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiArrowLeftLine as ArrowBackIcon } from "react-icons/ri";

export default function StudentOnboardingPage() {
  const { studentOnboardingMutation } = useOnboardingAction();
  const router = useRouter();

  const onSubmit = async (values: StudentOnboardingReq) => {
    studentOnboardingMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Account details saved successfully!");
        router.push("/student/dashboard");
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
          Welcome New Student!
        </Typography>
        <Typography variant="h6">
          Please fill out the form below to get started
        </Typography>
        <Paper className="p-6" variant="outlined">
          <StudentOnboardingForm onSubmit={onSubmit} />
        </Paper>
      </div>
    </div>
  );
}
