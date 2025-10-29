export const APIUrl = {
  base: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
  auth: {
    signin: () => "/auth/login",
    signup: () => "/auth/register",
    socialSignin: () => "/auth/social-signin",
    googleSignUp: () => "/auth/google-login",
    googleApiSignin: () => "https://www.googleapis.com/oauth2/v3/userinfo",
    signout: () => "/auth/logout",
    refreshToken: () => "/auth/refresh-token",
    forgotPassword: () => "/auth/forgot-password",
    resetPassword: (token: string) => "/auth/reset-password/" + token,
  },
  onboarding: {
    parent: () => "/onboarding/parent",
    teacher: () => "/onboarding/teacher",
    student: () => "/onboarding/student",
  },
  user: {
    getUser: (userId: string) => "/user/" + userId,
  },
  userManagement: {
    get: () => "/user-management",
    getById: (id: string) => "/user-management/" + id,
    createUser: () => "/user-management/create",
    updateUser: (id: string) => "/user-management/update/" + id,
    deleteUser: (id: string) => "/user-management/" + id,
    getUsersByRole: (role: string) => "/user-management/getUsersByRole/" + role,
  },
  groupManagement: {
    get: () => "/user-group",
    getById: (id: string) => "/user-group/" + id,
    createGroup: () => "/user-group/create",
    updateGroup: (id: string) => "/user-group/update/" + id,
    deleteGroup: (id: string) => "/user-group/" + id,
    getMyGroupMembers: (id: string) =>
      "/user-group/getGroupMembersByGroupLeader/" + id,
  },
  file: {
    upload: () => "/file/upload",
    uploadMultiple: () => "/file/upload-multiple",
  },
  order: {
    create: () => "/order-management/create",
    getAll: () => "/order-management",
    getById: (id: string) => "/order-management/" + id,
    update: (id: string) => "/order-management/" + id,
    delete: (id: string) => "/order-management/" + id,
    uploadFiles: (orderId: string) =>
      "/order-management/" + orderId + "/file-upload",
  },
  taskManagement: {
    createSubTask: (taskId: string) =>
      "/task-management/createSubTask/" + taskId,
  },
  si: {
    getOrders: () => "/order-management",
    getProfilesByOrderId: (orderId: string) =>
      "/profile-management/getByOrderId/" + orderId,
    getProfileById: (profileId: string) => "/profile-management/" + profileId,
    getTasksByProfileId: (profileId: string) =>
      "/task-management/getByProfileId/" + profileId,
    getReportsByProfileId: (profileId: string) =>
      "/report-management/getByProfileId/" + profileId,
    getTasksByAssigneeId: (assigneeId: string) =>
      "/task-management/getByAssigneeId/" + assigneeId,
    getTaskByTaskId: (taskId: string) => "/task-management/" + taskId,
    createTaskForAllProfiles: () => "/task-management/bulk-create",
    getStagingReportsByOrderId: (orderId: string) =>
      "/report-management/getStagingReportsByOrderId/" + orderId,
    getTasksByAssignedToId: (assignedToId: string) =>
      "/task-management/getByAssignedToId/" + assignedToId,
    getTasksWithSubTasks: (taskId: string) =>
      "/task-management/getTaskWithSubTasks/" + taskId,
    assignTask: (taskId: string) => "/task-management/" + taskId,
    assignSubTask: (taskId: string) =>
      "/task-management/si/assignSubTask/" + taskId,
    getTaskByTaskType: (taskType: string) =>
      "/task-management/getByTaskType/" + taskType,
  },
  uploader: {
    profile: {
      create: () => "/profile-management/create",
      getAll: () => "/profile-management",
      getById: (id: string) => "/profile-management/" + id,
      update: (id: string) => "/profile-management/" + id,
      delete: (id: string) => "/profile-management/" + id,
      getByOrderId: (orderId: string) =>
        "/profile-management/get-uploader-profiles/" + orderId,
      getProfileByOrderId: (orderId: string) =>
        "/profile-management/getProfileByOrderId" + orderId,
    },
  },
  sa: {
    getSubTasks: (taskId: string) => "/task-management/getSubTasks/" + taskId,
    createSubTask: (parentTaskId: string) =>
      "/task-management/createSubTask/" + parentTaskId,
    getByAssignedToId: (assignedToId: string) =>
      "/task-management/getByAssignedToId/" + assignedToId,
    getTasksByAssigneeId: (assignedById: string) =>
      "/task-management/getByAssigneeId/" + assignedById,
    getTaskById: (taskId: string) => "/task-management/" + taskId,
    approveReport: (reportId: string) =>
      "/report-management/approve/" + reportId,
  },
  reportManagement: {
    createReport: (taskId: string) => "/report-management/create/" + taskId,
    getReportById: (reportId: string) => "/report-management/" + reportId,
    getFinalReportsByOrderId: (orderId: string) =>
      "/report-management/getFinalReportsByOrderId/" + orderId,
  },
  // question: {
  //   create: () => "/question/create",
  //   get: () => "/question",
  //   getById: (id: string) => "/question/" + id,
  //   update: (id: string) => "/question/update/" + id,
  // },
  // questionSet: {
  //   get: () => "/question-set",
  //   create: () => "/question-set/create",
  //   getById: (id: string) => "/question-set/" + id,
  // },
  // satExam: {
  //   create: () => "/exam/sat/create",
  // },
  // reinforcementAssignment: {
  //   create: () => "/assignment/renforcement/create",
  // },
  // lesson: {
  //   create: () => "/lesson-plan/create",
  //   get: () => "/lesson-plan",
  //   getById: (id: string) => "/lesson-plan/" + id,
  //   update: (id: string) => "/lesson-plan/update/" + id,
  // },
  // coursework: {
  //   get: () => "/coursework",
  //   assign: (courseworkId: string) => "/coursework/assign/" + courseworkId,
  //   getById: (id: string) => "/coursework/" + id,
  // },
  // courseModule: {
  //   create: () => "/course-module/create",
  //   get: () => "/course-module",
  //   getById: (id: string) => "/course-module/" + id,
  // },
};

