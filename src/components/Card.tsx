import { useState } from "react";
import Pill from "@/components/Pill";
import Next from "@/components/Next";
import { FiImage, FiX } from "react-icons/fi";
import { getRegistrationInfo } from "@/utils/registration";

interface CardProps {
  id: number;
  slug: string;
  title: string;
  date?: string;
  location: string;
  city?: string;
  image?: string;
  eventType: string;
  skillLevel?: string;
  categories?: string[];
  registrationDeadline?: string;
  registrationLink?: string;
}

export default function Card({
  slug,
  title,
  date,
  location,
  city = "",
  image,
  eventType,
  skillLevel = "",
  categories = [],
  registrationDeadline,
  registrationLink,
}: CardProps) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const displayedCategories = categories.slice(0, 3);
  const remainingCount = categories.length - 3;
  
  const province = city && city.includes(",") ? city.split(",").pop()?.trim() : city;
  
  const registrationInfo = getRegistrationInfo(registrationDeadline);
  
  const isComingSoon = !registrationLink && registrationInfo.status !== "closed";
  
  const isDateComingSoon = !date;

  const handleImageClick = () => {
    if (image && !imageError) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Close modal on escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col border rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow">
        <div className="relative">
          {image && !imageError ? (
            <img 
              className={`w-full h-48 lg:h-56 object-cover object-top shrink-0 cursor-pointer ${
                registrationInfo.status === "closed" ? "grayscale-0" : ""
              }`}
              src={image} 
              alt={title}
              onError={() => setImageError(true)}
              onClick={handleImageClick}
            />
          ) : (
            <div className="w-full h-48 lg:h-56 bg-[#EAEEED] flex flex-col items-center justify-center gap-2 shrink-0">
              <FiImage className="size-12 text-[#9CA3AF]" />
            </div>
          )}
          
          {registrationInfo.status === "closed" && (
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          )}

          {isComingSoon && (
            <div className="absolute top-3 right-3">
              <span className="bg-[#6B7280] text-white text-xs font-sf-bold px-2.5 py-1.5 rounded-sm shadow-sm">
                Coming Soon!
              </span>
            </div>
          )}
          {registrationInfo.status === "closing-soon" && !isComingSoon && (
            <div className="absolute top-3 right-3">
              <span className="bg-amber-500 text-white text-xs font-sf-bold px-2.5 py-1.5 rounded-sm shadow-sm">
                {registrationInfo.daysLeft === 1 
                  ? "Last Day!" 
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
            <span className={`font-sf-regular text-sm lg:text-base ${isDateComingSoon ? "text-tertiary-black italic" : "text-secondary-black"}`}>
              {date || "To Be Announced"}
            </span>
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
              {skillLevel && <Pill text={skillLevel} />}
              <Next text="Details" size="sm" href={`/events/${slug}`} />
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-y-4">
            <div className="flex gap-x-2">
              <Pill variant="primary" text={eventType} />
              {skillLevel && <Pill text={skillLevel} />}
            </div>
            <Next text="View Details" size="md" href={`/events/${slug}`} />
          </div>
        </div>
      </div>

      {isModalOpen && image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleCloseModal}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label={`Full image of ${title}`}
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors z-10"
            onClick={handleCloseModal}
            aria-label="Close image"
          >
            <FiX className="size-8" />
          </button>

          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt={title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}