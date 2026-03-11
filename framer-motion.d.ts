import * as React from "react";

declare module "framer-motion" {
  export interface HTMLMotionProps<TagName extends keyof React.ReactHTML> extends React.HTMLAttributes<HTMLElement> {
    className?: string;
  }
  export interface SVGMotionProps<TagName extends keyof React.ReactSVG> extends React.SVGProps<SVGElement> {
    className?: string;
  }
}
