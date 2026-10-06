"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import {
  formatPrice,
  getServicesByCategory,
  serviceCategories,
  type Service,
} from "@/content/services";
import { cn } from "@/lib/utils";

type ServiceSelectProps = {
  id: string;
  /** Selected service name. Matches the booking form's data contract. */
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
};

/**
 * Grouped service picker for the booking form. Options are grouped under
 * their category headings (General, Cosmetic, Restorative, Specialty), in
 * category order. Opening/closing follows the dropdown-01 motion spec:
 * menu fades and slides, items stagger in, chevron rotates, and the
 * selected row gets a spring check.
 */
export function ServiceSelect({
  id,
  value,
  onChange,
  placeholder,
  invalid = false,
  describedBy,
}: ServiceSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();

  const groups = useMemo(
    () =>
      [...serviceCategories]
        .sort((a, b) => a.order - b.order)
        .map((category) => ({
          category,
          options: getServicesByCategory(category.slug),
        }))
        .filter((group) => group.options.length > 0),
    [],
  );

  const flatOptions: Service[] = useMemo(
    () => groups.flatMap((group) => group.options),
    [groups],
  );

  const selected = flatOptions.find((service) => service.name === value);
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const openMenu = () => {
    const selectedIndex = flatOptions.findIndex(
      (service) => service.name === value,
    );
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  const choose = (service: Service) => {
    onChange(service.name);
    closeMenu();
  };

  // Escape closes; outside pointer-down closes — same as the navbar menus.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        document.getElementById(id)?.focus();
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [isOpen, id]);

  // Tabbing out of the whole control closes the menu.
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      closeMenu();
    }
  };

  // Listbox keyboard support (replaces what the native select gave for free).
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % flatOptions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + flatOptions.length) % flatOptions.length,
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(flatOptions.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      const current = flatOptions[activeIndex];
      if (current) {
        event.preventDefault();
        choose(current);
      }
    }
  };

  // Keep the keyboard-highlighted option visible while navigating.
  useEffect(() => {
    if (!isOpen) return;
    document
      .getElementById(optionId(activeIndex))
      ?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isOpen]);

  let flatIndex = -1;


  return (
    <div ref={wrapperRef} onBlur={handleBlur} onKeyDown={handleKeyDown} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-describedby={describedBy}
        onClick={() => {
          if (isOpen) closeMenu();
          else openMenu();
        }}
        className={cn(
          "flex h-11 w-full items-center justify-between gap-3 rounded-[var(--radius-md)] border border-foreground/15 bg-surface px-3 py-2 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground",
          !selected && "text-muted-foreground",
          invalid && "border-red-500",
        )}
      >
        <span className="truncate">{selected ? selected.name : placeholder}</span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="service-menu"
            id={listboxId}
            role="listbox"
            aria-label={placeholder}
            aria-activedescendant={optionId(activeIndex)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-[var(--radius-md)] border border-border bg-card text-foreground shadow-[0_8px_24px_rgba(15,42,67,0.10)]"
          >
            <div data-lenis-prevent className="max-h-80 overflow-y-auto p-1.5">
              {groups.map((group) => (
                <div key={group.category.slug} className="pt-1 first:pt-0">
                  <p
                    aria-hidden="true"
                    className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {group.category.name}
                  </p>
                  {group.options.map((service) => {
                    flatIndex += 1;
                    const index = flatIndex;
                    const isSelected = service.name === value;
                    const isActive = index === activeIndex;

                    return (
                      <motion.button
                        key={service.slug}
                        type="button"
                        id={optionId(index)}
                        role="option"
                        aria-selected={isSelected}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: Math.min(index * 0.04, 0.4),
                        }}
                        onClick={() => choose(service)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                          isActive && "bg-surface",
                        )}
                      >
                        <span>
                          <span className="block text-sm font-medium">
                            {service.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            From {formatPrice(service.startingPrice)}
                          </span>
                        </span>
                        {isSelected ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                            aria-hidden="true"
                            className="shrink-0 text-primary"
                          >
                            <Check className="h-4 w-4" />
                          </motion.span>
                        ) : null}
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
