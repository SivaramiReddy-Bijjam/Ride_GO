import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const CITIES = [
  "Bengaluru","Chennai","Hyderabad","Darsi","Mumbai","Ongole",
  "Delhi","Pune","Kolkata","Coimbatore","Madurai","Trichy",
];

const COUNTRY_CODES = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+971", label: "UAE" },
];

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [confirmOption,setConfirmOption]= useState("");

  const handleConfirm = () => {
    if (!pickup || !drop || !date || !time || !name || !confirmOption) {
      alert("Please fill all details");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    navigate("/booking-summary");
    navigate("/booking-history");
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2>🚕 Booking Vehicle {id}</h2>

        <input placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} style={input}/>
        <select value={pickup} onChange={(e)=>setPickup(e.target.value)} style={input}>
          <option value="">Select Pickup City</option>
          {CITIES.map(c => <option key={c}>{c}</option>)}
        </select>

        <select value={drop} onChange={(e)=>setDrop(e.target.value)} style={input}>
          <option value="">Select Drop City</option>
          {CITIES.map(c => <option key={c}>{c}</option>)}
        </select>

        <select value={confirmOption} onChange={(e)=>setConfirmOption(e.target.value)} style={input}>
          <option value="">Are you from surge</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={input}/>
        <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} style={input}/>

        <div style={{ display: "flex", gap: 10 }}>
          <select value={countryCode} onChange={(e)=>setCountryCode(e.target.value)} style={{...input,width:"35%"}}>
            {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.label})</option>)}
          </select>
          <input placeholder="10-digit Phone Number" value={phone} maxLength={10}
            onChange={(e)=> /^\d*$/.test(e.target.value) && setPhone(e.target.value)}
            style={{...input,width:"65%"}}/>
        </div>

        <button style={btn} onClick={handleConfirm}>Confirm Booking</button>
      </div>
    </div>
  );
}

const page = { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f1f5f9" };
const card = { background:"#fff", padding:30, width:420, borderRadius:12, boxShadow:"0 15px 40px rgba(0,0,0,0.15)" };
const input = { width:"100%", padding:12, marginBottom:12, borderRadius:6, border:"1px solid #ccc" };
const btn = { width:"100%", padding:14, background:"#2563eb", color:"#fff", border:"none", borderRadius:8, fontWeight:"bold", cursor:"pointer" };
