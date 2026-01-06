import Navbar from "@/components/Navbar"
import Banner from "@/components/Banner"
import Card from "@/components/Card"
import Next from "@/components/Next"
import Footer from "@/components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
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
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex flex-row pt-30 justify-between">
          <span className="font-sf-bold text-lg text-tertiary-black">UPCOMING EVENTS</span>
          <Next text="View All" size="lg" href="" />
        </div>
      </div>

      <div className="grid grid-cols-1 py-4 pb-8 lg:pb-32 lg:grid-cols-3 gap-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex lg:hidden flex-row pt-4 justify-between">
          <span className="font-sf-bold text-sm text-tertiary-black">UPCOMING EVENTS</span>
          <Next text="View All" size="sm" href="" />
        </div>
        
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="w-full bg-white border-t border-[#E1E5EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </div>
  )
}