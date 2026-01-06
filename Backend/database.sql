CREATE DATABASE expense_tracker;

USE expense_tracker;

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  amount DECIMAL(10,2),
  category VARCHAR(100),
  item VARCHAR(100),
  qty VARCHAR(50),
  date DATE
);
