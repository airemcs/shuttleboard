import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  text?: string;
}

const baseStyles = `
  px-4 py-2
  rounded-lg
  font-sf-regular
  tracking-wide
  transition-colors
  cursor-pointer
`;

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
};

export default function Button({ variant = "secondary", text, className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {text ?? children}
    </button>
  );
}
