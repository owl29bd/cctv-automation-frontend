import {
  Card,
  CardContent,
  CardHeader,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

import React from "react";

type SectionCardLayoutProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  avatarElementLeft?: React.ReactNode;
  actionElementRight?: React.ReactNode;
  sx?: {
    card?: SxProps<Theme>;
    content?: SxProps<Theme>;
  };
  children: React.ReactNode;
};

export default function SectionCardLayout({
  title,
  subtitle,
  avatarElementLeft,
  actionElementRight,
  sx,
  children,
}: SectionCardLayoutProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        borderLeft: 6,
        overflow: "visible",
        ...sx?.card,
      }}
    >
      <CardHeader
        avatar={avatarElementLeft}
        action={actionElementRight}
        title={
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
        }
        subheader={subtitle}
      />
      <CardContent
        sx={{
          ...sx?.content,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}
