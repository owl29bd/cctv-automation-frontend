import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import { TeacherOnboardingReq } from "@/lib/dtos/onboarding.dto";

export default function TutorTopicsForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TeacherOnboardingReq>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalInfo.topics",
  });

  return (
    <div className="space-y-4">
      <Typography variant="subtitle1">Topics</Typography>

      <Stack spacing={3} divider={<Divider />}>
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-4">
            <TextField
              {...register(`additionalInfo.topics.${index}.topic`)}
              label={`Select Topic ${index + 1}`}
              fullWidth
              error={!!errors.additionalInfo?.topics?.[index]?.topic}
              helperText={
                errors.additionalInfo?.topics?.[index]?.topic?.message
              }
            />
            <TextField
              {...register(`additionalInfo.topics.${index}.experience`)}
              label={`Experience ${index + 1}`}
              fullWidth
              multiline
              rows={3}
              error={!!errors.additionalInfo?.topics?.[index]?.experience}
              helperText={
                errors.additionalInfo?.topics?.[index]?.experience?.message
              }
            />

            <Button
              onClick={() => remove(index)}
              variant="outlined"
              color="error"
              sx={{ alignSelf: "flex-end" }}
            >
              Remove
            </Button>
          </div>
        ))}
      </Stack>

      <Button
        variant="outlined"
        onClick={() =>
          append({
            topic: "",
            experience: "",
          })
        }
      >
        Add Topic
      </Button>
    </div>
  );
}
