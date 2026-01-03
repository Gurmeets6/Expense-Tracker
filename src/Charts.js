function Charts({ expenses }) {
  const totals = expenses.reduce((acc, e) => {
    const amount = Number(e.amount);
    acc[e.category] = (acc[e.category] || 0) + amount;
    return acc;
  }, {});

  return (
    <div className="category-summary">
      {Object.keys(totals).map((c) => (
        <div key={c} className="summary-card">
          <span>{c}</span>
          <strong>₹{Math.round(totals[c])}</strong>
        </div>
      ))}
    </div>
  );
}

export default Charts;
