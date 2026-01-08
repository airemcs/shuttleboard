import Navbar from "@/components/Navbar"
import Banner from "@/components/Banner"
import Card from "@/components/Card"
import Next from "@/components/Next"
import Footer from "@/components/Footer"

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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>
      
      <div className="bg-[#EAEEED]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Banner />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="hidden lg:flex flex-row justify-between">
          <span className="font-sf-bold text-lg text-tertiary-black">UPCOMING EVENTS</span>
          <Next text="View All" size="lg" href="/events" />
        </div>
      </div>

      <div className="grid grid-cols-1 py-4 pb-8 lg:grid-cols-3 gap-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex lg:hidden flex-row pt-4 justify-between">
          <span className="font-sf-bold text-sm text-tertiary-black">UPCOMING EVENTS</span>
          <Next text="View All" size="sm" href="/events" />
        </div>
        
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

      <div className="w-full bg-white border-t border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </div>
  )
}