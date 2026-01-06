import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export default function Input({ label, required = false, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-y-2.5">
      <label htmlFor={id} className="font-sf-medium text-primary-black text-base">
        {label} {required && <span className="text-[#DC2626]">*</span>}
      </label>

      <div className="flex items-center rounded-md bg-white border-2 border-[#E1E5EA]">
        <input
          id={id}
          className="w-full py-2.5 px-4 text-base text-primary-black placeholder:text-[#9CA3AF] focus:outline-none rounded-md"
          {...props}
        />
      </div>
    </div>
  );
}