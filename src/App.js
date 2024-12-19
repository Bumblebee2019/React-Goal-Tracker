import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialGoals = [
  {
    id: uuidv4(),
    name: "reading",
    time: 60,
    image:
      "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: uuidv4(),
    name: "working out",
    time: 30,
    image:
      "https://images.pexels.com/photos/703014/pexels-photo-703014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: uuidv4(),
    name: "studying React",
    time: 60,
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function App() {
  const [goals, setGoals] = useState(initialGoals);
  const [isAddGoalClicked, setIsAddGoalClicked] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  function handleAddingNewActivity(activity) {
    setGoals((goals) => [...goals, activity]);
  }

  function handleSelection(goal) {
    setSelectedGoal((cur) => (cur?.id === goal.id ? null : goal));
  }

  function handleUpdateGoal(updatedTime) {
    setGoals((goals) =>
      goals.map((goal) =>
        goal.id === selectedGoal.id ? { ...goal, time: updatedTime } : goal
      )
    );
    setSelectedGoal(null); // Deselect the goal after updating
  }

  return (
    <>
      <Header />
      <div className="app">
        <div className="sidebar">
          <GoalList
            goals={goals}
            selectedGoal={selectedGoal}
            onSelection={handleSelection}
          />
          {isAddGoalClicked && (
            <AddGoalForm handleAddingNewActivity={handleAddingNewActivity} />
          )}
          <button
            className="button"
            onClick={() => setIsAddGoalClicked((e) => !e)}
          >
            {isAddGoalClicked ? "Close" : "Add Goal"}
          </button>
        </div>
        <div className="main-content">
          {selectedGoal && (
            <UpdateGoalForm
              selectedGoal={selectedGoal}
              onUpdateGoal={handleUpdateGoal}
            />
          )}
        </div>
      </div>
    </>
  );
}

function Header() {
  return <div className="header">Goal Tracker</div>;
}

function Goal({ goal, onSelection, selectedGoal }) {
  const isSelected = selectedGoal?.id === goal.id;
  return (
    <li>
      <img src={goal.image} alt={goal.name} />
      <h3>{goal.name}</h3>
      <h2>{goal.time} minutes/day</h2>
      <button className="button" onClick={() => onSelection(goal)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function GoalList({ goals, onSelection, selectedGoal }) {
  return (
    <div>
      <ul>
        {goals.map((goal) => (
          <Goal
            key={goal.id}
            goal={goal}
            onSelection={onSelection}
            selectedGoal={selectedGoal}
          />
        ))}
      </ul>
    </div>
  );
}

function AddGoalForm({ handleAddingNewActivity }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [time, setTime] = useState("");

  function createNewGoalItem(e) {
    e.preventDefault();
    const newGoal = { id: uuidv4(), name, time: Number(time), image };
    handleAddingNewActivity(newGoal);
    setName("");
    setImage("");
    setTime("");
  }

  return (
    <form className="form-add-friend" onSubmit={createNewGoalItem}>
      Goal name:{" "}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      Motivating image:{" "}
      <input value={image} onChange={(e) => setImage(e.target.value)} />
      Daily time norm:
      <input
        value={time}
        onChange={(e) => setTime(e.target.value)}
        type="number"
      />
      <button className="button">Add</button>
    </form>
  );
}

function UpdateGoalForm({ selectedGoal, onUpdateGoal }) {
  const [newTime, setNewTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateGoal(Number(newTime));
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      Update {selectedGoal.name} norm:{" "}
      <input
        value={newTime}
        onChange={(e) => setNewTime(e.target.value)}
        type="number"
      />{" "}
      minutes/day
      <button className="button">Update</button>
    </form>
  );
}
