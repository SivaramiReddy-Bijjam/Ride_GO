import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PaymentHistory({ user }) {
  if (!user) return <Navigate to="/login" />;

  const [payments, setPayments] = useState(
    JSON.parse(localStorage.getItem("ridego_payments") || "[]")
  );

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  /* ❌ DELETE SINGLE PAYMENT */
  const deleteOne = (id) => {
    const ok = window.confirm("Delete this payment?");
    if (!ok) return;

    const updated = payments.filter((p) => p.id !== id);
    localStorage.setItem("ridego_payments", JSON.stringify(updated));
    setPayments(updated);
  };

  /* 🗑️ DELETE ALL PAYMENTS */
  const deleteAll = () => {
    const ok = window.confirm("Delete ALL payment history?");
    if (!ok) return;

    localStorage.removeItem("ridego_payments");
    setPayments([]);
  };

  return (
    <div style={page}>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>💳 Payment History</h2>

          {payments.length > 0 && (
            <button style={deleteAllBtn} onClick={deleteAll}>
              Delete All
            </button>
          )}
        </div>

        {payments.length === 0 && (
          <p style={emptyText}>No payments yet 💸</p>
        )}

        {/* PAYMENTS */}
        <div style={list}>
          {payments.map((p, index) => (
            <div
              key={p.id}
              style={{
                ...card,
                animation: animate
                  ? `slideFade 0.5s ease ${index * 0.1}s both`
                  : "none",
              }}
            >
              <div style={row}>
                <h3 style={name}>{p.name}</h3>
                <button
                  style={deleteBtn}
                  onClick={() => deleteOne(p.id)}
                  title="Delete payment"
                >
                  ✖
                </button>
              </div>

              <div style={details}>
                <p><strong>💰 Amount:</strong> ₹{p.amount}</p>
                <p><strong>💳 Method:</strong> {p.method}</p>
                <p><strong>🚘 Vehicle:</strong> {p.vehicleId}</p>
                <p><strong>🧾 Payment ID:</strong> {p.paymentId}</p>
                <p><strong>🗓️ Date:</strong> {p.date} {p.time}</p>
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
  background: "linear-gradient(135deg, #ecfeff, #f0fdf4)",
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
  color: "#065f46",
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
  borderLeft: "6px solid #16a34a",
  transition: "transform 0.3s, box-shadow 0.3s",
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
