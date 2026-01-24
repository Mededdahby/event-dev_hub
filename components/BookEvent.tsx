"use client";
import { useState } from "react";
import { constants } from "buffer";
import { BookEventAction } from "@/lib/actions/Boonking.actions";

const BookEvent = ({ slug, eventId }: { slug: string; eventId: string }) => {
  const [email, setEmail] = useState("");
  const [submited, setSubmitted] = useState(false);

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
      {submited ? (
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
