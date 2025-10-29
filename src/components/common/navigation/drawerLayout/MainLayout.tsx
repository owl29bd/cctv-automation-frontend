"use client";

import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material";

import AccountMenu from "@/components/common/menu/AccountMenu";
import AppLogo from "@/components/common/logo/AppLogo";
import DrawerContent from "../DrawerContent";
import Footer from "@/components/common/footer/Footer";
import { RiMenu2Line as MenuIcon } from "react-icons/ri";
import { SidebarGroup } from "@/lib/utils/routes/index.routes";
import { useState } from "react";

const drawerWidth = 300;
const compactDrawerWidth = 80;

interface MainLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarGroup[];
}

export default function MainLayout({
  children,
  sidebarItems,
}: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [compact, setCompact] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerCompactToggle = () => {
    setCompact(!compact);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            mx: "auto",
          }}
        >
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerCompactToggle}
            sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <AppLogo />

          <Box sx={{ flexGrow: 1 }} />

          <AccountMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        container={window.document.body}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <DrawerContent items={sidebarItems} />
      </Drawer>

      <Box
        component="nav"
        sx={{
          width: "100%",
          display: { xs: "none", sm: "block" },
          maxWidth: compact ? compactDrawerWidth : drawerWidth,
        }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            "& .MuiDrawer-paper": {
              width: compact ? compactDrawerWidth : drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <DrawerContent items={sidebarItems} compact={compact} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          flex: 1,
          backgroundColor: "rgb(249 250 251 / 0.9)",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          maxWidth: {
            xs: "100%",
            sm: `calc(100% - ${compact ? compactDrawerWidth : drawerWidth}px)`,
          },
        }}
      >
        <Toolbar />

        {children}

        <Footer />
      </Box>
    </Box>
  );
}
