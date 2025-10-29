"use client";

import { SIDEBAR_ITEMS } from "@/lib/utils/routes/index.routes";
import React from "react";
import MainLayout from "./MainLayout";

function ReportApproverLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout sidebarItems={SIDEBAR_ITEMS.REPORT_APPROVER}>{children}</MainLayout>
  );
}

export default ReportApproverLayout;
