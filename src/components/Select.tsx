// components/Select.tsx
import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  label: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function Select({ 
  id, 
  label, 
  required = false, 
  options, 
  placeholder = "Select an option",
  value,
  onChange 
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selected);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  return (
    <div className="flex flex-col gap-y-2.5" ref={dropdownRef}>
      <label htmlFor={id} className="font-sf-medium text-primary-black text-base">
        {label} {required && <span className="text-[#DC2626]">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-2.5 px-4 text-base rounded-md bg-white border-2 border-[#E1E5EA] focus:outline-none focus:border-primary-green cursor-pointer"
        >
          <span className={selectedOption ? "text-primary-black" : "text-[#9CA3AF]"}>
            {selectedOption?.label || placeholder}
          </span>
          <FiChevronDown className={`size-5 text-tertiary-black transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#E1E5EA] rounded-md shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`py-2.5 px-4 text-base cursor-pointer hover:bg-[#F3F4F6] first:rounded-t-md last:rounded-b-md ${
                  selected === option.value ? "bg-[#EAEEED] text-primary-green font-sf-medium" : "text-primary-black"
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}