"use client";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import LoadingOverlay from "@/components/common/loader/LoadingOverlay";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ModalProvider from "@ebay/nice-modal-react";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "@/providers/ThemeContextProvider";

const onHttpError = (error: any, _v: any, _c: any, mutation: any) => {
  if (mutation?.options?.onError) return;
  return toast.error(error.response?.data?.message || error.message);
};

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: onHttpError,
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000,
    },
  },
});

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AppRouterCacheProvider>
          <ThemeContextProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ModalProvider.Provider>
                {children}
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                  gutter={8}
                />
                <NextTopLoader color={"#111827"} showSpinner={false} />
                <LoadingOverlay />
              </ModalProvider.Provider>
            </LocalizationProvider>
          </ThemeContextProvider>
        </AppRouterCacheProvider>
      </SessionProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
