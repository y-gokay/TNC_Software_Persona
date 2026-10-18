# TeamTask API

Takımın görevlerini, projeleri ve kullanıcıları yöneten REST API.

Veritabanı yok. Veri `src/data` altındaki JSON dosyalarında. İstek gelince dosyayı okuyorum, değişiyorsa tekrar yazıyorum.

Senaryo: yazılım ekibinde iş açılıyor, birine düşüyor, durumu buradan takip ediliyor.

## Nasıl çalıştırılır

Node.js kurulu olsun.

```bash
cd backend
npm install
npm start
```

```text
Server running on http://localhost:3000
```

```text
http://localhost:3000/
```

```json
{
  "message": "TeamTask API is running",
  "note": "Routes listesi kolay test için. Prod'da böyle bir şey dönmez.",
  "routes": []
}
```

Kökteki `routes` listesi lokal test için. Prod'da ana adrese API haritası basmam.

Postman health:

![GET /](docs/docs_assets/postman-health.png)

Kod değiştirirken:

```bash
npm run dev
```

Nodemon. Kaydedince yeniden ayağa kalkar. `npm start` düz Node, `rs` orada çalışmaz.

Paket: Express. Geliştirirken nodemon.

## Ne var

Görev CRUD. Her istek logger'dan geçiyor:

```text
[2026-10-08T19:42:02] GET /tasks
```

Üstüne validation, filtre, arama, sayfalama, rapor, proje ve kullanıcı da duruyor. Görev hem kişiye hem projeye bağlı.

Yeni görev:

```json
{
  "title": "Dashboard geliştir",
  "description": "Admin dashboard hazırlanacak",
  "priority": "high",
  "assignee": "Gökay",
  "projectId": 1
}
```

`id`, `status`, `createdAt`, `updatedAt` API yazıyor. `assignee` kullanıcı listesinde olsun, `projectId` gerçek bir proje olsun. Değilse 400.

## Endpointler

```text
GET    /                  ayakta mı
GET    /tasks             liste
GET    /tasks/:id         detay
POST   /tasks             ekle
PUT    /tasks/:id         güncelle
DELETE /tasks/:id         sil
GET    /tasks/search      ara
GET    /projects          proje
GET    /users             kullanıcı
GET    /reports/summary   özet
GET    /reports/completed tamamlananlar
GET    /reports/pending   bekleyenler
```

`/reports` yok. Özet için `/reports/summary`.

```text
GET /tasks?status=completed
GET /tasks?priority=high
GET /tasks?assignee=Gokay
GET /tasks?page=1&limit=10
GET /tasks?sort=createdAt
```

Postman collection: `postman/TeamTask_API.postman_collection.json`

Ekran görüntüleri `docs/docs_assets`:

![GET /tasks](docs/docs_assets/postman-get-tasks.png)

![POST /users](docs/docs_assets/postman-create-user.png)

![DELETE /tasks/13 404](docs/docs_assets/postman-delete-task-404.png)

Import et, `baseUrl`:

```text
http://localhost:3000
```

## Klasör

```text
backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── constants/
│   ├── utils/
│   ├── data/
│   └── app.js
├── docs/
├── postman/
├── server.js
└── package.json
```

```text
route -> middleware -> controller -> service -> json dosyası
```

`server.js` portu açıyor. Asıl uygulama `src/app.js`.

## Docs

- [Proje tanıtımı](docs/PROJE_TANITIM.md)
- [API](docs/API.md)
- [Test](docs/TEST.md)
- [Kullanım](docs/KULLANIM_KILAVUZU.md)
