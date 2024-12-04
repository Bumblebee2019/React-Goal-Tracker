import { act, useState } from "react";
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
  function handleAddingNewActivity(activity) {
    setGoals((goals) => [...goals, activity]);
  }
  return (
    <>
      <Header />
      <div className="app">
        <div className="sidebar">
          <GoalList goals={goals} />
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
          <UpdateGoalForm />
        </div>
      </div>
    </>
  );
}
function Header() {
  return <div className="header">Goal Tracker</div>;
}
function Goal({ goal }) {
  return (
    <li>
      <img src={goal.image} alt={goal.name} />
      <h3>{goal.name}</h3> <button className="button">Select</button>
    </li>
  );
}
function GoalList({ goals }) {
  return (
    <div>
      <ul>
        {" "}
        {goals.map((goal) => (
          <Goal key={goal.id} goal={goal} />
        ))}
      </ul>
    </div>
  );
}
function AddGoalForm({ handleAddingNewActivity }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  function createNewGoalItem(e) {
    e.preventDefault(); // Prevent form submission from reloading the page
    const newGoal = { id: uuidv4(), name, time: 30, image }; // Generate a new goal with a unique ID
    handleAddingNewActivity(newGoal);
    setName(""); // Clear the input fields
    setImage("");
  }
  return (
    <form className="form-add-friend" onSubmit={createNewGoalItem}>
      Goal name:{" "}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      Motivating image:{" "}
      <input value={image} onChange={(e) => setImage(e.target.value)} />
      <button className="button">Add</button>
    </form>
  );
}
function UpdateGoalForm() {
  return (
    <form className="form-split-bill">
      Your ____ form is <input /> minutes / day
      <button className="button">Update</button>
    </form>
  );
}
