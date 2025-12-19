import { useNavigate } from "react-router-dom";

export default function BookingSummary() {
  const navigate = useNavigate();

  const booking = JSON.parse(localStorage.getItem("ridego_last_booking"));

  if (!booking) {
    return <h2 style={{ padding: 40 }}>No booking found</h2>;
  }

  return (
    <div style={page}>
      <div style={card}>
        <h2>✅ Booking Confirmed</h2>

        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>
        <p><strong>Vehicle ID:</strong> {booking.vehicleId}</p>
        <p><strong>Route:</strong> {booking.pickup} → {booking.drop}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time}</p>

        <button style={btn} onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

/* styles */
const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f1f5f9",
};

const card = {
  background: "#fff",
  padding: 30,
  width: 420,
  borderRadius: 12,
  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
};

const btn = {
  marginTop: 20,
  width: "100%",
  padding: 14,
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold",
  cursor: "pointer",
};
