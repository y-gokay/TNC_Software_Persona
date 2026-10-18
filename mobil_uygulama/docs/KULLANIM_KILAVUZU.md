# Kullanım

## Flutter yoksa

SDK kur, PATH'e `flutter/bin` ekle. VS Code + Flutter eklentisi. Android Studio'dan emülatör.

```bash
flutter doctor
```

Kırmızı kalmasın, en az Android toolchain.

## İlk açılış

```bash
cd mobil_uygulama/nova_store
flutter create . --project-name nova_store --platforms android,ios
flutter pub get
flutter run
```

`lib` duruyor. Sadece android/ios gelir.

## Ekranlar

Ana sayfa banner. Kategoriye basınca katalog o kategoride açılır.

![Ana sayfa](docs_assets/ana-sayfa.png)

```text
Tumu butonu  ->  /products
kart         ->  /detail
canta ikonu  ->  /cart
```

Detayda Sepete ekle. Üstte badge artar.

![Ürün detay](docs_assets/urun-detay.png)

Katalog:

![Ürün listesi](docs_assets/urun-listesi.png)

Chip ile kategori. Bilgisayar:

![Kategori filtresi](docs_assets/kategori-filtre.png)

Arama kutusuna `Appl` yazınca liste daralıyor:

![Arama](docs_assets/arama.png)

Sepette çöp: satır gider. Siparisi tamamla: snackbar, gerçek ödeme yok.

![Sepet](docs_assets/sepet.png)

Görseller `docs/docs_assets`.

## Takılınca

```text
flutter taninmiyor     PATH
create lib'i sildi mi  hayir, . ile var olan projeye platform ekler
gorsel cikmiyor        pubspec assets altinda images/
json hata              products.json virgul
sepet 0 kaliyor        setState, CartScope.of
```
