import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ register }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (
      name.trim().length < 2 ||
      phone.trim().length < 10 ||
      !email.includes("@") ||
      password.length < 4
    ) {
      alert("Please enter valid details");
      return;
    }

    // ✅ Save user details
    localStorage.setItem(
      "ridego_register",
      JSON.stringify({ name, phone, email, password })
    );

    // ✅ Show navbar toast
    register();

    // ✅ Redirect to login after short delay
    setTimeout(() => {
      navigate("/login");
    }, 400);
  };

  return (
    <div style={pageWrap}>
      <div style={formBox}>
        <h2>Create Account</h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={input}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        {/* PASSWORD WITH ICON */}
        <div style={pwdWrap}>
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            value={password}
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

        <button style={btn} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

/* STYLES (UNCHANGED) */
const pageWrap = {
  minHeight: "100vh",
  background: "#80a8b7ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formBox = {
  background: "#106772ff",
  padding: 40,
  width: 360,
  borderRadius: 10,
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  border: "1px solid #ccc",
  borderRadius: 6,
};

const pwdWrap = {
  position: "relative",
  marginBottom: 16,
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
  background: "#0a790cff",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
