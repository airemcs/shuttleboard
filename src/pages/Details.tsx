// import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar"
import Return from "@/components/Return"
import Pill from "@/components/Pill"
import { FaCalendar, FaLayerGroup, FaStar, FaBriefcase } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import Button from "@/components/Button"
import Footer from "@/components/Footer";
import InfoRow from "@/components/InfoRow";
import AboutSection from "@/components/AboutSection";

export default function Details() {
  // const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Navbar />
        </div>
      </div>

      <div className="mx-auto max-w-7xl md:max-w-4xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-y-4 md:gap-y-6 py-6 md:py-8">
          <Return text="Back to Events" href="/" size="sm" />

          <img className="w-full h-48 md:h-80 object-cover rounded-xl" src="/delta.jpg" />

          <div className="flex gap-2">
            <Pill variant="primary" text="Tournament" />
            <Pill text="Intermediate - Advanced" />
          </div>

          <span className="font-sf-bold text-2xl md:text-4xl">Manila Open Badminton Tournament 2026</span>

          <div className="p-5 border bg-white border-[#E1E5EA] rounded-2xl">
            <InfoRow
              icon={<FaCalendar className="size-4 text-[#4A5568]" />}
              label="DATES"
              value="March 12 - 14, 2026"
            />
            <InfoRow
              icon={<FaLocationDot className="size-4 text-[#4A5568]" />}
              label="LOCATION"
              value="Manila Sports Complex, Manila"
            />
            <InfoRow
              icon={<FaLayerGroup className="size-4 text-[#4A5568]" />}
              label="EVENT TYPE"
              value="Tournament"
            />
            <InfoRow
              icon={<HiMiniSquares2X2 className="size-4 text-[#4A5568]" />}
              label="CATEGORIES"
              value="Men's Doubles, Women's Doubles, Mixed Doubles"
            />
            <InfoRow
              icon={<FaStar className="size-4 text-[#4A5568]" />}
              label="SKILL LEVEL"
              value="Intermediate - Advanced"
            />
            <InfoRow
              icon={<FaBriefcase className="size-4 text-[#4A5568]" />}
              label="ORGANIZER"
              value={
                <span className="flex items-center gap-x-1 font-sf-bold text-base text-primary-green cursor-pointer">
                  Manila Badminton Association <MdArrowOutward />
                </span>
              }
              border={false}
            />
          </div>

          <AboutSection content={[
            "🏸 MANILA OPEN 2026 🏸",
            "Get ready for the biggest badminton tournament of the year!",
            "Join us for three days of intense competition, sportsmanship, and community spirit at the Manila Sports Complex.",
            "✨ CATEGORIES:\n• Men's Doubles\n• Women's Doubles\n• Mixed Doubles",
            "💰 Cash Prizes for Champions:\n• Singles - ₱10,000\n• Doubles - ₱15,000",
            "🎽 Tournament Inclusions:\nOfficial jersey, medals, certificates, shuttlecocks provided.",
            "📅 Registration Deadline: March 1, 2026",
            "For inquiries, message us on Facebook or email manila.badminton@email.com"
          ]}/>

          <div className="flex flex-col items-center gap-y-4">
            <Button variant="primary" size="xl" text="Register for Event" icon={<MdArrowOutward />} iconPosition="right" />
            <span className="font-sf-regular text-tertiary-black text-sm md:text-base">Source: Organizer's Facebook Page</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#FAFBFC] border-t border-[#E1E5EA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <Footer />
          </div>
        </div>
    </div>
  )
}