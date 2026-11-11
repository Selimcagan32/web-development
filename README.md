https://selimmemiscagan-frontend.vercel.app

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

## Sprint 5 – React Bileşenleri

Beşinci sprintte Sprint 4'teki tek büyük `App.tsx` bileşenlere bölündü. Her parça kendi dosyasında bir bileşen oldu; bileşenler veriyi props ile alır, olayları callback ile `App`'e bildirir. Sayfa, seçili etkinlik, arama metni ve kategori state'leri `App`'te kalır. Ekran Sprint 4 ile aynıdır.

Kodlar yine `frontend/` klasöründe bulunur; yeni klasör açılmadı.

### Dosyalar

- `src/components/layout/`: Her sayfada görünen çerçeve bileşenleri `Header.tsx`, `Navigation.tsx` ve `Footer.tsx`.
- `src/components/events/`: Etkinlik bileşenleri `EventCard.tsx`, `EventList.tsx`, `EventFilter.tsx` ve `EventDetail.tsx`.
- `src/components/forms/EventForm.tsx`: Ekle ve Güncelle sayfalarının ortak formu.
- `src/types/page.ts`: Sayfa adlarının tipi (`PageName`).
- `src/utils/format-date.ts`: Tarihi Türkçe biçime çeviren `formatDate` fonksiyonu.
- `src/App.tsx`: State'leri ve sayfa geçişini tutar, bileşenleri bir araya getirir.

## Sprint 6 – Router, Context ve Yönetim (Vize)

Altıncı sprintte uygulamaya React Router eklendi ve her sayfa kendi adresine kavuştu. Sayfa state'i ve `go()` fonksiyonu kaldırıldı; hangi sayfanın açık olduğunu artık adres çubuğu belirler. Etkinlik listesi ile ekleme, güncelleme ve silme fonksiyonları tek bir Context'te tutulur, sayfalar bu verilere `useEvents()` ile doğrudan ulaşır. Yönetim sayfasında etkinlikler tablo hâlinde listelenir; tablo telefonda kartlara dönüşür. Etkinlik formu ile giriş, kayıt ve şifremi unuttum formları alanları doğrular ve hataları alanların altında gösterir. Bu sprintte giriş kontrolü yoktur, veriler kalıcı değildir (sayfa yenilenince başa döner) ve auth formları bilgileri hiçbir yere göndermez.

Kodlar yine `frontend/` klasöründe bulunur. Yerelde çalıştırmak için:

    cd frontend
    npm install
    npm run dev

### Route listesi

| Adres | Sayfa |
| --- | --- |
| `/` | HomePage |
| `/events` | EventsPage |
| `/events/:id` | EventDetailPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

### Dosyalar

- `src/pages/`: Adrese bağlı 10 sayfa bileşeni.
- `src/context/EventsContext.tsx`: Etkinlik listesi ile `addEvent`, `updateEvent`, `deleteEvent` fonksiyonlarını tutan `EventsProvider` ve bunları okuyan `useEvents` hook'u.
- `src/utils/validate-event.ts`: Etkinlik formunu doğrulayan `validateEvent` fonksiyonu.
- `src/types/campus-event.ts`: Form verisi için `EventFormData` ve hata tipi `EventFormErrors` eklendi.
- `src/App.tsx`: Sadece Header, Navigation, Routes ve Footer; state yok.
- `vercel.json`: Vercel'de `/admin` gibi adresler doğrudan açıldığında ya da sayfa yenilendiğinde `index.html`'in dönmesini sağlar.
- `src/types/page.ts` silindi.

## Sprint 7 – Express ile REST API

Yedinci sprintte `frontend/` klasörünün yanına ikinci bir uygulama olarak `backend/` eklendi. Node ve Express ile yazılan bu sunucu etkinlikleri JSON olarak verir. Etkinlikler şimdilik bellekte bir dizide tutulur; sunucu yeniden başlayınca `POST` ile eklenenler kaybolur. Port `.env` dosyasından okunur, `.env` yoksa sunucu 3000 portunda açılır. `frontend/` bu sprintte değişmedi.

Yerelde çalıştırmak için:

    cd backend
    npm install
    npm run dev

Sunucu `http://localhost:3000` adresinde açılır. REST sözleşmesi tablosu `backend/README.md` dosyasındadır.

### Endpoint listesi

| Method | Adres | Sonuç |
| --- | --- | --- |
| GET | `/health` | 200 · sunucu durumu ve öğrenci numarası |
| GET | `/events` | 200 · etkinlik listesi (`?category=` ile filtrelenebilir) |
| GET | `/events/:id` | 200 · tek etkinlik, bulunamazsa 404 |
| POST | `/events` | 201 · yeni etkinlik, eksik veride 400 |

### Dosyalar

- `backend/src/app.js`: Express uygulamasını kurar, middleware'leri (`cors`, `express.json`) ve route'ları bağlar; `/health` burada tanımlıdır.
- `backend/src/server.js`: `.env`'i okur ve sunucuyu porta bağlar.
- `backend/src/routes/event-routes.js`: Hangi adresin hangi controller fonksiyonuna gideceğini belirler.
- `backend/src/controllers/event-controller.js`: İstekleri işleyip yanıtı döndüren `getEvents`, `getEventById` ve `createEvent` fonksiyonları.
- `backend/src/data/events.js`: Bellek içi 6 etkinlik.
- `backend/requests/kampus-api.json`: Postman ile denenen 6 isteğin "Kampüs API" collection'ı.
- `backend/.env.example`: Gerekli ortam değişkenleri (`PORT`); `.env` GitHub'a gönderilmez.
- `backend/README.md`: Çalıştırma komutları, `PORT` değişkeni ve REST sözleşmesi.

## Yayına Alma

Proje Vercel kullanılarak yayınlanmaktadır. Sprint 1–3'te framework olarak `Other` seçildi, build komutu kullanılmadı ve Root Directory olarak ilgili sprint klasörü belirtildi. Sprint 4'ten itibaren Root Directory `frontend`, framework ise `Vite` olarak ayarlanır; Vercel projeyi `npm run build` ile derleyip `dist` klasörünü yayınlar. Sprint 6'dan itibaren proje `selimmemiscagan-frontend` adıyla yayınlanır. Sprint 7'de eklenen `backend/` yayına alınmadı; yalnızca yerelde çalışır.

Son sprintin canlı adresi:

https://selimmemiscagan-frontend.vercel.app

## Hazırlayan

Selim Memiş Çağan · 2416501009