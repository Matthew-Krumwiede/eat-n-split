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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setIsFriendFormOpen(false);
  }

  function handleFriendSelected(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setIsFriendFormOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onFriendSelected={handleFriendSelected}
          selectedFriend={selectedFriend}
        />
        {isFriendFormOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button
          onClick={() =>
            setIsFriendFormOpen((isFriendFormOpen) => !isFriendFormOpen)
          }
        >
          {isFriendFormOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <BillSplitForm selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendList({ friends, onFriendSelected, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onFriendSelected={onFriendSelected}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onFriendSelected, selectedFriend }) {
  const { name, image, balance, id } = friend;
  const isSelected = selectedFriend?.id === id;

  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onFriendSelected(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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
  const [newFriendImage, setNewFriendImage] = useState(
    "https://i.pravatar.cc/48"
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!newFriendName || !newFriendImage) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: newFriendName,
      image: `${newFriendImage}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
    setNewFriendName("");
    setNewFriendImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
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
        placeholder="Image URL"
        value={newFriendImage}
        onChange={(e) => setNewFriendImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function BillSplitForm({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        placeholder="Bill value"
        value={selectedFriend.balance}
        onChange={(e) => {}}
      />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" placeholder="User expense" />

      <label>👫 X's expense </label>
      <input type="text" placeholder="friend expense" disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
