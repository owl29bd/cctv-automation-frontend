import { TaskRes } from "@/lib/dtos/tasks.dto";
import { TaskStatus } from "@/lib/enums/status.enum";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  CalendarIcon,
  ClipboardListIcon,
  GroupIcon,
  UserIcon,
} from "lucide-react";
import { CiCalendarDate } from "react-icons/ci";
import { GrStatusGood } from "react-icons/gr";
import { SiTyper } from "react-icons/si";

export default function TaskCard({ data }: { data: TaskRes }) {
  return (
    <Card className="mx-auto w-full shadow-lg">
      <CardHeader
        title={
          <div className="bg-blue-100 flex items-center gap-2 rounded-t-lg p-4">
            <ClipboardListIcon className="h-8 w-8 text-muted-foreground" />
            <Typography variant="h6" component="h1">
              Task {data.id}
            </Typography>
          </div>
        }
      />
      <CardContent className="grid gap-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <UserIcon className="h-6 w-6 text-muted-foreground" />
            <Typography variant="body2" component="span">
              Assigned By:{" "}
              {data.assignedBy &&
                data.assignedBy.firstName + " " + data.assignedBy.lastName}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <GrStatusGood className="h-6 w-6 text-muted-foreground" />
            <Typography variant="body2" component="span">
              Task Status:
              {data.status === "To_do" && (
                <span className="rounded-md bg-[#c90404] p-1 font-bold text-[#fff]">
                  {" "}
                  {data.status}
                </span>
              )}
              {data.status === TaskStatus.IN_REVIEW && (
                <span className="rounded-md bg-[#f59e0b] p-1 font-bold text-[#fff]">
                  {" "}
                  {data.status}
                </span>
              )}
              {data.status === TaskStatus.COMPLETED && (
                <span className="rounded-md bg-[#2dce89] p-1 font-bold text-[#bdbbbb]">
                  {" "}
                  {data.status}
                </span>
              )}
              {data.status === TaskStatus.IN_PROGRESS && (
                <span className="rounded-md bg-[#f59e0b] p-1 font-bold text-[#fff]">
                  {" "}
                  {data.status}
                </span>
              )}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-muted-foreground" />
            <Typography variant="body2" component="span">
              Created At:{" "}
              {dayjs(data.createdAt).format("dddd, MMMM D, YYYY h:mm A")}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <SiTyper className="h-6 w-6 text-muted-foreground" />
            <Typography variant="body2" component="span">
              Task Type:{" "}
              <span className="rounded-md bg-[#a646ff] p-1 font-bold text-[#fff]">
                {" "}
                {data.taskType}
              </span>
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-muted-foreground" />
            <Typography variant="body2" component="span">
              Updated At:{" "}
              {dayjs(data.updatedAt).format("dddd, MMMM D, YYYY h:mm A")}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <CiCalendarDate className="h-6 w-6 text-muted-foreground" />
            <Typography variant="body2" component="span" color="error">
              Due Date:{" "}
              {dayjs(data.dueDate).format("dddd, MMMM D, YYYY h:mm A")}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="flex items-center gap-2">
          <GroupIcon className="h-6 w-6 text-muted-foreground" />
          <Typography variant="body2" component="span">
            Assigned To:{" "}
            {data.assignedTo.map((user) => (
              <span key={user.id}>
                {user.firstName + " " + user.lastName + ","}
              </span>
            ))}
          </Typography>
        </div>
      </CardContent>
      <CardActions className="justify-end p-4">{}</CardActions>
    </Card>
  );
}
