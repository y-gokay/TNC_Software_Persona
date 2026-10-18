# TeamTask Web ne iş

Javascript ödevi. Modern bir kütüphane seç, CRUD yap, CSS kullan, Netlify'a at.

Kütüphane: React. Çerçeve: Vite, Netlify bunu yiyor. CSS: Tailwind.

backend'de TeamTask API vardı. Bunu da aynı isimle yaptım. Orada json dosyası, burada localStorage.

## Ne yapıyor

Görev ekliyorum, listeliyorum, düzenliyorum, siliyorum. Checkbox ile completed / pending.

Örnek görev:

```text
Login ekranını geliştir
Dashboard geliştir
API dokümantasyonu
```

Ana sayfa:

![Ana sayfa](docs_assets/ana-sayfa.png)

Düzenle modalı:

![Düzenle modal](docs_assets/duzenle-modal.png)

Liste:

![Görev listesi](docs_assets/gorev-listesi.png)

Sayfa yenilense de duruyor. localStorage key:

```text
teamtask-tasks
```

## Klasör

```text
src/components   TaskForm, TaskList, TaskItem
src/pages        HomePage
src/interfaces   createTask
src/utils        load / save
```

Tek sayfa. Router yok, gerekmedi.

## Yönerge checklist

```text
kutuphane          React
kurulum            Vite
components/pages   var
css                Tailwind
ekle               var
listele            var
guncelle           var
sil                var
ekran goruntusu    docs/docs_assets/ana-sayfa.png
github             public'e ben atacagim
netlify            dist + netlify.toml
```
