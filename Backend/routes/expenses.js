const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query(
    "SELECT id, title, amount, category, DATE(date) AS date FROM expenses",
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
});

router.post("/", (req, res) => {
  const { title, amount, category, date } = req.body;

  const sql =
    "INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, DATE(?))";

  db.query(sql, [title, amount, category, date], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Expense Added" });
  });
});

router.put("/:id", (req, res) => {
  const { title, amount, category, date } = req.body;

  const sql =
    "UPDATE expenses SET title=?, amount=?, category=?, date=DATE(?) WHERE id=?";

  db.query(sql, [title, amount, category, date, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Expense Updated" });
  });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM expenses WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Expense Deleted" });
  });
});

module.exports = router;
