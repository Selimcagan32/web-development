import mongoose from "mongoose";
import { Event } from "../models/event-model.js";
import { todayStart } from "../utils/date.js";

function notFound(res) {
  return res.status(404)
    .json({ error: { message: "Event not found" } });
}

const KORUNAN_ALANLAR = ["_id", "createdAt", "updatedAt", "__v"];

// GET /events (?search= ve ?category= isteğe bağlı)
export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) {
      // ( * ? gibi işaretler aramayı bozmasın
      const guvenli = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: guvenli, $options: "i" };
    }
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// GET /events/upcoming
export async function getUpcomingEvents(req, res, next) {
  try {
    const events = await Event
      .find({ date: { $gte: todayStart() } }) // utils/date.js
      .sort({ date: 1, time: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// GET /events/:id
export async function getEventById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findById(req.params.id);
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// POST /events
export async function createEvent(req, res, next) {
  try {
    const event = await Event.create(req.body ?? {});
    res.status(201).json(event);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400)
        .json({ error: { message: err.message } });
    }
    next(err);
  }
}

// PATCH /events/:id
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const body = req.body ?? {};
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: { message: "Body is empty" } });
    }
    const korunan = Object.keys(body).filter((k) => KORUNAN_ALANLAR.includes(k));
    if (korunan.length > 0) {
      return res.status(400)
        .json({ error: { message: `${korunan.join(", ")} cannot be changed` } });
    }
    const event = await Event.findByIdAndUpdate(req.params.id, body, {
      returnDocument: "after", // güncellenmiş kaydı döndür
      runValidators: true, // schema kuralları burada da çalışsın
    });
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400)
        .json({ error: { message: err.message } });
    }
    next(err);
  }
}

// DELETE /events/:id
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return notFound(res); // ikinci silme de buraya
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
