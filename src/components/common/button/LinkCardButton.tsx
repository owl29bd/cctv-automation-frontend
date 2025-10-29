import { Paper, Typography } from "@mui/material";

import Link from "next/link";
import React from "react";

interface LinkCardButtonProps {
  title: string;
  description: string;
  icon: React.ElementType;
  link?: string;
}

export default function LinkCardButton({
  title,
  description,
  icon: Icon,
  link,
}: LinkCardButtonProps) {
  return (
    <Link href={link || "/"}>
      <Paper
        variant="outlined"
        className="flex h-full cursor-pointer items-center gap-6 px-8 py-6 text-start hover:shadow-none"
        sx={{
          boxShadow: "10px 10px",
          borderColor: "primary.main",
        }}
      >
        <Icon size={40} />

        <div className="flex flex-1 flex-col gap-1">
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            {description}
          </Typography>
        </div>
      </Paper>
    </Link>
  );
}
