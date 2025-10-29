"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const session = useSession();

  // useLayoutEffect(() => {
  //   if (session?.data) {
  //     router.replace("/");
  //   }
  // }, [router, session]);

  return children;
}
