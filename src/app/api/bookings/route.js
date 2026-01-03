import { connectDB } from "@/lib/connectDB";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    let { seat, name, phone } = body;

    /* ------------------ BASIC PRESENCE CHECK ------------------ */
    if (seat === undefined || name === undefined || phone === undefined) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    /* ------------------ SANITIZATION ------------------ */
    name = name.trim();
    phone = phone.trim();

    /* ------------------ NAME VALIDATION ------------------ */
    if (name.length < 2) {
      return Response.json(
        { success: false, message: "Name must contain at least 2 characters" },
        { status: 400 }
      );
    }

    // Optional: allow only letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      return Response.json(
        { success: false, message: "Name can contain only letters and spaces" },
        { status: 400 }
      );
    }

    /* ------------------ PHONE VALIDATION ------------------ */
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return Response.json(
        { success: false, message: "Mobile number must be exactly 10 digits" },
        { status: 400 }
      );
    }

    /* ------------------ SEAT VALIDATION ------------------ */
    if (!Number.isInteger(seat) || seat <= 0) {
      return Response.json(
        { success: false, message: "Invalid seat number" },
        { status: 400 }
      );
    }

    /* ------------------ DUPLICATE SEAT CHECK ------------------ */
    const exists = await Booking.findOne({ seat });
    if (exists) {
      return Response.json(
        { success: false, message: "Seat already booked" },
        { status: 409 }
      );
    }

    /* ------------------ CREATE BOOKING ------------------ */
    await Booking.create({ seat, name, phone });

    return Response.json({
      success: true,
      message: "Seat booked successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      return Response.json(
        { success: false, message: "Seat already booked" },
        { status: 409 }
      );
    }

    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
