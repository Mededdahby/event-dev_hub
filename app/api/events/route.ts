import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const event = await req.json(); // ✅ JSON body

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event creation failed!",
        error: e instanceof Error ? e : "Unknown error",
      },
      { status: 500 },
    );
  }
}
