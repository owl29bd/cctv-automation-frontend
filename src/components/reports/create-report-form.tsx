"use client";

import {
  CreateReportReq,
  CreateReportValidation,
} from "@/lib/dtos/create-report-dto";
import { TaskRes } from "@/lib/dtos/tasks.dto";
import { default as ReportSubmitStrategy } from "@/lib/utils/report.submit.strategy.util";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import SectionCardLayout from "../common/card/SectionCardLayout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ReportStatus } from "@/lib/enums/status.enum";
import { ReportRes } from "@/lib/dtos/report.dto";
import useSiTaskManagementAction from "@/hooks/si/useSiTaskManagementAction";

const BlockEditor = dynamic(
  () => import("@/components/common/blockEditor/BlockEditor"),
  {
    ssr: false,
  },
);

export default function CreateReportForm({
  taskData,
  onSubmit,
}: {
  onSubmit: (data: CreateReportReq) => void;
  taskData?: TaskRes;
}) {
  // hooks
  const session = useSession();
  const { useGetTasksWithSubTasks } = useSiTaskManagementAction();

  // get task details
  const { data: thisTaskWithSubTask, isLoading: isTaskLoading } =
    useGetTasksWithSubTasks(taskData?.id || "");

  const subTasks =
    (thisTaskWithSubTask && thisTaskWithSubTask.data[0]?.subTasks) || [];

  const approvedReports: ReportRes[] = [];
  subTasks.forEach((subTask) => {
    const reports = subTask.reports;

    reports.forEach((report) => {
      if (report.status === ReportStatus.ACCEPTED) {
        approvedReports.push(report);
      }
    });
  });

  // TODO: filter 2 individuals latest accepted reports

  const reportLevelAndStatus = ReportSubmitStrategy.getReportSubmitStrategy(
    taskData?.taskType,
  );

  const form = useForm<CreateReportReq>({
    resolver: zodResolver(CreateReportValidation),
    defaultValues: {
      orderId: taskData?.orderId?.id,
      profileId: taskData?.profileId?.id,
      submittedBy: session.data?.user?.id,
      ...reportLevelAndStatus,
    },
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  if (!session) return null;

  return (
    <div className="p-6">
      <SectionCardLayout title="Create Report">
        <div className="">
          <div className="flex w-full justify-center gap-2 pb-4">
            {approvedReports.length > 0 && (
              <div className="w-full p-2">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div className="flex-col">
                      <p>
                        <strong>{approvedReports[0].reportLevel}</strong>
                      </p>
                      <p>
                        <strong>Submitted By:</strong>{" "}
                        {approvedReports[0].submittedBy.id}
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="w-full border-2">
                      <BlockEditor
                        readOnly
                        data={{
                          blocks: approvedReports[0].details,
                          time: 0,
                          version: "0",
                        }}
                      />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            )}
            {approvedReports.length > 1 && (
              <div className="w-full p-2">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div className="flex-col">
                      <p>
                        <strong>{approvedReports[1].reportLevel}</strong>
                      </p>
                      <p>
                        <strong>Submitted By:</strong>{" "}
                        {approvedReports[1].submittedBy.id}
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="w-full border-2">
                      <BlockEditor
                        readOnly
                        data={{
                          blocks: approvedReports[1].details,
                          time: 0,
                          version: "0",
                        }}
                      />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            )}
          </div>
          <div className="w-full">
            <FormProvider {...form}>
              <form
                className="w-full space-y-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="border-2">
                  <BlockEditor
                    placeholder="Write Your Report Here..."
                    onData={(data) => setValue("details", data?.blocks)}
                    data={{ blocks: [] }}
                  />
                </div>
                <Button type="submit" fullWidth variant="contained">
                  Submit Report
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </SectionCardLayout>
    </div>
  );
}
