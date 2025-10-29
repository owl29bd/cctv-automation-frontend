import useOrderManagementAction from "@/hooks/userOrderAction";
import { Card, CardContent, LinearProgress, Typography } from "@mui/material";
import dayjs from "dayjs";
import { BusIcon, CalendarIcon, CheckCircleIcon, UserIcon } from "lucide-react";

interface OrderDetailsCardProps {
  orderId: string;
}
export default function OrderDetailsCard({ orderId }: OrderDetailsCardProps) {
  const { useOrderQuery } = useOrderManagementAction();
  const { data, isLoading } = useOrderQuery(orderId);

  if (isLoading) return <LinearProgress />;
  return (
    <Card className="mx-auto w-full p-4" variant="outlined">
      <CardContent className="mx-auto w-full">
        <div className=" grid grid-rows-2 gap-4 lg:grid-cols-2 lg:grid-rows-1">
          <DisplayDataWithIcon
            Icon={UserIcon}
            title="Client Name"
            data={data?.clientName}
          />
          <DisplayDataWithIcon
            Icon={CalendarIcon}
            title="Created At"
            data={dayjs(data?.createdAt).format("dddd, MMMM D, YYYY h:mm A")}
          />
          <DisplayDataWithIcon
            Icon={CalendarIcon}
            title="Updated At"
            data={dayjs(data?.updatedAt).format("dddd, MMMM D, YYYY h:mm A")}
          />
          <DisplayDataWithIcon
            Icon={CalendarIcon}
            title="Due Date"
            data={dayjs(data?.dueDate).format("dddd, MMMM D, YYYY h:mm A")}
          />
          <DisplayDataWithIcon
            Icon={CheckCircleIcon}
            title="Remarks"
            data={data?.remarks}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function DisplayDataWithIcon({
  Icon,
  data,
  title,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  data?: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6" />
        <Typography fontWeight={600}>{title}:</Typography>
      </div>
      <Typography>{data}</Typography>
    </div>
  );
}
