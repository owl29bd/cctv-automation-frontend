import { TaskStatus } from "../enums/status.enum";

export const getChipColorForTaskStatus = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.COMPLETED:
        return "primary";
        case TaskStatus.IN_PROGRESS:
        return "secondary";
        case TaskStatus.IN_REVIEW:
        return "warning";
        case TaskStatus.TODO:
        return "error";
        default:
        return "default";
    }
};