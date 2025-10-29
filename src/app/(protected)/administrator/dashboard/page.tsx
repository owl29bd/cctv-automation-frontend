"use client";

import CameraStatusCard from "@/components/administrator/cards/CameraStatusCard";
import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { CameraStatus } from "@/lib/dtos/camera.dto";

export default function AdministratorDashboardPage() {
  return (
    <div className="p-6">
      <SectionCardLayout title="Dashboard" subtitle="Administrator">
        <div className="flex flex-col gap-4">
          {/* Number of cameras by status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <CameraStatusCard status={CameraStatus.Online} count={10} />
            <CameraStatusCard status={CameraStatus.Offline} count={5} />
            <CameraStatusCard status={CameraStatus.Maintenance} count={3} />
          </div>
        </div>
      </SectionCardLayout>
    </div>
  );
}
