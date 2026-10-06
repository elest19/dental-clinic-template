import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const PAGE_SIZE = 10;

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage]);

  if (currentPage > 1) {
    pages.add(currentPage - 1);
  }

  if (currentPage < totalPages) {
    pages.add(currentPage + 1);
  }

  if (currentPage > 2) {
    pages.add(currentPage - 2);
  }

  if (currentPage < totalPages - 1) {
    pages.add(currentPage + 2);
  }

  const sorted = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);

  const ranges: Array<number | "ellipsis"> = [];
  let last: number | null = null;

  sorted.forEach((page) => {
    if (last === null) {
      ranges.push(page);
      last = page;
      return;
    }

    if (page - last > 1) {
      ranges.push("ellipsis");
    }

    ranges.push(page);
    last = page;
  });

  return ranges;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-5 flex items-center justify-between gap-3">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Previous
      </Button>

      <div className="hidden items-center gap-2 sm:flex">
        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              aria-label={`Go to page ${page}`}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className={[
                "flex h-8 min-w-8 items-center justify-center rounded-[var(--radius-md)] px-2 text-sm font-medium transition-colors",
                isCurrent ? "bg-[#14284B] text-white" : "border border-border bg-white text-[#14284B] hover:bg-[#F3F6F8]",
              ].join(" ")}
            >
              {page}
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        Next
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </nav>
  );
}
