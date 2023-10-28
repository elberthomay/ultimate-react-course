import { useState } from "react";

export default function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    onAddItem({
      id: Date.now(),
      name,
      count,
      createdAt: new Date(),
      checked: false,
    });
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name="count"
        id="item-count"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option value={i}>{i}</option>
        ))}
      </select>
      <input
        type="text"
        name="name"
        placeholder="Item..."
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
