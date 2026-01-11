import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Select from "@/components/Select";
import CheckboxGroup from "@/components/CheckboxGroup";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import { FiCheckCircle } from "react-icons/fi";

const categoryOptions = [
  { value: "mens-doubles", label: "Men's Doubles" },
  { value: "womens-doubles", label: "Women's Doubles" },
  { value: "mixed-doubles", label: "Mixed Doubles" },
  { value: "mens-singles", label: "Men's Singles" },
  { value: "womens-singles", label: "Women's Singles" },
];

const eventTypeOptions = [
  { value: "tournament", label: "Tournament" },
  { value: "league", label: "League" },
  { value: "open-play", label: "Open Play" },
];

export default function Submission() {
  const [eventType, setEventType] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add select and checkbox values manually since they're custom components
    formData.set("eventType", eventType);
    formData.set("categories", categories.join(", "));
    formData.set("description", description);

    try {
      const response = await fetch("https://formspree.io/f/xgoowdpp", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setEventType("");
        setCategories([]);
        setDescription("");
      } else {
        const data = await response.json();
        setError(data?.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFBFC]">
        <div className="w-full bg-white border-b border-[#E1E5EA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <Navbar />
          </div>
        </div>

        <div className="mx-auto max-w-7xl md:max-w-2xl px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center gap-y-6 py-20">
          <div className="size-20 bg-primary-green-light rounded-full flex items-center justify-center">
            <FiCheckCircle className="size-10 text-primary-green" />
          </div>
          <span className="font-sf-bold text-2xl md:text-3xl text-primary-black text-center">
            Event Submitted!
          </span>
          <span className="font-sf-regular text-secondary-black text-center max-w-md">
            Thank you for your submission. We'll review it and add it to the directory within 24-48 hours.
          </span>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link to="/events">
              <Button variant="primary" size="lg" text="Browse Events" />
            </Link>
            <Button 
              variant="neutral" 
              size="lg" 
              text="Submit Another" 
              onClick={() => setIsSuccess(false)} 
            />
          </div>
        </div>

        <div className="w-full bg-[#FAFBFC] border-t border-[#E1E5EA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Navbar />
        </div>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="mx-auto max-w-7xl md:max-w-2xl px-4 sm:px-6 md:px-8 flex flex-col gap-y-6 py-6 md:py-8"
      >
        <div className="flex flex-col">
          <span className="font-sf-bold text-2xl md:text-4xl text-primary-black">Submit an Event</span>
          <span className="font-sf-regular text-sm md:text-lg text-secondary-black">
            Please ensure all information is accurate and complete before submitting.
          </span>
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

          <Input
            id="city"
            name="city"
            type="text"
            label="City"
            required
            placeholder="eg. Manila"
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
            placeholder="eg. Beginner, Intermediate, Advanced"
          />

          <Input
            id="organizer"
            name="organizer"
            type="text"
            label="Organizer"
            required
            placeholder="eg. Manila Badminton Association"
          />

          <Input
            id="organizerLink"
            name="organizerLink"
            type="url"
            label="Organizer Facebook/Website"
            placeholder="https://facebook.com/..."
          />

          <Input
            id="registration"
            name="registration"
            type="url"
            label="Registration Link"
            required
            placeholder="https://"
          />

          <TextArea
            id="description"
            name="description"
            label="Event Description"
            placeholder="Full event details, prizes, inclusions, etc. (supports copy-paste from Facebook posts)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            id="flyerLink"
            name="flyerLink"
            type="url"
            label="Event Flyer Link (Optional)"
            placeholder="https://drive.google.com/... or https://imgur.com/..."
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-sm text-red-600 font-sf-medium">{error}</span>
          </div>
        )}

        {/* Mobile submit */}
        <div className="flex md:hidden flex-col gap-y-3 items-center">
          <Button 
            type="submit"
            variant="primary" 
            size="lg" 
            text={isSubmitting ? "Submitting..." : "Submit Event"}
            disabled={isSubmitting}
          />
          <span className="font-sf-regular text-xs text-tertiary-black">
            Submissions are reviewed before publishing
          </span>
        </div>

        {/* Desktop submit */}
        <div className="hidden md:flex flex-col gap-y-3 items-center">
          <Button 
            type="submit"
            variant="primary" 
            size="xl" 
            text={isSubmitting ? "Submitting..." : "Submit Event"}
            disabled={isSubmitting}
          />
          <span className="font-sf-regular text-base text-tertiary-black">
            Submissions are reviewed before publishing
          </span>
        </div>
      </form>

      <div className="w-full bg-[#FAFBFC] border-t border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}