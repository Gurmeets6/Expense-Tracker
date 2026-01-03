function FoodSummary({ expenses }) {
  const food = expenses.filter((e) => e.category === "Food");

  const grouped = food.reduce((acc, e) => {
    if (e.item) {
      acc[e.item] = acc[e.item] || [];
      acc[e.item].push(e.qty);
    }
    return acc;
  }, {});

  if (Object.keys(grouped).length === 0) return null;

  return (
    <div className="food-summary">
      {Object.keys(grouped).map((item) => (
        <div key={item} className="food-row">
          <span>{item}</span>
          <strong>{grouped[item].join(", ")}</strong>
        </div>
      ))}
    </div>
  );
}

export default FoodSummary;
