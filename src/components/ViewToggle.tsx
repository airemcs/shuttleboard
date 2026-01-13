import { HiMiniSquares2X2 } from "react-icons/hi2";
import { FiList } from "react-icons/fi";

type ViewMode = "card" | "table";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex border border-[#E1E5EA] rounded-lg overflow-hidden">
      <button
        onClick={() => onChange("card")}
        className={`p-2 transition-colors cursor-pointer ${
          value === "card"
            ? "bg-primary-green-light text-primary-green"
            : "bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
        }`}
        title="Card view"
      >
        <HiMiniSquares2X2 className="size-5" />
      </button>
      <button
        onClick={() => onChange("table")}
        className={`p-2 transition-colors cursor-pointer border-l border-[#E1E5EA] ${
          value === "table"
            ? "bg-primary-green-light text-primary-green"
            : "bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
        }`}
        title="Table view"
      >
        <FiList className="size-5" />
      </button>
    </div>
  );
}