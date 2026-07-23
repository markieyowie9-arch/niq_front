"use client";

import * as React from "react";
import { Progress } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

const ProgressRoot = React.forwardRef(
  ({ className, value, ...props }, ref) => (
    <Progress.Root
      ref={ref}
      value={value ?? null}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className,
      )}
      {...props}
    >
      <Progress.Track className="h-full w-full">
        <Progress.Indicator className="h-full bg-primary transition-all" />
      </Progress.Track>
    </Progress.Root>
  ),
);
ProgressRoot.displayName = "ProgressRoot";

export { ProgressRoot as Progress };
