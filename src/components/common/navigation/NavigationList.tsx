import { List, Typography } from "@mui/material";

import NavigationItem from "./NavigationItem";
import { SidebarGroup } from "@/lib/utils/routes/index.routes";
import { twMerge } from "tailwind-merge";

interface NavigationListProps {
  item: SidebarGroup;
  compact?: boolean;
  depth?: number;
}

export default function NavigationList({
  item,
  compact,
  depth = 0,
}: NavigationListProps) {
  return (
    <List
      disablePadding
      component="nav"
      dense
      subheader={
        <Typography
          variant="h6"
          fontWeight={600}
          color={"text.secondary"}
          textTransform={"uppercase"}
          fontSize={13}
          ml={2}
          className={twMerge("py-2", (compact || !item.header) && "hidden")}
        >
          {item.header}
        </Typography>
      }
    >
      {item.items.map((item) => (
        <NavigationItem
          key={item.text}
          link={item.link}
          icon={item.icon}
          text={item.text}
          compact={compact}
          decedent={item.child?.items}
          depth={depth}
        />
      ))}
    </List>
  );
}
