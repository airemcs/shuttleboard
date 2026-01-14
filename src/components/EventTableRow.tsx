import { Link } from "react-router-dom";
import Pill from "@/components/Pill";
import { getRegistrationInfo } from "@/utils/registration";
import { MdArrowOutward } from "react-icons/md";

interface EventTableRowProps {
  slug: string;
  title: string;
  date?: string;
  location: string;
  city?: string;
  skillLevel: string | string[];
  registrationDeadline?: string;
  isLast?: boolean;
}

export default function EventTableRow({
  slug,
  title,
  date,
  location,
  city = "",
  skillLevel = [],
  registrationDeadline,
  isLast = false,
}: EventTableRowProps) {
  const skillLevels = Array.isArray(skillLevel) ? skillLevel : skillLevel ? [skillLevel] : [];
  const province = city && city.includes(",") ? city.split(",").pop()?.trim() : city;
  const registrationInfo = getRegistrationInfo(registrationDeadline);

  return (
    <tr className={`hover:bg-[#F9FAFB] transition-colors ${isLast ? "" : "border-b border-[#E1E5EA]"}`}>
      <td className="pl-4 py-4 pr-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-sf-medium text-primary-black truncate">{title}</span>
          <span className="font-sf-regular text-sm text-secondary-black truncate">{location}, {province}</span>
        </div>
      </td>
      <td className="py-4 pr-4">
        <span className={`font-sf-regular whitespace-nowrap ${date ? "text-secondary-black" : "text-tertiary-black italic"}`}>
          {date || "TBA"}
        </span>
      </td>
      <td className="py-4 pr-4">
        <div className="flex gap-1 flex-wrap">
          {skillLevels.slice(0, 2).map((level) => (
            <Pill key={level} text={level} />
          ))}
          {skillLevels.length > 2 && <Pill text={`+${skillLevels.length - 2}`} />}
        </div>
      </td>
      <td className="py-4 pr-4 whitespace-nowrap">
        {registrationInfo.status === "closed" ? (
          <Pill variant="error" text="Closed" />
        ) : registrationInfo.status === "closing-soon" ? (
          <Pill variant="warning" text={`${registrationInfo.daysLeft}d left`} />
        ) : registrationInfo.formattedDeadline ? (
          <span className="font-sf-regular text-sm text-secondary-black">{registrationInfo.formattedDeadline}</span>
        ) : (
          <span className="font-sf-regular text-sm text-tertiary-black">—</span>
        )}
      </td>
      <td className="py-4">
        <Link 
          to={`/events/${slug}`} 
          className="inline-flex items-center gap-1 font-sf-medium text-sm text-primary-green hover:underline whitespace-nowrap"
        >
          View <MdArrowOutward className="size-4" />
        </Link>
      </td>
    </tr>
  );
}