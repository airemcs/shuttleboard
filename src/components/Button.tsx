import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonSize = "md" | "lg" | "xl";
type ButtonVariant = "primary" | "secondary" | "ghost" | "neutral" | "disabled";
type IconPosition = "left" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
}

const baseStyles = `
  rounded-lg
  font-sf-regular
  tracking-wide
  transition-colors
  cursor-pointer
  flex
  justify-center
  disabled:opacity-50
  disabled:cursor-not-allowed
`;

const sizeStyles: Record<ButtonSize, string> = {
  md: `px-4 py-3 text-base`,
  lg: `w-full px-5 py-3 text-base`,
  xl: `w-full px-6 py-4 text-md`,
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: `bg-primary-green text-white hover:bg-primary-green-hover disabled:hover:bg-primary-green`,
  secondary: `hover:bg-surface-hover text-foreground`,
  ghost: `bg-surface-hover hover:bg-background-alt text-foreground`,
  neutral: `bg-surface text-primary-green font-semibold border-1 border-[#E1E5EA] hover:bg-surface-hover`,
  disabled: `bg-[#E1E5EA] text-[#9CA3AF] cursor-not-allowed hover:bg-[#E1E5EA]`,
};

export default function Button({ 
  variant = "secondary", 
  size = "md", 
  text, 
  icon, 
  iconPosition = "left",
  className = "", 
  children, 
  type = "button",
  disabled,
  ...props 
}: ButtonProps) {
  const content = text ?? children;
  const isDisabledVariant = variant === "disabled";

  return (
    <button
      type={type}
      disabled={disabled || isDisabledVariant}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className={`inline-flex items-center gap-2 ${iconPosition === "right" ? "flex-row-reverse" : ""}`}>
        {icon}
        {content}
      </span>
    </button>
  );

}