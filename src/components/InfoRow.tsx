import type { ReactNode } from "react";

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  border?: boolean;
}

export default function InfoRow({ icon, label, value, border = true }: InfoRowProps) {
  return (
    <div className={`flex gap-3 py-5 ${border ? "border-b border-[#E1E5EA]" : ""} first:pt-0 last:pb-0`}>
      <div className="size-10 p-3 bg-[#EDEEF0] rounded-lg flex justify-center items-center shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-sf-medium lg:font-sf-bold text-xs text-tertiary-black">{label}</span>
        <span className="font-sf-medium lg:font-sf-regular text-base text-primary-black">{value}</span>
      </div>
    </div>
  );
}