# Sorgular

Hepsi sql dosyasının 3. bölümünde. Scripti baştan çalıştırınca bunlar çıkıyor. Ekran görüntüsünü SSMS'ten alacağım.

## 1) stok 20 altı

```sql
SELECT ProductName, Stock
FROM Products
WHERE Stock < 20
ORDER BY Stock DESC;
```

Çıkanlar, büyükten küçüğe:

```text
Koton Slim Jean              18
Clean Code                   15
Philips Hue Ampul            12
Karaca Caydanlik              9
Xiaomi Powerbank 20000        8
Simyaci                       7
The Ordinary Niacinamide      6
```

## 2) müşteri + sipariş

```sql
SELECT c.FullName, c.City, o.OrderDate, o.TotalAmount
FROM Customers AS c
INNER JOIN Orders AS o ON o.CustomerID = c.CustomerID
ORDER BY o.OrderDate;
```

10 satır. Mert 3, Elif 2, Burak 2, kalanlar 1.

## 3) Mert Kokdemir ne almış

Yönergede bir müşterinin ürünlerini 5 tablodan çekin diyordu, Mert'i seçtim. 3 siparişi var.

```sql
WHERE c.FullName = 'Mert Kokdemir'
```

```text
Logitech M185 Mouse          Elektronik     x1
Nivea Soft Krem              Kozmetik       x2
Philips Hue Ampul            Elektronik     x1
Madame Coco Mum              Ev ve Yasam    x2
Sapiens                      Kitap          x1
```

## 4) kategoride kaç ürün

```sql
SELECT cat.CategoryName, COUNT(p.ProductID) AS UrunSayisi
FROM Categories AS cat
LEFT JOIN Products AS p ON p.CategoryID = cat.CategoryID
GROUP BY cat.CategoryName
ORDER BY UrunSayisi DESC;
```

Left join yazdım, yönergede öyle istiyordu. Boş kategori yok gerçi.

```text
Elektronik     3
Kitap          3
Giyim          2
Kozmetik       2
Ev ve Yasam    2
```

## 5) ciro

```sql
SELECT c.FullName, SUM(o.TotalAmount) AS ToplamCiro
FROM Customers AS c
INNER JOIN Orders AS o ON o.CustomerID = c.CustomerID
GROUP BY c.FullName
ORDER BY ToplamCiro DESC;
```

```text
Elif Yalcinkaya     1938.80
Mert Kokdemir       1802.70
Deniz Yalcinkaya    1747.50
Burak Kokdemir      1049.70
Selin Yalcinkaya     939.90
Cem Kokdemir         848.90
```

Elif önde çünkü ikinci siparişinde Clean Code var, 890.

## 6) kaç gün geçmiş

```sql
SELECT
    o.OrderID,
    c.FullName,
    o.OrderDate,
    DATEDIFF(DAY, o.OrderDate, GETDATE()) AS GecenGun
FROM Orders AS o
INNER JOIN Customers AS c ON c.CustomerID = o.CustomerID
ORDER BY GecenGun;
```

Bugüne göre sayı değişir. Marttakiler en eski, eylültakiler en yeni.

## View

```sql
SELECT *
FROM vw_SiparisOzet
ORDER BY OrderDate;
```

Müşteri, tarih, ürün, adet. Uzun join'i her seferinde yazmayayım diye.
