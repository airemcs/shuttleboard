import { MdNavigateNext } from "react-icons/md";
import Pill from "@/components/Pill"

export default function Card() {
  return (
    <div className="flex flex-col border rounded-2xl min-w-0 overflow-hidden">
      <img className="w-full h-48 lg:h-56 object-cover rounded-t-2xl" src="./public/delta.jpg" alt="" />
      <div className="flex flex-col p-5 gap-y-4">
        <div className="flex flex-col">
          <span className="font-sf-bold text-primary-black truncate text-base lg:text-xl">Manila Open Badminton Tournament 2026</span>
          <span className="font-sf-regular text-sm lg:text-base text-secondary-black">March 12 - 14, 2026</span>
          <span className="font-sf-regular text-sm lg:text-base text-secondary-black">Manila Sports Complex, Manila</span>
        </div>

        <div className="flex lg:hidden flex-wrap gap-1 lg:gap-2">
          <Pill variant="primary" text="Tournament" />
          <Pill text="Men's Doubles" />
          <Pill text="Women's Doubles" />
          <Pill text="Mixed Doubles" />
          <Pill text="+1" />
        </div>

        <div className="flex lg:hidden justify-between border-t border-[#E1E5EA] pt-4">
          <Pill text="Intermediate - Advanced" />
          
          <div className="flex items-center text-primary-green">
            <span className="font-sf-medium">Details</span>
            <MdNavigateNext />
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-y-4">
          
          <div className="flex gap-x-2">
            <Pill variant="primary" text="Tournament" />
            <Pill text="Intermediate - Advanced" />
          </div>
          
          <div className="flex items-center text-primary-green">
            <span className="font-sf-bold cursor-pointer">View Details</span>
            <MdNavigateNext />
          </div>
        </div>
      </div>
    </div>
  )
}