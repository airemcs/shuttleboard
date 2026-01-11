import Navbar from "@/components/Navbar";
import { useState, useMemo } from "react";
import Tabs from "@/components/Tab";
import Chip from "@/components/Chip";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { FiX } from "react-icons/fi";
import eventsData from "@/data/events.json";
import type { Event } from "@/types/event";

const events: Event[] = eventsData;

const dateOptions = [
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
  { label: "This Year", value: "this-year" },
];

const cityOptions = [
  { label: "Manila", value: "manila" },
  { label: "Cebu", value: "cebu" },
  { label: "Davao", value: "davao" },
  { label: "Quezon City", value: "quezon-city" },
  { label: "Makati", value: "makati" },
  { label: "Pasay", value: "pasay" },
];

const typeOptions = [
  { label: "Tournament", value: "tournament" },
  { label: "League", value: "league" },
  { label: "Open Play", value: "open-play" },
];

const levelOptions = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
  { label: "All Levels", value: "all" },
];

export default function Events() {
  const [activeTab, setActiveTab] = useState("all");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");

  const today = new Date();
  const hasActiveFilters = date || city || type || level;

  const clearAllFilters = () => {
    setDate("");
    setCity("");
    setType("");
    setLevel("");
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(event.dateValue);
      eventDate.setHours(0, 0, 0, 0);
      
      if (activeTab === "upcoming" && eventDate < today) return false;
      if (activeTab === "past" && eventDate >= today) return false;

      if (date) {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31);

        if (date === "today" && eventDate.toDateString() !== today.toDateString()) return false;
        if (date === "this-week" && (eventDate < startOfWeek || eventDate > endOfWeek)) return false;
        if (date === "this-month" && (eventDate < startOfMonth || eventDate > endOfMonth)) return false;
        if (date === "this-year" && (eventDate < startOfYear || eventDate > endOfYear)) return false;
      }

      if (city && event.city !== city) return false;
      if (type && event.eventType !== type) return false;
      if (level && event.skillLevel !== level) return false;

      return true;
    });
  }, [activeTab, date, city, type, level]);

  const now = new Date();
  const todayString = now.toISOString().split("T")[0]; 

  const allCount = events.length;
  const upcomingCount = events.filter((e) => e.dateValue >= todayString).length;
  const pastCount = events.filter((e) => e.dateValue < todayString).length;

  const tabs = [
    { label: "All", count: allCount, value: "all" },
    { label: "Upcoming", count: upcomingCount, value: "upcoming" },
    { label: "Past Events", count: pastCount, value: "past" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Navbar />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col gap-y-5 py-6 md:py-8">
        <span className="font-sf-bold text-2xl md:text-4xl text-primary-black">All Badminton Events</span>

        <div className="flex md:hidden flex-col gap-y-5">
          <Tabs tabs={tabs} defaultValue="all" onChange={setActiveTab} />

          <div className="flex flex-wrap gap-2">
            <Chip label="Date" options={dateOptions} value={date} onChange={setDate} />
            <Chip label="City" options={cityOptions} value={city} onChange={setCity} />
            <Chip label="Type" options={typeOptions} value={type} onChange={setType} />
            <Chip label="Level" options={levelOptions} value={level} onChange={setLevel} />
            
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 px-4 rounded-full text-sm font-sf-medium text-[#DC2626] hover:bg-red-50 transition-colors cursor-pointer">
                <FiX className="size-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        <div className="hidden md:flex flex-row gap-y-5 items-center">
          <div className="flex flex-3 flex-wrap gap-2 items-center">
            <span className="font-sf-regular text-secondary-black">Filter by</span>
            <Chip label="Date" options={dateOptions} value={date} onChange={setDate} />
            <Chip label="City" options={cityOptions} value={city} onChange={setCity} />
            <Chip label="Type" options={typeOptions} value={type} onChange={setType} />
            <Chip label="Level" options={levelOptions} value={level} onChange={setLevel} />
            
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-sf-medium text-[#DC2626] hover:bg-red-50 transition-colors cursor-pointer"
              >
                <FiX className="size-4" />
                Clear All
              </button>
            )}
          </div>

          <div className="flex-2">
            <Tabs tabs={tabs} defaultValue="all" onChange={setActiveTab} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex border-b border-[#E1E5EA]"></div>
          
          <span className="font-sf-regular text-secondary-black text-base">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
          </span>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  image={event.image}
                  eventType={event.eventType === "open-play" ? "Open Play" : event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                  skillLevel={event.skillLevelDisplay}
                  categories={event.categories}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="font-sf-medium text-lg text-[#6B7280]">No Event Found</span>
              <span className="font-sf-regular text-sm text-[#9CA3AF]">Try adjusting your filters</span>
            </div>
          )}
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