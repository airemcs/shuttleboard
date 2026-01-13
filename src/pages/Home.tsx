import Navbar from "@/components/Navbar"
import Banner from "@/components/Banner"
import Card from "@/components/Card"
import Next from "@/components/Next"
import Footer from "@/components/Footer"
import useSEO from "@/hooks/useSEO";
import eventsData from "@/data/events.json";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const today = new Date().toISOString().split("T")[0];
const events = eventsData
  .map((event) => ({
    ...event,
    slug: event.slug || generateSlug(event.title),
  }))
  .filter((event) => event.dateValue >= today)
  .slice(0, 6); 

export default function Home() {
  useSEO({
    title: "Shuttleboard",
    description: "Discover badminton tournaments, leagues, and open play sessions across the Philippines."
  });

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Navbar />
        </div>
      </div>
      
      <div className="bg-[#EAEEED]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Banner />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 md:pt-8">
        <div className="hidden md:flex flex-row justify-between">
          <span className="font-sf-bold text-lg text-tertiary-black">UPCOMING EVENTS</span>
          <Next text="View All" size="lg" href="/events" />
        </div>
      </div>

      <div className="grid grid-cols-1 py-4 pb-4 md:pb-8 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex md:hidden flex-row justify-between">
          <span className="font-sf-bold text-sm text-tertiary-black">UPCOMING EVENTS</span>
          <Next text="View All" size="sm" href="/events" />
        </div>
        
        {events.map((event) => (
          <Card
            key={event.id}
            id={event.id}
            slug={event.slug}
            title={event.title}
            date={event.date}
            location={event.location}
            image={event.image}
            eventType={event.eventType === "open-play" ? "Open Play" : event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
            skillLevel={event.skillLevelDisplay}
            categories={event.categories}
            registrationDeadline={event.registrationDeadline}
          />
        ))}
      </div>

      <div className="w-full bg-white border-t border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Footer />
        </div>
      </div>
    </div>
  )
}