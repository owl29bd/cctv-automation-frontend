"use client";
import CamerasTable from "@/components/administrator/tables/CamerasTable";
import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { Button } from "@mui/material";
import { MdRefresh } from "react-icons/md";

export default function OfflineCamerasPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionCardLayout
        title="Offline Cameras"
        subtitle="View and manage offline cameras in the system."
        actionElementRight={
          <Button variant="contained" color="primary" startIcon={<MdRefresh />}>
            Refresh
          </Button>
        }
      >
        <CamerasTable />
      </SectionCardLayout>
    </div>
  );
}
