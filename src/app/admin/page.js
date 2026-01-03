"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";

export default function AdminPage() {
  const { request } = useApi();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await request({
        url: "/api/bookings/all",
      });

      if (res.ok) setBookings(res.data.data);
    };
    load();
  }, []);

  const map = {};
  bookings.forEach((b) => (map[b.seat] = b));

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Booked Seats – Admin Panel
        </h1>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <tr>
                <th className="px-4 py-3">Seat No</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Mobile Number</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {booking.seat}
                  </td>
                  <td className="px-4 py-3">
                    {booking.name}
                  </td>
                  <td className="px-4 py-3">
                    {booking.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <p className="mt-4 text-sm text-gray-500">
            No seats have been booked yet.
          </p>
        )}
      </div>
    </div>
  );
}
