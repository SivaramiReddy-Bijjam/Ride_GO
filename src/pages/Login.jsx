import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const saved = JSON.parse(localStorage.getItem("ridego_register"));

    // ✅ If user never registered
    if (!saved) {
      alert("No account found. Please register first.");
      return;
    }

    // ✅ Normal login (use saved data forever)
    if (saved.email === email && saved.password === password) {
      login(email);
      navigate("/");
    } else {
      alert("Please check your credentials");
    }
  };

  return (
    <div style={page}>
      {/* 🔥 ANIMATED QUOTE — TOP LEFT */}
      <div style={quoteWrap}>
        <h1 style={quoteText}>
          Your journey begins here <br />
          <span style={{ color: "#22c55e" }}>
            Comfort, safety & freedom on every ride
          </span>
        </h1>
      </div>

      {/* LOGIN FORM */}
      <div style={formWrap}>
        <div style={formBox}>
          <img src={logo} width="60" />
          <h2 style={{ margin: "15px 0" }}>Login to RideGo</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <div style={pwdWrap}>
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...input, marginBottom: 0 }}
            />
            <span
              onClick={() => setShowPwd(!showPwd)}
              style={eyeIcon}
            >
              {showPwd ? "👁️‍🗨️" : "👁"}
            </span>
          </div>

          <button style={btn} onClick={handleLogin}>
            Login
          </button>

          <p style={{ marginTop: "12px" }}>
            No account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES (UNCHANGED) ================= */

const page = {
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingRight: "80px",
  backgroundImage:
    "url(https://content.carlelo.com/uploads/cdn_img/honda-electric-suv.webp)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  position: "relative",
};

const quoteWrap = {
  position: "absolute",
  top: "60px",
  left: "60px",
  animation: "fadeSlide 1.5s ease forwards",
};

const quoteText = {
  color: "#ffffff",
  fontSize: "36px",
  fontWeight: "800",
  maxWidth: "520px",
  lineHeight: "1.3",
  textShadow: "0 6px 20px rgba(0,0,0,0.85)",
};

const formWrap = {
  display: "flex",
  alignItems: "center",
};

const formBox = {
  backgroundColor: "#50c3daff",
  padding: 40,
  width: 360,
  borderRadius: 10,
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  border: "1px solid #096818ff",
  borderRadius: 6,
};

const pwdWrap = {
  position: "relative",
  marginBottom: 12,
};

const eyeIcon = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: 18,
};

const btn = {
  width: "100%",
  padding: 12,
  background: "#147d18ff",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
