import mongoose, { Document, Model, Schema } from "mongoose";

export interface EventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const isNonEmptyString = (value: string): boolean =>
  typeof value === "string" && value.trim().length > 0;

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeTime = (value: string): string => {
  const trimmed = value.trim();
  const time24 = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const time12 = /^(1[0-2]|0?[1-9]):([0-5]\d)\s*(am|pm)$/i;

  if (time24.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(time12);
  if (!match) {
    throw new Error("Invalid time format.");
  }

  let hours = Number.parseInt(match[1], 10);
  const minutes = match[2];
  const meridiem = match[3].toLowerCase();

  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
};

const eventSchema = new Schema<EventDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    slug: { type: String, unique: true, index: true },
    description: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    overview: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    image: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    date: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    time: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    mode: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    audience: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    agenda: {
      type: [String],
      required: true,
      validate: (value: string[]) => Array.isArray(value) && value.length > 0,
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
      validate: isNonEmptyString,
    },
    tags: {
      type: [String],
      required: true,
      validate: (value: string[]) => Array.isArray(value) && value.length > 0,
    },
  },
  { timestamps: true },
);

eventSchema.pre("save", function (next) {
  // Only regenerate slug when the title changes.
  if (this.isModified("title")) {
    this.slug = toSlug(this.title);
  }

  // Normalize date to ISO and enforce a consistent time format.
  const normalizedDate = new Date(this.date);
  if (Number.isNaN(normalizedDate.getTime())) {
    return next(new Error("Invalid date format."));
  }
  this.date = normalizedDate.toISOString();
  this.time = normalizeTime(this.time);

  return next();
});

export const Event: Model<EventDocument> =
  mongoose.models.Event ?? mongoose.model<EventDocument>("Event", eventSchema);
