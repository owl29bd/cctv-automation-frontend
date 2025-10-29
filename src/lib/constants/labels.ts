import { OptionType, QuestionDifficulty } from "@/lib/enums/question.enum";

import { ExamType } from "@/lib/enums/exam-type.enum";
import { Gender } from "@/lib/enums/gender.enum";
import { QuestionSetCategory } from "@/lib/enums/question-set.enum";
import { CourseModuleCategory } from "../enums/course-module.enum";

export const labels = {
  [OptionType.McqText]: "MCQ Text",
  [OptionType.McqImage]: "MCQ Image",
  [OptionType.GridIn]: "Grid In",
  [ExamType.SAT]: "SAT",
  [ExamType.ACT]: "ACT",
  [ExamType.AP]: "AP",
  [ExamType.Math]: "Math",
  [QuestionSetCategory.SATMath]: "SAT Math",
  [QuestionSetCategory.SATReadingWriting]: "SAT Reading Writing",
  [QuestionSetCategory.General]: "General",
  [Gender.Female]: "Female",
  [Gender.Male]: "Male",
  [Gender.Other]: "Other",
  [Gender.Unknown]: "Prefer not to say",
  [QuestionDifficulty.Easy]: "Easy",
  [QuestionDifficulty.Base]: "Base",
  [QuestionDifficulty.Hard]: "Hard",
};

export const courseModuleCategoryLabels = {
  [CourseModuleCategory.SAT_Math]: "SAT Math",
  [CourseModuleCategory.SAT_Reading_Writing]: "SAT Reading Writing",
};
