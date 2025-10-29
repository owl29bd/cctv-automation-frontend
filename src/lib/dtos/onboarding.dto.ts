import {
  ParentOnboardingValidation,
  StudentOnboardingValidation,
  TeacherOnboardingValidation,
} from "@/lib/validators/onboarding.validator";

import { z } from "zod";

export type ParentOnboardingReq = z.infer<typeof ParentOnboardingValidation>;

export type TeacherOnboardingReq = z.infer<typeof TeacherOnboardingValidation>;

export type StudentOnboardingReq = z.infer<typeof StudentOnboardingValidation>;
