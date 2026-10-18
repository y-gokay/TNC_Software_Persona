# TeamTask ne iş

Express ile yazdığım görev API'si. Eğitimdeki senaryo TaskFlow diye geçiyor, ben TeamTask koydum. Konu aynı: ekipte iş açılıyor, birine düşüyor, status değişiyor.

Site yok, panel yok. Sadece API.

## Neden JSON

Ödev Mongo / SQL istemiyor. `fs` ile dosya. Görevler `tasks.json`, projeler `projects.json`, kullanıcılar `users.json`.

```text
src/data/tasks.json
src/data/projects.json
src/data/users.json
```

## Ne dönüyor

Zorunlu kısım görev CRUD:

```text
POST   /tasks
GET    /tasks
GET    /tasks/:id
PUT    /tasks/:id
DELETE /tasks/:id
```

Logger her istekte:

```text
[2026-10-08T19:42:02] GET /tasks
```

## Alanlar

Task:

```text
id, title, description, status, priority
assignee, userId, projectId
createdAt, updatedAt
```

status: `pending`, `inProgress`, `completed`

priority: `low`, `medium`, `high`

User ve Project'i de ekledim. Senaryoda çalışan ve proje geçiyordu, görevi boş string'e bağlamak saçmaydı.

Görev açarken assignee listede yoksa 400. Üstünde görev duran kullanıcıyı / projeyi silmeye kalkarsam da 400. Sessizce silinmesin diye.

## Klasör mantığı

Hepsini `server.js`'e yığmadım. Sonra kendi içinden çıkılmaz.

```text
route -> middleware -> controller -> service -> json
```

- route: url
- middleware: logger, validation, 404
- controller: request / response
- service: iş + dosya yazma

Postman örnekleri `docs/docs_assets`:

![GET /](docs_assets/postman-health.png)

![GET /tasks](docs_assets/postman-get-tasks.png)

![POST /users](docs_assets/postman-create-user.png)

![DELETE /tasks/13 404](docs_assets/postman-delete-task-404.png)

## Extra

Filtre, arama, sayfalama, rapor, validation. Yönergede isteğe bağlı yazıyor. CRUD + logger asıl kısım, onları bozmadan üstüne koydum.
