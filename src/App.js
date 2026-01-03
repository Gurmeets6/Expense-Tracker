import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import MonthlySection from "./MonthlySection";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:5000/api/expenses");
    const data = await res.json();
    const normalized = data.map((e) => ({
      ...e,
      date: e.date.split("T")[0], 
    }));

    setExpenses(normalized);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });

    fetchExpenses();
  };

  const updateExpenseInState = (updated) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  const deleteExpense = async (id) => {
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
    });

    setExpenses((prev) => prev.filter((e) => e.id !== id));

    if (editing && editing.id === id) {
      setEditing(null);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const grouped = expenses.reduce((acc, e) => {
    const [year, month] = e.date.split("-");
    const key = `${monthNames[Number(month) - 1]} ${year}`;

    acc[key] = acc[key] || [];
    acc[key].push(e);
    return acc;
  }, {});

  return (
    <div className="container">
      <h1 className="app-title">Expense Tracker</h1>

      <ExpenseForm
        onAddExpense={addExpense}
        editing={editing}
        clearEdit={() => setEditing(null)}
        onUpdate={updateExpenseInState}
      />

      {Object.keys(grouped).map((month) => (
        <MonthlySection
          key={month}
          month={month}
          expenses={grouped[month]}
          onDelete={deleteExpense}
          onEdit={setEditing}
        />
      ))}
    </div>
  );
}

export default App;
