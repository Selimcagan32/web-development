import { Router } from "express";
import { createEvent, deleteEvent, getEventById, getEvents,
  getUpcomingEvents, updateEvent,
} from "../controllers/event-controller.js";

const router = Router();
router.get("/", getEvents);
router.get("/upcoming", getUpcomingEvents); // önce
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
