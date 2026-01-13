import { useState } from "react";
import Pill from "@/components/Pill";
import Next from "@/components/Next";
import { FiImage } from "react-icons/fi";
import { getRegistrationInfo } from "@/utils/registration";

interface CardProps {
  id: number;
  slug: string;
  title: string;
  date: string;
  location: string;
  city: string;
  image?: string;
  eventType: string;
  skillLevel: string | string[];
  categories: string[];
  registrationDeadline?: string;
}

export default function Card({
  slug,
  title,
  date,
  location,
  city,
  image,
  eventType,
  skillLevel,
  categories,
  registrationDeadline,
}: CardProps) {
  const [imageError, setImageError] = useState(false);
  const displayedCategories = categories.slice(0, 3);
  const remainingCount = categories.length - 3;
  const skillLevels = Array.isArray(skillLevel) ? skillLevel : [skillLevel];
  
  // Extract province/region from city (e.g., "Bacoor, Cavite" → "Cavite")
  const province = city.includes(",") ? city.split(",").pop()?.trim() : city;
  
  // Get registration status
  const registrationInfo = getRegistrationInfo(registrationDeadline);

  return (
    <div className="flex flex-col border rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="relative">
        {image && !imageError ? (
          <img 
            className={`w-full h-48 lg:h-56 object-cover object-top shrink-0 ${
              registrationInfo.status === "closed" ? "grayscale-[50%]" : ""
            }`}
            src={image} 
            alt={title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 lg:h-56 bg-[#EAEEED] flex flex-col items-center justify-center gap-2 shrink-0">
            <FiImage className="size-12 text-[#9CA3AF]" />
          </div>
        )}
        
        {/* Dim overlay for closed registration */}
        {registrationInfo.status === "closed" && (
          <div className="absolute inset-0 bg-black/30" />
        )}

        {/* Registration status badges */}
        {registrationInfo.status === "closing-soon" && (
          <div className="absolute top-3 right-3">
            <span className="bg-amber-500 text-white text-xs font-sf-bold px-2.5 py-1.5 rounded-sm shadow-sm">
              {registrationInfo.daysLeft === 0 
                ? "Last day!" 
                : `${registrationInfo.daysLeft} day${registrationInfo.daysLeft === 1 ? "" : "s"} left`}
            </span>
          </div>
        )}
        {registrationInfo.status === "closed" && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-800 text-white text-xs font-sf-bold px-2.5 py-1.5 rounded-sm shadow-sm">
              Registration Closed
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col p-5 gap-y-4">
        <div className="flex flex-col">
          <span className="font-sf-bold text-primary-black truncate text-base lg:text-xl">{title}</span>
          <span className="font-sf-regular text-sm lg:text-base text-secondary-black">{date}</span>
          <span className="font-sf-regular text-sm lg:text-base text-secondary-black">{location}, {province}</span>
        </div>

        <div className="flex flex-col gap-y-4 lg:hidden">
          <div className="flex flex-wrap gap-1">
            <Pill variant="primary" text={eventType} />
            {displayedCategories.map((category) => (
              <Pill key={category} text={category} />
            ))}
            {remainingCount > 0 && <Pill text={`+${remainingCount}`} />}
          </div>

          <div className="flex justify-between border-t border-[#E1E5EA] pt-4">
            <Pill text={skillLevels[0]} />
            <Next text="Details" size="sm" href={`/events/${slug}`} />
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-y-4">
          <div className="flex gap-x-2">
            <Pill variant="primary" text={eventType} />
            <Pill text={skillLevels[0]} />
            {skillLevels.length > 1 && <Pill text={`+${skillLevels.length - 1}`} />}
          </div>
          <Next text="View Details" size="md" href={`/events/${slug}`} />
        </div>
      </div>
    </div>
  );
}