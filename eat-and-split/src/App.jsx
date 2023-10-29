import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectedId, setSelectedId] = useState(null);

  const handleAddFriend = (friend) => {
    setFriendList([...friendList, friend]);
  };

  const handleSetBill = (id, balance) => {
    setFriendList(
      friendList.map((friend) =>
        friend.id === id ? { ...friend, balance } : friend
      )
    );
    setSelectedId(null);
  };

  return (
    <div className="app">
      <FriendList
        friendList={friendList}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        onAddFriend={handleAddFriend}
      />
      <SplitBill
        friendList={friendList}
        selectedId={selectedId}
        onSetBill={handleSetBill}
      />
    </div>
  );
}

function FriendList({ friendList, selectedId, setSelectedId, onAddFriend }) {
  return (
    <div className="sidebar">
      <ul>
        {friendList.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </ul>
      <AddFriend onAddFriend={onAddFriend} />
    </div>
  );
}

function Friend({ friend, selectedId, setSelectedId }) {
  const { id, name, image, balance } = friend;
  const text = [
    balance > 0 && (
      <p className="green">{`${name} owes you ${Math.abs(balance)}€`}</p>
    ),
    balance === 0 && <p>{`You and ${name} are even`}</p>,
    balance < 0 && (
      <p className="red">{`You owe ${name} ${Math.abs(balance)}€`}</p>
    ),
  ];
  return (
    <li className={selectedId === id ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {text}
      <Button onClick={() => setSelectedId(selectedId === id ? null : id)}>
        {selectedId === id ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend({ onAddFriend }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !url) return;
    setIsOpen(false);
    onAddFriend({
      id: Math.floor(Math.random() * 1000000),
      name,
      image: url,
      balance: 0,
    });
    setName("");
    setUrl("");
  }
  return (
    <>
      {isOpen && (
        <form className="form-add-friend">
          <label htmlFor="name">👫Friend name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="url">🌄Image URL</label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleSubmit}>Add</Button>
        </form>
      )}
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((p) => !p);
        }}
      >
        {isOpen ? "Close" : "Add friend"}
      </Button>
    </>
  );
}

function SplitBill({ friendList, selectedId, onSetBill }) {
  const [bill, setBill] = useState(0);
  const [expense, setExpense] = useState(0);
  const [paidBy, setPaidBy] = useState(0);

  if (!selectedId) return null;

  const { id, name } = friendList.find((friend) => friend.id === selectedId);
  const newBalance = paidBy === 0 ? bill - expense : expense - bill;

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill) return;
    onSetBill(id, newBalance);
    setBill(0);
    setExpense(0);
    setPaidBy(0);
  }
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {name}</h2>
      <label htmlFor="bill">💰Bill value</label>
      <input
        type="number"
        name="bill"
        id="bill"
        value={bill}
        min={0}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label htmlFor="expense">🧍Your expense</label>
      <input
        type="number"
        name="expense"
        id="expense"
        value={expense}
        min={0}
        onChange={(e) =>
          setExpense(
            Number(e.target.value) > bill ? bill : Number(e.target.value)
          )
        }
      />
      <label htmlFor="expense">👫{name}'s' expense</label>
      <input value={bill - expense} disabled />
      <label htmlFor="expense">🤑Who is paying the bill?</label>
      <select
        name="paid-by"
        id="paid-by"
        value={paidBy}
        onChange={(e) => setPaidBy(Number(e.target.value))}
      >
        <option value={0}>You</option>
        <option value={1}>{name}</option>
      </select>
      <Button onClick={handleSubmit}>Split bill</Button>
    </form>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
