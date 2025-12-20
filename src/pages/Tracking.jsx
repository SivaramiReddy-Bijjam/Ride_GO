import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";

/* Fix Leaflet marker icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Famous cities */
const cities = {
  Delhi: { lat: 28.6139, lng: 77.2090 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Hyderabad: { lat: 17.3850, lng: 78.4867 },
  Darsi: { lat: 15.7712, lng: 79.6791 },
};

/* Distance in KM */
const calculateDistanceKm = (from, to) => {
  return (
    Math.sqrt(
      Math.pow(from.lat - to.lat, 2) +
      Math.pow(from.lng - to.lng, 2)
    ) * 111
  );
};

/* ETA */
const calculateETA = (from, to) => {
  const km = calculateDistanceKm(from, to);
  return Math.max(1, Math.round(km * 2)); // 2 min per km
};

/* 💰 PRICE */
const calculatePrice = (from, to) => {
  const baseFare = 50;
  const perKmRate = 12;
  const distance = calculateDistanceKm(from, to);

  const price = baseFare + distance * perKmRate;
  return Math.max(80, Math.round(price));
};

export default function Tracking() {
  const params = useParams();
  const navigate = useNavigate();

  const bookingId = params?.id || "2356230632";

  const pickup = cities.Delhi;

  const [status, setStatus] = useState("Finding drivers...");
  const [eta, setEta] = useState(0);
  const [price, setPrice] = useState(0);

  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "Pulla Raju",
      phone: "+91 8341531147",
      vehicle: "Ola Mini",
      city: "Hyderabad",
      position: { ...cities.Hyderabad },
    },
    {
      id: 2,
      name: "Suresh Kumar",
      phone: "+91 9123456789",
      vehicle: "Uber Go",
      city: "Bangalore",
      position: { ...cities.Bangalore },
    },
    {
      id: 3,
      name: "Anil Verma",
      phone: "+91 9988776655",
      vehicle: "Rapido Bike",
      city: "Darsi",
      position: { ...cities.Darsi },
    },
  ]);

  /* Status updates */
  useEffect(() => {
    const steps = [
      "Drivers nearby 🚗",
      "Finding nearest driver 📍",
      "Driver on the way ✅",
    ];
    let i = 0;

    const timer = setInterval(() => {
      if (i < steps.length) {
        setStatus(steps[i]);
        i++;
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  /* Live driver movement */
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers((prev) =>
        prev.map((d) => ({
          ...d,
          position: {
            lat: d.position.lat + (Math.random() - 0.5) * 0.01,
            lng: d.position.lng + (Math.random() - 0.5) * 0.01,
          },
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* Nearest driver */
  const nearestDriver = drivers.reduce((nearest, driver) => {
    const d1 = calculateDistanceKm(driver.position, pickup);
    const d2 = calculateDistanceKm(nearest.position, pickup);
    return d1 < d2 ? driver : nearest;
  }, drivers[0]);

  /* Update ETA & PRICE */
  useEffect(() => {
    if (nearestDriver) {
      setEta(calculateETA(nearestDriver.position, pickup));
      setPrice(calculatePrice(nearestDriver.position, pickup));
    }
  }, [drivers]);

  return (
    <div style={{ padding: "32px", minHeight: "100vh", background: "#f9fafb" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        Ride Tracking
      </h1>

      {/* Summary */}
      <div style={cardStyle}>
        <p><strong>Booking ID:</strong> {bookingId}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>ETA:</strong> {eta} min</p>
        <p><strong>Estimated Price:</strong> ₹{price}</p>
        <p><strong>Pickup City:</strong> Delhi</p>
      </div>

      {/* MAP */}
      <div style={{ ...cardStyle, height: "400px", padding: 0 }}>
        <MapContainer
          center={pickup}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Pickup */}
          <Marker position={pickup}>
            <Popup>Pickup — Delhi</Popup>
          </Marker>

          {/* Drivers */}
          {drivers.map((driver) => {
            const driverEta = calculateETA(driver.position, pickup);
            const driverPrice = calculatePrice(driver.position, pickup);

            return (
              <Marker key={driver.id} position={driver.position}>
                {/* 🔥 HOVER */}
                <Tooltip direction="top" opacity={1}>
                  ETA: {driverEta} min<br />
                  ₹{driverPrice}
                </Tooltip>

                {/* CLICK */}
                <Popup>
                  <strong>{driver.name}</strong><br />
                  {driver.vehicle}<br />
                  {driver.city}<br />
                  {driver.phone}<br />
                  <strong>ETA:</strong> {driverEta} min<br />
                  <strong>Price:</strong> ₹{driverPrice}
                </Popup>
              </Marker>
            );
          })}

          {/* Route */}
          {nearestDriver && (
            <Polyline
              positions={[
                [nearestDriver.position.lat, nearestDriver.position.lng],
                [pickup.lat, pickup.lng],
              ]}
              color="blue"
            />
          )}
        </MapContainer>
      </div>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          background: "#0f766e",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "16px",
  borderRadius: "8px",
  marginTop: "16px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
};
