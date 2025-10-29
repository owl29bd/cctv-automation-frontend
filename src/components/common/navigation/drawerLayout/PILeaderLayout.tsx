"use client";

import { SIDEBAR_ITEMS } from "@/lib/utils/routes/index.routes";
import React from "react";
import MainLayout from "./MainLayout";

function PILeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout sidebarItems={SIDEBAR_ITEMS.PILEADER}>{children}</MainLayout>
  );
}

export default PILeaderLayout;
