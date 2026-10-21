import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let title = "Kampüs Etkinlikleri";
  if (page === "events") title = "Etkinlikler";
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <Header title={title}>
        <Navigation current={page} onNavigate={go} />
      </Header>

      <main>
        {page === "home" && (
          <>
            <p>
              Kampüste düzenlenen seminer, atölye ve topluluk etkinliklerini
              tek yerden takip etmeni sağlayan uygulama. Etkinlikleri
              listeleyebilir, ayrıntılarına bakabilir ve yeni etkinlik
              ekleyebilirsin.
            </p>

            <h2 id="yaklasan">Yaklaşan 2 etkinlik</h2>
            <section id="etkinlik-listesi" className="kartlar" aria-labelledby="yaklasan">
              <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            </section>

            <section className="baglantilar">
              <p>
                <a href="/" onClick={(e) => { e.preventDefault(); go("events"); }}>
                  Tüm etkinlikleri gör →
                </a>
              </p>
              <p>
                <a href="/" onClick={(e) => { e.preventDefault(); go("add"); }}>
                  Etkinlik ekle
                </a>
              </p>
            </section>
          </>
        )}

        {page === "events" && (
          <>
            <h2 id="tumu">Tüm Etkinlikler</h2>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && <p id="sonuc">{`${filtered.length} etkinlik listeleniyor.`}</p>}

            <section id="etkinlik-listesi" className="kartlar" aria-labelledby="tumu">
              <EventList
                events={filtered}
                onShowDetail={(id) => go("detail", id)}
                emptyText="Aramanıza uygun etkinlik bulunamadı."
              />
            </section>

            <table>
              <caption>Ayın Programı</caption>
              <tbody>
                <tr><th>Tarih</th><th>Etkinlik</th><th>Yer</th></tr>
                <tr><td><time dateTime="2026-10-12">12 Ekim</time></td><td>Kariyer Günleri</td><td>A Blok</td></tr>
                <tr><td><time dateTime="2026-10-20">20 Ekim</time></td><td>Robotik Atölyesi</td><td>Lab 2</td></tr>
                <tr><td><time dateTime="2026-10-27">27 Ekim</time></td><td>Siber Güvenlik Söyleşisi</td><td>B Blok</td></tr>
              </tbody>
            </table>
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
