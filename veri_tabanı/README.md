# NovaStoreDB

NovaStore e-ticaret veritabanı. SQL Server.

Kategori, ürün, müşteri, sipariş ve sipariş detayı birbirine foreign key ile bağlı. Üstüne rapor sorguları, bir view ve backup komutu var.

Site yok. Tek script:

```text
Gokay_NovaStore_Proje.sql
```

## Nasıl çalıştırılır

SQL Server + SSMS. Dosyayı aç, F5.

Script başta `NovaStoreDB` varsa silip yeniden kuruyor.

Müşteri isimleri dummy. Soyadlar Kokdemir ve Yalcinkaya. Encoding yüzünden JOIN boş dönmesin diye ASCII yazdım (`Mert Kokdemir`).

## Scriptte ne var

```text
1  CREATE DATABASE + tablolar + foreign key
2  örnek veri
3  rapor sorguları
4  view ve backup
```

```text
Categories
Products
Customers
Orders
OrderDetails
```

Sipariş tutarı ürün fiyatı çarpı adet. `Orders.TotalAmount` detayla uyuyor.

Backup satırları yorumda. `C:\Yedek` yoksa patlar. Klasörü açınca yorumu kaldır:

```sql
BACKUP DATABASE NovaStoreDB
TO DISK = 'C:\Yedek\NovaStoreDB.bak'
WITH INIT;
```

## Docs

- [Proje tanıtımı](docs/PROJE_TANITIM.md)
- [Sorgular](docs/SORGULAR.md)
- [Kullanım](docs/KULLANIM_KILAVUZU.md)
