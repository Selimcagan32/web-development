import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({ events, emptyText }: EventListProps) {
  if (events.length === 0) return <p className="sonuc">{emptyText}</p>;

  return (
    <>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
}

export default EventList;
