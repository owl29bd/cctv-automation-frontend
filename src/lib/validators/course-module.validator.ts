import { CourseSessionType } from "../enums/course-session.enum";

import { z } from "zod";
import { CourseModuleCategory } from "../enums/course-module.enum";
import { Role } from "../enums/role.enum";

export const CoruseModuleCreationValidation = z.object({
  title: z.string().min(1, "Title is required"),
  basePrice: z.number().int().min(0, "Price must be greater than 0"),
  category: z.nativeEnum(CourseModuleCategory, {
    invalid_type_error: "Invalid category",
    required_error: "Category is required",
  }),
  tags: z.array(z.string().trim(), {
    required_error: "Tags are required",
  }),
  visibleTo: z.array(
    z.nativeEnum(Role, {
      invalid_type_error: "Invalid role",
      required_error: "Role is required",
    }),
    {
      required_error: "Role is required",
    },
  ),
  sessions: z.array(
    z.object({
      type: z.nativeEnum(CourseSessionType, {
        invalid_type_error: "Invalid session type",
        required_error: "Session type is required",
      }),
      sessionId: z.string(),
      duration: z.number().int().min(0, "Duration is required"),
    }),
  ),
});
