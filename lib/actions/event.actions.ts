"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database/event.model";

export const GetSimilarEvents = async ({ slug }: { slug: string }) => {
  try {
    await connectToDatabase();
    const event = await Event.findOne({ slug });
    return await Event.find({
      _id: { $ne: event?._id },
      tags: { $in: event?.tags },
    }).lean();
  } catch (error) {
    return [];
  }
};