export const RouteUrls = {
  dashboard: { index: "/dashboard" },
  auth: {
    signin: "/auth/signin",
    signup: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password/[token]",
  },
  admin: {
    dashboard: {
      index: "/admin/dashboard",
    },
    analytics: { index: "/admin/analytics" },
    billingManagement: { index: "/admin/billing-management" },
    coursework: {
      index: "/admin/coursework",
      courses: {
        index: "/admin/coursework/courses",
        create: "/admin/coursework/courses/create",
        course: (courseId: string) => `/admin/coursework/courses/${courseId}`,
      },
      pricing: {
        index: "/admin/coursework/pricing",
      },
      orders: {
        index: "/admin/coursework/orders",
      },
      assignments: {
        index: "/admin/coursework/assignments",
        create: "/admin/coursework/assignments/create",
        reinforcement: {
          index: "/admin/coursework/assignments/create/reinforcement",
          questionSet:
            "/admin/coursework/assignments/create/reinforcement/question-set",
          questions:
            "/admin/coursework/assignments/create/reinforcement/questions",
        },
        details: {
          index: "/admin/coursework/assignments/details",
          assignment: (assignmentId: string) =>
            `/admin/coursework/assignments/details/${assignmentId}`,
          student: (assignmentId: string, studentId: string) =>
            `/admin/coursework/assignments/details/${assignmentId}/${studentId}`,
        },
      },
      exams: {
        index: "/admin/coursework/exams",
        create: {
          index: "/admin/coursework/exams/create",
          sat: "/admin/coursework/exams/create/sat",
        },
        details: {
          index: "/admin/coursework/exams/details",
          exam: (examId: string) => `/admin/coursework/exams/details/${examId}`,
          student: (examId: string, studentId: string) =>
            `/admin/coursework/exams/details/${examId}/${studentId}`,
        },
      },
      lessons: {
        index: "/admin/coursework/lessons",
        create: "/admin/coursework/lessons/create",
        lesson: {
          index: (lessonId: string) => `/admin/coursework/lessons/${lessonId}`,
          update: (lessonId: string) =>
            `/admin/coursework/lessons/${lessonId}/update`,
        },
      },
      questionSets: {
        index: "/admin/coursework/question-sets",
        create: "/admin/coursework/question-sets/create",
        questionSet: (questionSetId: string) =>
          `/admin/coursework/question-sets/${questionSetId}`,
      },
      questions: {
        index: "/admin/coursework/questions",
        create: "/admin/coursework/questions/create",
        update: (questionId: string) =>
          `/admin/coursework/questions/edit/${questionId}`,
      },
    },
    enrollment: {
      index: "/admin/enrollment",
      assignTutors: {
        index: "/admin/enrollment/assign-tutors",
      },
    },
    familyBilling: {
      index: "/admin/family-billing",
    },
    manageFamilyAccounts: {
      index: "/admin/manage-family-accounts",
    },
    progressReports: {
      index: "/admin/progress-reports",
    },
    systemSettings: {
      index: "/admin/system-settings",
    },
    userManagement: {
      index: "/admin/user-management",
    },
    groupManagement: {
      index: "/admin/group-management",
    },
  },
  student: {
    dashboard: {
      index: "/student/dashboard",
    },
    coursework: {
      index: "/student/coursework",
      course: (courseId: string) => `/student/coursework/${courseId}`,
    },
  },
};
