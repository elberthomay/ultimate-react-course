import { useState } from "react";
import Form from "./components/Form";
import PackList from "./components/PackList";
import Stats from "./components/Stats";

export default function App() {
  const [packList, setPackList] = useState([]);

  const handleAddItem = (newItem) =>
    setPackList((packList) => [...packList, newItem]);

  const handleToggleChecked = (id) =>
    setPackList((packList) =>
      packList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  const handleDeleteItem = (id) =>
    setPackList((packList) => packList.filter((item) => item.id !== id));

  const handleDeleteAll = () => {
    const confimed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confimed) setPackList([]);
  };

  return (
    <main className="app">
      <h1>🏝️ Far away 💼</h1>
      <Form onAddItem={handleAddItem} />
      <PackList
        packList={packList}
        onToggleChecked={handleToggleChecked}
        onDeleteItem={handleDeleteItem}
        onDeleteAll={handleDeleteAll}
      />
      <Stats packList={packList} />
    </main>
  );
}
