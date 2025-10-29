"use client";

import { Chip, Typography } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { RiLogoutCircleRLine as LogoutIcon } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useAuthAction from "@/hooks/useAuthAction";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AccountMenu() {
  const { signoutMutation } = useAuthAction();

  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        avatar={
          <Avatar
            src={
              // session?.user.profileImage ||
              "https://uko-react.vercel.app/static/avatar/001-man.svg"
            }
          />
        }
        color="primary"
        label={
          session?.user?.firstName + " " + session?.user?.lastName ||
          "Loading..."
        }
        clickable
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{ dense: true }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              overflow: "visible",
              mt: 1.5,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 12,
                height: 12,
                borderColor: "divider",
                borderWidth: "1px 0 0 1px",
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
              },
            },
          },
        }}
      >
        <MenuItem>
          <Avatar
            alt="User Avatar"
            sx={{ ml: -0.5, mr: 1, width: 32, height: 32 }}
            src={
              session?.user?.profileImage ||
              "https://uko-react.vercel.app/static/avatar/001-man.svg"
            }
          />

          <div className="min-w-40">
            <Typography fontWeight={600} fontSize={14}>
              {session?.user?.firstName + " " + session?.user?.lastName ||
                "Loading..."}
            </Typography>
            <Typography fontSize={12}>
              {session?.user?.email || "Loading..."}
            </Typography>
          </div>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            signoutMutation.mutate();
          }}
        >
          <ListItemIcon color="primary">
            <LogoutIcon size={18} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
