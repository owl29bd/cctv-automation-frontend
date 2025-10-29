import { ExamType } from "../enums/exam-type.enum";
import { Gender } from "@/lib/enums/gender.enum";
import { WeekDay } from "@/lib/enums/day.enum";

export const genders = [
  {
    value: Gender.Male,
    label: "Male",
  },
  {
    value: Gender.Female,
    label: "Female",
  },
  {
    value: Gender.Other,
    label: "Other",
  },
  {
    value: Gender.Unknown,
    label: "Prefer Not To Say",
  },
];

export const weekDays = [
  {
    value: WeekDay.Monday,
    label: "Monday",
  },
  {
    value: WeekDay.Tuesday,
    label: "Tuesday",
  },
  {
    value: WeekDay.Wednesday,
    label: "Wednesday",
  },
  {
    value: WeekDay.Thursday,
    label: "Thursday",
  },
  {
    value: WeekDay.Friday,
    label: "Friday",
  },
  {
    value: WeekDay.Saturday,
    label: "Saturday",
  },
  {
    value: WeekDay.Sunday,
    label: "Sunday",
  },
];

export const examTypes = [
  {
    value: ExamType.SAT,
    label: "SAT",
  },
  {
    value: ExamType.ACT,
    label: "ACT",
  },
  {
    value: ExamType.AP,
    label: "AP",
  },
  {
    value: ExamType.Math,
    label: "Math",
  },
];
