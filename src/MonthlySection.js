import { useState } from "react";
import ExpenseList from "./ExpenseList";

function MonthlySection({ month, expenses, onDelete, onEdit }) {
  const currentMonth = `${new Date().toLocaleString("default", {
    month: "long",
  })} ${new Date().getFullYear()}`;

  const [open, setOpen] = useState(month === currentMonth);
  const [category, setCategory] = useState("All");

const filtered =
  category === "All"
    ? [...expenses]
    : expenses.filter((e) => e.category === category);

filtered.sort((a, b) => a.date.localeCompare(b.date));

  const fullMonthTotal = Math.round(
    expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  );

  const categoryTotal = Math.round(
    filtered.reduce((sum, e) => sum + Number(e.amount), 0)
  );

  return (
    <div className="month-card">
      <div
        className="month-header"
        onClick={() => {
          if (open) setCategory("All"); 
          setOpen(!open);
        }}
      >
        <div className="month-left">
          <div className="month-title-row">
            <span className="month-name">{month}</span>

            <span className="month-total-inline">
              ₹{open ? categoryTotal : fullMonthTotal}
            </span>
          </div>

          {!open && (
            <span className="month-sub">Click to view breakdown</span>
          )}
        </div>

        <span className={`arrow ${open ? "open" : ""}`}>▶</span>
      </div>

      <div className={`month-body ${open ? "show" : ""}`}>
        <div className="breakdown">
          <label>Breakdown:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Rent</option>
            <option>Shopping</option>
            <option>Medicines</option>
            <option>Other</option>
          </select>
        </div>

        <ExpenseList
          expenses={filtered}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}

export default MonthlySection;
