import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  return(
    <div className="w-screen flex items-center justify-between p-4 bg-white border-b border-[#E1E5EA]">
      <div className="flex items-center gap-2.5">
        <div className="bg-primary-green size-10 rounded-lg"></div>
        <span className="font-sf-bold text-lg tracking-wide">Shuttleboard PH</span>
      </div>

      <RxHamburgerMenu className="size-6" />
    </div>
  )
}