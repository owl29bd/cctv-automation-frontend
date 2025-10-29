"use client";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers";
import { Gender } from "@/lib/enums/gender.enum";
import { TeacherOnboardingReq } from "@/lib/dtos/onboarding.dto";
import { TeacherOnboardingValidation } from "@/lib/validators/onboarding.validator";
import TutorTopicsForm from "./TutorTopicsForm";
import TutorWeeklyAvailabilityForm from "./TutorWeeklyAvailabilityForm";
import { genders } from "@/lib/constants/onboardingConstants";
import { toBase64 } from "@/lib/utils/fileUtils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

interface TutorDetailsFormProps {
  onSubmit: (values: TeacherOnboardingReq) => any;
}

export default function TutorDetailsForm({ onSubmit }: TutorDetailsFormProps) {
  const router = useRouter();
  const session = useSession();

  const formMethods = useForm<TeacherOnboardingReq>({
    resolver: zodResolver(TeacherOnboardingValidation),
    defaultValues: {
      firstName: session.data?.user?.firstName ?? "",
      lastName: session.data?.user?.lastName ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = formMethods;

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return resetField(key as keyof TeacherOnboardingReq);

    const fileData = await toBase64(file);
    setValue(key as keyof TeacherOnboardingReq, fileData);
  };

  useEffect(() => {}, [errors, formMethods]);

  return (
    <div className="w-full space-y-4">
      <Typography variant="h6">Tutor Details</Typography>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <TextField
              {...register("firstName")}
              label="First Name"
              variant="outlined"
              fullWidth
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
            />

            <TextField
              {...register("lastName")}
              label="Last Name"
              variant="outlined"
              fullWidth
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
            />
          </div>

          <TextField
            {...register("phone")}
            label="Phone Number"
            variant="outlined"
            placeholder="Phone number with country code"
            fullWidth
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />

          <FormControl error={!!errors?.gender}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              onChange={(e) => setValue("gender", e.target.value as Gender)}
            >
              {genders.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            <FormHelperText>{errors?.gender?.message}</FormHelperText>
          </FormControl>

          <TextField
            {...register("additionalInfo.university")}
            label="University"
            variant="outlined"
            fullWidth
            error={!!errors?.additionalInfo?.university}
            helperText={errors?.additionalInfo?.university?.message}
          />

          <DatePicker
            {...register("additionalInfo.universityGraduationYear", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v, 0)),
            })}
            label="University Graduation Year"
            views={["year"]}
            onChange={(date: Date | null) =>
              setValue(
                "additionalInfo.universityGraduationYear",
                date?.getFullYear(),
              )
            }
            slotProps={{
              field: {
                clearable: true,
                onClear: () =>
                  resetField("additionalInfo.universityGraduationYear"),
              },
            }}
          />

          <TextField
            label="Transcript"
            variant="outlined"
            fullWidth
            type="file"
            InputLabelProps={{ shrink: true }}
            error={!!errors?.additionalInfo?.transcript}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFileUpload(e, "additionalInfo.transcript")
            }
          />

          <TextField
            label="Resume"
            variant="outlined"
            fullWidth
            type="file"
            error={!!errors?.additionalInfo?.resume}
            InputLabelProps={{ shrink: true }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFileUpload(e, "additionalInfo.resume")
            }
          />

          <TextField
            {...register("additionalInfo.experience")}
            label="Work Experience"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            error={!!errors?.additionalInfo?.experience}
            helperText={errors?.additionalInfo?.experience?.message}
          />

          <TutorTopicsForm />

          <TutorWeeklyAvailabilityForm />

          <Button variant="contained" type="submit">
            Continue
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
