"use client";

import { useEffect } from "react";

type Theme = "home" | "about" | "catalogue" | "contact";

export default function ThemeWrapper({ theme, children }: { theme: Theme, children: React.ReactNode }) {
  useEffect(() => {
    // Smoothly transition the theme on mount
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}