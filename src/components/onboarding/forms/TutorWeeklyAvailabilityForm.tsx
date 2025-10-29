import {
  Alert,
  Button,
  Divider,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { TeacherOnboardingReq } from "@/lib/dtos/onboarding.dto";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { weekDays } from "@/lib/constants/onboardingConstants";

function TutorTimeSlots({ index }: { index: number }) {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext<TeacherOnboardingReq>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `additionalInfo.weeklyAvailability.${index}.timeSlots`,
  });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((item, timeSlotIndex) => (
        <div key={item.id} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <TimePicker
              sx={{ flex: 1 }}
              label={`Start Time Slot ${timeSlotIndex + 1}`}
              onChange={(t: Date | null) => {
                t &&
                  setValue(
                    `additionalInfo.weeklyAvailability.${index}.timeSlots.${timeSlotIndex}.start`,
                    dayjs(t).format("HH:mm"),
                  );
              }}
            />
            <TimePicker
              sx={{ flex: 1 }}
              label={`End Time Slot ${timeSlotIndex + 1}`}
              onChange={(t: Date | null) => {
                t &&
                  setValue(
                    `additionalInfo.weeklyAvailability.${index}.timeSlots.${timeSlotIndex}.end`,
                    dayjs(t).format("HH:mm"),
                  );
              }}
            />

            <IconButton
              onClick={() => remove(timeSlotIndex)}
              color="error"
              disabled={fields.length === 1}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <Typography color="error">
            {
              errors?.additionalInfo?.weeklyAvailability?.[index]?.timeSlots?.[
                timeSlotIndex
              ]?.message
            }
          </Typography>
        </div>
      ))}

      <Button
        variant="outlined"
        sx={{ alignSelf: "flex-start" }}
        onClick={() => append({ start: "", end: "" })}
      >
        Add Time Slot
      </Button>
    </div>
  );
}

export default function TutorWeeklyAvailabilityForm() {
  const {
    setValue,
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<TeacherOnboardingReq>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalInfo.weeklyAvailability",
  });

  const onAddAvailability = () => {
    append({
      day: "",
      timeSlots: [{ start: "", end: "" }],
    });
  };

  return (
    <div className="space-y-4">
      <Typography variant="subtitle1">Weekly Availability</Typography>

      <Alert severity="info">
        Add the days and time slots you are available for tutoring
      </Alert>

      <Stack spacing={3} divider={<Divider />}>
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Typography variant="subtitle2">
                Availability {index + 1}
              </Typography>
              <Button
                onClick={() => remove(index)}
                color="error"
                variant="outlined"
              >
                <DeleteIcon size={20} />
              </Button>
            </div>

            <ToggleButtonGroup
              exclusive
              fullWidth
              color={"primary"}
              value={watch(`additionalInfo.weeklyAvailability.${index}.day`)}
              onChange={(e, v) => {
                setValue(`additionalInfo.weeklyAvailability.${index}.day`, v);
              }}
            >
              {weekDays.map((option) => (
                <ToggleButton
                  key={option.value}
                  value={option.value}
                  disabled={watch("additionalInfo.weeklyAvailability")
                    ?.map((a) => a.day)
                    .includes(option.value)}
                >
                  {option.label.slice(0, 2)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <Typography color="error">
              {
                errors?.additionalInfo?.weeklyAvailability?.[index]?.day
                  ?.message
              }
            </Typography>

            <TutorTimeSlots index={index} />
          </div>
        ))}
      </Stack>

      <Button
        disabled={fields.length === 7}
        variant="outlined"
        onClick={onAddAvailability}
      >
        Add Availability
      </Button>
    </div>
  );
}
