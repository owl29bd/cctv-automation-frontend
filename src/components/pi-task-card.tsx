import { TaskRes } from "@/lib/dtos/tasks.dto";
import { TaskStatus } from "@/lib/enums/status.enum";
import { Card, CardContent, Chip, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  CalendarIcon,
  CheckCircleIcon,
  GroupIcon,
  UserIcon,
} from "lucide-react";
import React, { ReactNode } from "react";
import { SiStatuspal } from "react-icons/si";
import { RiFileTextLine } from "react-icons/ri";
import { getChipColorForTaskStatus } from "@/lib/utils/chip.color.util";

interface Props {
  data?: TaskRes;
}

const TaskDetail = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: ReactNode;
}) => (
  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
    <div className="flex items-center gap-2">
      <Icon className="h-6 w-6" />
      <Typography fontWeight={600}>{label}:</Typography>
    </div>
    <Typography>{value}</Typography>
  </div>
);

const TaskStatusComponent = ({ status }: { status: TaskStatus }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <SiStatuspal className="h-6 w-6" />
        <Typography fontWeight={600}>Task Status: </Typography>
      </div>
      <Chip
        label={<strong>{status}</strong>}
        variant="outlined"
        color={getChipColorForTaskStatus(status)}
      />
    </div>
  );
};

export default function PiTaskCard({ data }: Props) {
  if (!data) return null;

  return (
    <Card className="mx-auto w-full" variant="outlined">
      <CardContent className="grid gap-4 p-4">
        <div className="grid grid-rows-2 gap-4 lg:grid-cols-2 lg:grid-rows-1">
          <TaskDetail
            icon={CheckCircleIcon}
            label="Task Type"
            value={data.taskType}
          />
          <TaskStatusComponent status={data.status} />

          <TaskDetail
            icon={UserIcon}
            label="Assigned By"
            value={
              data.assignedBy
                ? `${data.assignedBy?.firstName} ${data.assignedBy?.lastName}`
                : ""
            }
          />
          <TaskDetail
            icon={GroupIcon}
            label="Assigned To"
            value={data.assignedTo.map((user) => (
              <span key={user.id}>
                {user.firstName + " " + user.lastName + ","}
              </span>
            ))}
          />

          <TaskDetail
            icon={RiFileTextLine}
            label="Reports"
            value={`${data.reports.length} Reports`}
          />

          <TaskDetail
            icon={CalendarIcon}
            label="Due Date"
            value={dayjs(data.dueDate).format("dddd, MMMM D, YYYY h:mm A")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
