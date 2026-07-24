"use client";

  import * as React from "react";
  import { Tabs } from "@base-ui/react/tabs";

  import { cn } from "@/lib/utils";

  const TabsRoot = Tabs.Root;

  const TabsList = React.forwardRef(({ className, ...props }, ref) => (
    <Tabs.List
      ref={ref}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ));
  TabsList.displayName = "TabsList";

  const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
    <Tabs.Tab
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:bg-background data-active:text-foreground data-active:shadow",
        className,
      )}
      {...props}
    />
  ));
  TabsTrigger.displayName = "TabsTrigger";

  const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
    <Tabs.Panel
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  ));
  TabsContent.displayName = "TabsContent";

  export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent };