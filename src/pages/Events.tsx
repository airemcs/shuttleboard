import Navbar from "@/components/Navbar";
import { useState, useMemo } from "react";
import Tabs from "@/components/Tab";
import Chip from "@/components/Chip";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

const events = [
  {
    id: 1,
    title: "Manila Open Badminton Tournament 2026",
    date: "March 12 - 14, 2026",
    dateValue: new Date("2026-03-12"),
    location: "Manila Sports Complex, Manila",
    city: "manila",
    image: "/pbad.jpg",
    eventType: "tournament",
    skillLevel: "intermediate",
    skillLevelDisplay: "Intermediate - Advanced",
    categories: ["Men's Doubles", "Women's Doubles", "Mixed Doubles", "Singles"],
  },
  {
    id: 2,
    title: "Cebu City Badminton League",
    date: "Every Saturday, 2026",
    dateValue: new Date("2026-06-01"),
    location: "Cebu Sports Hub, Cebu City",
    city: "cebu",
    image: "/delta.jpg",
    eventType: "league",
    skillLevel: "all",
    skillLevelDisplay: "[Upper/Lower] A, B, C, D, E, F",
    categories: ["Men's Singles", "Women's Singles", "Mixed Doubles"],
  },
  {
    id: 3,
    title: "Davao Open Play Session",
    date: "January 20, 2026",
    dateValue: new Date("2026-01-20"),
    location: "Davao Recreation Center, Davao",
    city: "davao",
    image: "/rmes.jpg",
    eventType: "open-play",
    skillLevel: "beginner",
    skillLevelDisplay: "Beginner - Intermediate",
    categories: ["Men's Doubles", "Women's Doubles"],
  },
  {
    id: 4,
    title: "Quezon City Junior Tournament",
    date: "February 8 - 9, 2026",
    dateValue: new Date("2026-02-08"),
    location: "QC Sports Arena, Quezon City",
    city: "quezon-city",
    image: "/shuttleforce.jpg",
    eventType: "tournament",
    skillLevel: "beginner",
    skillLevelDisplay: "Junior",
    categories: ["Boys Singles", "Girls Singles", "Boys Doubles", "Girls Doubles"],
  },
  {
    id: 5,
    title: "Makati Corporate Badminton Cup",
    date: "June 29, 2025",
    dateValue: new Date("2025-06-29"),
    location: "Makati Coliseum, Makati",
    city: "makati",
    image: "/none.jpg",
    eventType: "tournament",
    skillLevel: "all",
    skillLevelDisplay: "All Levels",
    categories: ["Men's Doubles", "Women's Doubles", "Mixed Doubles"],
  },
  {
    id: 6,
    title: "Shuttle Force Smash Cup 2026",
    date: "July 15 - 17, 2026",
    dateValue: new Date("2026-07-15"),
    location: "SM Mall of Asia Arena, Pasay",
    city: "pasay",
    image: "/none.jpg",
    eventType: "tournament",
    skillLevel: "advanced",
    skillLevelDisplay: "Advanced",
    categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"],
  }
];

const dateOptions = [
  { label: "Today", value: "today" },
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

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (activeTab === "upcoming" && event.dateValue < today) return false;
      if (activeTab === "past" && event.dateValue >= today) return false;

      if (date) {
        const eventDate = event.dateValue;
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfWeek = new Date(startOfDay);
        startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
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

  const allCount = events.length;
  const upcomingCount = events.filter((e) => e.dateValue >= today).length;
  const pastCount = events.filter((e) => e.dateValue < today).length;

  const tabs = [
    { label: "All", count: allCount, value: "all" },
    { label: "Upcoming", count: upcomingCount, value: "upcoming" },
    { label: "Past Events", count: pastCount, value: "past" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-y-5 py-6 md:py-8">
        <span className="font-sf-bold text-2xl lg:text-4xl text-primary-black">All Badminton Events</span>

        <div className="flex md:hidden flex-col gap-y-5">
          <Tabs tabs={tabs} defaultValue="all" onChange={setActiveTab} />

          <div className="flex flex-wrap gap-2">
            <Chip label="Date" options={dateOptions} value={date} onChange={setDate} />
            <Chip label="City" options={cityOptions} value={city} onChange={setCity} />
            <Chip label="Type" options={typeOptions} value={type} onChange={setType} />
            <Chip label="Level" options={levelOptions} value={level} onChange={setLevel} />
          </div>
        </div>

        <div className="hidden md:flex flex-row gap-y-5 items-center">
          <div className="flex flex-3 flex-wrap gap-2 items-center">
            <span className="font-sf-regular text-secondary-black">Filter by</span>
            <Chip label="Date" options={dateOptions} value={date} onChange={setDate} />
            <Chip label="City" options={cityOptions} value={city} onChange={setCity} />
            <Chip label="Type" options={typeOptions} value={type} onChange={setType} />
            <Chip label="Level" options={levelOptions} value={level} onChange={setLevel} />
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
              <span className="font-sf-medium text-lg text-[#6B7280]">No events found</span>
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