import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article>
      <h3>{event.title}</h3>
      <p>
        {event.category} ·{" "}
        <time dateTime={`${event.date}T${event.time}`}>
          {formatDate(event.date)}
        </time>{" "}
        · {event.location}
      </p>
      <p>Kontenjan: {event.capacity}</p>
      <p>{event.description}</p>
      <Link to={`/events/${event.id}`}>Detayları gör →</Link>
    </article>
  );
}

export default EventCard;
