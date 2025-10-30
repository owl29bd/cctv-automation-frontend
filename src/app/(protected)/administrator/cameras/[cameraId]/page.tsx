"use client";

import CameraDetailsCard from "@/components/administrator/cards/CameraDetailsCard";
import SectionCardLayout from "@/components/common/card/SectionCardLayout";
import { CameraResponse, CameraStatus } from "@/lib/dtos/camera.dto";
import { Button } from "@mui/material";
import { MdRefresh } from "react-icons/md";

const cameraData = {
  id: "1",
  name: "Camera 1",
  description: "Camera 1 description",
  location: "Location 1",
  status: CameraStatus.Online,
  createdAt: new Date(),
  updatedAt: new Date(),
} as CameraResponse;

const onEdit = (camera: CameraResponse) => {
  console.log(camera);
};

const onMore = (camera: CameraResponse) => {
  console.log(camera);
};

export default function CameraDetailsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionCardLayout
        title="Camera Details"
        subtitle="View and manage camera details."
        actionElementRight={
          <Button variant="contained" color="primary" startIcon={<MdRefresh />}>
            Refresh
          </Button>
        }
      >
        <CameraDetailsCard
          camera={cameraData}
          onEdit={onEdit}
          onMore={onMore}
        />
      </SectionCardLayout>
    </div>
  );
}
