import Navbar from "@/components/Navbar"
import Banner from "@/components/Banner"

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="w-full bg-white border-b border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>
      
      <div className="bg-[#EAEEED]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Banner />
        </div>
      </div>
    </div>
  )
}