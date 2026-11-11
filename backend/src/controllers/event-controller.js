import { events } from "../data/events.js";

// GET /events (?category=Atölye isteğe bağlı)
export function getEvents(req, res) {
  const { category } = req.query;
  const list = category
    ? events.filter((e) => e.category === category)
    : events;
  res.json(list);
}

// GET /events/:id
export function getEventById(req, res) {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) return res.status(404)
    .json({ error: { message: "Event not found" } });
  res.json(event);
}

// POST /events
export function createEvent(req, res) {
  const { title, category, capacity, date,
    time, location, description } = req.body ?? {};

  if (!title || !category || !date) {
    return res.status(400).json({ error:
      { message: "title, category and date are required" } });
  }
  const newEvent = {
    id: `event-${Date.now()}`,
    title, category, date,
    capacity: Number(capacity) || 0,
    time: time ?? "", location: location ?? "",
    description: description ?? "",
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
}
