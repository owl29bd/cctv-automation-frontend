import { QuestionDifficulty, QuestionSubjects } from "../enums/question.enum";

import { QuestionSetCategory } from "../enums/question-set.enum";
import { z } from "zod";

export const QuestionSetCreationValidation = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    subject: z.nativeEnum(QuestionSubjects, {
      invalid_type_error: "Invalid subject",
      required_error: "Subject is required",
    }),
    difficulty: z.nativeEnum(QuestionDifficulty, {
      invalid_type_error: "Invalid difficulty",
      required_error: "Difficulty is required",
    }),
    category: z.nativeEnum(QuestionSetCategory, {
      invalid_type_error: "Invalid category",
      required_error: "Category is required",
    }),
    tags: z.array(z.string().trim()).optional(),
    questionIds: z
      .array(z.string())
      .min(1, "At least one question is required"),
  })
  .superRefine((val, ctx) => {
    switch (val.category) {
      case QuestionSetCategory.SATMath:
        if (val.questionIds.length < 22) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["category"],
            message: "At least 22 questions are required for SAT Math",
          });
        }
        break;
      case QuestionSetCategory.SATReadingWriting:
        if (val.questionIds.length < 27) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["category"],
            message:
              "At least 27 questions are required for SAT Reading and Writing",
          });
        }
        break;
    }
  });
