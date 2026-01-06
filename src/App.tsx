import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Details from "@/pages/Details";
import Submission from "@/pages/Submission";
import Events from "./pages/Events";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Details />} />
        <Route path="/submit" element={<Submission />} />
      </Routes>
    </BrowserRouter>
  );
}