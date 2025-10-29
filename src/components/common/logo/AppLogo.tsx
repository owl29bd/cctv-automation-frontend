import { Typography } from "@mui/material";
import { Cctv } from "lucide-react";
import Link from "next/link";

function AppLogo() {
  return (
    <Typography variant="h5" color="primary" fontWeight={700}>
      <Link href="/" className="flex items-center gap-2">
        <Cctv size={24} />
        CCTV Automation
      </Link>
    </Typography>
  );
}

export default AppLogo;
