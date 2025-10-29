"use client";

import { SIDEBAR_ITEMS } from "@/lib/utils/routes/index.routes";
import React from "react";
import MainLayout from "./MainLayout";

function ServiceProviderLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout sidebarItems={SIDEBAR_ITEMS.SERVICE_PROVIDER}>{children}</MainLayout>;
}

export default ServiceProviderLayout;
