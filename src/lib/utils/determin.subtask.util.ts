import { TaskRes } from "../dtos/tasks.dto"

export const determineSubTask = (data: TaskRes) => {
    if (data.subTasks.length === 0) return true
    else return false
}