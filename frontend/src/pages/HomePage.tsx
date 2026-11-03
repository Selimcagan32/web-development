import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <p>
        Kampüste düzenlenen seminer, atölye ve topluluk etkinliklerini
        tek yerden takip etmeni sağlayan uygulama. Etkinlikleri
        listeleyebilir, ayrıntılarına bakabilir ve yeni etkinlik
        ekleyebilirsin.
      </p>

      <h2 id="yaklasan" className="bolum-baslik">Yaklaşan 2 etkinlik</h2>
      <section id="etkinlik-listesi" className="kartlar" aria-labelledby="yaklasan">
        <EventList events={upcoming} />
      </section>

      <section className="baglantilar">
        <p>
          <Link to="/events">Tüm etkinlikleri gör →</Link>
        </p>
        <p>
          <Link to="/admin/new">Etkinlik ekle</Link>
        </p>
      </section>
    </>
  );
}

export default HomePage;
