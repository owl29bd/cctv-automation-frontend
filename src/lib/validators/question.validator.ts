import {
  OptionType,
  QuestionDifficulty,
  QuestionSubjects,
} from "../enums/question.enum";

import { z } from "zod";

export const QuestionOptionSchema = z
  .object({
    text: z.string().optional(),
    image: z.string().optional(),
  })
  .refine((o) => o.text || o.image, {
    message: "Answer is required",
  });

export const QuestionCreationValidation = z.object({
  questionText: z.string().min(1, "Question is required"),
  questionImage: z.string().optional(),
  passage: z.string().optional(),
  subject: z.nativeEnum(QuestionSubjects, {
    invalid_type_error: "Invalid subject",
    required_error: "Subject is required",
  }),
  difficulty: z.nativeEnum(QuestionDifficulty, {
    invalid_type_error: "Invalid difficulty",
    required_error: "Difficulty is required",
  }),
  tags: z.array(z.string().trim()).optional(),
  optionType: z.nativeEnum(OptionType, {
    invalid_type_error: "Invalid option type",
    required_error: "Option type is required",
  }),
  options: z
    .array(QuestionOptionSchema)
    .min(1, "At least one option is required"),
  answers: z.array(z.number()).min(1, "At least one answer is required"),
});
