import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article id="detay">
      {event.image && (
        <figure>
          <img
            src={event.image}
            alt={`${event.title} afişi`}
            width="300"
            height="420"
          />
          <figcaption>Şekil: {event.title} afişi</figcaption>
        </figure>
      )}
      <dl>
        <dt>Tarih</dt>
        <dd>
          <time dateTime={`${event.date}T${event.time}`}>
            {formatDate(event.date)}, {event.time}
          </time>
        </dd>
        <dt>Yer</dt>
        <dd>{event.location}</dd>
        <dt>Kategori</dt>
        <dd>{event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>{event.capacity}</dd>
      </dl>

      <h2>Açıklama</h2>
      <p>{event.description}</p>

      <p className="baglantilar">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          ← Listeye dön
        </a>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onEdit(event.id);
          }}
        >
          Bu etkinliği güncelle
        </a>
      </p>
    </article>
  );
}

export default EventDetail;
