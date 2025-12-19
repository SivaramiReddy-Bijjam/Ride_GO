import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* ================= VEHICLE DATA (UNCHANGED) ================= */

const CARS = [
  { id: 1, name: "Maruti Swift", seats: 4, fuel: "Petrol", price: "₹220 / km", img: "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_640.jpg" },
  { id: 2, name: "Hyundai i20", seats: 4, fuel: "Petrol", price: "₹336 / km", img: "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_640.jpg" },
  { id: 3, name: "Honda City", seats: 4, fuel: "Petrol", price: "₹143 / km", img: "https://imgd.aeplcdn.com/642x361/n/cw/ec/194885/g-class-with-eq-power-exterior-left-front-three-quarter-5.jpeg?isig=0&q=75" },
  { id: 4, name: "Toyota Innova", seats: 6, fuel: "Diesel", price: "₹187 / km", img: "https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_640.jpg" },
  { id: 5, name: "Mahindra Scorpio", seats: 6, fuel: "Petrol", price: "₹208/ km", img: "https://www.livemint.com/lm-img/img/2024/08/27/600x338/nexon_cng_1706783309582_1724780803011.jpg" },
  { id: 6, name: "Tata Nexon", seats: 5, fuel: "Petrol", price: "₹159 / km", img: "https://carindia.in/wp-content/uploads/2021/01/Toyota-Fortuner-2021-India.jpg" },
  { id: 7, name: "Toyota Fortuner", seats: 7, fuel: "Petrol", price: "₹226 / km", img: "https://i.cdn.newsbytesapp.com/images/l53620231120103549.png" },
  { id: 8, name: "Skoda Rapid", seats: 4, fuel: "Petrol", price: "₹148 / km", img: "https://cdn.pixabay.com/photo/2014/09/07/22/34/car-438467_640.jpg" },
  { id: 9, name: "Volkswagen Polo", seats: 4, fuel: "Petrol", price: "₹139 / km", img: "https://storage.googleapis.com/strapi-file-uploads-pp-cpy/20230109061122_MG_Hector_BG_3_Jpg_1_7f8365bf5b.jpg" },
  { id: 10, name: "Renault Duster", seats: 5, fuel: "Petrol", price: "₹165 / km", img: "https://i.cdn.newsbytesapp.com/images/l72920230907112608.jpeg" },
];

const BIKES = [
  { id: 1, name: "Royal Enfield Classic", seats: 2, fuel: "Petrol", price: "₹98 / km", img: "https://images.hindustantimes.com/auto/img/2021/12/17/1600x900/New-Royal-Enfield-Bikes-in-2020_1608970324405_1608970342329_1639719727769.jpeg" },
  { id: 2, name: "Bajaj Pulsar", seats: 2, fuel: "Petrol", price: "₹54 / km", img: "https://i.ytimg.com/vi/JR7HUEeSlNM/maxresdefault.jpg" },
  { id: 3, name: "TVS Apache", seats: 2, fuel: "Petrol", price: "₹59 / km", img: "https://images.hindustantimes.com/auto/img/2020/05/13/600x338/indian-ftr-1200_1588172877332_1588172877642_1589370092100.jpg" },
  { id: 4, name: "Hero Splendor", seats: 2, fuel: "Petrol", price: "₹46 / km", img: "https://www.godigit.com/content/dam/godigit/directportal/en/husqvarna-vitpilen-125-brand.jpg" },
  { id: 5, name: "Honda Shine", seats: 2, fuel: "Petrol", price: "₹45 / km", img: "https://www.motorbeam.com/wp-content/uploads/2016-Ducati-959-Panigale.jpg" },
  { id: 6, name: "Yamaha FZ", seats: 2, fuel: "Petrol", price: "₹55 / km", img: "https://cdn.bikedekho.com/processedimages/honda/cb350c/source/cb350c68e3a06b8f27c.jpg?tr=w-360" },
  { id: 7, name: "KTM Duke", seats: 2, fuel: "Petrol", price: "₹76 / km", img: "https://english.cdn.zeenews.com/sites/default/files/2022/09/16/1091116-shotgun-650-up.jpg" },
  { id: 8, name: "Suzuki Gixxer", seats: 2, fuel: "Petrol", price: "₹54 / km", img: "https://images.91wheels.com/assets/b_images/main/models/profile/profile1731480272.jpg?w=960&q=50" },
  { id: 9, name: "Honda Activa", seats: 2, fuel: "Petrol", price: "₹48 / km", img: "https://static.toiimg.com/thumb/msid-96680090,imgsize-74068,width-400,resizemode-4/super-meteor-650.jpg" },
  { id: 10, name: "Jupiter", seats: 2, fuel: "Petrol", price: "₹44 / km", img: "https://www.mototechindia.com/wp-content/uploads/2020/07/yamaha-upcoming-new-bikes.jpg" },
];

