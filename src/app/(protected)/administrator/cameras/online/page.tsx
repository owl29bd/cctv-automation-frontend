"use client";
import CamerasTable from "@/components/administrator/tables/CamerasTable";
import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { Button } from "@mui/material";
import { MdRefresh } from "react-icons/md";

export default function OnlineCamerasPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionCardLayout
        title="Online Cameras"
        subtitle="View and manage online cameras in the system."
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
