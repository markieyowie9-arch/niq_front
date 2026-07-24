"use client";

  import * as React from "react";
  import { Menu } from "@base-ui/react/menu";
  import { Check, Circle } from "lucide-react";

  import { cn } from "@/lib/utils";

  const DropdownMenu = Menu.Root;
  const DropdownMenuPortal = Menu.Portal;
  const DropdownMenuGroup = Menu.Group;
  const DropdownMenuSub = Menu.SubmenuRoot;
  const DropdownMenuRadioGroup = Menu.RadioGroup;

  // Wraps a Base UI namespace component so the `asChild` prop forwards the
  // single child via the `render` prop, mirroring the Radix Slot pattern.
  function asChildElement(
    asChild,
    children,
    className,
    otherProps,
    BaseComponent,
    ref,
  ) {
    if (asChild) {
      if (!React.isValidElement(children)) {
        return null;
      }
      return (
        <BaseComponent
          ref={ref}
          className={className}
          render={children}
          {...otherProps}
        />
      );
    }
    return (
      <BaseComponent ref={ref} className={className} {...otherProps}>
        {children}
      </BaseComponent>
    );
  }

  const DropdownMenuSubTrigger = React.forwardRef(
    ({ className, inset, asChild, children, ...props }, ref) =>
      asChildElement(
        asChild,
        children,
        cn(
          "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[highlighted]:bg-accent data-[popup-open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8",
          className,
        ),
        props,
        Menu.SubmenuTrigger,
        ref,
      ),
  );
  DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

  const DropdownMenuSubContent = React.forwardRef(
    ({ className, asChild, children, ...props }, ref) =>
      asChildElement(
        asChild,
        children,
        cn(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        ),
        props,
        Menu.Popup,
        ref,
      ),
  );
  DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

  const DropdownMenuContent = React.forwardRef(
    ({ className, sideOffset = 4, ...props }, ref) => (
      <DropdownMenuPortal>
        <Menu.Positioner sideOffset={sideOffset}>
          <Menu.Popup
            ref={ref}
            className={cn(
              "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              className,
            )}
            {...props}
          />
        </Menu.Positioner>
      </DropdownMenuPortal>
    ),
  );
  DropdownMenuContent.displayName = "DropdownMenuContent";

  const DropdownMenuItem = React.forwardRef(
    ({ className, inset, asChild, children, ...props }, ref) =>
      asChildElement(
        asChild,
        children,
        cn(
          "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 &_svg:pointer-events-none &_svg:size-4 &_svg:shrink-0", inset && "pl-8",
          className,
        ),
        props,
        Menu.Item,
        ref,
      ),
  );
  DropdownMenuItem.displayName = "DropdownMenuItem";

  const DropdownMenuCheckboxItem = React.forwardRef(
    ({ className, children, checked, ...props }, ref) => (
      <Menu.CheckboxItem
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
          className,
        )}
        checked={checked}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Menu.CheckboxItemIndicator>
            <Check className="h-4 w-4" />
          </Menu.CheckboxItemIndicator>
        </span>
        {children}
      </Menu.CheckboxItem>
    ),
  );
  DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

  const DropdownMenuRadioItem = React.forwardRef(
    ({ className, children, ...props }, ref) => (
      <Menu.RadioItem
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Menu.RadioItemIndicator>
            <Circle className="h-2 w-2 fill-current" />
          </Menu.RadioItemIndicator>
        </span>
        {children}
      </Menu.RadioItem>
    ),
  );
  DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);

DropdownMenuLabel.displayName = "DropdownMenuLabel";

  const DropdownMenuSeparator = React.forwardRef(
    ({ className, ...props }, ref) => (
      <Menu.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
      />
    ),
  );
  DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

  const DropdownMenuShortcut = ({ className, ...props }) => {
    return (
      <span
        className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
        {...props}
      />
    );
  };
  DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

  const DropdownMenuTrigger = React.forwardRef(
    ({ className, asChild, children, ...props }, ref) =>
      asChildElement(
        asChild,
        children,
        cn(
          "focus:bg-accent focus:text-accent-foreground data-[popup-open]:bg-accent data-popup-open:text-accent-foreground",
          className,
        ),
        props,
        Menu.Trigger,
        ref,
      ),
  );
  DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

  export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
  };