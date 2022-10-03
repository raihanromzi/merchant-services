CREATE DATABASE merchant_service;

DROP DATABASE merchant_service;

USE merchant_service;

SHOW COLUMNS FROM Merchant;

CREATE TABLE Merchant
(
    Merchant_ID  CHAR(16)    NOT NULL PRIMARY KEY,
    Password     VARCHAR(16) NOT NULL,
    Name         VARCHAR(50) NOT NULL,
    Address      VARCHAR(50) NOT NULL,
    Join_Date    DATETIME DEFAULT NOW(),
    Phone_Number BIGINT      NOT NULL

);
SET foreign_key_checks = 0;
CREATE TABLE Product
(
    Product_ID  INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Merchant_ID CHAR(16),
    FOREIGN KEY (Merchant_ID)
        REFERENCES Merchant (Merchant_ID)
        ON DELETE CASCADE,
    Name        VARCHAR(50)        NOT NULL,
    Quantity    INT                NOT NULL,
    Price       INT                NOT NULL
);

SELECT *
FROM Merchant;

SELECT *
FROM Product;
