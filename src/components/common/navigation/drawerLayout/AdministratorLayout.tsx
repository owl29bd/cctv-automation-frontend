"use client";

import { SIDEBAR_ITEMS } from "@/lib/utils/routes/index.routes";
import React from "react";
import MainLayout from "./MainLayout";

function AdministratorLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout sidebarItems={SIDEBAR_ITEMS.ADMINISTRATOR}>{children}</MainLayout>;
}

export default AdministratorLayout;
