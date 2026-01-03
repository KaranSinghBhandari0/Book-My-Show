import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    seat: { type: Number, 
      required: true, 
      unique: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Invalid phone number"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
