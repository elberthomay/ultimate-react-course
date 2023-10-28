import { useState } from "react";
import Item from "./Item";

export default function PackList({
  packList,
  onToggleChecked,
  onDeleteItem,
  onDeleteAll,
}) {
  const sortFunctions = [
    (a, b) => a.name.localeCompare(b.name),
    (a, b) => b.name.localeCompare(a.name),
    (a, b) => a.createdAt - b.createdAt,
    (a, b) => b.checked - a.checked,
  ];
  const [sortIndex, setSortIndex] = useState(0);
  const sortedArray = [...packList].sort(sortFunctions[sortIndex]);
  return (
    <div className="list">
      <ul>
        {sortedArray.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggleChecked={onToggleChecked}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
      <div className="action">
        <select
          name="sort"
          id="sort"
          value={sortIndex}
          onChange={(e) => setSortIndex(Number(e.target.value))}
        >
          <option value={0}>Sort by name ascending</option>
          <option value={1}>Sort by name descending</option>
          <option value={2}>Sort by input order</option>
          <option value={3}>Sort by Checked</option>
        </select>
        <button onClick={onDeleteAll}>Clear list</button>
      </div>
    </div>
  );
}
