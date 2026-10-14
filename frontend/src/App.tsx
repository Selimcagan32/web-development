import "./App.css";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

// "2026-10-12" -> "12 Ekim 2026"
const formatDate = (date: string) => new Date(`${date}T00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Linke tıklayınca sayfa yenilenmesin; sadece state değişsin
  function handleLink(
    e: MouseEvent<HTMLAnchorElement>,
    next: PageName,
    id: string | null = null,
  ) {
    e.preventDefault();
    go(next, id);
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

  function renderCard(event: CampusEvent) {
    return (
      <article key={event.id}>
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
        <a href="/" onClick={(e) => handleLink(e, "detail", event.id)}>
          Detayları gör →
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        <nav>
          {menu.map((item) => (
            <a
              key={item.page}
              href="/"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => handleLink(e, item.page)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

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
            <section
              id="etkinlik-listesi"
              className="kartlar"
              aria-labelledby="yaklasan"
            >
              {upcoming.map(renderCard)}
            </section>

            <section className="baglantilar">
              <p>
                <a href="/" onClick={(e) => handleLink(e, "events")}>
                  Tüm etkinlikleri gör →
                </a>
              </p>
              <p>
                <a href="/" onClick={(e) => handleLink(e, "add")}>
                  Etkinlik ekle
                </a>
              </p>
            </section>
          </>
        )}

        {page === "events" && (
          <>
            <h2 id="tumu">Tüm Etkinlikler</h2>
            <form
              id="filtre-formu"
              className="filtre"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="arama">Etkinlik ara</label>
              <input
                type="search"
                id="arama"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <label htmlFor="kategori-filtre">Kategori</label>
              <select
                id="kategori-filtre"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </form>
            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section
              id="etkinlik-listesi"
              className="kartlar"
              aria-labelledby="tumu"
            >
              {filtered.map(renderCard)}
            </section>

            <table>
              <caption>Ayın Programı</caption>
              <tbody>
                <tr>
                  <th>Tarih</th>
                  <th>Etkinlik</th>
                  <th>Yer</th>
                </tr>
                <tr>
                  <td>
                    <time dateTime="2026-10-12">12 Ekim</time>
                  </td>
                  <td>Kariyer Günleri</td>
                  <td>A Blok</td>
                </tr>
                <tr>
                  <td>
                    <time dateTime="2026-10-20">20 Ekim</time>
                  </td>
                  <td>Robotik Atölyesi</td>
                  <td>Lab 2</td>
                </tr>
                <tr>
                  <td>
                    <time dateTime="2026-10-27">27 Ekim</time>
                  </td>
                  <td>Siber Güvenlik Söyleşisi</td>
                  <td>B Blok</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {page === "detail" && !selected && (
          <article id="detay">
            <p className="hata-kutusu">
              {selectedId
                ? `"${selectedId}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
                : "Etkinlik seçilmedi. Listeden bir etkinlik seçin."}
            </p>
            <p className="baglantilar">
              <a href="/" onClick={(e) => handleLink(e, "events")}>
                ← Listeye dön
              </a>
            </p>
          </article>
        )}

        {page === "detail" && selected && (
          <article id="detay">
            {selected.image && (
              <figure>
                <img
                  src={selected.image}
                  alt={`${selected.title} afişi`}
                  width="300"
                  height="420"
                />
                <figcaption>Şekil: {selected.title} afişi</figcaption>
              </figure>
            )}
            <dl>
              <dt>Tarih</dt>
              <dd>
                <time dateTime={`${selected.date}T${selected.time}`}>
                  {formatDate(selected.date)}, {selected.time}
                </time>
              </dd>
              <dt>Yer</dt>
              <dd>{selected.location}</dd>
              <dt>Kategori</dt>
              <dd>{selected.category}</dd>
              <dt>Kontenjan</dt>
              <dd>{selected.capacity}</dd>
            </dl>

            <h2>Açıklama</h2>
            <p>{selected.description}</p>

            <p className="baglantilar">
              <a href="/" onClick={(e) => handleLink(e, "events")}>
                ← Listeye dön
              </a>
              <a
                href="/"
                onClick={(e) => handleLink(e, "update", selected.id)}
              >
                Bu etkinliği güncelle
              </a>
            </p>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <form
            id="etkinlik-formu"
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            <p>
              <label htmlFor="ad">Etkinlik Adı</label>
              <input type="text" id="ad" name="ad" required />
              <span id="ad-hata"></span>
            </p>
            <p>
              <label htmlFor="kategori">Kategori</label>
              <select id="kategori" name="kategori" required>
                <option value="">Seçiniz</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>
              <span id="kategori-hata"></span>
            </p>
            <p>
              <label htmlFor="tarih">Tarih</label>
              <input type="date" id="tarih" name="tarih" required />
              <span id="tarih-hata"></span>
            </p>
            <p>
              <label htmlFor="saat">Saat</label>
              <input type="time" id="saat" name="saat" required />
              <span id="saat-hata"></span>
            </p>
            <p>
              <label htmlFor="yer">Yer</label>
              <input type="text" id="yer" name="yer" required />
              <span id="yer-hata"></span>
            </p>
            <p>
              <label htmlFor="kontenjan">Kontenjan</label>
              <input type="number" id="kontenjan" name="kontenjan" />
              <span id="kontenjan-hata"></span>
            </p>
            <p>
              <label htmlFor="aciklama">Açıklama</label>
              <textarea
                id="aciklama"
                name="aciklama"
                rows={4}
                cols={30}
              ></textarea>
            </p>
            <p>
              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </p>
          </form>
        )}
      </main>

      <footer>
        <p>Selim Memiş Çağan · 2416501009 · 2026</p>
      </footer>
    </>
  );
}

export default App;
