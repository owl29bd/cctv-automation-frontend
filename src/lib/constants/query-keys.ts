const questions = {
  getQuestions: "getQuestions",
  getQuestion: "getQuestion",
};

const questionSets = {
  getQuestionSets: "getQuestionSets",
  getQuestionSet: "getQuestionSet",
};

const userManagement = {
  getUsers: "getUsers",
  getUser: "getUser",
  getUsersByRole: "getUsersByRole",
};

const groupManagement = {
  getGroups: "getGroups",
  getGroup: "getGroup",
  postGroup: "postGroup",
  getGroupByGroupLeader: "getGroupByGroupLeader",
};

const orderManagement = {
  getOrders: "getOrders",
  getOrder: "getOrder",
};

const lesson = {
  getLessons: "getLessons",
  getLesson: "getLesson",
};

const courseworks = {
  getCourseworks: "getCourseworks",
  getCoursework: "getCoursework",
};

const courseModule = {
  getCourseModules: "getCourseModules",
  getCourseModule: "getCourseModule",
};

const siModule = {
  getOrders: "getOrders",
  getProfilesByOrderId: "getProfilesByOrderId",
  getProfileById: "getProfileById",
  getTasksByProfileId: "getTasksByProfileId",
  getReportsByProfileId: "getReportsByProfileId",
  getTasksByAssigneeId: "getTasksByAssigneeId",
  getTaskByTaskId: "getTaskByTaskId",
  createTaskForAllProfiles: "createTaskForAllProfiles",
  getStagingReportsByOrderId: "getStagingReportsByOrderId",
  getTasksByAssignedToId: "getTasksByAssignedToId",
  getTasksWithSubTasks: "getTasksWithSubTasks",
  getTaskByTaskType: "getTaskByTaskType",
};

const uploaderProfileManagement = {
  getProfiles: "getProfiles",
  getProfile: "getProfile",
  getProfileByOrderId: "getProfileByOrderId",
  getProfilesByOrderId: "getProfilesByOrderId",
};

const saTaskManagement = {
  getTasks: "getTasks",
  getTask: "getTask",
  getGroupMembers: "getGroupMembers",
  getSubTasks: "getSubTasks",
};

const reportManagement = {
  getReport: "getReport",
  getFinalReportsByOrderId: "getFinalReportsByOrderId",
};

export const QUERYKEYS = {
  questions,
  questionSets,
  userManagement,
  lesson,
  courseworks,
  courseModule,
  groupManagement,
  orderManagement,
  siModule,
  uploaderProfileManagement,
  saTaskManagement,
  reportManagement,
};
