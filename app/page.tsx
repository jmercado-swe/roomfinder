"use client";

import { useMemo, useState } from "react";

type Room = {
  id: number;
  title: string;
  location: string;
  price: number;
  type: "Private room" | "Shared room" | "Studio";
  distance: string;
  image: string;
  description: string;
  amenities: string[];
};

const rooms: Room[] = [
  {
    id: 1,
    title: "Bright Room near BYU",
    location: "Provo",
    price: 650,
    type: "Private room",
    distance: "0.7 mi from campus",
    image: "🏠",
    description: "Sunny room in a quiet home with a shared kitchen, laundry, and fast Wi‑Fi.",
    amenities: ["Wi‑Fi", "Laundry", "Parking"],
  },
  {
    id: 2,
    title: "Cozy Studio with Mountain View",
    location: "Orem",
    price: 980,
    type: "Studio",
    distance: "1.4 mi from downtown",
    image: "✨",
    description: "A modern studio with full utilities, a study desk, and plenty of natural light.",
    amenities: ["Utilities", "Desk", "AC"],
  },
  {
    id: 3,
    title: "Budget-Friendly Shared Space",
    location: "Provo",
    price: 420,
    type: "Shared room",
    distance: "1.1 mi from campus",
    image: "🛏️",
    description: "Simple, affordable room in a friendly house with a social atmosphere and bike storage.",
    amenities: ["Bike storage", "Kitchen", "Housemates"],
  },
  {
    id: 4,
    title: "Modern Apartment Living",
    location: "Lehi",
    price: 1250,
    type: "Private room",
    distance: "3.3 mi from transit",
    image: "🏙️",
    description: "Clean, private room with easy access to local bus lines and a spacious common area.",
    amenities: ["Gym", "Pool", "Security"],
  },
];

const locations = ["All", ...new Set(rooms.map((room) => room.location))];

export default function Home() {
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState(1200);
  const [location, setLocation] = useState("All");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.title.toLowerCase().includes(query.toLowerCase()) ||
        room.location.toLowerCase().includes(query.toLowerCase()) ||
        room.description.toLowerCase().includes(query.toLowerCase());

      const matchesBudget = room.price <= budget;
      const matchesLocation = location === "All" || room.location === location;

      return matchesSearch && matchesBudget && matchesLocation;
    });
  }, [budget, location, query]);

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <header className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">RoomFinder</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Find a place that feels like home.</h1>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#listings" className="transition hover:text-slate-900">Listings</a>
            <a href="#why-us" className="transition hover:text-slate-900">Why us</a>
            <button className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700">
              Post a room
            </button>
          </nav>
        </header>

        <div className="mt-10 grid gap-8 rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl lg:grid-cols-[1.3fr_0.7fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Affordable living</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black tracking-tight md:text-5xl">
              Search rooms that fit your budget and lifestyle.
            </h2>
            <p className="mt-4 max-w-lg text-base text-slate-300 md:text-lg">
              Discover verified spaces near campus, downtown, and family-friendly neighborhoods without the guesswork.
            </p>

            <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur md:flex-row">
              <input
                aria-label="Search rooms"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by city or keyword"
                className="w-full rounded-xl border border-white/15 bg-slate-950/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none ring-0 transition focus:border-sky-400"
              />
              <button className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
                Explore rooms
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white/8 p-5">
            <p className="text-sm text-slate-300">Live within your ideal range</p>
            <div className="mt-4 flex items-end justify-between text-3xl font-bold text-white">
              <span>${budget}</span>
              <span className="text-sm text-sky-300">max / month</span>
            </div>
            <input
              aria-label="Choose monthly budget"
              type="range"
              min={300}
              max={1600}
              step={50}
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="mt-5 h-2 w-full accent-sky-400"
            />
            <div className="mt-3 flex justify-between text-xs text-slate-300">
              <span>$300</span>
              <span>$1600</span>
            </div>
          </div>
        </div>

        <div id="why-us" className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            ["✔ Verified listings", "Each room is reviewed for accuracy and community feedback."],
            ["💸 Budget-aware search", "Filter options by monthly cost and city before you book."],
            ["🤝 Local-friendly", "Get detailed information about roommates, transit, and neighborhoods."],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-lg font-bold text-slate-900">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>

        <section id="listings" className="mt-12">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Available now</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">Trending rooms</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {locations.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setLocation(city)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    location === city
                      ? "bg-sky-600 text-white"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <article key={room.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center justify-between bg-sky-50 px-5 py-4">
                    <div className="text-4xl">{room.image}</div>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
                      {room.type}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{room.title}</h4>
                        <p className="mt-1 text-sm text-slate-500">{room.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900">${room.price}</p>
                        <p className="text-xs text-slate-500">/month</p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">{room.description}</p>

                    <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                      <span>{room.distance}</span>
                      <span>★ 4.8</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <span key={amenity} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <button className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                      View details
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 lg:col-span-2 xl:col-span-3">
                No rooms match your current search. Try widening your budget or switching cities.
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
