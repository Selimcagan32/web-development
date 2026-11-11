# Kampüs Etkinlikleri API

Etkinlikleri JSON olarak veren Node + Express sunucusu. Veriler şimdilik bellekte tutulur; sunucu yeniden başlayınca `POST` ile eklenen etkinlikler kaybolur.

## Çalıştırma

    cd backend
    npm install
    npm run dev

`npm run dev` sunucuyu `node --watch` ile başlatır; dosya değişince sunucu yeniden başlar. Yeniden başlatma olmadan çalıştırmak için `npm start` kullanılır.

Sunucu varsayılan olarak `http://localhost:3000` adresinde açılır. Sunucunun ayakta olduğu `GET /health` ile kontrol edilir.

## Ortam değişkeni

| Değişken | Açıklama | Varsayılan |
| --- | --- | --- |
| `PORT` | Sunucunun dinlediği port | `3000` |

`.env.example` dosyası `.env` adıyla kopyalanıp değer değiştirilebilir:

    cp .env.example .env

`.env` GitHub'a gönderilmez. `.env` yoksa sunucu 3000 portunda açılır.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/events` | Listeyi getir | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

`GET /events?category=Atölye` yalnızca o kategorideki etkinlikleri döndürür. `POST /events` için `title`, `category` ve `date` zorunludur.

Status code'lar: **200** tamam · **201** oluşturuldu · **204** içerik yok · **400** eksik/yanlış veri · **404** bulunamadı

Bütün hatalar aynı biçimdedir:

    { "error": { "message": "Event not found" } }

## İstekler

Postman ile denenen 6 istek `requests/kampus-api.json` dosyasında "Kampüs API" collection'ı olarak bulunur.
