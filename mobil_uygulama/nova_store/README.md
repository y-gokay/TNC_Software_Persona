# NovaStore

Mini katalog. Flutter.

Ana sayfa, ürün listesi, detay, sepet simülasyonu. Sadece Material, ekstra paket yok.

Veri `assets/data/products.json`. Görseller `assets/images`. Canlı istek yok.

## Flutter sürümü

```text
Flutter 3.x
```

```bash
flutter --version
```

## Nasıl çalıştırılır

```bash
cd nova_store
flutter create . --project-name nova_store --platforms android,ios
flutter pub get
flutter run
```

Emülatör veya USB telefon.

Ekran görüntüleri bir üstte, `docs/docs_assets`:

![Ana sayfa](../docs/docs_assets/ana-sayfa.png)

![Ürün listesi](../docs/docs_assets/urun-listesi.png)

![Ürün detay](../docs/docs_assets/urun-detay.png)

![Sepet](../docs/docs_assets/sepet.png)

## Ne var

```text
listeleme     GridView
detay         named route + argument
sepete ekle   state
sepetten sil  çöp ikonu
arama         ürün adı
filtre        kategori
```

```text
lib/models
lib/data
lib/cart
lib/screens
lib/widgets
assets/data/products.json
assets/images
```
