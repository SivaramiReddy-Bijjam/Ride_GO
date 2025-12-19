export default function VehicleCard({ v }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-5">
      <img src={v.img} alt={v.model} className="w-full h-36 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-3">{v.model}</h3>
      <p className="text-sm text-slate-500">{v.type} • {v.fuel}</p>
      <div className="mt-2 font-bold text-indigo-600">{v.price}</div>
      <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg">
        Book Now
      </button>
    </div>
  );
}
