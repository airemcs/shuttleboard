import type { HTMLAttributes, ReactNode } from "react";

type PillVariant = "default" | "primary";

interface PillProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PillVariant;
  text?: string;
  children?: ReactNode;
}

const baseStyles = `
  px-3 py-1.5
  w-fit
  rounded-sm
  flex
  justify-center
  items-center
  shrink-0
  text-xs
  lg:text-sm
  font-sf-medium
  tracking-wide
  whitespace-nowrap
`;

const variantStyles: Record<PillVariant, string> = {
  default: `
    bg-background-alt
    text-[#4A5568]
  `,
  primary: `
    bg-primary-green-light
    text-primary-green
  `,
};

export default function Pill({ variant = "default", text, className = "", children, ...props }: PillProps) {
  const content = text ?? children;

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {content}
    </div>
  );
}