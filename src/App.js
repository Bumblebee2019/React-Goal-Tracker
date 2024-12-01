const initialGoals = [
  {
    name: "reading",
    time: 60,
    image:
      "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "working out",
    time: 30,
    image:
      "https://images.pexels.com/photos/703014/pexels-photo-703014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "studying React",
    time: 60,
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function App() {
  return (
    <>
      <Header />
      <div className="app">
        <div className="sidebar">
          <GoalList />

          <AddGoalForm />
          <button className="button">Add Goal</button>
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
function GoalList() {
  return (
    <div>
      <ul>
        {" "}
        {initialGoals.map((item) => (
          <Goal goal={item} />
        ))}
      </ul>
    </div>
  );
}
function AddGoalForm() {
  return (
    <form className="form-add-friend">
      Goal name: <input />
      Motivating image: <input />
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
