import { events } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("header h1");

// "12-10-2026" (GG-AA-YYYY) -> "2026-10-12"
function isoTarih(tarih) {
  const [gun, ay, yil] = tarih.split("-");
  return `${yil}-${ay}-${gun}`;
}

// "12-10-2026" -> "12 Ekim 2026"
function okunurTarih(tarih) {
  const [gun, ay, yil] = tarih.split("-").map(Number);
  return new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  baslik.textContent = "Etkinlik bulunamadı";
  document.title = "Etkinlik bulunamadı | Kampüs Etkinlikleri";
  container.innerHTML = `<p class="hata-kutusu"></p>
    <p class="baglantilar"><a href="etkinlikler.html">← Listeye dön</a></p>`;
  // Adresten gelen id textContent ile yazılır (HTML olarak yorumlanmaz)
  container.querySelector(".hata-kutusu").textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Etkinlik seçilmedi. Listeden bir etkinlik seçin.";
} else {
  baslik.textContent = event.title;
  document.title = `${event.title} | Kampüs Etkinlikleri`;

  // Projedeki tek afiş (afis.jpg) Kariyer Günleri'ne ait
  const afis = event.id === "event-1"
    ? `<figure>
        <img src="afis.jpg" alt="Kariyer Günleri 2026 afişi: 12 Ekim, A Blok Konferans Salonu" width="300" height="420">
        <figcaption>Şekil: Kariyer Günleri afişi</figcaption>
      </figure>`
    : "";

  container.innerHTML = `${afis}
    <dl>
      <dt>Tarih</dt>
      <dd><time datetime="${isoTarih(event.date)}T${event.time}">${okunurTarih(event.date)}, ${event.time}</time></dd>
      <dt>Yer</dt>
      <dd>${event.location}</dd>
      <dt>Kategori</dt>
      <dd>${event.category}</dd>
      <dt>Kontenjan</dt>
      <dd>${event.capacity}</dd>
    </dl>

    <h2>Açıklama</h2>
    <p>${event.description}</p>

    <p class="baglantilar">
      <a href="etkinlikler.html">← Listeye dön</a>
      <a href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
    </p>`;
}
