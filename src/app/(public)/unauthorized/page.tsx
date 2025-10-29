"use client";

import { PublicHeader } from "@/components/homepage/PublicHeader";
import { Fab } from "@mui/material";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <PublicHeader/>
      <object
        data={"/unauthorized.svg"}
        type="image/svg+xml"
        className="max-h-[66%]"
      />

      <Fab
        variant="extended"
        color="primary"
        sx={{
          width: "300px",
        }}
        onClick={() => router.back()}
      >
        Take me back
      </Fab>
    </div>
  );
}
