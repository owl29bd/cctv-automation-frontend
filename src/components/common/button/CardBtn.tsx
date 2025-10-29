import { Paper, Typography } from "@mui/material";
import React from "react";
import { twMerge } from "tailwind-merge";

interface CardBtnProps {
  title: string;
  description: string;
  icon: React.ElementType;
  clicked?: "previous" | "upcoming" | "";
}

export default function CardBtn({
  title,
  description,
  icon: Icon,
  clicked,
}: CardBtnProps) {
  return (
    <Paper
      variant="outlined"
      className={twMerge(
        "flex h-full cursor-pointer items-center gap-6 px-8 py-6 text-start hover:shadow-none",
      )}
      sx={{
        borderColor: "primary.main",
        boxShadow: "10px 10px",
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
  );
}
