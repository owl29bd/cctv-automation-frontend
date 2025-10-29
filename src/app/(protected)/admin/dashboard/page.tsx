"use client";

import SectionCardLayout from "@/components/common/card/SectionCardLayout";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <SectionCardLayout title="Dashboard" subtitle="">
        <div className="flex items-center justify-center gap-4">
          Admin Dashboard...
        </div>
      </SectionCardLayout>
    </div>
  );
}
