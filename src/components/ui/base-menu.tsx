"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const MenuContext = React.createContext<{
  open: boolean;
  setOpen: (value: boolean) => void;
} | null>(null);

export function Menu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </MenuContext.Provider>
  );
}

export function MenuTrigger({
  render,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  render?: React.ReactElement;
  children?: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(MenuContext);

  if (!context) {
    return null;
  }

  const mergedProps = {
    ...props,
    "aria-expanded": context.open,
    "aria-haspopup": "menu" as const,
    "data-state": context.open ? "open" : "closed",
    onClick: (event: React.MouseEvent) => {
      props.onClick?.(event as never);
      if (event.defaultPrevented) return;
      context.setOpen(!context.open);
    },
    className: cn(
      className,
      "relative transition-transform duration-200 ease-out motion-safe:transform-gpu",
    ),
  };

  if (render) {
    const renderProps = (render as React.ReactElement<any>).props as {
      children?: React.ReactNode;
    };

    return React.cloneElement(render as React.ReactElement<any>, {
      ...mergedProps,
      children: children ?? renderProps.children,
    });
  }

  return <button type="button" {...mergedProps}>{children}</button>;
}

export function MenuContent({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 0,
  className,
}: {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}) {
  const context = React.useContext(MenuContext);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!context?.open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        context.setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        context.setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [context, context?.open]);

  if (!context) {
    return null;
  }

  const placement = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2 top-0",
    right: "left-full ml-2 top-0",
  }[side];

  const alignment = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }[align];

  return (
    <div
      ref={ref}
      role="menu"
      aria-orientation="vertical"
      aria-hidden={!context.open}
      data-state={context.open ? "open" : "closed"}
      style={{
        marginTop: side === "bottom" ? sideOffset : undefined,
        marginBottom: side === "top" ? sideOffset : undefined,
      }}
      className={cn(
        "absolute z-50 min-w-[12rem] origin-bottom-right overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        "pointer-events-none opacity-0 scale-95 translate-y-2 transition-all duration-200 ease-out",
        context.open && "pointer-events-auto opacity-100 scale-100 translate-y-0",
        placement,
        alignment,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MenuGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div role="group" className={cn("space-y-1", className)}>{children}</div>;
}

export function MenuGroupLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground", className)}>
      {children}
    </div>
  );
}

export function MenuSeparator() {
  return <div className="my-1 h-px bg-border" aria-hidden="true" />;
}

export function MenuItem({
  render,
  children,
  className,
  onClick,
}: {
  render?: React.ReactElement;
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}) {
  const context = React.useContext(MenuContext);

  if (!context) {
    return null;
  }

  const handleClick = (event: React.MouseEvent) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      context.setOpen(false);
    }
  };

  if (render) {
    const renderProps = (render as React.ReactElement<any>).props as {
      onClick?: (event: React.MouseEvent) => void;
      className?: string;
      children?: React.ReactNode;
    };

    return React.cloneElement(render as React.ReactElement<any>, {
      onClick: (event: React.MouseEvent) => {
        renderProps.onClick?.(event);
        handleClick(event);
      },
      className: cn(
        "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover",
        className,
        renderProps.className,
      ),
      children: renderProps.children,
    });
  }

  return (
    <button
      type="button"
      role="menuitem"
      onClick={handleClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover",
        className,
      )}
    >
      {children}
    </button>
  );
}
