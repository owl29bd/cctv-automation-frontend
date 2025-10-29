"use client";

import React, { useEffect } from "react";

import Footer from "@/components/common/footer/Footer";
import { PublicHeader } from "@/components/homepage/PublicHeader";
import { RouteUrls } from "@/lib/constants/url.config";
import { Role } from "@/lib/enums/role.enum";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.data?.user?.role !== Role.User) {
      router.replace(RouteUrls.dashboard.index);
    }
  }, [session, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      {children}
      <Footer />
    </div>
  );
}
