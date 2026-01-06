import { useState, useEffect } from "react";

function ExpenseForm({ onAddExpense, editing, clearEdit, onUpdate }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Travel",
    date: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        amount: editing.amount,
        category: editing.category,
        date: editing.date,
      });
    } else {
      setForm({
        title: "",
        amount: "",
        category: "Travel",
        date: "",
      });
    }
  }, [editing]);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
  e.preventDefault();

  const payload = {
    title: form.title,
    amount: Math.round(Number(form.amount)),
    category: form.category,
    date: form.date,
  };

  if (editing) {
    await fetch(`http://localhost:5000/api/expenses/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    onUpdate({ ...editing, ...payload });
    clearEdit(); 
  } else {
    await onAddExpense(payload);

    setForm({
      title: "",
      amount: "",
      category: "Travel",
      date: "",
    });
  }
};

  return (
    <form className="form simple-mode" onSubmit={submit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={change}
        required
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={change}
        required
      />

      <select name="category" value={form.category} onChange={change}>
        <option>Food</option>
        <option>Travel</option>
        <option>Rent</option>
        <option>Shopping</option>
        <option>Medicines</option>
        <option>Other</option>
      </select>

    <div className="date-input">
  <input
    name="date"
    type="date"
    value={form.date}
    onChange={change}
    required
  />
</div>

      <button type="submit">
        {editing ? "Done" : "Add"}
      </button>
    </form>
  );
}

export default ExpenseForm;
