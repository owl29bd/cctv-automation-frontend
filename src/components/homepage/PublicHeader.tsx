"use client";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import AppLogo from "@/components/common/logo/AppLogo";
import useAuthAction from "@/hooks/useAuthAction";
import { RouteUrls } from "@/lib/constants/url.config";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { RiMenu2Line as MenuIcon } from "react-icons/ri";

const navLinks = [
  { text: "About", link: "/about" },
  { text: "Services", link: "/services" },
  { text: "Contact", link: "/contact" },
];

const drawerWidth = 300;

function DrawerContent({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const { signoutMutation } = useAuthAction();

  const isActiveLink = (itemLink: string) => {
    return (
      pathname === itemLink ||
      (itemLink !== "/" && pathname.startsWith(itemLink))
    );
  };

  const onSignout = () => {
    signoutMutation.mutate();
  };

  return (
    <Box className="flex h-screen flex-col gap-6 overflow-auto">
      <span className="py-6 pl-8">
        <AppLogo />
      </span>

      <List dense component="nav">
        {navLinks.map((item) => (
          <ListItem key={item.text} onClick={() => router.push(item.link)}>
            <ListItemButton
              selected={isActiveLink(item.link)}
              sx={{
                borderRadius: 1,
                paddingX: 2,
                paddingY: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                fontWeight={500}
                color={
                  isActiveLink(item.link)
                    ? theme.palette.primary.main
                    : theme.palette.text.primary
                }
              >
                {item.text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Stack spacing={2} sx={{ margin: 4, marginTop: "auto" }}>
        {isAuthenticated ? (
          <>
            <Button
              variant="outlined"
              LinkComponent={Link}
              href={RouteUrls.dashboard.index}
            >
              Dashboard
            </Button>

            <Button variant="contained" onClick={onSignout}>
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            LinkComponent={Link}
            href={RouteUrls.auth.signin}
            sx={{ margin: 4, marginTop: "auto" }}
          >
            Login
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export function PublicHeader() {
  const session = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const { signoutMutation } = useAuthAction();

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

  const isActiveLink = (itemLink: string) => {
    return (
      pathname === itemLink ||
      (itemLink !== "/" && pathname.startsWith(itemLink))
    );
  };

  const onSignout = () => {
    signoutMutation.mutate();
  };

  return (
    <Box sx={{ mb: 8 }}>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
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
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <DrawerContent isAuthenticated={!!session.data} />
          </Drawer>

          <Box className="flex w-full justify-between">
            <AppLogo />
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                gap: 2,
              }}
            >
              {navLinks.map((item, index) => (
                <Button
                  key={index}
                  variant={isActiveLink(item.link) ? "outlined" : "text"}
                  LinkComponent={Link}
                  href={item.link}
                >
                  {item.text}
                </Button>
              ))}

              {session.data ? (
                <>
                  <Button
                    variant={
                      isActiveLink(RouteUrls.dashboard.index)
                        ? "outlined"
                        : "text"
                    }
                    LinkComponent={Link}
                    href={RouteUrls.dashboard.index}
                  >
                    Dashboard
                  </Button>

                  <Button variant="contained" onClick={onSignout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  LinkComponent={Link}
                  href={RouteUrls.auth.signin}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
