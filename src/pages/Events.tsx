import Navbar from "@/components/Navbar";
import { useState } from "react";
import Tabs from "@/components/Tab";
import Chip from "@/components/Chip";
import Card from "@/components/Card";
import Footer from "@/components/Footer";


const events = [
  {
    id: 1,
    title: "Manila Open Badminton Tournament 2026",
    date: "March 12 - 14, 2026",
    location: "Manila Sports Complex, Manila",
    image: "/pbad.jpg",
    eventType: "Tournament",
    skillLevel: "Intermediate - Advanced",
    categories: ["Men's Doubles", "Women's Doubles", "Mixed Doubles", "Singles"],
    href: "/events/manila-open-2026"
  },
  {
    id: 2,
    title: "Cebu City Badminton League",
    date: "Every Saturday, 2026",
    location: "Cebu Sports Hub, Cebu City",
    image: "/delta.jpg",
    eventType: "League",
    skillLevel: "[Upper/Lower] A, B, C, D, E, F",
    categories: ["Men's Singles", "Women's Singles", "Mixed Doubles"],
    href: "/events/cebu-league-2026"
  },
  {
    id: 3,
    title: "Davao Open Play Session",
    date: "January 20, 2026",
    location: "Davao Recreation Center, Davao",
    image: "/rmes.jpg",
    eventType: "Open Play",
    skillLevel: "Beginner - Intermediate",
    categories: ["Men's Doubles", "Women's Doubles"],
    href: "/events/davao-open-play"
  },
  {
    id: 4,
    title: "Quezon City Junior Tournament",
    date: "February 8 - 9, 2026",
    location: "QC Sports Arena, Quezon City",
    image: "/shuttleforce.jpg",
    eventType: "Tournament",
    skillLevel: "Junior",
    categories: ["Boys Singles", "Girls Singles", "Boys Doubles", "Girls Doubles"],
    href: "/events/qc-junior-2026"
  },
  {
    id: 5,
    title: "Makati Corporate Badminton Cup",
    date: "June 29, 2026",
    location: "Makati Coliseum, Makati",
    image: "/none.jpg",
    eventType: "Tournament",
    skillLevel: "All Levels",
    categories: ["Men's Doubles", "Women's Doubles", "Mixed Doubles"],
    href: "/events/makati-corporate-cup"
  },
  {
    id: 6,
    title: "Shuttle Force Smash Cup 2026",
    date: "July 15 - 17, 2026",
    location: "SM Mall of Asia Arena, Pasay",
    image: "/none.jpg",
    eventType: "Tournament",
    skillLevel: "Advanced",
    categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"],
    href: "/events/shuttle-force-smash-cup"
  }
];

const tabs = [
  { label: "All", count: 6, value: "all" },
  { label: "Upcoming", count: 4, value: "upcoming" },
  { label: "Past Events", count: 2, value: "past" },
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

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-y-5 py-6">
        <span className="font-sf-bold text-2xl text-primary-black">All Badminton Events</span>

        <Tabs tabs={tabs} defaultValue="all" onChange={setActiveTab} />

        <div className="flex flex-wrap gap-2">
          <Chip label="Date" options={dateOptions} onChange={setDate} />
          <Chip label="City" options={cityOptions} onChange={setCity} />
          <Chip label="Type" options={typeOptions} onChange={setType} />
          <Chip label="Level" options={levelOptions} onChange={setLevel} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex border-b border-[#E1E5EA]"></div>
          
          <span className="font-sf-regular text-secondary-black text-base">6 events found</span>
          
          {events.map((event) => (
            <Card
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              image={event.image}
              eventType={event.eventType}
              skillLevel={event.skillLevel}
              categories={event.categories}
            />
          ))}
        </div>

      </div>

      <div className="w-full bg-white border-t border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Footer />
        </div>
      </div>

      {/* {activeTab === "all" && <div>All events...</div>}
      {activeTab === "upcoming" && <div>Upcoming events...</div>}
      {activeTab === "past" && <div>Past events...</div>} */}
      
    </div>
  );
}