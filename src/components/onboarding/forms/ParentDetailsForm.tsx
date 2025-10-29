import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import { Gender } from "@/lib/enums/gender.enum";
import { ParentOnboardingReq } from "@/lib/dtos/onboarding.dto";
import { genders } from "@/lib/constants/onboardingConstants";
import { useFormContext } from "react-hook-form";

export default function ParentDetailsForm() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ParentOnboardingReq>();

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h6">Personal Details</Typography>

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
        {...register("additionalInfo.occupation")}
        label="Occupation"
        variant="outlined"
        fullWidth
        error={!!errors?.additionalInfo?.occupation}
        helperText={errors?.additionalInfo?.occupation?.message}
      />
      <TextField
        {...register("additionalInfo.mailingAddress")}
        label="Mailing Address"
        variant="outlined"
        fullWidth
        error={!!errors?.additionalInfo?.mailingAddress}
        helperText={errors?.additionalInfo?.mailingAddress?.message}
      />
    </div>
  );
}
