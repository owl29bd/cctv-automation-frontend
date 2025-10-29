"use client";

import { Button, Tooltip, useTheme } from "@mui/material";

import { RiLogoutCircleRLine as LogoutIcon } from "react-icons/ri";
import NavigationList from "./NavigationList";
import { SidebarGroup } from "@/lib/utils/routes/index.routes";
import { twMerge } from "tailwind-merge";
import useAuthAction from "@/hooks/useAuthAction";

interface DrawerContentProps {
  items: SidebarGroup[];
  compact?: boolean;
}

export default function DrawerContent({
  items,
  compact = false,
}: DrawerContentProps) {
  const theme = useTheme();

  const { signoutMutation } = useAuthAction();

  const onSignout = async () => {
    signoutMutation.mutate();
  };

  return (
    <div className="flex h-screen flex-col gap-10 overflow-auto px-4 py-6">
      <div className={twMerge("flex flex-col", !compact && "gap-6")}>
        {items.map((item) => (
          <NavigationList key={item.header} item={item} compact={compact} />
        ))}
      </div>

      <Tooltip
        title="Logout"
        disableHoverListener={!compact}
        arrow
        placement="right"
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            marginTop: "auto",
            gap: 1,
            minWidth: 40,
            padding: 1,
          }}
          onClick={onSignout}
        >
          <LogoutIcon size={20} />
          {compact ? null : "LOGOUT"}
        </Button>
      </Tooltip>
    </div>
  );
}
