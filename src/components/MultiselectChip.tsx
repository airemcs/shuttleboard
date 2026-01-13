import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectChipProps {
  label: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function MultiSelectChip({ label, options, value, onChange }: MultiSelectChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chipRef.current && !chipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleClear = () => {
    onChange([]);
    setIsOpen(false);
  };

  const hasSelection = value.length > 0;
  
  // Always display label with count to indicate multi-select
  const displayLabel = `${label} (${value.length})`;

  return (
    <div ref={chipRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm font-sf-medium transition-all duration-200 cursor-pointer ${
          hasSelection
            ? "bg-primary-green-light border-primary-green text-primary-green"
            : "bg-white border-[#E1E5EA] text-[#6B7280] hover:border-[#9CA3AF]"
        }`}
      >
        {displayLabel}
        <FiChevronDown 
          className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-[#E1E5EA] rounded-lg shadow-lg z-50 min-w-[150px] max-h-64 overflow-y-auto">
          {hasSelection && (
            <div
              onClick={handleClear}
              className="py-2 px-4 text-sm text-[#9CA3AF] hover:bg-[#F3F4F6] cursor-pointer border-b border-[#E1E5EA]"
            >
              Clear
            </div>
          )}
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => handleToggle(option.value)}
                className={`flex items-center justify-between py-2 px-4 text-sm cursor-pointer last:rounded-b-lg ${
                  isSelected
                    ? "bg-primary-green-light text-primary-green font-sf-medium"
                    : "text-primary-black hover:bg-[#F3F4F6]"
                }`}
              >
                {option.label}
                {isSelected && <FiCheck className="size-4" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}