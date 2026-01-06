import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa";

export default function Banner() {
  return(
    <div className="bg-[#EAEEED] py-10 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="font-sf-bold text-2xl lg:text-5xl text-primary-black">Upcoming Badminton Events in the Philippines</span>
        <span className="font-sf-regular text-sm lg:text-xl text-secondary-black">Find tournaments, leagues, and open play sessions across the Philippines.</span>
      </div>

      <div className="hidden lg:flex flex-row gap-4">
        <Button variant="primary" size="xl" text="Browse All Events" />
        <Button variant="neutral" size="xl" text="Submit an Event" icon={<FaPlus />} />
      </div>

      <div className="flex lg:hidden flex-col gap-2">
        <Button variant="primary" size="lg" text="Browse All Events" />
        <Button variant="neutral" size="lg" text="Submit an Event" icon={<FaPlus />} />
      </div>
    </div>
  )
}