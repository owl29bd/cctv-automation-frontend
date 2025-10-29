"use client";

import CamerasTable from "@/components/administrator/tables/CamerasTable";
import SectionCardLayout from "@/components/common/card/SectionCardLayout";

export default function AdministratorDashboardPage() {
  return (
    <div className="p-6">
      <SectionCardLayout title="Dashboard" subtitle="Administrator">
        <div className="flex flex-col gap-4">
          <CamerasTable />
        </div>
      </SectionCardLayout>
    </div>
  );
}
