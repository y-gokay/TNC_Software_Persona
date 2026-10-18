# API

```text
http://localhost:3000
```

Çoğu yer aynı kalıp. Liste de tek kayıt da `data` içinde.

tamam:

```json
{
  "success": true,
  "data": {}
}
```

hata:

```json
{
  "success": false,
  "error": "Task title is required"
}
```

`GET /` ayrı. Ödev mesaj istiyordu, ben de test için route listesini ekledim. Prod'da böyle bir şey dönmez.

```json
{
  "message": "TeamTask API is running",
  "note": "Routes listesi kolay test için. Prod'da böyle bir şey dönmez.",
  "routes": []
}
```

Postman health:

![GET /](docs_assets/postman-health.png)

Body atarken header unutma:

```text
Content-Type: application/json
```

Unutursam body boş gidiyor, validation title yok diyor.

## Tasks

### GET /tasks

Hepsini çeker. Query ile kesiyorum:

```text
GET /tasks?status=completed
GET /tasks?priority=high
GET /tasks?assignee=Gokay
GET /tasks?page=1&limit=10
GET /tasks?sort=createdAt
GET /tasks?sort=createdAt&order=desc
```

`page` veya `limit` varsa cevapta `pagination` da geliyor. Yoksa düz liste.

Postman'de liste böyle:

![GET /tasks](docs_assets/postman-get-tasks.png)

### GET /tasks/:id

Tek görev. Yoksa:

```json
{
  "success": false,
  "error": "Task not found"
}
```

Yanına `user` ve `project` özetini de koydum, client'ta ayrıca join yapmayayım diye.

### GET /tasks/search?keyword=backend

title veya description içinde arar. Keyword boşsa 400.

### POST /tasks

`201`

```json
{
  "title": "Dashboard geliştir",
  "description": "Admin dashboard hazırlanacak",
  "priority": "high",
  "assignee": "Gökay",
  "projectId": 1
}
```

Ben ekliyorum: `id`, `status` (pending), `userId`, `createdAt`, `updatedAt`.

assignee `users.json`'da olsun. projectId gerçek olsun. `userId` de gönderebilirim, o zaman isim oradan geliyor.

title yoksa:

```json
{
  "success": false,
  "error": "Task title is required"
}
```

```text
400
```

### PUT /tasks/:id

Sadece değişeni gönderiyorum. `id` ve `createdAt` body'den değişmiyor.

```json
{
  "status": "completed"
}
```

### DELETE /tasks/:id

```json
{
  "success": true,
  "data": {
    "message": "Task deleted"
  }
}
```

Olunca 200:

![DELETE /tasks/1](docs_assets/postman-delete-task.png)

Kayıt yoksa 404. Collection varsayılan id 13, bende yoktu:

![DELETE /tasks/13 404](docs_assets/postman-delete-task-404.png)

## Projects

```text
GET    /projects
GET    /projects/:id
POST   /projects
PUT    /projects/:id
DELETE /projects/:id
```

```json
{
  "name": "TeamTask Web",
  "description": "Web uygulaması"
}
```

PUT örneği:

![PUT /projects/1](docs_assets/postman-update-project.png)

Üstünde görev varsa silinemiyor:

```text
400  Project has related tasks
```

## Users

```text
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

```json
{
  "name": "Zeynep",
  "email": "zeynep@teamtask.com",
  "role": "developer"
}
```

Create 201:

![POST /users](docs_assets/postman-create-user.png)

Liste:

![GET /users](docs_assets/postman-get-users.png)

Aynı mail iki kere olmaz. Görevi olan kullanıcı da silinmez.

## Reports

```text
GET /reports/completed
GET /reports/pending
GET /reports/summary
```

summary:

```json
{
  "success": true,
  "data": {
    "total": 12,
    "completed": 4,
    "pending": 5,
    "inProgress": 3
  }
}
```

## Kodlar

```text
200  ok
201  create
400  validation / yanlış ilişki / bozuk json
404  kayıt yok veya url yok
500  ben patlattım
```

Olmayan route:

```text
GET /olmayan-route
```

```json
{
  "success": false,
  "error": "Route not found"
}
```
