import { Link } from "react-router";

const App = () => {
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
          <li>
            {/* <a href="profile">Profile page</a> */}
            <Link to="profile">Profile page</Link>
          </li>
          <li>
            <Link to="developer">Developer Profile</Link>
          </li>
          <li>
            <Link to="writer">Technical Writer Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;