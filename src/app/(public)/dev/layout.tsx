import Footer from "@/components/common/footer/Footer";
import { PublicHeader } from "@/components/homepage/PublicHeader";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      {children}
      <Footer />
    </div>
  );
}
