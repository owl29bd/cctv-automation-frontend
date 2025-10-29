"use client";

import { SIDEBAR_ITEMS } from "@/lib/utils/routes/index.routes";
import React from "react";
import MainLayout from "./MainLayout";

function InvestigatorLayout({ children }: { children: React.ReactNode }) {
  
  return <MainLayout sidebarItems={SIDEBAR_ITEMS.INVESTIGATOR}>{children}</MainLayout>;
}

export default InvestigatorLayout;
