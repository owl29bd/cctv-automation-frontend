import { WeekDay } from "@/lib/enums/day.enum";
import { Gender } from "@/lib/enums/gender.enum";
import dayjs from "dayjs";
import { z } from "zod";
import { ExamType } from "../enums/exam-type.enum";

export const phoneRegex = new RegExp(/^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/);

const UserOnboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().regex(phoneRegex, "Invalid Number").optional(),
  gender: z.nativeEnum(Gender).optional(),
});

const ParentOnboardingSchema = UserOnboardingSchema.extend({
  additionalInfo: z.object({
    mailingAddress: z.string().optional(),
    occupation: z.string().optional(),
  }),
});

const AdditionalParentSchema = ParentOnboardingSchema.extend({
  email: z.string().email("Invalid email address"),
});

const WeeklyAvailabilitySchema = z.object({
  day: z.union([
    z.string().min(1, "Day is required"),
    z.nativeEnum(WeekDay, {
      invalid_type_error: "Day must be a valid day of the week",
      required_error: "Day is required",
    }),
  ]),
  timeSlots: z.array(
    z
      .object({
        start: z.string(),
        end: z.string(),
      })
      .refine((value) => {
        return dayjs(value.start, "HH:mm").isBefore(dayjs(value.end, "HH:mm"));
      }, "Start time must be before end time"),
  ),
});

const TeacherTopicSchema = z.object({
  topic: z.string(),
  experience: z.string(),
});

const StudentOnboardingSchema = UserOnboardingSchema.extend({
  email: z.string().email("Invalid email address"),
  additionalInfo: z.object({
    grade: z.string().optional(),
    school: z.string().optional(),
    birthday: z.string().optional(),
    gpa: z.number().min(0).max(5).optional(),
    examPrepTypes: z.array(z.nativeEnum(ExamType)).optional(),
    pastReports: z.any().optional(),
    currentTestScore: z.number().optional(),
    targetScore: z.number().optional(),
    targetTestDate: z.string().optional(),
    currentMathLevel: z.number().optional(),
    stragglingTopics: z.array(z.string()).optional(),
    currentCourses: z.array(z.string()).optional(),
    diagnosticTestDate: z.string().optional(),
    weeklyAvailability: z.array(WeeklyAvailabilitySchema).optional(),
  }),
});

export const ParentOnboardingValidation = ParentOnboardingSchema.extend({
  additionalParent: z.array(AdditionalParentSchema),
  students: z.array(StudentOnboardingSchema).nonempty(),
});

export const TeacherOnboardingValidation = UserOnboardingSchema.extend({
  additionalInfo: z.object({
    university: z.string().optional(),
    universityGraduationYear: z.number().optional(),
    experience: z.string().optional(),
    transcript: z.any().optional(),
    resume: z.any().optional(),
    topics: z.array(TeacherTopicSchema).optional(),
    weeklyAvailability: z.array(WeeklyAvailabilitySchema).optional(),
  }),
});

export const StudentOnboardingValidation = StudentOnboardingSchema;
