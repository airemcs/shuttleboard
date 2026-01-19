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

const levelGroups = [
  {
    label: "Level",
    options: [
      { label: "Open", value: "Open" },
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
      { label: "D", value: "D" },
      { label: "E", value: "E" },
      { label: "F", value: "F" },
      { label: "G", value: "G" },
    ],
  },
  {
    label: "Skill",
    options: [
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Advance", value: "Advance" },
    ],
  },
];

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
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const hasActiveFilters = date || city || type || levels.length > 0 || categories.length > 0;

  const clearAllFilters = () => {
    setDate("");
    setCity("");
    setType("");
    setLevels([]);
    setCategories([]);
  };

  const handleViewModeChange = (newMode: ViewMode) => {
    setViewMode(newMode);
    setActiveTab("all");
  };

  const filteredEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const filtered = events.filter((event) => {
      // Handle events without dates
      const hasDate = !!event.dateValue;
      const eventDate = hasDate ? new Date(event.dateValue as string) : null;
      if (eventDate) eventDate.setHours(0, 0, 0, 0);
      
      // In table view, only show events from the current year (or events without dates)
      if (viewMode === "table" && hasDate) {
        const currentYear = today.getFullYear();
        if (eventDate!.getFullYear() !== currentYear) return false;
      }
      
      // Tab filtering - events without dates show in "all" and "upcoming"
      if (activeTab === "upcoming" && hasDate && eventDate! < today) return false;
      if (activeTab === "past" && (!hasDate || eventDate! >= today)) return false;

      if (date && hasDate) {
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

        if (eventDate! < today || eventDate! > endDate) return false;
      }

      if (city && event.city !== city) return false;
      if (type && event.eventType !== type) return false;
      
      // Filter by levels (A-G, Open, Beginner, Intermediate, Advance) - exact match
      if (levels.length > 0) {
        const eventLevels = Array.isArray(event.skillLevelDisplay) 
          ? event.skillLevelDisplay 
          : [event.skillLevelDisplay];
        
        // Check if any selected level exactly matches the event's levels
        const hasMatchingLevel = levels.some((selectedLevel) =>
          eventLevels.some((eventLevel) => eventLevel === selectedLevel)
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
    
    // Sort by date (earliest first, events without dates go to the end)
    return filtered.sort((a, b) => {
      // Events without dates go to the end
      if (!a.dateValue && !b.dateValue) return 0;
      if (!a.dateValue) return 1;
      if (!b.dateValue) return -1;
      return new Date(a.dateValue).getTime() - new Date(b.dateValue).getTime();
    });
  }, [activeTab, date, city, type, levels, categories, viewMode]);

  // Separate upcoming and past events for the "all" tab
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = filteredEvents.filter((e) => {
      if (!e.dateValue) return true;
      // Parse date components directly to avoid timezone issues
      const [year, month, day] = e.dateValue.split("-").map(Number);
      const eventDate = new Date(year, month - 1, day); // month is 0-indexed
      return eventDate >= today;
    });
    
    const past = filteredEvents.filter((e) => {
      if (!e.dateValue) return false;
      // Parse date components directly to avoid timezone issues
      const [year, month, day] = e.dateValue.split("-").map(Number);
      const eventDate = new Date(year, month - 1, day); // month is 0-indexed
      return eventDate < today;
    });

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [filteredEvents]);

  const now = new Date();
  const todayString = now.toISOString().split("T")[0]; 

  const allCount = events.length;
  const upcomingCount = events.filter((e) => !e.dateValue || e.dateValue >= todayString).length;
  const pastCount = events.filter((e) => e.dateValue && e.dateValue < todayString).length;

  const tabs = [
    { label: "All", count: allCount, value: "all" },
    { label: "Upcoming", count: upcomingCount, value: "upcoming" },
    { label: "Past Events", count: pastCount, value: "past" },
  ];

  const renderCardGrid = (eventsToRender: Event[], keyPrefix: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {eventsToRender.map((event) => (
        <Card
          key={`${keyPrefix}-${event.id}`}
          id={event.id}
          slug={event.slug}
          title={event.title}
          date={event.date}
          location={event.location}
          city={event.city}
          image={event.image}
          eventType={event.eventType}
          skillLevel={event.skillLevel}
          categories={event.categories}
          registrationDeadline={event.registrationDeadline}
          registrationLink={event.registrationLink}
        />
      ))}
    </div>
  );

  const renderMobileCardGrid = (eventsToRender: Event[], keyPrefix: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {eventsToRender.map((event) => (
        <Card
          key={`${keyPrefix}-${event.id}`}
          id={event.id}
          slug={event.slug}
          title={event.title}
          date={event.date}
          location={event.location}
          city={event.city}
          image={event.image}
          eventType={event.eventType}
          skillLevel={event.skillLevel}
          categories={event.categories}
          registrationDeadline={event.registrationDeadline}
          registrationLink={event.registrationLink}
        />
      ))}
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-4">
      <h3 className="font-sf-bold text-lg text-primary-black pb-2 border-b-2 border-primary-green w-fit">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Navbar />
        </div>
      </div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8 flex flex-col gap-y-5 py-6 md:py-8 grow">
        <span className="font-sf-bold text-2xl md:text-4xl text-primary-black">All Badminton Events</span>

        <div className="flex lg:hidden flex-col gap-y-5">
          <Tabs tabs={tabs} defaultValue="all" onChange={setActiveTab} />

          <div className="flex flex-wrap gap-2">
            <Chip label="Date" options={dateOptions} value={date} onChange={setDate} />
            <MultiSelectChip label="Level" groups={levelGroups} value={levels} onChange={setLevels} />
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

        <div className="hidden lg:flex flex-row gap-y-5 items-center">
          <div className="flex flex-3 flex-wrap gap-2 items-center">
            <span className="font-sf-regular text-secondary-black">Filter by</span>
            <Chip label="Date" options={dateOptions} value={date} onChange={setDate} />
            <MultiSelectChip label="Level" groups={levelGroups} value={levels} onChange={setLevels} />
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

          <div className={`flex-2 transition-all duration-300 ease-in-out ${viewMode === "table" ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Tabs tabs={tabs} defaultValue="all" onChange={setActiveTab} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex border-b border-[#E1E5EA]"></div>
          
          <div className="flex justify-between items-center">
            <span className="font-sf-regular text-secondary-black text-base">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
            </span>
            <div className="hidden lg:block">
              <ViewToggle value={viewMode} onChange={handleViewModeChange} />
            </div>
          </div>
          
          {filteredEvents.length > 0 ? (
            <>
              {/* Mobile View */}
              <div className="lg:hidden flex flex-col gap-6">
                {activeTab === "all" ? (
                  <>
                    {upcomingEvents.length > 0 && (
                      <div>
                        <SectionHeader title="Upcoming" />
                        {renderMobileCardGrid(upcomingEvents, "mobile-upcoming")}
                      </div>
                    )}
                    {pastEvents.length > 0 && (
                      <div>
                        <SectionHeader title="Completed" />
                        {renderMobileCardGrid(pastEvents, "mobile-past")}
                      </div>
                    )}
                  </>
                ) : (
                  renderMobileCardGrid(filteredEvents, "mobile-card")
                )}
              </div>
              
              {/* Desktop View */}
              <div className="hidden lg:block">
                {viewMode === "card" ? (
                  <div key="card-view" className="flex flex-col gap-8">
                    {activeTab === "all" ? (
                      <>
                        {upcomingEvents.length > 0 && (
                          <div>
                            <SectionHeader title="Upcoming" />
                            {renderCardGrid(upcomingEvents, "desktop-upcoming")}
                          </div>
                        )}
                        {pastEvents.length > 0 && (
                          <div>
                            <SectionHeader title="Completed" />
                            {renderCardGrid(pastEvents, "desktop-past")}
                          </div>
                        )}
                      </>
                    ) : (
                      renderCardGrid(filteredEvents, "card")
                    )}
                  </div>
                ) : (
                  <div key="table-view" className="bg-white border border-[#E1E5EA] rounded-2xl p-5">
                    <EventTable events={filteredEvents} />
                  </div>
                )}
              </div>
            </>
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