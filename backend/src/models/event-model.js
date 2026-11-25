import mongoose from "mongoose";
import { formatDate, parseDate }
  from "../utils/date.js";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true,
    trim: true, minlength: 3, maxlength: 100 },
  category: { type: String, required: true,
    enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"] },
  capacity: { type: Number, min: 0, default: 0 },
  date: { type: Date, required: true,
    set: parseDate, get: formatDate },
  time: { type: String, default: "" },
  location: { type: String, trim: true, default: "" },
  description: { type: String, trim: true,
    maxlength: 500, default: "" },
}, { timestamps: true,
  toJSON: { getters: true }, id: false });

export const Event = mongoose.model("Event", eventSchema);
