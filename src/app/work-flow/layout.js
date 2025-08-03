import { MainNavigationMenu } from "@/components/navbar/navbar";
import React from "react";

export default function mainLayout({ children }) {
  return (
    <>
      <div className=" flex min-h-full flex-col items-center justify-center gap-6 p-2 md:p-4">
        <MainNavigationMenu />
        {children}
      </div>
    </>
  );
}
