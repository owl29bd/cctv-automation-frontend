"use client";
import CamerasTable from "@/components/administrator/tables/CamerasTable";
import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";

export default function CamerasPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionCardLayout
        title="All Cameras"
        subtitle="View and manage all cameras in the system."
        actionElementRight={
          <Button variant="contained" color="primary" startIcon={<MdAdd />}>
            Add Camera
          </Button>
        }
      >
        <CamerasTable />
      </SectionCardLayout>
    </div>
  );
}
