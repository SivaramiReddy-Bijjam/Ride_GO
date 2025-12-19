export default function Hero() {
  return (
    <section className="pt-28 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517841905240-472988babdf9')" }}>
      <div className="bg-black/40 py-40">
        <div className="max-w-7xl mx-auto px-10 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Reliable Car & Bike Rentals</h1>
          <p className="text-xl mb-6">Fast, affordable rides for your travel needs</p>
          <button className="bg-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-700">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}
