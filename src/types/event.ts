export interface Event {
  id: number;
  slug: string;
  title: string;
  date: string;
  dateValue: string;
  location: string;
  city: string;
  image: string;
  eventType: string;
  skillLevel: string;
  skillLevelDisplay: string | string[];
  categories: string[];
  organizer: string;
  organizerLink: string;
  registrationLink: string;
  description: string[];
}