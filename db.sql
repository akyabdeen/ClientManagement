CREATE DATABASE client_management;

USE client_management;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(15) NOT NULL,
    username VARCHAR(100),
    password VARCHAR(100),
    user_type SMALLINT NOT NULL
);

CREATE TABLE client (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    deal_type INT NOT NULL,
    notes TEXT,
    status INT NOT NULL DEFAULT 101,
    record INT NOT NULL DEFAULT 1
);

CREATE TABLE client_status (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO client_status (id, name) VALUES
(101, 'New'),
(102, 'Updated'),
(103, 'Closed');

INSERT INTO user (phone, username, password, user_type) VALUES
('1234567890', 'john_doe', 'hashed_password1', 1),
('0987654321', 'jane_smith', 'hashed_password2', 2),
('5551234567', 'alice_brown', 'hashed_password3', 1),
('4449876543', 'bob_jones', 'hashed_password4', 2);

INSERT INTO client (user_id, name, phone, email, deal_type, notes, status, record) VALUES
(1, 'Acme Corp', '1112223333', 'contact@acme.com', 999, 'Initial consultation scheduled', 101, 1),
(1, 'Beta LLC', '2223334444', 'info@beta.com', 998, 'Follow-up needed', 102, 1),
(2, 'Gamma Inc', '3334445555', 'sales@gamma.com', 999, 'Closed deal successfully', 103, 1),
(3, 'Delta Co', '4445556666', 'support@delta.com', 998, 'Awaiting contract signing', 101, 1),
(4, 'Epsilon Ltd', '5556667777', 'hr@epsilon.com', 999, 'Proposal sent', 102, 1);