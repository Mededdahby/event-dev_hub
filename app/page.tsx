import ExpoloreBtn from "@/components/ExpoloreBtn";
import EventCard from "@/components/EventCrad";
import { EventDocument } from "@/database/event.model";
import { cacheLife } from "next/cache";
const NEXT_URI = process.env.NEXT_PUBLIC_URI;
const Page = async () => {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${NEXT_URI}/api/events`);
  if (!res.ok) {
    // Handle error - render empty state or throw for error boundary
    return (
      <section>
        <h1 className="text-center">
          The Hub For Every Dev <br /> Event You Can't Miss
        </h1>
        <p className="text-center mt-5">
          Unable to load events. Please try again later.
        </p>
      </section>
    );
  }

  const { events } = await res.json();
  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        In This Apps You Will Find Every Events Related To Tech And Dev
      </p>
      <ExpoloreBtn />
      <div>
        <h3 className="mt-20 space-y-7 "> Featured Events</h3>
        <ul className="events list-none">
          {events &&
            events.length > 0 &&
            events.map((event: EventDocument) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
export default Page;
