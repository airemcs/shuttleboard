import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Details from "@/pages/Details";
import Submission from "@/pages/Submission";
import NotFound from "@/pages/NotFound";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ScrollToTop from "@/components/Scrolltotop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<Details />} />
        <Route path="/submit" element={<Submission />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ThemeSwitcher />
    </BrowserRouter>
  );
}