/* ================= TRUCKS ================= */
const TRUCKS = [
  { id: 1, name: "Mini Truck", seats: 2, fuel: "Diesel", price: "₹25 / km", img: "https://thumbs.dreamstime.com/b/fast-reliable-truck-delivery-services-logo-elements-transportation-companies-shipping-orders-distribution-rental-402524731.jpg" },
  { id: 2, name: "Container Truck", seats: 2, fuel: "Diesel", price: "₹35 / km", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qGAunoUhuLjxUJTSsO1a0eOfQj74H4_Kbg&s" },
  { id: 3, name: "Small Cargo Truck", seats: 2, fuel: "Diesel", price: "₹27 / km", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBttmR-kx9ZyK4wWFsEgo4AcFXVZxq-HZACg&s" },
  { id: 4, name: "Medium Duty Truck", seats: 2, fuel: "Diesel", price: "₹30 / km", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbIzs9qxUANxrfHcTTs8WpSc9OzK9dwaGKuQ&s" },
  { id: 5, name: "Heavy Load Truck", seats: 2, fuel: "Diesel", price: "₹40 / km", img: "https://5.imimg.com/data5/SELLER/Default/2024/11/467207328/ZI/SO/DS/236377927/compressjpeg-online-image-jpg-500x500.jpg" },
  { id: 6, name: "Open Body Truck", seats: 2, fuel: "Diesel", price: "₹32 / km", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1H4dGqAdKF0oiOL0K5HaSKtf9Q30BR6rvxg&s" },
  { id: 7, name: "Closed Body Truck", seats: 2, fuel: "Diesel", price: "₹34 / km", img: "https://content.jdmagicbox.com/v2/comp/hyderabad/u6/040pxx40.xx40.160413155907.i9u6/catalogue/azaan-express-transport-bala-nagar-hyderabad-trucks-on-rent-m7jgabtxes.jpg" },
  { id: 8, name: "Refrigerated Truck", seats: 2, fuel: "Diesel", price: "₹45 / km", img: "https://www.fueloyal.com/wp-content/uploads/2016/10/10-Best-Moving-Truck-Rental-Companies-24.jpg" },
  { id: 9, name: "Long Haul Truck", seats: 2, fuel: "Diesel", price: "₹50 / km", img: "https://images.jdmagicbox.com/quickquotes/images_main/trucks-on-hire-tata-2218889878-hz70aya8.jpg" },
  { id: 10, name: "Logistics Truck", seats: 2, fuel: "Diesel", price: "₹38 / km", img: "https://thumbs.dreamstime.com/b/penske-rental-truck-road-penske-rental-truck-interstate-virginia-usa-400414138.jpg" },
];

/* ================= AUTOS ================= */
const AUTOS = [
  { id: 1, name: "Auto Rickshaw", seats: 3, fuel: "CNG", price: "₹18 / km", img: "https://www.godigit.com/content/dam/godigit/directportal/en/piaggio-ape-e-city-brand.jpg" },
  { id: 2, name: "City Auto", seats: 3, fuel: "CNG", price: "₹19 / km", img: "https://www.godigit.com/content/dam/godigit/directportal/en/atul-elite-plus-brand.jpg" },
  { id: 3, name: "Passenger Auto", seats: 3, fuel: "CNG", price: "₹20 / km", img: "https://electricvehicles.in/wp-content/uploads/2021/01/Top-10-electric-auto-rickshaws-8.jpg" },
  { id: 4, name: "Shared Auto", seats: 4, fuel: "CNG", price: "₹17 / km", img: "https://electricvehicles.in/wp-content/uploads/2023/12/Lohia-Humsafar-IAQ.jpg" },
  { id: 5, name: "Electric Auto", seats: 3, fuel: "Electric", price: "₹16 / km", img: "https://electricvehicles.in/wp-content/uploads/2021/01/Top-10-electric-auto-rickshaws-2.jpg" },
  { id: 6, name: "Local Auto", seats: 3, fuel: "CNG", price: "₹18 / km", img: "https://electricvehicles.in/wp-content/uploads/2021/01/Top-10-electric-auto-rickshaws-5.jpg" },
  { id: 7, name: "Fast Auto", seats: 3, fuel: "CNG", price: "₹21 / km", img: "https://yocharge.com/wp-content/uploads/2024/08/Euler-Motors-Hi-Load.webp" },
  { id: 8, name: "Daily Ride Auto", seats: 3, fuel: "CNG", price: "₹18 / km", img: "https://yocharge.com/wp-content/uploads/2024/08/Bajaj-Maxima-Cargo-E-TEC-9.0-1024x576.webp" },
  { id: 9, name: "Metro Auto", seats: 3, fuel: "CNG", price: "₹22 / km", img: "https://www.cmv360.com/_next/image?url=https%3A%2F%2Fd1odgbsvvxl2qd.cloudfront.net%2FBajaj_Maxima_XL_Cargo_E_Tec_12_0_b8c27a35a9.webp&w=3840&q=75" },
  { id: 10, name: "Comfort Auto", seats: 3, fuel: "CNG", price: "₹23 / km", img: "https://5.imimg.com/data5/SELLER/Default/2022/8/CW/CA/NH/132692422/bajaj-maxima-yellow-cargo-cng-auto.JPG" },
];

/* ================= BUSES ================= */
const BUSES = [
  { id: 1, name: "Tempo Traveller", seats: 12, fuel: "Diesel", price: "₹28 / km", img: "https://cdn.motorfloor.com/vehicles/bus/volvo-9600-15m.jpg" },
  { id: 2, name: "Mini Bus", seats: 20, fuel: "Diesel", price: "₹30 / km", img: "https://sehgaltravel.com/wp-content/uploads/2020/12/Types-of-Luxury-buses-in-India-1.jpg" },
  { id: 3, name: "City Bus", seats: 40, fuel: "Diesel", price: "₹35 / km", img: "https://i.ytimg.com/vi/CCfgBHhxhJ8/maxresdefault.jpg" },
  { id: 4, name: "AC Bus", seats: 45, fuel: "Diesel", price: "₹45 / km", img: "https://5.imimg.com/data5/PK/WT/MY-3525736/17156253_1524781624198647_1491642679275501910_n.jpg" },
  { id: 5, name: "Non-AC Bus", seats: 50, fuel: "Diesel", price: "₹32 / km", img: "https://i.ndtvimg.com/i/2015-12/mercedes-benz-bus-827_827x510_61450773888.jpg" },
  { id: 6, name: "Luxury Bus", seats: 35, fuel: "Diesel", price: "₹55 / km", img: "https://chennaibusrental.com/wp-content/uploads/2022/01/Mercedes-Benz-Luxury-Coach.jpeg" },
  { id: 7, name: "Sleeper Bus", seats: 30, fuel: "Diesel", price: "₹60 / km", img: "https://i.ytimg.com/vi/uxRHZZ1Arvg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAXYdWSJuq-g_rKs7wUxbUTVJH7JQ" },
  { id: 8, name: "Tourist Bus", seats: 45, fuel: "Diesel", price: "₹50 / km", img: "https://sehgaltransport.com/wp-content/uploads/2024/10/sehgal-bus.webp" },
  { id: 9, name: "School Bus", seats: 40, fuel: "Diesel", price: "₹25 / km", img: "https://jcbl.com/jcbl-images/products/luxury/luxury-7.jpg" },
  { id: 10, name: "Intercity Bus", seats: 50, fuel: "Diesel", price: "₹48 / km", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFaMH_7EoZm8K_AcNXJnmOOrX9upu7ZT51UA&s" },
];

/* ================= CYCLES ================= */
const CYCLES = [
  { id: 1, name: "Standard Cycle", seats: 1, fuel: "Manual", price: "₹5 / km", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_a7-kFe26apntf26xxbBoI0AyF8gXQKOB4w&s" },
  { id: 2, name: "City Cycle", seats: 1, fuel: "Manual", price: "₹6 / km", img: "https://img.thedailyjagran.com/article-img/2025/10/03/640x360/best-hero-cycles-708226_mobile.webp" },
  { id: 3, name: "Mountain Cycle", seats: 1, fuel: "Manual", price: "₹7 / km", img: "https://asset7.ckassets.com/blog/wp-content/uploads/sites/5/2024/07/Urban-Terrain-Galaxy-Max-Mountain-Cycle-1.jpg" },
  { id: 4, name: "Road Cycle", seats: 1, fuel: "Manual", price: "₹6 / km", img: "https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2024/07/Urban-Terrain-Galaxy-Pro-Mountain-Cycles-1024x512.jpg" },
  { id: 5, name: "Gear Cycle", seats: 1, fuel: "Manual", price: "₹8 / km", img: "https://cdn.shopify.com/s/files/1/0628/5547/9548/files/6005010463_533x.jpg?v=1748598718" },
  { id: 6, name: "Single Speed Cycle", seats: 1, fuel: "Manual", price: "₹5 / km", img: "https://img.thedailyjagran.com/article-img/2025/12/02/1200x675/best-cycles-under-15000-in-india-597247.webp" },
  { id: 7, name: "Hybrid Cycle", seats: 1, fuel: "Manual", price: "₹7 / km", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmNJz8WxWETyplcE1nbHaHpnGx8P6_tLsrNQ&s" },
  { id: 8, name: "Kids Cycle", seats: 1, fuel: "Manual", price: "₹4 / km", img: "https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ArrowX26VBPFBlackRed_533x.jpg?v=1762840539" },
  { id: 9, name: "Folding Cycle", seats: 1, fuel: "Manual", price: "₹6 / km", img: "https://images.91wheels.com/news/wp-content/uploads/2021/05/Kross-Bolt-28T.jpg?width=640&&q=80" },
  { id: 10, name: "Electric Cycle", seats: 1, fuel: "Electric", price: "₹10 / km", img: "https://imagesvs.oneindia.com/img/2024/03/gh-8-quesec-bikes-x6-series-high-performance-6-spoke-bmw-folding-bicycle-1-1024x577.jpg" },
];


/* ================= HOME ================= */

export default function Home({ user }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("ALL");

  if (!user) return <Navigate to="/login" />;

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const onBack = () => {
      alert("Please logout before leaving the home page");
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, []);

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 16,
    background: "#fff",
  };

  const buttonStyle = {
    marginTop: 12,
    width: "100%",
    padding: 10,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
    gap: 20,
  };

  const renderCard = (v, type) => (
    <div key={v.id} style={cardStyle}>
      <img src={v.img} style={{ width: "100%", height: 130, objectFit: "contain" }} />
      <h4>{v.name}</h4>
      <p>Seats: {v.seats}</p>
      <p>Fuel: {v.fuel}</p>
      <strong>{v.price}</strong>
      <button style={buttonStyle} onClick={() => navigate(`/booking/${type}-${v.id}`)}>
        Book Now
      </button>
    </div>
  );

  return (
    <div style={{ paddingTop: 90, paddingBottom: 70, paddingInline: 40 }}>

      {/* 🔹 CATEGORY BAR (ADDED ONLY) */}
      <div style={{ display: "flex", gap: 12, marginBottom: 30 }}>
        {["ALL", "CARS", "BIKES", "CYCLES", "TRUCKS", "AUTOS", "BUSES"].map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              background: category === c ? "#2563eb" : "#e5e7eb",
              color: category === c ? "#fff" : "#000",
              fontWeight: 600,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {(category === "ALL" || category === "CARS") && (
        <>
          <h2>🚗 Cars</h2>
          <div style={grid}>{CARS.map(v => renderCard(v, "car"))}</div>
        </>
      )}

      {(category === "ALL" || category === "BIKES") && (
        <>
          <h2 style={{ marginTop: 40 }}>🏍️ Bikes</h2>
          <div style={grid}>{BIKES.map(v => renderCard(v, "bike"))}</div>
        </>
      )}

      {(category === "ALL" || category === "CYCLES") && (
        <>
          <h2 style={{ marginTop: 40 }}>🚲 Cycles</h2>
          <div style={grid}>{CYCLES.map(v => renderCard(v, "cycle"))}</div>
        </>
      )}

      {(category === "ALL" || category === "TRUCKS") && (
        <>
          <h2 style={{ marginTop: 40 }}>🚚 Trucks</h2>
          <div style={grid}>{TRUCKS.map(v => renderCard(v, "truck"))}</div>
        </>
      )}

      {(category === "ALL" || category === "AUTOS") && (
        <>
          <h2 style={{ marginTop: 40 }}>🛺 Autos</h2>
          <div style={grid}>{AUTOS.map(v => renderCard(v, "auto"))}</div>
        </>
      )}

      {(category === "ALL" || category === "BUSES") && (
        <>
          <h2 style={{ marginTop: 40 }}>🚌 Buses</h2>
          <div style={grid}>{BUSES.map(v => renderCard(v, "bus"))}</div>
        </>
      )}
    </div>
  );
}
