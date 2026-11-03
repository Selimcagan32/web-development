import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2 id="tumu" className="bolum-baslik">Tüm Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      {filtered.length > 0 && <p id="sonuc">{`${filtered.length} etkinlik listeleniyor.`}</p>}

      <section id="etkinlik-listesi" className="kartlar" aria-labelledby="tumu">
        <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
      </section>
    </>
  );
}

export default EventsPage;
