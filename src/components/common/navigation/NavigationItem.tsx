"use client";

import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Tooltip,
  useTheme,
} from "@mui/material";
import { MouseEvent, useState } from "react";

import { RiArrowDownSLine as ArrowDownIcon } from "react-icons/ri";
import Link from "next/link";
import NavigationList from "./NavigationList";
import { SidebarItem } from "@/lib/utils/routes/index.routes";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

interface INavigation {
  depth?: number;
  text: string;
  icon: React.ElementType;
  link: string;
}

interface NavigationItemProps extends INavigation {
  compact?: boolean;
  decedent?: Array<SidebarItem>;
}

export default function NavigationItem({
  depth = 0,
  text,
  icon: Icon,
  link,
  decedent,
  compact,
}: NavigationItemProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const pathname = usePathname();

  const isActiveLink = (itemLink: string) => {
    return (
      pathname.includes(itemLink) ||
      (itemLink !== "/" && pathname.startsWith(itemLink))
    );
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (decedent && !compact) {
      setOpen(!open);
    } else if (compact && decedent) {
      setAnchor(e.currentTarget);
    }
  };

  return (
    <div>
      <Tooltip
        title={text}
        arrow
        placement="right"
        disableHoverListener={!compact}
      >
        <ListItem
          component={decedent ? "div" : Link}
          href={link}
          disablePadding
          sx={{ py: 0.5 }}
        >
          <ListItemButton
            selected={isActiveLink(link)}
            onClick={handleClick}
            sx={{
              borderRadius: 1,
              minWidth: 0,
              justifyContent: compact ? "center" : "initial",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: compact ? 0 : 2,
                ml: compact ? 0 : depth * 2,
                p: compact ? 1 : 0,
              }}
            >
              <Icon
                size={20}
                className="flex-shrink-0"
                color={theme.palette.primary.main}
              />
            </ListItemIcon>

            <ListItemText
              primary={text}
              primaryTypographyProps={{
                variant: "h6",
                fontSize: 14,
              }}
              className={twMerge(compact && "hidden")}
            />

            <ArrowDownIcon
              size={20}
              className={twMerge(
                "hidden transition-transform",
                open && "rotate-180",
                decedent && "block",
              )}
            />
          </ListItemButton>
        </ListItem>
      </Tooltip>

      {decedent && (
        <>
          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  overflow: "visible",
                  ml: 2,
                  px: 1,
                  mt: -0.5,
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 20,
                    left: 0,
                    width: 14,
                    height: 14,
                    borderColor: "divider",
                    borderWidth: "1px 0px 0px 1px",
                    bgcolor: "background.paper",
                    transform: "translateX(-50%) rotate(-45deg)",
                  },
                },
              },
            }}
          >
            <NavigationList depth={depth} item={{ items: decedent }} />
          </Menu>

          {!compact && (
            <Collapse in={open}>
              <NavigationList item={{ items: decedent }} depth={depth + 1} />
            </Collapse>
          )}
        </>
      )}
    </div>
  );
}
