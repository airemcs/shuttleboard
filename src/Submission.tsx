import { useState } from "react";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Select from "@/components/Select";
import CheckboxGroup from "@/components/CheckboxGroup";
import TextArea from "@/components/TextArea";
import FileUpload from "@/components/FileUpload";
import Button from "@/components/Button"

const categoryOptions = [
  { value: "mens-doubles", label: "Men's Doubles" },
  { value: "womens-doubles", label: "Women's Doubles" },
  { value: "mixed-doubles", label: "Mixed Doubles" },
  { value: "mens-singles", label: "Men's Singles" },
  { value: "womens-singles", label: "Women's Singles" },
];

const eventTypeOptions = [
  { value: "tournament", label: "Tournament" },
];

export default function Submission() {
  const [eventType, setEventType] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [flyer, setFlyer] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>

      <div className="mx-auto max-w-7xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 flex flex-col gap-y-6 py-6 lg:py-8">
        <div className="flex flex-col">
          <span className="font-sf-bold text-2xl lg:text-4xl text-primary-black">Submit an Event</span>
          <span className="font-sf-regular text-sm lg:text-lg text-secondary-black">Please ensure all information is accurate and complete before submitting.</span>
        </div>

        <div className="flex flex-col gap-y-5">
          <Input
            id="name"
            name="name"
            type="text"
            label="Event Name"
            required
            placeholder="eg. Manila Open 2026"
          />

          <Input
            id="date"
            name="date"
            type="text"
            label="Event Date"
            required
            placeholder="eg. March 12 - 14, 2026"
          />

          <Input
            id="venue"
            name="venue"
            type="text"
            label="Venue"
            required
            placeholder="eg. Manila Sports Complex"
          />

          <Select
            id="type"
            label="Event Type"
            required
            placeholder="Select Event Type"
            options={eventTypeOptions}
            value={eventType}
            onChange={setEventType}
          />

          <CheckboxGroup
            label="Categories"
            required
            options={categoryOptions}
            values={categories}
            onChange={setCategories}
          />

          <Input
            id="levels"
            name="levels"
            type="text"
            label="Skill Levels"
            required
            placeholder="eg. [High/Low] A, B, C, D, E, F"
          />

          <Input
            id="organizer"
            name="organizer"
            type="text"
            label="Organizers"
            required
            placeholder="eg. Manila Badminton Association"
          />

          <Input
            id="registration"
            name="registration"
            type="text"
            label="Registration Link"
            required
            placeholder="https://"
          />

          <TextArea
            id="description"
            name="description"
            label="Event Description"
            placeholder="Full event details, prizes, inclusions, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FileUpload
            label="Event Flyer"
            onChange={setFlyer}
          />
        </div>

        <div className="flex lg:hidden flex-col gap-y-3 items-center">
          <Button variant="primary" size="lg" text="Submit Event" />
          <span className="font-sf-regular text-xs text-tertiary-black">Submissions are reviewed before publishing</span>
        </div>

        <div className="hidden lg:flex flex-col gap-y-3 items-center">
          <Button variant="primary" size="xl" text="Submit Event" />
          <span className="font-sf-regular text-base text-tertiary-black">Submissions are reviewed before publishing</span>
        </div>
      </div>

      <div className="w-full bg-[#FAFBFC] border-t border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </div>
  )
}