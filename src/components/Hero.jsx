export default function Hero() {
  return (
    <section
      className="pt-28 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-40 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reliable Car & Bike Rentals
          </h1>

          <p className="text-lg md:text-xl mb-8">
            Fast, affordable rides for your travel needs
          </p>

          <button
            className="bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 rounded-full font-semibold"
            onClick={() => alert("Booking action here")}
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}
