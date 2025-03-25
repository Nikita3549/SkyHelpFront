
import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { DayPicker, CaptionProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Custom caption component with year navigation
function CustomCaption({ displayMonth, onCaptionYearChange }: CaptionProps & { onCaptionYearChange?: (year: number) => void }) {
  const handlePreviousYear = () => {
    if (onCaptionYearChange) {
      const newYear = displayMonth.getFullYear() - 1;
      onCaptionYearChange(newYear);
    }
  };

  const handleNextYear = () => {
    if (onCaptionYearChange) {
      const newYear = displayMonth.getFullYear() + 1;
      onCaptionYearChange(newYear);
    }
  };

  return (
    <div className="flex justify-center pt-1 relative items-center">
      <div className="flex items-center">
        <button
          onClick={handlePreviousYear}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 mx-1"
          )}
          title="Previous year"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 mx-1"
          )}
          title="Next year"
          onClick={handleNextYear}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
      <span className="text-sm font-medium px-4">
        {displayMonth.toLocaleString("en-US", { month: "long", year: "numeric" })}
      </span>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [displayYear, setDisplayYear] = React.useState<number>(new Date().getFullYear());

  const handleCaptionYearChange = (year: number) => {
    setDisplayYear(year);

    // If a month is already selected, update to the same month in the new year
    if (props.selected instanceof Date) {
      const newDate = new Date(props.selected);
      newDate.setFullYear(year);

      // Call onSelect with the updated date if it exists
      if (props.onSelect) {
        props.onSelect(newDate);
      }
    }
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden", // Hide the default caption label
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        Caption: (captionProps) => (
          <CustomCaption {...captionProps} onCaptionYearChange={handleCaptionYearChange} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
