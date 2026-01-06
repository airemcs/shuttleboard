import { RxHamburgerMenu } from "react-icons/rx";
import Button from "@/components/Button";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between py-4">
      <div className="flex items-center gap-2.5">
        <div className="bg-primary-green size-10 lg:size-12 rounded-lg"></div>
        <span className="font-sf-bold text-lg lg:text-2xl">Shuttleboard PH</span>
      </div>

      <RxHamburgerMenu className="size-6 lg:hidden" />

      <div className="hidden lg:flex gap-4">
        <Button variant="ghost" size="md" text="Home"/>
        <Button variant="secondary" size="md" text="All Events"/>
        <Button variant="primary" size="md" text="Submit Event"/>
      </div>
    </div>
  )
}