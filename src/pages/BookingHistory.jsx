import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BookingHistory({ user }) {
  if (!user) return <Navigate to="/login" />;

  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("ridego_bookings") || "[]")
  );

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  /* ❌ DELETE SINGLE */
  const deleteOne = (id) => {
    const ok = window.confirm("Delete this booking?");
    if (!ok) return;

    const updated = bookings.filter((b) => b.id !== id);
    localStorage.setItem("ridego_bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  /* 🗑️ DELETE ALL */
  const deleteAll = () => {
    const ok = window.confirm("Delete ALL booking history?");
    if (!ok) return;

    localStorage.removeItem("ridego_bookings");
    setBookings([]);
  };

  return (
    <div style={page}>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>📜 Booking History</h2>

          {bookings.length > 0 && (
            <button style={deleteAllBtn} onClick={deleteAll}>
              Delete All
            </button>
          )}
        </div>

        {bookings.length === 0 && (
          <p style={emptyText}>No bookings yet 🚕</p>
        )}

        {/* BOOKINGS */}
        <div style={list}>
          {bookings.map((b, index) => (
            <div
              key={b.id}
              style={{
                ...card,
                animation: animate
                  ? `slideFade 0.5s ease ${index * 0.1}s both`
                  : "none",
              }}
            >
              <div style={row}>
                <h3 style={name}>{b.name}</h3>
                <button
                  style={deleteBtn}
                  onClick={() => deleteOne(b.id)}
                  title="Delete booking"
                >
                  ✖
                </button>
              </div>

              <div style={details}>
                <p><strong>📞 Phone:</strong> {b.phone}</p>
                <p><strong>🚘 Vehicle:</strong> {b.vehicleId}</p>
                <p><strong>📍 Route:</strong> {b.pickup} → {b.drop}</p>
                <p><strong>🗓️ Date:</strong> {b.date} {b.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes slideFade {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #e0f2fe, #fef3c7)",
  padding: "40px",
};

const container = {
  maxWidth: 900,
  margin: "auto",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const title = {
  fontSize: 28,
  fontWeight: 700,
  color: "#1e3a8a",
};

const emptyText = {
  marginTop: 30,
  fontSize: 18,
  color: "#475569",
};

const list = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 20,
};

const card = {
  background: "linear-gradient(135deg, #ffffff, #f8fafc)",
  borderRadius: 16,
  padding: 18,
  boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
  borderLeft: "6px solid #2563eb",
  transition: "transform 0.3s, box-shadow 0.3s",
};

card[":hover"] = {
  transform: "translateY(-6px)",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const name = {
  margin: 0,
  color: "#0f172a",
};

const details = {
  fontSize: 14,
  color: "#334155",
  lineHeight: 1.6,
};

const deleteBtn = {
  background: "transparent",
  border: "none",
  fontSize: 18,
  color: "#dc2626",
  cursor: "pointer",
};

const deleteAllBtn = {
  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};
