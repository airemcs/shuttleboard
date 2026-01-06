// components/AboutSection.tsx
import { MdOutlineSegment } from "react-icons/md";

interface AboutSectionProps {
  content: string[];
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <div className="flex flex-col p-5 bg-white border border-[#E1E5EA] rounded-2xl gap-y-4">
      <div className="flex items-center gap-2 text-tertiary-black">
        <MdOutlineSegment className="size-4" />
        <span className="font-sf-medium tracking-wide">ABOUT THIS EVENT</span>
      </div>
      
      <div className="flex flex-col font-sf-regular gap-y-4 text-primary-black whitespace-pre-line">
        {content.map((paragraph, index) => (
          <span key={index}>{paragraph}</span>
        ))}
      </div>
    </div>
  );
}