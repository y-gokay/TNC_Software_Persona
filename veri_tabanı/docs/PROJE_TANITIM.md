# NovaStore ne iş

Yönergedeki senaryo: NovaStore açılmış, veriyi tutacak bir yer lazım. Ben SQL Server'da kurdum.

Amaç ürün, müşteri, sipariş birbirine bağlı dursun. Sonra da birkaç rapor.

Uygulama yazmadım. İş tablo, ilişki, select.

## Tablolar

Beş tane:

```text
Categories     Elektronik, Giyim, Kitap, Kozmetik, Ev ve Yasam
Products       ad, fiyat, stok, kategori
Customers      ad, sehir, mail
Orders         kim, ne zaman, toplam tutar
OrderDetails   hangi sipariste hangi urunden kac tane
```

OrderDetails'i ayırmasam bir siparişe birden fazla ürün koyamazdım. Kategoriyi ürüne string yazsaydım isim değişince 12 satır gezecektim. Mail unique, aynı mail iki kere basılmasın diye.

Bağlar:

```text
Categories  1 --- n  Products
Customers   1 --- n  Orders
Orders      1 --- n  OrderDetails
Products    1 --- n  OrderDetails
```

Id'ler identity, 1'den. Stok boşsa 0. Sipariş tarihine default GETDATE koydum ama örnek datada tarihi kendim yazdım. Yazmasam hepsi bugün görünüyordu.

## Örnek data

```text
5 kategori
12 urun
6 musteri
10 siparis
```

Müşteriler:

```text
Mert Kokdemir
Elif Yalcinkaya
Burak Kokdemir
Deniz Yalcinkaya
Cem Kokdemir
Selin Yalcinkaya
```

Stokların bir kısmını 20'nin altında bıraktım. İlk sorguda bir şey çıksın diye.

## Sorgular

```text
1  stoku 20 altı, azalan
2  kim ne zaman siparis vermis (join)
3  Mert Kokdemir ne almis (5 tablo)
4  kategoride kac urun
5  kim ne kadar birakmis
6  siparisin uzerinden kac gun gecmis
```

Bir de view:

```sql
SELECT * FROM vw_SiparisOzet
```

Aynı join'i her seferinde yazmamak için.

Trigger, procedure yok. Ödevde yoktu, karıştırmadım.
