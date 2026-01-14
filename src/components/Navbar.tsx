import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Button from "@/components/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const getVariant = (path: string) => {
    if (currentPath.startsWith("/events/") && currentPath !== "/events") {
      return "secondary";
    }
    if (currentPath === "/submit") {
      return "secondary";
    }

    if (path === "/" && currentPath === "/") return "ghost";
    if (path === "/events" && currentPath === "/events") return "ghost";
    
    return "secondary";
  };

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2.5">
          {/* <div className="bg-primary-green size-10 md:size-12 rounded-lg">
            <GiShuttlecock className="w-full h-full p-2 rotate-45 text-white" />
          </div> */}
          <img src="./icon.png" className="size-10 md:size-12" alt="" />
          <span className="font-sf-bold text-lg md:text-2xl">Shuttleboard PH</span>
        </Link>

        <button 
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <RxHamburgerMenu 
            className={`size-6 absolute transition-all duration-300 ${
              isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`} 
          />
          <RxCross2 
            className={`size-6 transition-all duration-300 ${
              isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            }`} 
          />
        </button>

        <div className="hidden md:flex gap-4">
          <Link to="/">
            <Button variant={getVariant("/")} size="md" text="Home" />
          </Link>
          <Link to="/events">
            <Button variant={getVariant("/events")} size="md" text="All Events" />
          </Link>
          <Link to="/submit">
            <Button variant="primary" size="md" text="Submit Event" />
          </Link>
        </div>
      </div>

      <div 
        className={`grid md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2 pb-4">
            <Link to="/" onClick={closeMenu}>
              <Button variant={getVariant("/")} size="lg" text="Home" />
            </Link>
            <Link to="/events" onClick={closeMenu}>
              <Button variant={getVariant("/events")} size="lg" text="All Events" />
            </Link>
            <Link to="/submit" onClick={closeMenu}>
              <Button variant="primary" size="lg" text="Submit Event" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}