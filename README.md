https://web-development-tau-virid.vercel.app/index.html

# Kampüs Etkinlikleri

Bu repo, Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği Web Teknolojileri ve Programlama dersi kapsamında geliştirdiğim ders içi çalışmaları içerir. Proje dönem boyunca sprintler hâlinde ilerler ve her sprint kendi klasöründe yer alır.

## Sprint 1 – HTML, Git ve Yayına Alma

İlk sprintte sitenin temel yapısı yalnızca HTML kullanılarak oluşturuldu. Ana sayfa, etkinlik listesi, etkinlik detayı, etkinlik ekleme ve etkinlik güncelleme olmak üzere toplam beş sayfa hazırlandı. Bu sprintte CSS veya JavaScript kullanılmadı.

Kodlar `sprint1/` klasöründe yer alır.

## Sprint 2 – CSS ve Responsive Tasarım

İkinci sprintte, Sprint 1'de oluşturulan HTML yapısı korunarak CSS ile tasarım geliştirildi. Tasarım mobil öncelikli olarak hazırlandı; etkinlikler telefonda tek sütun, daha geniş ekranlarda ise birden fazla sütun şeklinde görüntülenir.

Kullanılan renk paleti ve yazı tipi öğrenci numarasından türetilmiştir.

Kodlar `sprint2/` klasöründe, stil dosyası ise `sprint2/css/2416501009.css` konumunda bulunur.

## Sprint 3 – JavaScript ve DOM

Üçüncü sprintte sayfalara JavaScript ile işlev kazandırıldı. Etkinlik bilgileri tek bir veri dosyasında (`data.js`) tutulur ve kartlar bu veriden otomatik olarak üretilir. Ana sayfada tarihi en yakın iki etkinlik gösterilir; etkinlikler sayfasında arama ve kategori filtresi bulunur. Detay sayfası adresteki `?id=` değerine göre ilgili etkinliği açar. Ekleme ve güncelleme formları alanları kendisi doğrular ve hata ya da başarı mesajını sayfada gösterir. Bu sprintte veriler kalıcı olarak kaydedilmez.

Kodlar `sprint3/` klasöründe, JavaScript modülleri ise `sprint3/js/` konumunda bulunur.

## Yayına Alma

Proje Vercel kullanılarak yayınlanmaktadır. Vercel ayarlarında framework olarak `Other` seçilir, herhangi bir build komutu kullanılmaz ve Root Directory olarak ilgili sprint klasörü belirtilir.

Son sprintin canlı adresi:

https://web-development-tau-virid.vercel.app/index.html

## Hazırlayan

Selim Memiş Çağan · 2416501009
