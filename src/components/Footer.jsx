export default function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#3b868eff",
        borderTop: "1px solid #261859ff",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "auto",
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          color: "#064a12ff",
        }}
      >
        <span>© 2025 RideGo</span>
        <span>Cars & Bikes Rental</span>
      </div>
    </footer>
  );
}
