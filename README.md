# Expense Tracker (Full Stack)

This is a full-stack Expense Tracker application built with:

- React (Frontend)
- Node.js + Express (Backend)
- MySQL (Database)

---

## 📌 Features

- Add daily expenses
- Categorize expenses
- View expenses list
- Backend API with database storage

---

## 🛠️ Requirements

Make sure you have installed:

- Node.js (LTS)
- MySQL (XAMPP recommended)
- Git

---

## 🚀 How to Run This Project (Step by Step)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Gurmeets6/Expense-Tracker.git
cd Expense-Tracker
```
---

### 2️⃣ Install & Run Frontend (React)

```bash
npm install
npm start
Setup Database (MySQL)

Open XAMPP and start Apache and MySQL

Open browser and go to:
http://localhost/phpmyadmin

Import this file:
Backend/database.sql

Database name used:
expense_tracker

4️⃣ Create .env file (Backend)

Inside the Backend folder, create a file named .env

Add this:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=expense_tracker

5️⃣ Run Backend (Node.js)

Open a new terminal:

cd Backend
npm install
npm start