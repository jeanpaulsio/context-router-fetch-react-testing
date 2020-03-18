import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { useName } from "./context";

export function Nav() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
  );
}

function Home() {
  const [count, setCount] = React.useState(0);

  const nameContext = useName();

  React.useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <h1>Hello, {nameContext.name}</h1>
      <p>{nameContext.user.email}</p>
      <p>this is the home page</p>
      <hr />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export function About() {
  const history = useHistory();

  return (
    <div>
      <h1>this is the about page</h1>
      <button onClick={() => history.push("users")}>Go to User Page</button>
    </div>
  );
}

function Users() {
  return <h2>this is the users page</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/users" component={Users} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
