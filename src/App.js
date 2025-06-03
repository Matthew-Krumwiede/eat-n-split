import { useState } from "react";
import "./App.css";

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
  const [isFriendFormOpen, setIsFriendFormOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriend(friend) {
    setFriends(() => [...friends, friend]);
    setIsFriendFormOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {isFriendFormOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={() => setIsFriendFormOpen(() => !isFriendFormOpen)}>
          {isFriendFormOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      <BillSplitForm />
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  const { name, image, balance } = friend;

  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">
          You owe {name} ${Math.abs(balance)}
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owes you ${balance}
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendImage, setNewFriendImage] = useState("");

  return (
    <form className="form-add-friend" onSubmit={(e) => e.preventDefault()}>
      <label>👫 Friend Name</label>
      <input
        type="text"
        placeholder="friend name"
        value={newFriendName}
        onChange={(e) => setNewFriendName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        placeholder="friend name"
        value={newFriendImage}
        onChange={(e) => setNewFriendImage(e.target.value)}
      />

      <Button
        onClick={() =>
          onAddFriend({
            id: Math.random(),
            name: newFriendName,
            image: newFriendImage,
            balance: 0,
          })
        }
      >
        Add
      </Button>
    </form>
  );
}

function BillSplitForm() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" placeholder="friend name" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" placeholder="friend name" />

      <label>👫 X's expense </label>
      <input type="text" placeholder="friend name" disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
