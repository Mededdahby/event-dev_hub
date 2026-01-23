import { EventDocument } from "@/database/event.model";
import Image from "next/image";

const NEXT_URI = process.env.NEXT_PUBLIC_URI;
type PromiseParams = {
  params: Promise<{ slug: string }>;
};

const EventDetailsItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex flex-row gap-2">
      {" "}
      <Image src={icon} alt={alt} width={17} height={17} />
      <span>{label}</span>
    </div>
  );
};
const EventAgendaItems = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="tags flex-row gap-1.5 flex-wrap ">
      {tags.map((tag) => (
        <div className="pill" key={tag}>
          {tag}
        </div>
      ))}
    </div>
  );
};

const EventDetails = async ({ params }: PromiseParams) => {
  const { slug } = await params;

  const res = await fetch(`${NEXT_URI}/api/events/${slug}`);
  if (!res.ok) {
    if (!res.ok) {
      throw new Error("Failed to fetch event data");
    }
  }

  const data = await res.json();
  const event: EventDocument = data?.event ?? data; // supports both {event:{}} or direct object

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>
      <div className="details">
        {/* Event Content */}
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex flex-col gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>
          <section className="flex flex-col gap-2">
            <h2>Event Details</h2>
            <EventDetailsItem
              icon="/icons/calendar.svg"
              alt="Calendar Icon"
              label={new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />

            <EventDetailsItem
              icon="/icons/clock.svg"
              alt="clock Icon"
              label={event.time}
            />
            <EventDetailsItem
              icon="/icons/pin.svg"
              alt="pin Icon"
              label={event.location}
            />
            <EventDetailsItem
              icon="/icons/mode.svg"
              alt="mode Icon"
              label={event.mode}
            />
            <EventDetailsItem
              icon="/icons/audience.svg"
              alt="audience Icon"
              label={event.audience}
            />
          </section>
          {/* //TODO: Agenda component should be an arry of string comming from db */}
          {event.agenda && event.agenda.length > 0 && (
            <EventAgendaItems agendaItems={event.agenda} />
          )}
          <section className="flex-col-gap-2 ">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>
          {event.tags && event.tags.length > 0 && (
            <EventTags tags={event.tags} />
          )}{" "}
        </div>
        {/* Event Booking */}
        <aside className="booking">
          <h2>Book Your Spot</h2>
          <p className="text-lg font-semibold">
            Don't miss out on this event! Reserve your spot now.
          </p>
        </aside>
      </div>
    </section>
  );
};
export default EventDetails;
