"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Tag, AlertCircle } from "lucide-react";
import { ReportStatus } from "@/lib/enums/status.enum";
import { ReportRes } from "@/lib/dtos/report.dto";

const BlockEditor = dynamic(
  () => import("@/components/common/blockEditor/BlockEditor"),
  { ssr: false },
);

interface ReportDetailsViewOnlyProps {
  reportData: ReportRes;
}

export default function ReportDetailsViewOnly({
  reportData,
}: ReportDetailsViewOnlyProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case ReportStatus.IN_REVIEW:
        return "[#F4BB44]"; // yellow
      case ReportStatus.ACCEPTED:
        return "[#478778]"; // green
      case ReportStatus.REJECTED:
        return "destructive"; // red
      default:
        return "gray-300";
    }
  };

  return (
    <div className="mx-auto my-8 w-full px-4">
      <Card
        className={`bg-white overflow-hidden transition-all duration-300 ${isHovered ? "shadow-2xl" : "shadow-lg"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* <CardHeader className="from-indigo-500 via-purple-500 to-pink-500 text-white bg-gradient-to-r p-6">
          <CardTitle className="flex items-center space-x-2 text-3xl font-bold">
            <FileText size={28} />
            <span>Report ID: {reportData.id}</span>
          </CardTitle>
        </CardHeader> */}

        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-gray-600 flex items-center text-sm font-medium">
                <Tag className="mr-2" size={16} />
                Report Level
              </div>
              <p className="text-gray-900 text-xl font-semibold">
                {reportData.reportLevel}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-gray-600 flex items-center text-sm font-medium">
                <AlertCircle className="mr-2" size={16} />
                Status
              </div>
              <section
                className={`text-sm font-medium  text-${getStatusColor(reportData.status)}`}
                // className={`text-sm font-medium text-[#F4BB44]`}
              >
                <strong
                  className={`rounded-lg border-2 border-solid border-${getStatusColor(reportData.status)} p-2`}
                >
                  {reportData.status}
                </strong>
              </section>
            </div>

            <div className="col-span-full space-y-2">
              <div className="text-gray-600 flex items-center text-sm font-medium">
                <Calendar className="mr-2" size={16} />
                Submitted At
              </div>
              <p className="text-gray-900 text-xl font-semibold">
                {new Date(reportData.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-gray-800 mb-4 text-2xl font-bold">Details</h2>
            <div className="bg-gray-50 border-gray-200 rounded-lg border p-4">
              <BlockEditor
                readOnly
                data={{ blocks: reportData.details, time: 0, version: "0" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
