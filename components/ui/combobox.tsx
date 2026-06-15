"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface ComboboxProps {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  className,
}: ComboboxProps) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? options.filter((opt) =>
      opt.toLowerCase().includes(query.toLowerCase())
    )
    : options;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 bg-black/[0.03] rounded-sm cursor-pointer font-medium text-sm text-[#1A1A1A] hover:bg-black/[0.05] transition-all outline-none",
          className
        )}
      >
        <span className="truncate max-w-[120px] sm:max-w-[160px]">
          {value || placeholder}
        </span>
        <ChevronDown size={15} className="text-primary shrink-0" />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[220px] p-0 gap-0 rounded-sm shadow-xl bg-[#F8F8F8] border border-white/50 ring-0 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-black/5">
            <Search size={13} className="text-[#1A1A1A]/30 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 outline-none"
            />
          </div>

          {/* Options */}
          <ul className="max-h-[220px] overflow-y-auto py-1.5">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-[#1A1A1A]/40 text-center">
                No results
              </li>
            ) : (
              filtered.map((opt) => (
                <li key={opt}>
                  <button
                    onClick={() => {
                      onValueChange(opt);
                      setQuery("");
                    }}
                    className={cn(
                      "w-full flex items-center gap-2.5 cursor-pointer text-left px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-primary/10 hover:text-primary",
                      value === opt ? "text-primary bg-primary/5" : "text-[#1A1A1A]"
                    )}
                  >
                    <Check
                      size={13}
                      className={cn(
                        "shrink-0 transition-opacity",
                        value === opt ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {opt}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
