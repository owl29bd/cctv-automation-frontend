"use client";

import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { examTypes, genders } from "@/lib/constants/onboardingConstants";
import { useFieldArray, useFormContext } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { Gender } from "@/lib/enums/gender.enum";
import { ParentOnboardingReq } from "@/lib/dtos/onboarding.dto";
import StudentWeeklyAvailabilityForm from "./StudentWeeklyAvailabilityForm";
import { toBase64 } from "@/lib/utils/fileUtils";

export default function StudentsDetailsForm() {
  const {
    register,
    setValue,
    control,
    resetField,
    formState: { errors },
  } = useFormContext<ParentOnboardingReq>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `students`,
  });

  const onAddStudent = () => {
    append({
      firstName: "",
      lastName: "",
      email: "",
      additionalInfo: {
        examPrepTypes: [],
        stragglingTopics: [],
        currentCourses: [],
        weeklyAvailability: [],
      },
    });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return resetField(key as keyof ParentOnboardingReq);

    const fileData = await toBase64(file);
    setValue(key as keyof ParentOnboardingReq, fileData);
  };

  return (
    <div className="flex flex-col gap-4">
      <Stack spacing={3} divider={<Divider />}>
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h6">Student {index + 1}</Typography>
              <Button
                disabled={fields.length === 1}
                variant="outlined"
                color="error"
                onClick={() => remove(index)}
              >
                <DeleteIcon size={20} />
              </Button>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <TextField
                {...register(`students.${index}.firstName`)}
                label="First Name"
                variant="outlined"
                fullWidth
                error={!!errors.students?.[index]?.firstName}
                helperText={errors.students?.[index]?.firstName?.message}
              />

              <TextField
                {...register(`students.${index}.lastName`)}
                label="Last Name"
                variant="outlined"
                fullWidth
                error={!!errors.students?.[index]?.lastName}
                helperText={errors.students?.[index]?.lastName?.message}
              />
            </div>

            <TextField
              {...register(`students.${index}.email`)}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.students?.[index]?.email}
              helperText={errors.students?.[index]?.email?.message}
            />

            <TextField
              {...register(`students.${index}.phone`)}
              label="Phone Number"
              variant="outlined"
              placeholder="Phone number with country code"
              fullWidth
              error={!!errors.students?.[index]?.phone}
              helperText={errors.students?.[index]?.phone?.message}
            />

            <FormControl error={!!errors?.students?.[index]?.gender}>
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
              {...register(`students.${index}.additionalInfo.grade`)}
              label="Grade"
              variant="outlined"
              fullWidth
              error={!!errors.students?.[index]?.additionalInfo?.grade}
              helperText={
                errors.students?.[index]?.additionalInfo?.grade?.message
              }
            />

            <TextField
              {...register(`students.${index}.additionalInfo.school`)}
              label="School"
              variant="outlined"
              fullWidth
              error={!!errors.students?.[index]?.additionalInfo?.school}
              helperText={
                errors.students?.[index]?.additionalInfo?.school?.message
              }
            />

            <DatePicker
              label="Date of Birth"
              onChange={(d) => {
                setValue(
                  `students.${index}.additionalInfo.birthday`,
                  d?.toLocaleString(),
                );
              }}
            />

            <TextField
              {...register(`students.${index}.additionalInfo.gpa`, {
                setValueAs: (v) => (v === "" ? undefined : parseInt(v, 0)),
              })}
              label="GPA"
              type="number"
              variant="outlined"
              fullWidth
              error={!!errors.students?.[index]?.additionalInfo?.gpa}
              helperText={
                errors.students?.[index]?.additionalInfo?.gpa?.message
              }
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
              onChange={(_, value) =>
                setValue(
                  `students.${index}.additionalInfo.examPrepTypes`,
                  value.map((v) => v.value),
                )
              }
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
              error={!!errors.students?.[index]?.additionalInfo?.pastReports}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFileUpload(
                  e,
                  `students.${index}.additionalInfo.pastReports`,
                )
              }
            />

            <TextField
              {...register(
                `students.${index}.additionalInfo.currentTestScore`,
                {
                  setValueAs: (v) => (v === "" ? undefined : parseInt(v, 0)),
                },
              )}
              label="Current Test Score"
              type="number"
              variant="outlined"
              fullWidth
              error={
                !!errors.students?.[index]?.additionalInfo?.currentTestScore
              }
              helperText={
                errors.students?.[index]?.additionalInfo?.currentTestScore
                  ?.message
              }
            />

            <TextField
              {...register(`students.${index}.additionalInfo.targetScore`, {
                setValueAs: (v) => (v === "" ? undefined : parseInt(v, 0)),
              })}
              label="Target Score"
              type="number"
              variant="outlined"
              fullWidth
              error={!!errors.students?.[index]?.additionalInfo?.targetScore}
              helperText={
                errors.students?.[index]?.additionalInfo?.targetScore?.message
              }
            />

            <DatePicker
              label="Target Test Date"
              onChange={(d) => {
                setValue(
                  `students.${index}.additionalInfo.targetTestDate`,
                  d?.toLocaleString(),
                );
              }}
            />

            <TextField
              {...register(
                `students.${index}.additionalInfo.currentMathLevel`,
                {
                  setValueAs: (v) => (v === "" ? undefined : parseInt(v, 0)),
                },
              )}
              label="Current Math Level"
              type="number"
              variant="outlined"
              fullWidth
              error={
                !!errors.students?.[index]?.additionalInfo?.currentMathLevel
              }
              helperText={
                errors.students?.[index]?.additionalInfo?.currentMathLevel
                  ?.message
              }
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
              onChange={(_, value) =>
                setValue(
                  `students.${index}.additionalInfo.stragglingTopics`,
                  value,
                )
              }
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
              onChange={(_, value) =>
                setValue(
                  `students.${index}.additionalInfo.currentCourses`,
                  value,
                )
              }
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
                  `students.${index}.additionalInfo.diagnosticTestDate`,
                  d?.toLocaleString(),
                );
              }}
            />

            <StudentWeeklyAvailabilityForm studentIndex={index} />
          </div>
        ))}
      </Stack>

      <Button variant="outlined" onClick={onAddStudent}>
        Add Student
      </Button>
    </div>
  );
}
