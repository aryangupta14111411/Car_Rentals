import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Booking from "./pages/Booking.tsx";
import Auth from "./pages/Auth.tsx";
import MyRentals from "./pages/MyRentals.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/my-rentals" element={<MyRentals />} />
    </Routes>
  </BrowserRouter>
);
