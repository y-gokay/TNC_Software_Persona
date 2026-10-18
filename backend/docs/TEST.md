# Test

Otomatik test yazmadım. Ödev Postman istiyor, ben de oradan bakıyorum.

```text
postman/TeamTask_API.postman_collection.json
```

## Postman

```bash
npm start
```

Sonra Import, collection'ı seç. `baseUrl` bu kalsın:

```text
http://localhost:3000
```

Health'den `API Running`, sonra Tasks. Örnekler `docs_assets` altında:

![GET /](docs_assets/postman-health.png)

## Teslim sırası

Bunları tek tek çalışmadan sonrakine geçmiyorum:

```text
POST   /tasks      201
GET    /tasks      listede var
GET    /tasks/:id  az önce oluşan id
PUT    /tasks/:id  status inProgress
DELETE /tasks/:id  silindi
```

Ekran görüntüsünde url, method, status, body görünsün. Birinde terminali de çekiyorum, logger için:

```text
[2026-10-08T19:42:02] GET /tasks
```

Delete'i seed'deki 1'e basmıyorum. Yeni oluşturduğumu siliyorum. Collection'da Delete varsayılan id 13, ona dikkat. 13 yoksa 404:

![DELETE /tasks/13 404](docs_assets/postman-delete-task-404.png)

Olunca 200, `Task deleted`:

![DELETE /tasks/1](docs_assets/postman-delete-task.png)

Kullanıcı ekleme / liste:

![POST /users](docs_assets/postman-create-user.png)

![GET /users](docs_assets/postman-get-users.png)

Görev listesi:

![GET /tasks](docs_assets/postman-get-tasks.png)

Proje güncelleme:

![PUT /projects/1](docs_assets/postman-update-project.png)

## Filtre falan

Zorunlu değil ama collection'da duruyor:

```text
GET /tasks?status=completed
GET /tasks?priority=high
GET /tasks?assignee=Gokay
GET /tasks/search?keyword=backend
GET /tasks?page=1&limit=10
GET /tasks?sort=createdAt
GET /reports/summary
GET /reports/completed
GET /reports/pending
```

`assignee=Gokay` yazsam da Gökay'ı buluyor.

## Hatalar

Errors klasörü:

```text
POST /tasks   title yok     400  Task title is required
GET  /tasks/999             404  Task not found
GET  /olmayan-route         404  Route not found
```

Bir de şunlara bakıyorum:

```text
priority: urgent          400
olmayan assignee          400  User not found
görevi olan projeyi sil   400  Project has related tasks
```

## Datayı bozarsam

```text
src/data/tasks.json
src/data/projects.json
src/data/users.json
```

Git'ten geri alıyorum. Sunucuyu kapatmama gerek yok, her istek dosyayı yeniden okuyor. Karıştıysa yine de `npm start` ile taze açıyorum.
