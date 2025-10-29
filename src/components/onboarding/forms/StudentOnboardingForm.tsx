"use client";

import { examTypes, genders } from "@/lib/constants/onboardingConstants";
import { StudentOnboardingReq } from "@/lib/dtos/onboarding.dto";
import { Gender } from "@/lib/enums/gender.enum";
import { toBase64 } from "@/lib/utils/fileUtils";
import { StudentOnboardingValidation } from "@/lib/validators/onboarding.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StudentWeeklyAvailabilityFormSingle from "./StudentWeeklyAvailabilityFormSingle";

interface StudentOnboardingFormProps {
  onSubmit: (values: StudentOnboardingReq) => any;
}

export default function StudentOnboardingForm({
  onSubmit,
}: StudentOnboardingFormProps) {
  const session = useSession();

  const formMethods = useForm<StudentOnboardingReq>({
    resolver: zodResolver(StudentOnboardingValidation),
    defaultValues: {
      firstName: session.data?.user?.firstName ?? "",
      lastName: session.data?.user?.lastName ?? "",
      email: session.data?.user?.email ?? "",
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
    if (!file) return resetField(key as keyof StudentOnboardingReq);

    const fileData = await toBase64(file);
    setValue(key as keyof StudentOnboardingReq, fileData);
  };

  useEffect(() => {}, [errors, formMethods]);

  return (
    <div className="w-full space-y-4">
      <Typography variant="h6">Student Details</Typography>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
          action=""
        >
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
            {...register("email")}
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors?.email?.message}
          />

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
            {...register("additionalInfo.grade")}
            label="Grade"
            variant="outlined"
            fullWidth
            error={!!errors.additionalInfo?.grade}
            helperText={errors?.additionalInfo?.grade?.message}
          />
          <TextField
            {...register("additionalInfo.school")}
            label="School"
            variant="outlined"
            fullWidth
            error={!!errors.additionalInfo?.school}
            helperText={errors?.additionalInfo?.school?.message}
          />
          <DatePicker
            label="Date of Birth"
            onChange={(d) => {
              setValue("additionalInfo.birthday", d?.toLocaleString());
            }}
          />
          <TextField
            {...register("additionalInfo.gpa", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v)),
            })}
            label="GPA"
            type="number"
            variant="outlined"
            fullWidth
            error={!!errors.additionalInfo?.gpa}
            helperText={errors?.additionalInfo?.gpa?.message}
          />
          <Autocomplete
            multiple
            options={examTypes}
            defaultValue={[]}
            getOptionLabel={(option) => option.label}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  variant="outlined"
                  key={option.value}
                  label={option.label}
                />
              ))
            }
            onChange={(_, value) => {
              setValue(
                "additionalInfo.examPrepTypes",
                value.map((v) => v.value),
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Exam Prep Types"
                placeholder="Select Exam Prep Types"
              />
            )}
          />
          <TextField
            label="Past Report"
            variant="outlined"
            fullWidth
            type="file"
            InputLabelProps={{ shrink: true }}
            error={!!errors.additionalInfo?.pastReports}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleFileUpload(e, "additionalInfo.pastReports");
            }}
          />

          <TextField
            {...register("additionalInfo.currentTestScore", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v)),
            })}
            label="Current Test Score"
            type="number"
            variant="outlined"
            fullWidth
            error={!!errors.additionalInfo?.currentTestScore}
            helperText={errors?.additionalInfo?.currentTestScore?.message}
          />
          <TextField
            {...register("additionalInfo.targetScore", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v)),
            })}
            label="Target Score"
            type="number"
            variant="outlined"
            fullWidth
            error={!!errors.additionalInfo?.targetScore}
            helperText={errors?.additionalInfo?.targetScore?.message}
          />
          <DatePicker
            label="Target Test Date"
            onChange={(d) => {
              setValue("additionalInfo.targetTestDate", d?.toLocaleString());
            }}
          />
          <TextField
            {...register("additionalInfo.currentMathLevel", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v)),
            })}
            label="Current Math Level"
            type="number"
            variant="outlined"
            fullWidth
            error={!!errors.additionalInfo?.currentMathLevel}
            helperText={errors?.additionalInfo?.currentMathLevel?.message}
          />
          <Autocomplete
            multiple
            options={[]}
            defaultValue={[]}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  {...getTagProps({ index })}
                  variant="outlined"
                  key={option}
                  label={option}
                />
              ))
            }
            onChange={(_, value) => {
              setValue("additionalInfo.stragglingTopics", value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Straggling Topics"
                helperText="Enter the topic name and press enter to add it as a tag."
              />
            )}
          />
          <Autocomplete
            multiple
            options={[]}
            defaultValue={[]}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  variant="outlined"
                  label={option}
                />
              ))
            }
            onChange={(_, value) => {
              setValue("additionalInfo.currentCourses", value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Current Courses"
                helperText="Enter the course name and press enter to add it as a tag."
              />
            )}
          />
          <DatePicker
            label="Diagnostic Test Date"
            onChange={(d) => {
              setValue(
                "additionalInfo.diagnosticTestDate",
                d?.toLocaleString(),
              );
            }}
          />

          <StudentWeeklyAvailabilityFormSingle />

          <Button variant="contained" type="submit">
            Continue
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
