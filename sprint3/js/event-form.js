import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleModu = form.dataset.mode === "guncelle";

// Tarih parçalarının sırasını çevirir:
// "12-10-2026" (data.js) <-> "2026-10-12" (input type="date")
function tarihCevir(tarih) {
  return tarih.split("-").reverse().join("-");
}

let etkinlik;

if (guncelleModu) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (etkinlik) {
    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = tarihCevir(etkinlik.date);
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity ?? "";
    form.elements.aciklama.value = etkinlik.description;
  }
}

if (guncelleModu && !etkinlik) {
  form.outerHTML = `<p class="hata-kutusu">Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
    <p class="baglantilar"><a href="etkinlikler.html">Etkinliklere git</a></p>`;
} else {
  form.addEventListener("submit", kaydet);
}

function kaydet(e) {
  e.preventDefault();

  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan").trim();

  const data = {
    id: guncelleModu ? etkinlik.id : `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih") ? tarihCevir(fd.get("tarih")) : "",
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan === "" ? null : Number(kontenjan),
    description: fd.get("aciklama").trim(),
  };

  const errors = {};
  if (data.title.length < 3) {
    errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  }
  if (data.category === "") {
    errors.kategori = "Bir kategori seçin.";
  }
  if (data.date === "") {
    errors.tarih = "Tarih seçin.";
  }
  if (data.time === "") {
    errors.saat = "Saat seçin.";
  }
  if (data.location === "") {
    errors.yer = "Yer bilgisini yazın.";
  }
  if (
    form.elements.kontenjan.validity.badInput ||
    (data.capacity !== null && !(data.capacity >= 1 && data.capacity <= 1000))
  ) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
  }

  // Hatalı alanı işaretle, düzeltilen alanın eski hatasını temizle
  ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"].forEach((alan) => {
    const girdi = form.elements[alan];
    const hataYeri = document.querySelector(`#${alan}-hata`);
    if (errors[alan]) {
      hataYeri.textContent = errors[alan];
      girdi.setAttribute("aria-invalid", "true");
    } else {
      hataYeri.textContent = "";
      girdi.removeAttribute("aria-invalid");
    }
  });

  if (Object.keys(errors).length > 0) {
    mesaj.className = "hata-kutusu";
    mesaj.textContent = "Formda hatalı alanlar var.";
    return;
  }

  const basari = guncelleModu
    ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
    : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

  mesaj.className = "basari-kutusu";
  mesaj.innerHTML = `<p>${basari}</p><pre></pre>`;
  // Kullanıcının yazdıkları textContent ile yazılır (HTML olarak yorumlanmaz)
  mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
}
