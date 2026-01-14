import { Link } from "react-router-dom";
import Pill from "@/components/Pill";
import { getRegistrationInfo } from "@/utils/registration";
import { MdArrowOutward } from "react-icons/md";

interface EventTableRowProps {
  slug: string;
  title: string;
  date: string;
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
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          <span className="font-sf-medium text-primary-black">{title}</span>
          <span className="font-sf-regular text-sm text-secondary-black">{location}, {province}</span>
        </div>
      </td>
      <td className="py-4 pr-4">
        <span className="font-sf-regular text-secondary-black">{date}</span>
      </td>
      <td className="py-4 pr-4">
        <div className="flex gap-1 flex-wrap">
          {skillLevels.slice(0, 2).map((level) => (
            <Pill key={level} text={level} />
          ))}
          {skillLevels.length > 2 && <Pill text={`+${skillLevels.length - 2}`} />}
        </div>
      </td>
      <td className="py-4 pr-4">
        {registrationInfo.status === "closed" ? (
          <Pill variant="error" text="Closed" />
        ) : registrationInfo.status === "closing-soon" ? (
          <Pill variant="warning" text={`${registrationInfo.daysLeft}D Left`} />
        ) : registrationInfo.formattedDeadline ? (
          <span className="font-sf-regular text-sm text-secondary-black">{registrationInfo.formattedDeadline}</span>
        ) : (
          <span className="font-sf-regular text-sm text-tertiary-black">—</span>
        )}
      </td>
      <td className="py-4">
        <Link 
          to={`/events/${slug}`} 
          className="inline-flex items-center gap-1 font-sf-medium text-sm text-primary-green hover:underline"
        >
          View <MdArrowOutward className="size-4" />
        </Link>
      </td>
    </tr>
  );
}