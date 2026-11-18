import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { Event } from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";

await connectDatabase();
await Event.deleteMany({});
const created = await Event.insertMany(seedEvents);
console.log(`${created.length} etkinlik eklendi`);
await mongoose.disconnect();
