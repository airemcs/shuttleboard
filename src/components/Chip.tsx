import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface ChipOption {
  label: string;
  value: string;
}

interface ChipProps {
  label: string;
  options: ChipOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function Chip({ label, options, value, onChange }: ChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(value);
  const chipRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selected);

  useEffect(() => {
    setSelected(value || undefined);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chipRef.current && !chipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelected(undefined);
    onChange?.("");
    setIsOpen(false);
  };

  return (
    <div ref={chipRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm font-sf-medium transition-all duration-200 cursor-pointer ${
          selected
            ? "bg-primary-green-light border-primary-green text-primary-green"
            : "bg-white border-[#E1E5EA] text-[#6B7280] hover:border-[#9CA3AF]"
        }`}
      >
        {selectedOption?.label || label}
        <FiChevronDown 
          className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-[#E1E5EA] rounded-lg shadow-lg z-50 min-w-[150px]">
          {selected && (
            <div
              onClick={handleClear}
              className="py-2 px-4 text-sm text-[#9CA3AF] hover:bg-[#F3F4F6] cursor-pointer border-b border-[#E1E5EA]"
            >
              Clear
            </div>
          )}
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`py-2 px-4 text-sm cursor-pointer first:rounded-t-lg last:rounded-b-lg ${
                selected === option.value
                  ? "bg-primary-green-light text-primary-green font-sf-medium"
                  : "text-primary-black hover:bg-[#F3F4F6]"
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}