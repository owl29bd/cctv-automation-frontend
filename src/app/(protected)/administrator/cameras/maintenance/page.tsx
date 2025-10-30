"use client";
import MaintenanceCamerasTable from "@/components/administrator/tables/MaintenaceCamerasTable";
import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { Button } from "@mui/material";
import { MdRefresh } from "react-icons/md";

export default function MaintenanceCamerasPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionCardLayout
        title="Maintenance Cameras"
        subtitle="View and manage maintenance cameras in the system."
        actionElementRight={
          <Button variant="contained" color="primary" startIcon={<MdRefresh />}>
            Refresh
          </Button>
        }
      >
        <MaintenanceCamerasTable />
      </SectionCardLayout>
    </div>
  );
}
