import { Box, Typography } from "@mui/material";

import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-auto w-full">
      <Box
        borderTop={1}
        borderColor="divider"
        className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6"
      >
        <div className="flex flex-col gap-2">
          <Typography variant="body2" color={"text.secondary"}>
            © 2025 All rights reserved.
          </Typography>

          <Typography
            variant="body2"
            fontWeight={500}
            className="flex items-center gap-4"
          >
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </Typography>
        </div>
      </Box>
    </footer>
  );
}

export default Footer;
