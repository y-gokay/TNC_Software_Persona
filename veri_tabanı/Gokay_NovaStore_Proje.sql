-- NovaStore E-Ticaret Veri Yönetim Sistemi
-- SQL Server
-- Calistirma: SSMS'te dosyayi ac, NovaStoreDB yoksa da olur, script basta olusturuyor.


USE master;
GO

IF DB_ID(N'NovaStoreDB') IS NOT NULL
BEGIN
    ALTER DATABASE NovaStoreDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE NovaStoreDB;
END
GO

CREATE DATABASE NovaStoreDB;
GO

USE NovaStoreDB;
GO

-- Once bagimsiz tablolar, sonra FK'liler.

CREATE TABLE Categories
(
    CategoryID INT IDENTITY(1, 1) PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL
);
GO

CREATE TABLE Customers
(
    CustomerID INT IDENTITY(1, 1) PRIMARY KEY,
    FullName VARCHAR(50) NOT NULL,
    City VARCHAR(20) NULL,
    Email VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE Products
(
    ProductID INT IDENTITY(1, 1) PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL CONSTRAINT DF_Products_Stock DEFAULT (0),
    CategoryID INT NOT NULL,
    CONSTRAINT FK_Products_Categories
        FOREIGN KEY (CategoryID) REFERENCES Categories (CategoryID)
);
GO

CREATE TABLE Orders
(
    OrderID INT IDENTITY(1, 1) PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate DATETIME NOT NULL CONSTRAINT DF_Orders_OrderDate DEFAULT (GETDATE()),
    TotalAmount DECIMAL(10, 2) NOT NULL,
    CONSTRAINT FK_Orders_Customers
        FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
);
GO

CREATE TABLE OrderDetails
(
    DetailID INT IDENTITY(1, 1) PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    CONSTRAINT FK_OrderDetails_Orders
        FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    CONSTRAINT FK_OrderDetails_Products
        FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
);
GO


--  1: 5 kategori
INSERT INTO Categories (CategoryName) VALUES
('Elektronik'),
('Giyim'),
('Kitap'),
('Kozmetik'),
('Ev ve Yasam');
GO

--  2: 12 urun, her kategoriden en az iki tane
INSERT INTO Products (ProductName, Price, Stock, CategoryID) VALUES
('Logitech M185 Mouse', 249.90, 45, 1),
('Philips Hue Ampul', 789.00, 12, 1),
('Xiaomi Powerbank 20000', 599.00, 8, 1),
('LC Waikiki Basic Tisort', 199.90, 60, 2),
('Koton Slim Jean', 649.00, 18, 2),
('Sapiens', 285.00, 22, 3),
('Simyaci', 165.00, 7, 3),
('Clean Code', 890.00, 15, 3),
('Nivea Soft Krem', 89.90, 40, 4),
('The Ordinary Niacinamide', 425.00, 6, 4),
('Karaca Caydanlik', 1299.00, 9, 5),
('Madame Coco Mum', 149.50, 25, 5);
GO

--  3: 6 musteri
INSERT INTO Customers (FullName, City, Email) VALUES
('Mert Kokdemir', 'Istanbul', 'mert.kokdemir@gmail.com'),
('Elif Yalcinkaya', 'Ankara', 'elif.yalcinkaya@gmail.com'),
('Burak Kokdemir', 'Izmir', 'burak.kokdemir@hotmail.com'),
('Deniz Yalcinkaya', 'Bursa', 'deniz.yalcinkaya@gmail.com'),
('Cem Kokdemir', 'Istanbul', 'cem.kokdemir@outlook.com'),
('Selin Yalcinkaya', 'Antalya', 'selin.yalcinkaya@gmail.com');
GO

--  4: 10 siparis, tarihler farkli. Default GETDATE kullanmadim cunku hepsi bugun olurdu.
INSERT INTO Orders (CustomerID, OrderDate, TotalAmount) VALUES
(1, '2026-03-12', 429.70),
(2, '2026-04-02', 1048.80),
(3, '2026-04-18', 450.00),
(1, '2026-05-21', 789.00),
(4, '2026-06-03', 1747.50),
(5, '2026-07-14', 848.90),
(6, '2026-08-09', 939.90),
(2, '2026-08-27', 890.00),
(3, '2026-09-15', 599.70),
(1, '2026-09-28', 584.00);
GO

INSERT INTO OrderDetails (OrderID, ProductID, Quantity) VALUES
(1, 1, 1),
(1, 9, 2),
(2, 5, 1),
(2, 4, 2),
(3, 6, 1),
(3, 7, 1),
(4, 2, 1),
(5, 11, 1),
(5, 12, 3),
(6, 3, 1),
(6, 1, 1),
(7, 10, 2),
(7, 9, 1),
(8, 8, 1),
(9, 4, 3),
(10, 12, 2),
(10, 6, 1);
GO


-- 1) Temel listeleme
-- Stok 20'nin altindakiler, stoga gore azalan
SELECT
    ProductName,
    Stock
