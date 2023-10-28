export default function Item({ item, onToggleChecked, onDeleteItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.checked}
        onClick={() => onToggleChecked(item.id)}
      />
      <span
        style={item.checked ? { textDecoration: "line-through" } : {}}
      >{`${item.count} ${item.name}`}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
