import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { Event } from "./event.model";

export interface BookingDocument extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: (value: string) => emailRegex.test(value),
    },
  },
  { timestamps: true }
);

bookingSchema.pre("save", async function (next) {
  // Ensure the referenced event exists before saving the booking.
  const eventExists = await Event.exists({ _id: this.eventId });
  if (!eventExists) {
    return next(new Error("Referenced event does not exist."));
  }
  return next();
});

export const Booking: Model<BookingDocument> =
  mongoose.models.Booking ??
  mongoose.model<BookingDocument>("Booking", bookingSchema);
