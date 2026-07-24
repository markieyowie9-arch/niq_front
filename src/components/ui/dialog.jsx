"use client";

  import * as React from "react";
  import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
  import { X } from "lucide-react";

  import { cn } from "@/lib/utils";

  const Dialog = DialogPrimitive.Root;
  const DialogTrigger = DialogPrimitive.Trigger;
  const DialogPortal = DialogPrimitive.Portal;
  const DialogClose = DialogPrimitive.Close;
  const DialogBackdrop = DialogPrimitive.Backdrop;
  const DialogPopup = DialogPrimitive.Popup;
  const DialogTitle = DialogPrimitive.Title;
  const DialogDescription = DialogPrimitive.Description;

  const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <DialogBackdrop
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className,
      )}
      {...props}
    />
  ));
  DialogOverlay.displayName = "DialogOverlay";

  const DialogContent = React.forwardRef(
    ({ className, children, ...props }, ref) => (
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup
          ref={ref}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:rounded-lg",
            className,
          )}
          {...props}
        >
          {children}
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background
          transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-
          offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogPopup>
      </DialogPortal>
    ),
  );
  DialogContent.displayName = "DialogContent";

  const DialogHeader = ({ className, ...props }) => (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
  );
  DialogHeader.displayName = "DialogHeader";

  const DialogFooter = ({ className, ...props }) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
  );
  DialogFooter.displayName = "DialogFooter";

  const DialogTitleComponent = React.forwardRef(({ className, ...props }, ref) => (
    <DialogTitle
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ));
  DialogTitleComponent.displayName = "DialogTitle";

  const DialogDescriptionComponent = React.forwardRef(({ className, ...props }, ref) => (
    <DialogDescription
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  ));
  DialogDescriptionComponent.displayName = "DialogDescription";

  export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitleComponent as DialogTitle,
    DialogDescriptionComponent as DialogDescription,
  };