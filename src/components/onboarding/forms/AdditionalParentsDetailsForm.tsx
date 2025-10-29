import {
  Alert,
  AlertTitle,
  Button,
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
import { useFieldArray, useFormContext } from "react-hook-form";

import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { Gender } from "@/lib/enums/gender.enum";
import { ParentOnboardingReq } from "@/lib/dtos/onboarding.dto";
import React from "react";
import { genders } from "@/lib/constants/onboardingConstants";

export default function AdditionalParentsDetailsForm() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ParentOnboardingReq>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalParent",
  });

  const onAddAdditionalParent = () => {
    append({
      firstName: "",
      lastName: "",
      email: "",
      additionalInfo: {},
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        You can add additional parents to your account. Additional parents can
        be added to your account to help manage your child&apos;s account. Or
        you can add them later.
      </Alert>

      <Stack spacing={3} divider={<Divider />}>
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h6">
                Additional Parent {index + 1}
              </Typography>

              <Button
                variant="outlined"
                color="error"
                onClick={() => remove(index)}
              >
                <DeleteIcon size={20} />
              </Button>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <TextField
                {...register(`additionalParent.${index}.firstName`)}
                label={`Parent ${index + 1} First Name`}
                variant="outlined"
                fullWidth
                error={!!errors?.additionalParent?.[index]?.firstName}
                helperText={
                  errors?.additionalParent?.[index]?.firstName?.message
                }
              />
              <TextField
                {...register(`additionalParent.${index}.lastName`)}
                label={`Parent ${index + 1} Last Name`}
                variant="outlined"
                fullWidth
                error={!!errors?.additionalParent?.[index]?.lastName}
                helperText={
                  errors?.additionalParent?.[index]?.lastName?.message
                }
              />
            </div>

            <TextField
              {...register(`additionalParent.${index}.email`)}
              key={index}
              label={`Parent ${index + 1} Email`}
              variant="outlined"
              fullWidth
              error={!!errors?.additionalParent?.[index]?.email}
              helperText={errors?.additionalParent?.[index]?.email?.message}
            />

            <TextField
              {...register(`additionalParent.${index}.phone`)}
              label={`Parent ${index + 1} Phone Number`}
              variant="outlined"
              fullWidth
              placeholder="Phone number with country code"
              error={!!errors?.additionalParent?.[index]?.phone}
              helperText={errors?.additionalParent?.[index]?.phone?.message}
            />

            <FormControl error={!!errors?.additionalParent?.[index]?.gender}>
              <FormLabel>Parent {index + 1} Gender</FormLabel>
              <RadioGroup
                row
                onChange={(e) =>
                  setValue(
                    `additionalParent.${index}.gender`,
                    e.target.value as Gender,
                  )
                }
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
              {...register(
                `additionalParent.${index}.additionalInfo.occupation`,
              )}
              label={`Parent ${index + 1} Occupation`}
              variant="outlined"
              fullWidth
              error={
                !!errors?.additionalParent?.[index]?.additionalInfo?.occupation
              }
              helperText={
                errors?.additionalParent?.[index]?.additionalInfo?.occupation
                  ?.message
              }
            />

            <TextField
              {...register(
                `additionalParent.${index}.additionalInfo.mailingAddress`,
              )}
              label={`Parent ${index + 1} Mailing Address`}
              variant="outlined"
              fullWidth
              error={
                !!errors?.additionalParent?.[index]?.additionalInfo
                  ?.mailingAddress
              }
              helperText={
                errors?.additionalParent?.[index]?.additionalInfo
                  ?.mailingAddress?.message
              }
            />
          </div>
        ))}
      </Stack>

      <Button variant="outlined" onClick={onAddAdditionalParent}>
        Add Additional Parent
      </Button>
    </div>
  );
}
