import { connectDB } from "@/lib/connectDB";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ seat: 1 });

    return Response.json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
