"use client";

import Navbar from "@/components/Home/navbar";
import { usePathname } from "next/navigation";


export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Navbar hide karne wale keywords (partial match)
  const hideNavbarPaths = ["/quiz", "/results"];

  // Check agar path includes any restricted path
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    pathname.includes(path)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar/> }
      <main>{children}</main>
    </>
  );
}
