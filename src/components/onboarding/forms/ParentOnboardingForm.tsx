"use client";

import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import AdditionalParentsDetailsForm from "./AdditionalParentsDetailsForm";
import ParentDetailsForm from "./ParentDetailsForm";
import { ParentOnboardingReq } from "@/lib/dtos/onboarding.dto";
import { ParentOnboardingValidation } from "@/lib/validators/onboarding.validator";
import StudentDetailsForm from "./StudentsDetailsForm";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

const steps = [
  "Personal Details",
  "Additional Parent Details",
  "Student Details",
];

interface ParentOnboardingFormProps {
  onSubmit: (values: ParentOnboardingReq) => any;
}

export default function ParentOnboardingForm({
  onSubmit,
}: ParentOnboardingFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const session = useSession();

  const formMethods = useForm<ParentOnboardingReq>({
    resolver: zodResolver(ParentOnboardingValidation),
    defaultValues: {
      ...session.data?.user,
      students: [
        {
          firstName: "",
          lastName: "",
          email: "",
          additionalInfo: {},
        },
      ],
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = formMethods;

  const handleNext = async () => {
    let isValid = false;

    try {
      if (activeStep === 0)
        isValid = await trigger([
          "firstName",
          "lastName",
          "phone",
          "gender",
          "additionalInfo",
        ]);
      else if (activeStep === 1) isValid = await trigger(["additionalParent"]);
      else if (activeStep === 2) isValid = await trigger(["students"]);

      if (isValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {}, [errors, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className={activeStep === 0 ? "" : "hidden"}>
          <ParentDetailsForm />
        </div>

        <div className={activeStep === 1 ? "" : "hidden"}>
          <AdditionalParentsDetailsForm />
        </div>

        <div className={activeStep === 2 ? "" : "hidden"}>
          <StudentDetailsForm />
        </div>

        <div className="flex justify-between gap-4">
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>

          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}

          {activeStep === steps.length - 1 && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
