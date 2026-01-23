import { Event } from "@/database/event.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ slug: string }>;
};
export async function GET(res: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    console.log("FETCHING EVENT WITH SLUG:", slug);
    const event = await Event.findOne({ slug }).lean();
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ event }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: e instanceof Error ? e : "Unknown error",
      },
      { status: 500 },
    );
  }
}
