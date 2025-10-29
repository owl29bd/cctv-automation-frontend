import { z } from "zod";

export const ReinforcementAssignmentCreationValidation = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    timeLimit: z.number().int().nonnegative(),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    questionIds: z.array(z.string()).optional(),
    questionSetId: z.string().optional(),
  })
  .refine((data) => data.questionIds || data.questionSetId, {
    message: "Either 'questionIds' or 'questionSetId' must be provided",
    path: ["questionIds", "questionSetId"],
  });

const SATQuestionSetWithTimeValidation = z.object({
  questionSetId: z.string().min(1),
  timeLimit: z.number().int().nonnegative(),
  breakTime: z.number().int().nonnegative(),
});

const SATFullSectionValidation = z.object({
  easy: SATQuestionSetWithTimeValidation,
  base: SATQuestionSetWithTimeValidation,
  hard: SATQuestionSetWithTimeValidation,
});

export const SATExamCreationValidation = z.object({
  title: z.string().min(1),
  tags: z.array(z.string().trim()).optional(),
  sat_math: SATFullSectionValidation,
  sat_reading_writing: SATFullSectionValidation,
});

export const CourseworkAssignRequestValidation = z.object({
  assignedTo: z.array(z.string()).min(1, "At least one user is required"),
});
