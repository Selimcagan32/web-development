# Web Geliştirme – Kampüs Etkinlikleri

Kampüs etkinliklerini listeleyen, ayrıntılarını gösteren ve yeni etkinlik eklemeye yarayan web uygulaması. Uygulama dönem boyunca sprintler hâlinde geliştirilir; her sprint kendi klasöründe durur ve ayrı bir adreste yayındadır.

## Sprintler

| Sprint | Konu | Klasör | Etiket | Canlı adres |
|---|---|---|---|---|
| Sprint 1 | HTML, Git ve yayına alma | `sprint1/` | `sprint-01` | https://BURAYA-VERCEL-ADRESI.vercel.app |

## Klasör yapısı

    web-development/
      sprint1/
      .gitignore
      README.md

## Sprint 1 – HTML, Git ve Yayına Alma

Uygulamanın iskeleti yalnızca HTML ile kuruldu; CSS ve JavaScript kullanılmadı.

| Sayfa | İçerik |
|---|---|
| `index.html` | Uygulamanın amacı, yaklaşan iki etkinlik |
| `etkinlikler.html` | Etkinlik listesi (her etkinlik bir hücre) ve Ayın Programı tablosu |
| `etkinlik-detay.html` | Afiş, künye (tarih, yer, kategori, kontenjan), açıklama |
| `etkinlik-ekle.html` | Yeni etkinlik formu |
| `etkinlik-guncelle.html` | Doldurulmuş güncelleme formu |

## Yayına alma

Her sprint Vercel'de ayrı bir proje olarak yayınlanır. Framework: Other, build komutu yok, Root Directory ilgili sprint klasörü (örneğin `sprint1`).

## Hazırlayan

Selim Memiş Çağan · 2416501009
