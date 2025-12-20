import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar({ user, logout }) {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  // get name from registration data
  const registeredUser = JSON.parse(
    localStorage.getItem("ridego_register")
  );
  const userName = registeredUser?.name;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header
      style={{
        borderBottom: "1px solid #178a19ff",
        position: "sticky",
        top: 0,
        background: "#3f8985ff",
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
        }}
      >
        {/* LEFT BRAND */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            position: "relative",
          }}
        >
          <img
            src="/RideGo.png"
            alt="RideGo"
            onClick={(e) => {
              e.preventDefault();
              setShowPreview((prev) => !prev);
            }}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #4f46e5",
              cursor: "pointer",
            }}
          />

          {showPreview && (
            <img
              src="/RideGo.png"
              alt="RideGo Preview"
              style={{
                position: "absolute",
                top: "65%",
                left: "90px",
                width: "220px",
                height: "180px",
                borderRadius: "50%",
                objectFit: "cover",
                background: "#fff",
                border: "3px solid #4f46e5",
                boxShadow: "0 12px 35px rgba(0,0,0,0.35)",
                zIndex: 999,
              }}
            />
          )}

          <span
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#250f5cff",
            }}
          >
            RideGo
          </span>
        </Link>

        {/* RIGHT MENU */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            fontWeight: 500,
          }}
        >
         
                   {/* ✅ AFTER LOGIN */}
          {user && userName && (
            <span style={{ fontWeight: 600, color: "#150e62ff" }}>
              Welcome👋, {userName}
            </span>
          )}

          {/* ✅ HOME ALWAYS VISIBLE */}
          <Link to="/" style={{ textDecoration: "none", color: "#134109ff" }}>
            Home🛖
          </Link>

          {user && (
            <Link
              to="/booking-history"
              style={{ textDecoration: "none", color: "#8d1072ff" }}
            >
              Booking History🧾
            </Link>
          )}

          {user && (
            <Link
              to="/tracking"
              style={{ textDecoration: "none", color: "#0f2965ff", fontWeight: 600 }}
            >
              Track Vehicle🛣️
            </Link>
          )}

          {/* ✅ BEFORE LOGIN (AND AFTER REGISTER) */}
          {!user && (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#132d64ff" }}
              >
                Login👇
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#0f5c1fff" }}
              >
                Sign Up👈
              </Link>
            </>
          )}

          {/* ✅ LOGOUT ONLY AFTER LOGIN */}
          {user && (
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "red",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Logout🙋‍♂️
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
