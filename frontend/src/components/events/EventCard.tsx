import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
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
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onShowDetail(event.id);
        }}
      >
        Detayları gör →
      </a>
    </article>
  );
}

export default EventCard;
