import { useEffect } from "react";

export default function Toast({ message, type, clear }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clear();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, clear]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",          // 👈 BELOW NAVBAR
        right: "20px",
        zIndex: 9999,
        fontWeight: "bold",
        color: type === "success" ? "green" : "red",
        background: "transparent", // 👈 NO BOX
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
}
