import { Link } from "react-router-dom";
import { MdNavigateBefore } from "react-icons/md";

type TextLinkSize = "sm" | "md" | "lg";

interface ReturnProps {
  text: string;
  href: string;
  size?: TextLinkSize;
}

const sizeStyles: Record<TextLinkSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const iconSizeStyles: Record<TextLinkSize, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
};

export default function Return({ text, href, size = "md" }: ReturnProps) {
  return (
    <Link to={href} className="flex items-center text-primary-green w-fit">
      <MdNavigateBefore className={iconSizeStyles[size]} />
      <span className={`font-sf-bold ${sizeStyles[size]}`}>{text}</span>
    </Link>
  );
}