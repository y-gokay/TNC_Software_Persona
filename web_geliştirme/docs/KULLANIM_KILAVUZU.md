# Kullanım

## Aç

```bash
cd web_geliştirme
npm install
npm run dev
```

Tarayıcı:

```text
http://localhost:5173
```

Solda yeni görev, sağda liste:

![Ana sayfa](docs_assets/ana-sayfa.png)

## CRUD

Yeni görev:

```text
baslik yaz -> Ekle
```

Liste zaten altta.

Güncelle: Düzenle ya da karta bas, modal açılıyor.

```text
Duzenle -> basligi degistir -> Kaydet
```

![Düzenle modal](docs_assets/duzenle-modal.png)

Checkbox da completed yapıyor. Üstü çizili oluyor.

Sil:

```text
Sil
```

Filtre:

```text
Hepsi
Bekleyen
Devam
Bitti
```

Yeni görev ekleyince listede duruyor:

![Görev listesi](docs_assets/gorev-listesi.png)

## Netlify

```bash
npm run build
```

Site settings:

```text
build command     npm run build
publish directory dist
```

Ya da bu klasörü Netlify'a sürükle, `netlify.toml` zaten var.

## Takılınca

```text
ekran bos            npm run dev calisiyor mu
ekle olmuyor         baslik bos olmasin
veri kayboldu        baska tarayici / gizli pencere localStorage ayri
build hata           node_modules sil, npm install
```
