import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa";

export default function Banner() {
  return (
    <div className="bg-[#EAEEED] py-10 md:py-20 flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-2 md:gap-4">
        <span className="font-sf-bold text-2xl md:text-6xl text-primary-black">Upcoming Badminton Events in the Philippines</span>
        <span className="font-sf-regular text-sm md:text-xl text-secondary-black">Find tournaments, leagues, and open play sessions across the Philippines.</span>
      </div>

      <div className="hidden md:flex flex-row gap-4">
        <Link to="/events">
          <Button variant="primary" size="xl" text="Browse All Events" />
        </Link>
        <Link to="/submit">
          <Button variant="neutral" size="xl" text="Submit Event" icon={<FaPlus />} />
        </Link>
      </div>

      <div className="flex md:hidden flex-col gap-2">
        <Link to="/events">
          <Button variant="primary" size="lg" text="Browse All Events" />
        </Link>
        <Link to="/submit">
          <Button variant="neutral" size="lg" text="Submit an Event" icon={<FaPlus />} />
        </Link>
      </div>
    </div>
  );
}