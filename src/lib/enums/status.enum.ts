export enum UserStatus {
  Onboarding = "onboarding",
  PasswordMissing = "password-missing",
  Active = "active",
  Inactive = "inactive",
  Waiting = "waiting",
  Trial = "trial",
  Lead = "lead",
}

export enum TaskStatus {
  TODO = "To_do",
  IN_PROGRESS = "In_Progress",
  IN_REVIEW = "In_Review",
  COMPLETED = "Completed",
}

export enum ReportStatus {
  TO_DO = "To Do",
  IN_REVIEW = "In Review",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
}

// to be updated later based on business logic
export enum ProfileStatus {
  TODO = "ToDo",
  IN_PROGRESS = "In Progress",
  IN_REVIEW = "In Review",
  COMPLETED = "Completed",
}