FROM Products
WHERE Stock < 20
ORDER BY Stock DESC;
GO

-- 2) JOIN
-- Hangi musteri hangi gun siparis vermis
SELECT
    c.FullName,
    c.City,
    o.OrderDate,
    o.TotalAmount
FROM Customers AS c
INNER JOIN Orders AS o ON o.CustomerID = c.CustomerID
ORDER BY o.OrderDate;
GO

-- 3) Zincirleme JOIN
-- Mert Kokdemir'in aldigi urunler
SELECT
    p.ProductName,
    p.Price,
    cat.CategoryName,
    od.Quantity
FROM Customers AS c
INNER JOIN Orders AS o ON o.CustomerID = c.CustomerID
INNER JOIN OrderDetails AS od ON od.OrderID = o.OrderID
INNER JOIN Products AS p ON p.ProductID = od.ProductID
INNER JOIN Categories AS cat ON cat.CategoryID = p.CategoryID
WHERE c.FullName = 'Mert Kokdemir'
ORDER BY o.OrderDate;
GO

-- 4) GROUP BY
-- Kategoride kac urun var. LEFT JOIN: urunu olmayan kategori de gorunsun diye
SELECT
    cat.CategoryName,
    COUNT(p.ProductID) AS UrunSayisi
FROM Categories AS cat
LEFT JOIN Products AS p ON p.CategoryID = cat.CategoryID
GROUP BY cat.CategoryName
ORDER BY UrunSayisi DESC;
GO

-- 5) Ciro
-- Musteri bazinda toplam harcama, buyukten kucuge
SELECT
    c.FullName,
    SUM(o.TotalAmount) AS ToplamCiro
FROM Customers AS c
INNER JOIN Orders AS o ON o.CustomerID = c.CustomerID
GROUP BY c.FullName
ORDER BY ToplamCiro DESC;
GO

-- 6) Zaman
-- Siparisin uzerinden kac gun gecmis
SELECT
    o.OrderID,
    c.FullName,
    o.OrderDate,
    DATEDIFF(DAY, o.OrderDate, GETDATE()) AS GecenGun
FROM Orders AS o
INNER JOIN Customers AS c ON c.CustomerID = o.CustomerID
ORDER BY GecenGun;
GO


-- 7) vw_SiparisOzet
-- Uzun join'i her seferinde yazmamak icin
CREATE VIEW vw_SiparisOzet
AS
SELECT
    c.FullName,
    o.OrderDate,
    p.ProductName,
    od.Quantity
FROM OrderDetails AS od
INNER JOIN Orders AS o ON o.OrderID = od.OrderID
INNER JOIN Customers AS c ON c.CustomerID = o.CustomerID
INNER JOIN Products AS p ON p.ProductID = od.ProductID;
GO

SELECT *
FROM vw_SiparisOzet
ORDER BY OrderDate;
GO

-- 8) Yedek
-- C:\Yedek klasoru yoksa backup patlar. Once klasoru ac.

-- BACKUP DATABASE NovaStoreDB
-- TO DISK = 'C:\Yedek\NovaStoreDB.bak'
-- WITH INIT;
-- GO
