import { QuestionSubjects } from "@/lib/enums/question.enum";
import { z } from "zod";

export const LessonCreationValidation = z.object({
  title: z.string().min(1, "Question is required"),

  subject: z.nativeEnum(QuestionSubjects, {
    invalid_type_error: "Invalid subject",
    required_error: "Subject is required",
  }),

  tags: z.array(z.string().trim()).optional(),

  content: z.array(z.any()).min(1, "Content is required"),
});
