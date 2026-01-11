import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import useSEO from "@/hooks/useSEO";

export default function NotFound() {
  useSEO({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist."
  });

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Navbar />
        </div>
      </div>

      <div className="grow flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-y-6 text-center">
          <span className="font-sf-bold text-6xl text-primary-green">404</span>
          <span className="font-sf-bold text-2xl text-primary-black">Page Not Found</span>
          <span className="font-sf-regular text-secondary-black max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </span>
          <Link to="/">
            <Button variant="primary" size="lg" text="Back to Home" />
          </Link>
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