import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
}

export default function TextArea({ label, required = false, id, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-y-2.5">
      <label htmlFor={id} className="font-sf-medium text-primary-black text-base">
        {label} {required && <span className="text-[#DC2626]">*</span>}
      </label>

      <textarea
        id={id}
        className="w-full py-2.5 px-4 text-base text-primary-black placeholder:text-[#9CA3AF] focus:outline-none rounded-md bg-white border border-[#E1E5EA] resize-none min-h-37.5"
        {...props}
      />
    </div>
  );
}