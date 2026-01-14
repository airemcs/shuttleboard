export interface Event {
  id: number;
  slug: string;
  title: string;
  date?: string; // Optional - empty or undefined means "Coming Soon"
  dateValue?: string; // Optional - for sorting/filtering
  location: string;
  city: string;
  image?: string; // Optional - shows placeholder if not provided
  eventType: string;
  skillLevel: string;
  skillLevelDisplay: string | string[];
  categories: string[];
  organizer: string;
  organizerLink: string;
  registrationLink?: string; // Optional - empty or undefined means "Coming Soon"
  registrationDeadline?: string; // ISO date format, e.g., "2025-06-25"
  description: string[];
}