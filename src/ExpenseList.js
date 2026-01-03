function ExpenseList({ expenses, onDelete, onEdit }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const cleanDate = dateStr.includes("T")
      ? dateStr.split("T")[0]
      : dateStr;

    const [year, month, day] = cleanDate.split("-");

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  return (
    <div className="scroll-box">
      {expenses.map((e) => (
        <div className="expense-item" key={e.id}>
          <div className="title">{e.title}</div>
          <div className="category">{e.category}</div>

          <div className="amount">
            ₹{Math.round(Number(e.amount))}
          </div>

          <div className="date">
            {formatDate(e.date)}
          </div>

          <div className="actions">
            <button
              className="edit-btn"
              onClick={() => onEdit(e)}
              title="Edit"
            >
              ✏️
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(e.id)}
              title="Delete"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
