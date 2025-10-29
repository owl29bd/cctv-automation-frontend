"use client";

import { SIDEBAR_ITEMS } from "@/lib/utils/routes/index.routes";
import React from "react";
import MainLayout from "./MainLayout";

export default function SiLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout sidebarItems={SIDEBAR_ITEMS.SI}>{children}</MainLayout>;
}
