import { FiCheck } from "react-icons/fi";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`size-5 rounded border-2 flex items-center justify-center transition-colors ${
          checked 
            ? "bg-primary-green border-primary-green" 
            : "bg-white border-[#D1D5DB] hover:border-[#9CA3AF]"
        }`}>
          {checked && <FiCheck className="size-3.5 text-white stroke-[3]" />}
        </div>
      </div>
      <span className="font-sf-regular text-base text-primary-black">{label}</span>
    </label>
  );
}