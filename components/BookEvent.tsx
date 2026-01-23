"use client";
import { constants } from "buffer";
import { useState } from "react";
const BookEvent = () => {
  const [email, setEmail] = useState("");
  const [submited, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              e.preventDefault();
              setSubmitted(true);
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
