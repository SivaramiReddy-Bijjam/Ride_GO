import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import BookingSummary from "./pages/BookingSummary";
import BookingHistory from "./pages/BookingHistory";
import Tracking from "./pages/Tracking";


export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("ridego_user"))
  );

  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("success");

  const login = (email) => {
    if (!email) {
      localStorage.removeItem("ridego_user");
      setUser(null);
      setType("error");
      setMsg("Please check your credentials");
      return;
    }

    localStorage.setItem("ridego_user", JSON.stringify({ email }));
    setUser({ email });
    setType("success");
    setMsg("Login successful");
  };

  const register = () => {
    setType("success");
    setMsg("Registration successful, please login");
  };

  const logout = () => {
    localStorage.removeItem("ridego_user");
    setUser(null);
    setType("error");
    setMsg("Logged out");
  };

  return (
    <>
      <Navbar user={user} logout={logout} />

      <Toast message={msg} type={type} clear={() => setMsg(null)} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register register={register} />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route
          path="/booking-history"
          element={<BookingHistory user={user} />}
        />
      </Routes>
      <Routes>
  <Route path="/tracking" element={<Tracking />} />
</Routes>

      <Footer />
    </>
  );
}
