"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";

/* ------------------ SEAT BUTTON (Fixed) ------------------ */
function SeatButton({ seat, isBooked, onClick }) {
  return (
    <button
      // 1. Explicitly disable the button so the browser respects the state
      disabled={isBooked}
      onClick={onClick}
      className={`
        aspect-square rounded-md border text-sm font-medium transition-colors
        ${
          isBooked
            ? "bg-red-500 text-white border-red-600 cursor-not-allowed opacity-90"
            : "bg-green-500 text-white border-green-600 hover:bg-green-600 cursor-pointer"
        }
      `}
    >
      {seat}
    </button>
  );
}

/* ------------------ MAIN PAGE ------------------ */
export default function Home() {
  const { request, loading } = useApi();

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookedSeatMap, setBookedSeatMap] = useState({});

  const seats = Array.from({ length: 60 }, (_, i) => i + 1);

  /* ------------------ FETCH BOOKED SEATS ------------------ */
  const loadBookedSeats = async () => {
    const res = await request({
      url: "/api/bookings/all",
    });

    if (res.ok) {
      const map = {};
      res.data.data.forEach((b) => {
        map[b.seat] = b;
      });
      setBookedSeatMap(map);
    }
  };

  useEffect(() => {
    loadBookedSeats();
  }, []);

  /* ------------------ MODAL HELPERS ------------------ */
  const closeModal = () => {
    setSelectedSeat(null);
    setName("");
    setPhone("");
  };

  const confirmBooking = async (e) => {
    e.preventDefault(); // IMPORTANT: stop page reload

    if (!name || !phone || loading) return;

    const res = await request({
      url: "/api/bookings",
      method: "POST",
      body: {
        seat: selectedSeat,
        name,
        phone,
      },
      showSuccess: true,
      refresh: true,
    });

    if (res.ok) {
      await loadBookedSeats();
      closeModal();
    }
  };

  return (
    <div>
      {/* ------------------ HERO ------------------ */}
      <div className="relative h-87.5 w-full">
        <img
          src="/movie-hall.jpeg"
          alt="Movie Theater"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-4xl font-bold text-white">Select Your Seat</h1>
        </div>
      </div>

      {/* ------------------ SEATS GRID ------------------ */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-6 gap-4 sm:grid-cols-10 md:grid-cols-15">
          {seats.map((seat) => {
            const isBooked = Boolean(bookedSeatMap[seat]);

            return (
              <SeatButton
                key={seat}
                seat={seat}
                isBooked={isBooked}
                onClick={() => setSelectedSeat(seat)}
              />
            );
          })}
        </div>
      </div>

      {/* ------------------ MODAL ------------------ */}
      {selectedSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={confirmBooking}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl transition-all"
          >
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Book Seat #{selectedSeat}
            </h2>

            <div className="space-y-5">
              <p className="text-sm text-gray-500">
                Please enter your details below to confirm this booking.
              </p>

              {/* Group 1: Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Group 2: Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3 pt-3">
              <button
                type="button" // prevents accidental submit
                onClick={closeModal}
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!name || !phone || loading}
                className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
