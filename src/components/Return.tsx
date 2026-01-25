import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

interface ReturnProps {
  text: string;
  href?: string;
  size?: "sm" | "md";
}

export default function Return({ text, href, size = "md" }: ReturnProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) {
      navigate(href);
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  const sizeClasses = {
    sm: "text-sm gap-1",
    md: "text-base gap-2",
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center font-sf-medium text-secondary-black hover:text-primary-black transition-colors cursor-pointer ${sizeClasses[size]}`}
    >
      <FiArrowLeft className="size-4" />
      {text}
    </button>
  );
}