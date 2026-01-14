import EventTableRow from "@/components/EventTableRow";
import type { Event } from "@/types/event";

interface EventTableProps {
  events: Event[];
}

// Group events by month
function groupEventsByMonth(events: Event[]): Map<string, Event[]> {
  const grouped = new Map<string, Event[]>();
  
  events.forEach((event) => {
    let monthYear: string;
    
    if (event.dateValue) {
      const date = new Date(event.dateValue);
      monthYear = date.toLocaleDateString("en-US", { 
        month: "long", 
        year: "numeric" 
      });
    } else {
      monthYear = "To Be Announced";
    }
    
    if (!grouped.has(monthYear)) {
      grouped.set(monthYear, []);
    }
    grouped.get(monthYear)!.push(event);
  });
  
  return grouped;
}

export default function EventTable({ events }: EventTableProps) {
  const groupedEvents = groupEventsByMonth(events);
  const monthEntries = Array.from(groupedEvents.entries());
  
  return (
    <div className="flex flex-col">
      {monthEntries.map(([monthYear, monthEvents], index) => (
        <div key={monthYear}>
          {index > 0 && <div className="border-t border-[#E1E5EA] my-6" />}
          <h3 className="font-sf-bold text-lg text-primary-black mb-4 pb-2 border-b-2 border-primary-green w-fit sticky top-0 bg-white z-10 pt-2 -mt-2">{monthYear}</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-[#E1E5EA]">
                  <th className="pl-4 py-3 pr-4 text-left font-sf-medium text-xs text-tertiary-black uppercase tracking-wide w-[40%]">Event</th>
                  <th className="py-3 pr-4 text-left font-sf-medium text-xs text-tertiary-black uppercase tracking-wide w-[15%]">Date</th>
                  <th className="py-3 pr-4 text-left font-sf-medium text-xs text-tertiary-black uppercase tracking-wide w-[18%]">Level</th>
                  <th className="py-3 pr-4 text-left font-sf-medium text-xs text-tertiary-black uppercase tracking-wide w-[18%]">Deadline</th>
                  <th className="py-3 text-left font-sf-medium text-xs text-tertiary-black uppercase tracking-wide w-[9%]"></th>
                </tr>
              </thead>
              <tbody>
                {monthEvents.map((event, index) => (
                  <EventTableRow
                    key={event.id}
                    slug={event.slug}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    city={event.city}
                    skillLevel={event.skillLevel}
                    registrationDeadline={event.registrationDeadline}
                    isLast={index === monthEvents.length - 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}