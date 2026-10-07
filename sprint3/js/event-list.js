import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");

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

function createCard(event) {
  return `<article>
    <h3>${event.title}</h3>
    <p>${event.category} · <time datetime="${isoTarih(event.date)}T${event.time}">${okunurTarih(event.date)}</time> · ${event.location}</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) => isoTarih(a.date).localeCompare(isoTarih(b.date)))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}

// Arama + kategori filtresi (yalnızca etkinlikler.html'de form var)
if (filtreFormu) {
  const arama = document.querySelector("#arama");
  const kategoriFiltre = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  const kategoriler = new Set(events.map((e) => e.category));
  kategoriler.forEach((kategori) => {
    const secenek = document.createElement("option");
    secenek.value = kategori;
    secenek.textContent = kategori;
    kategoriFiltre.append(secenek);
  });

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const kategori = kategoriFiltre.value;

    const sonuc = events.filter((e) => {
      const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
      const kategoriUyuyor = kategori === "" || e.category === kategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  arama.addEventListener("input", filtrele);
  kategoriFiltre.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => {
    e.preventDefault();
    filtrele();
  });

  filtrele();
}
