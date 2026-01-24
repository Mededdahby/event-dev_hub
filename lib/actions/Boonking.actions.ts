"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/database";

export const BookEventAction = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectToDatabase();
    await Booking.create({ eventId, email, slug });
    return { status: "success" };
  } catch (error) {
    throw new Error("Failed to book event");
  }
};
