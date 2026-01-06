import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonSize = "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "ghost" | "neutral";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text?: string;
  icon?: ReactNode;
}

const baseStyles = `
  rounded-lg
  font-sf-regular
  tracking-wide
  transition-colors
  cursor-pointer
`;

const sizeStyles: Record<ButtonSize, string> = {
  md: `
    px-4 py-2
    text-sm
  `,
  lg: `
    w-full
    px-5 py-3
    text-base
  `,
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary-green
    text-white
    hover:bg-primary-green-hover
  `,
  secondary: `
    hover:bg-surface-hover
    text-foreground
  `,
  ghost: `
    bg-surface-hover
    hover:bg-background-alt
    text-foreground
  `,
  neutral: `
    bg-surface
    text-primary-green
    font-semibold
    border-1
    border-[#E1E5EA]
  `
};

export default function Button({ variant = "secondary", size = "md", text, icon, className = "", children, ...props }: ButtonProps) {
  const content = text ?? children;

  return (
    <button className={` ${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}{...props}>
      <span className="inline-flex items-center gap-2">
        {icon}
        {content}
      </span>
    </button>
  );
}
