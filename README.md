https://web-development-tau-virid.vercel.app/

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

## Sprint 4 – Vite, TypeScript ve React

Dördüncü sprintte site, Vite ile kurulan bir React + TypeScript projesine taşındı. Etkinliğin yapısı bir tip olarak tanımlandı, veriler bu tipe uygun şekilde ayrı bir dosyada tutuldu ve arama, kategori filtresi ve etkinlik bulma işlemleri saf fonksiyonlar olarak yazıldı. Beş sayfanın tamamı `App.tsx` içindedir; hangi sayfanın açık olduğu, arama metni ve seçili kategori state ile tutulur. Sekme başlığı `useEffect` ile açık sayfaya göre değişir. Ekleme ve güncelleme formları bu sprintte yalnızca görünüm olarak yer alır.

Kodlar `frontend/` klasöründe bulunur. Yerelde çalıştırmak için:

    cd frontend
    npm install
    npm run dev

### Dosyalar

- `package.json`: Proje adını, `dev` ve `build` gibi komutları ve kullanılan paketlerin listesini tutar.
- `package-lock.json`: Yüklenen paketlerin tam sürümlerini kaydeder.
- `node_modules/`: `npm install` ile indirilen paketlerin bulunduğu klasördür; GitHub'a gönderilmez.
- `tsconfig*.json`: TypeScript derleyicisinin ayarlarını içerir.
- `vite.config.ts`: Vite ayarlarını ve React eklentisini tanımlar.
- `index.html`: Uygulamanın tek HTML dosyasıdır; React'in çizim yaptığı boş `div#root` buradadır.
- `src/main.tsx`: React'i başlatır ve `App` bileşenini `root` içine çizer.
- `src/App.tsx`: Uygulamanın ana bileşenidir; beş sayfanın hepsi burada yer alır.
- `src/App.css`: Uygulamanın stilleridir; Sprint 3'teki CSS buraya taşındı.
- `src/index.css`: Tüm sayfaya genel stil dosyasıdır; bu sprintte boştur.
- `public/`: Build sırasında olduğu gibi kopyalanan dosyaları (afiş ve favicon) içerir.

## Yayına Alma

Proje Vercel kullanılarak yayınlanmaktadır. Sprint 1–3'te framework olarak `Other` seçildi, build komutu kullanılmadı ve Root Directory olarak ilgili sprint klasörü belirtildi. Sprint 4'ten itibaren Root Directory `frontend`, framework ise `Vite` olarak ayarlanır; Vercel projeyi `npm run build` ile derleyip `dist` klasörünü yayınlar.

Son sprintin canlı adresi:

https://web-development-tau-virid.vercel.app/

## Hazırlayan

Selim Memiş Çağan · 2416501009