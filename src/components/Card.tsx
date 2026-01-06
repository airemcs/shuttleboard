import Pill from "@/components/Pill"
import Next from "@/components/Next"

interface CardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  eventType: string;
  skillLevel: string;
  categories: string[];
  href: string;
}

export default function Card({ 
  title, 
  date, 
  location, 
  image, 
  eventType, 
  skillLevel, 
  categories, 
  href 
}: CardProps) {
  const displayedCategories = categories.slice(0, 3);
  const remainingCount = categories.length - 3;

  return (
    <div className="flex flex-col border rounded-2xl min-w-0 overflow-hidden bg-white">
      <img className="w-full h-48 lg:h-56 object-cover rounded-t-2xl" src={image} alt={title} />
      <div className="flex flex-col p-5 gap-y-4">
        <div className="flex flex-col">
          <span className="font-sf-bold text-primary-black truncate text-base lg:text-xl">{title}</span>
          <span className="font-sf-regular text-sm lg:text-base text-secondary-black">{date}</span>
          <span className="font-sf-regular text-sm lg:text-base text-secondary-black">{location}</span>
        </div>

        <div className="flex lg:hidden flex-wrap gap-1">
          <Pill variant="primary" text={eventType} />
          {displayedCategories.map((category) => (
            <Pill key={category} text={category} />
          ))}
          {remainingCount > 0 && <Pill text={`+${remainingCount}`} />}
        </div>

        <div className="flex lg:hidden justify-between border-t border-[#E1E5EA] pt-4">
          <Pill text={skillLevel} />
          <Next text="Details" size="sm" href={href} />
        </div>

        <div className="hidden lg:flex flex-col gap-y-4">
          <div className="flex gap-x-2">
            <Pill variant="primary" text={eventType} />
            <Pill text={skillLevel} />
          </div>
          <Next text="View Details" size="md" href={href} />
        </div>
      </div>
    </div>
  )
}