import Navbar from "@/components/Navbar";
import { useState, useMemo } from "react";
import Tabs from "@/components/Tab";
import Chip from "@/components/Chip";
import MultiSelectChip from "@/components/MultiselectChip";
import Card from "@/components/Card";
import EventTable from "@/components/EventTable";
import ViewToggle from "@/components/ViewToggle";
import Footer from "@/components/Footer";
import { FiX } from "react-icons/fi";
import eventsData from "@/data/events.json";
import type { Event } from "@/types/event";
import useSEO from "@/hooks/useSEO";

const events: Event[] = eventsData;

const dateOptions = [
  { label: "This Month", value: "this-month" },
  { label: "In 3 Months", value: "3-months" },
  { label: "In 6 Months", value: "6-months" },
  { label: "This Year", value: "this-year" },
];

// Extract unique cities from events data
// const uniqueCities = [...new Set(events.map((e) => e.city))].sort();
// const cityOptions = uniqueCities.map((city) => {
//   // Extract province/region for the label (e.g., "Bacoor, Cavite" → "Cavite")
//   const province = city.includes(",") ? city.split(",").pop()?.trim() : city;
//   return { label: province || city, value: city };
// });

// const typeOptions = [
//   { label: "Tournament", value: "Tournament" },
//   { label: "League", value: "League" },
//   { label: "Open Play", value: "Open Play" },
// ];

const levelOptions = [
  { label: "Open", value: "Open" },
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
  { label: "G", value: "G" },
];

// Extract unique categories from events data
const uniqueCategories = [...new Set(events.flatMap((e) => e.categories))].sort();
const categoryOptions = uniqueCategories.map((category) => ({
  label: category,
  value: category,
}));

type ViewMode = "card" | "table";

export default function Events() {
  useSEO({
    title: "PH Badminton Tournaments & Events",
    description: "Browse all badminton tournaments, leagues, and open play sessions in the Philippines."
  });

  const [activeTab, setActiveTab] = useState("all");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [levels, setLevels] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("card");

  const hasActiveFilters = date || city || type || levels.length > 0 || categories.length > 0;

  const clearAllFilters = () => {
    setDate("");
    setCity("");
    setType("");
    setLevels([]);
    setCategories([]);
  };

  const filteredEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.dateValue);
      eventDate.setHours(0, 0, 0, 0);
      
      // In table view, only show events from the current year
      if (viewMode === "table") {
        const currentYear = today.getFullYear();
        if (eventDate.getFullYear() !== currentYear) return false;
      }
      
      if (activeTab === "upcoming" && eventDate < today) return false;
      if (activeTab === "past" && eventDate >= today) return false;

      if (date) {
        const endDate = new Date(today);
        
        if (date === "this-month") {
          endDate.setMonth(today.getMonth() + 1, 0); // End of current month
        } else if (date === "3-months") {
          endDate.setMonth(today.getMonth() + 3);
        } else if (date === "6-months") {
          endDate.setMonth(today.getMonth() + 6);
        } else if (date === "this-year") {
          endDate.setFullYear(today.getFullYear(), 11, 31);
        }

        if (eventDate < today || eventDate > endDate) return false;
      }

      if (city && event.city !== city) return false;
      if (type && event.eventType !== type) return false;
      
      // Filter by levels - check if any selected level matches the event's skillLevelDisplay
      if (levels.length > 0) {
        const eventLevels = Array.isArray(event.skillLevelDisplay) 
          ? event.skillLevelDisplay 
          : [event.skillLevelDisplay];
        
        // Check if any selected level is found in the event's levels
        const hasMatchingLevel = levels.some((selectedLevel) =>
          eventLevels.some((eventLevel) => 
            eventLevel.toLowerCase().includes(selectedLevel.toLowerCase()) ||
            eventLevel.includes(`Level ${selectedLevel}`)
          )
        );
        if (!hasMatchingLevel) return false;
      }

      // Filter by categories - check if any selected category matches
      if (categories.length > 0) {
        const hasMatchingCategory = categories.some((selectedCategory) =>
          event.categories.includes(selectedCategory)
        );
        if (!hasMatchingCategory) return false;
      }

      return true;
    });
    
    // Sort by date (earliest first)
    return filtered.sort((a, b) => {
      return new Date(a.dateValue).getTime() - new Date(b.dateValue).getTime();
    });
  }, [activeTab, date, city, type, levels, categories, viewMode]);

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
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Navbar />
        </div>
      </div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8 flex flex-col gap-y-5 py-6 md:py-8 grow">
        <span className="font-sf-bold text-2xl md:text-4xl text-primary-black">All Badminton Events</span>

        <div className="flex md:hidden flex-col gap-y-5">
          <Tabs tabs={tabs} defaultValue="all" onChange={setActiveTab} />

          <div className="flex flex-wrap gap-2">
            <Chip label="Date" options={dateOptions} value={date} onChange={setDate} />
            {/* <Chip label="City" options={cityOptions} value={city} onChange={setCity} />
            <Chip label="Type" options={typeOptions} value={type} onChange={setType} /> */}
            <MultiSelectChip label="Level" options={levelOptions} value={levels} onChange={setLevels} />
            <MultiSelectChip label="Category" options={categoryOptions} value={categories} onChange={setCategories} />
            
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
            {/* <Chip label="City" options={cityOptions} value={city} onChange={setCity} />
            <Chip label="Type" options={typeOptions} value={type} onChange={setType} /> */}
            <MultiSelectChip label="Level" options={levelOptions} value={levels} onChange={setLevels} />
            <MultiSelectChip label="Category" options={categoryOptions} value={categories} onChange={setCategories} />
            
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
          
          <div className="flex justify-between items-center">
            <span className="font-sf-regular text-secondary-black text-base">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
            </span>
            <div className="hidden md:block">
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>
          
          {filteredEvents.length > 0 ? (
            viewMode === "card" ? (
              <div key="card-view" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                  <Card
                    key={`card-${event.id}`}
                    id={event.id}
                    slug={event.slug}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    city={event.city}
                    image={event.image}
                    eventType={event.eventType}
                    skillLevel={event.skillLevelDisplay}
                    categories={event.categories}
                    registrationDeadline={event.registrationDeadline}
                  />
                ))}
              </div>
            ) : (
              <div key="table-view" className="bg-white border border-[#E1E5EA] rounded-2xl p-5">
                <EventTable events={filteredEvents} />
              </div>
            )
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