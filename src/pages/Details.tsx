import Navbar from "@/components/Navbar"
import Return from "@/components/Return"
import Pill from "@/components/Pill"
import { FaCalendar, FaLayerGroup, FaStar, FaBriefcase, FaClock } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import Button from "@/components/Button"
import Footer from "@/components/Footer";
import InfoRow from "@/components/InfoRow";
import AboutSection from "@/components/AboutSection";
import { useParams } from "react-router-dom";
import eventsData from "@/data/events.json";
import type { Event } from "@/types/event";
import { useState } from "react";
import { FiImage } from "react-icons/fi";
import useSEO from "@/hooks/useSEO";
import { getRegistrationInfo, getDaysLeftLabel } from "@/utils/registration";

const events: Event[] = eventsData;

export default function Details() {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);
  const [imageError, setImageError] = useState(false);

  useSEO({
    title: event ? `${event.title} - ${event.location}` : "Event Not Found",
    description: event 
      ? `${event.title} on ${event.date} at ${event.location}. ${event.categories.join(", ")}.`
      : "The event you're looking for could not be found."
  });

  if (!event) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
        <div className="w-full bg-white border-b border-[#E1E5EA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <Navbar />
          </div>
        </div>
        <div className="grow flex items-center justify-center">
          <div className="text-center">
            <span className="font-sf-bold text-2xl text-primary-black">Event Not Found</span>
            <p className="font-sf-regular text-secondary-black mt-2">
              The event you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
        <div className="w-full bg-white border-t border-[#E1E5EA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  // Handle skillLevelDisplay as string or array
  const skillLevels = Array.isArray(event.skillLevelDisplay) 
    ? event.skillLevelDisplay 
    : [event.skillLevelDisplay];

  const skillLevelText = Array.isArray(event.skillLevelDisplay)
    ? event.skillLevelDisplay.join(", ")
    : event.skillLevelDisplay;

  // Get registration status
  const registrationInfo = getRegistrationInfo(event.registrationDeadline);
  const isRegistrationClosed = registrationInfo.status === "closed";

  // Build the registration deadline display value
  const getDeadlineDisplayValue = () => {
    if (!event.registrationDeadline) return null;
    
    const { status, daysLeft, formattedDeadline } = registrationInfo;
    
    if (status === "closed") {
      return (
        <span className="text-red-600">
          Closed ({formattedDeadline})
        </span>
      );
    }
    
    if (status === "closing-soon") {
      return (
        <span className="text-amber-600">
          {formattedDeadline} • {getDaysLeftLabel(daysLeft)}
        </span>
      );
    }
    
    return (
      <span>
        {formattedDeadline} • {getDaysLeftLabel(daysLeft)}
      </span>
    );
  };

  const deadlineDisplay = getDeadlineDisplayValue();

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Navbar />
        </div>
      </div>

      <div className="mx-auto max-w-7xl lg:max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-y-4 lg:gap-y-6 py-8">
          <Return text="Back to Events" href="/events" size="sm" />

          {event.image && !imageError ? (
            <img 
              className="w-full h-48 md:h-80 object-cover object-top shrink-0 rounded-xl" 
              src={event.image} 
              alt={event.title}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 lg:h-56 bg-[#EAEEED] flex flex-col items-center justify-center gap-2 shrink-0 rounded-xl">
              <FiImage className="size-12 text-[#9CA3AF]" />
            </div>
          )}

          <div className="flex flex-wrap gap-2 capitalize">
            <Pill variant="primary" text={event.eventType} />
            {skillLevels.map((level) => (
              <Pill key={level} text={level} />
            ))}
            {!event.registrationLink && registrationInfo.status !== "closed" && (
              <Pill text="Coming Soon" />
            )}
            {registrationInfo.status === "closing-soon" && (
              <Pill variant="warning" text="Closing Soon" />
            )}
            {registrationInfo.status === "closed" && (
              <Pill variant="error" text="Registration Closed" />
            )}
          </div>

          <span className="font-sf-bold text-2xl lg:text-4xl">{event.title}</span>

          <div className="p-5 border bg-white border-[#E1E5EA] rounded-2xl capitalize">
            <InfoRow icon={<FaCalendar className="size-4 text-[#4A5568]" />} label="DATES" value={event.date} />
            <InfoRow icon={<FaLocationDot className="size-4 text-[#4A5568]" />} label="LOCATION" value={event.location} />
            <InfoRow icon={<FaLayerGroup className="size-4 text-[#4A5568]" />} label="EVENT TYPE" value={event.eventType} />
            <InfoRow icon={<HiMiniSquares2X2 className="size-4 text-[#4A5568]" />} label="CATEGORIES" value={event.categories.join(", ")} />
            <InfoRow icon={<FaStar className="size-4 text-[#4A5568]" />} label="SKILL LEVEL" value={skillLevelText} />
            {deadlineDisplay && (
              <InfoRow 
                icon={<FaClock className="size-4 text-[#4A5568]" />} 
                label="REGISTRATION DEADLINE" 
                value={deadlineDisplay} 
              />
            )}
            <InfoRow
              icon={<FaBriefcase className="size-4 text-[#4A5568]" />}
              label="ORGANIZER"
              value={
                <a href={event.organizerLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-1 font-sf-bold text-base text-primary-green">
                  {event.organizer} <MdArrowOutward />
                </a>
              }
              border={false}
            />
          </div>

          <AboutSection content={event.description} />

          <div className="flex flex-col items-center gap-y-4">
            {isRegistrationClosed ? (
              <div className="w-full">
                <Button 
                  variant="disabled" 
                  size="xl" 
                  text="Registration Closed" 
                  disabled
                />
              </div>
            ) : !event.registrationLink ? (
              <div className="w-full">
                <Button 
                  variant="neutral" 
                  size="xl" 
                  text="Registration Coming Soon" 
                  disabled
                />
              </div>
            ) : (
              <a className="w-full" href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="xl" text="Register for Event" icon={<MdArrowOutward />} iconPosition="right" />
              </a>
            )}
            <span className="font-sf-regular text-tertiary-black text-sm lg:text-base">Source: Organizer's Facebook Page</span>
          </div>
        </div> 
      </div>

      <div className="w-full bg-[#FAFBFC] border-t border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Footer />
        </div>
      </div>
    </div>
  )
}