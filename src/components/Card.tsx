import { useState } from "react";
import { Link } from "react-router-dom";
import Pill from "@/components/Pill";
import Next from "@/components/Next";
import { FiImage } from "react-icons/fi";

interface CardProps {
  id: number;
  slug: string;
  title: string;
  date: string;
  location: string;
  image?: string;
  eventType: string;
  skillLevel: string;
  categories: string[];
}

export default function Card({
  slug,
  title,
  date,
  location,
  image,
  eventType,
  skillLevel,
  categories,
}: CardProps) {
  const [imageError, setImageError] = useState(false);
  const displayedCategories = categories.slice(0, 3);
  const remainingCount = categories.length - 3;

  return (
    <Link to={`/events/${slug}`} className="flex flex-col border rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow">
      {image && !imageError ? (
        <img 
          className="w-full h-48 lg:h-56 object-cover object-top shrink-0" 
          src={image} 
          alt={title}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-48 lg:h-56 bg-[#EAEEED] flex flex-col items-center justify-center gap-2 shrink-0">
          <FiImage className="size-12 text-[#9CA3AF]" />
        </div>
      )}
      
      <div className="flex flex-col p-5 gap-y-4">
        <div className="flex flex-col">
          <span className="font-sf-bold text-primary-black truncate text-base lg:text-xl">{title}</span>
          <span className="font-sf-regular text-sm lg:text-base text-secondary-black">{date}</span>
          <span className="font-sf-regular text-sm lg:text-base text-secondary-black">{location}</span>
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
            <Pill text={skillLevel} />
            <Next text="Details" size="sm" href={`/events/${slug}`} />
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-y-4">
          <div className="flex gap-x-2">
            <Pill variant="primary" text={eventType} />
            <Pill text={skillLevel} />
          </div>
          <Next text="View Details" size="md" href={`/events/${slug}`} />
        </div>
      </div>
    </Link>
  );
}