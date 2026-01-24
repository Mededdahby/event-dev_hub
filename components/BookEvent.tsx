"use client";
import { BookEventAction } from "@/lib/actions/Booking.actions";
import { useState } from "react";
const BookEvent = ({ slug, eventId }: { slug: string; eventId: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await BookEventAction({ eventId, slug, email });
    if (success) {
      setSubmitted(true);
    } else {
      alert("Failed to book event. Please try again.");
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">
          Thank you for booking! Check your email for confirmation.
        </p>
      ) : (
        <form className="booking-form">
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            className="button-submit"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Book Now
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
