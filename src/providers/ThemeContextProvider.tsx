"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createContext, ReactNode } from "react";
import { Roboto } from "next/font/google";
import { Merriweather } from "next/font/google";

declare module "@mui/material/styles" {
  interface Palette {
    ghost: Palette["primary"];
  }

  interface PaletteOptions {
    ghost?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ghost: true;
  }
}

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const fontPrimary = roboto.style.fontFamily;
const fontSecondary = merriweather.style.fontFamily;

const colors = {
  primary: {
    main: "hsl(179, 45%, 27%)",
    contrastText: "hsl(0, 0%, 100%)",
  },
  secondary: {
    main: "hsl(179, 30%, 70%)",
    contrastText: "hsl(0, 0%, 0%)",
  },
  background: {
    default: "hsl(179, 100%, 95%)",
    paper: "hsl(179, 100%, 95%)",
  },
  text: {
    primary: "hsl(179, 5%, 10%)",
    secondary: "hsl(179, 5%, 35%)",
    halim: "hsl(60, 100%, 50%)",
  },
  ghost: {
    main: "#BDBDBD",
  },
  border: "hsl(179, 30%, 50%)",
  input: "hsl(179, 30%, 26%)",
  ring: "hsl(179, 45%, 27%)",
  radius: "0.5rem",
  shadow: "0 1rem 1rem hsl(179, 30%, 50%)",
};

const theme = createTheme({
  palette: colors,
  typography: {
    fontFamily: fontPrimary,
    h1: {
      fontFamily: fontSecondary,
      fontWeight: 700,
      fontSize: "2.125rem",
    },
    h2: {
      fontFamily: fontSecondary,
      fontWeight: 700,
      fontSize: "1.75rem",
    },
    h3: {
      fontFamily: fontSecondary,
      fontWeight: 700,
      fontSize: "1.5rem",
    },
    h4: {
      fontFamily: fontSecondary,
      fontWeight: 700,
      fontSize: "1.25rem",
    },
    h5: {
      fontFamily: fontSecondary,
      fontWeight: 700,
      fontSize: "1rem",
    },
    h6: {
      fontFamily: fontSecondary,
      fontWeight: 700,
      fontSize: "0.875rem",
    },
    body1: {
      fontFamily: fontPrimary,
      fontSize: "1rem",
    },
    body2: {
      fontFamily: fontPrimary,
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          padding: "8px 16px",
          fontSize: "0.875rem",
        },
      },
    },
  },
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext({});

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
