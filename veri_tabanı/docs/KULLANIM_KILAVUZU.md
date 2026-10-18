# Çalıştırırken

SSMS'te sql'i açıp F5. Veritabanı varsa siliyor, tekrar kuruyor.

```text
Gokay_NovaStore_Proje.sql
```

Object Explorer'da `NovaStoreDB` yoksa refresh.

## Diyagram

Teslimde ilişki resmi istiyorlar.

```text
NovaStoreDB
  -> Database Diagrams
  -> New Database Diagram
  -> 5 tabloyu ekle
  -> ekran goruntusu
```

İlk sefer Yes diyor, sysdiagrams için. Çizgi gelmezse script düzgün çalışmamıştır, baştan F5.

Dosya adı:

```text
Gokay_NovaStore_Proje.png
```

## Word

Yönerge word istiyor. Md yeter mi bilmiyorum, ben yine word'e koyacağım.

Kısa ne yaptım, her sorgunun kodu + SSMS sonucu, en sona diyagram.

```text
Gokay_NovaStore_Proje.docx
```

## Yedek

Önce klasör:

```text
C:\Yedek
```

Yoksa backup hata veriyor, script bozuk diye değil. Sqlde satırlar yorumda. Klasörü açınca yorumu kaldırıp çalıştırıyorum:

```sql
BACKUP DATABASE NovaStoreDB
TO DISK = 'C:\Yedek\NovaStoreDB.bak'
WITH INIT;
```

## Bir şey olmazsa

```text
Mert Kokdemir bos geliyor    insert dusmus, basi parcalamadan F5
foreign key hatasi           urunu kategoriden once basmisimdir
unique email                 ayni maili iki kere insert
backup failed                C:\Yedek yok ya da izin yok
```

Veriyi sıfırlamak için yine F5. Baş zaten drop ediyor.
