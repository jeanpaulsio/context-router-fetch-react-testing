import React from "react";
import {
  render as rtlRender,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import { useAsync } from "react-async";

// For Nav tests
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import App, { Nav, About } from "./App";
import { NameProvider } from "./context";

jest.mock("react-async");

function render(ui, { name = "default name", ...options } = {}) {
  function Wrapper(props) {
    return <NameProvider value={{ name, ...options }} {...props} />;
  }
  return rtlRender(ui, { wrapper: Wrapper });
}

afterEach(cleanup);

test("App - loading state", () => {
  useAsync.mockImplementation(() => ({
    isPending: true,
  }));

  const { getByText } = render(<App />, {
    name: "pj",
  });

  expect(getByText(/loading\.\.\./i)).toBeInTheDocument();
});

test("App - data has been fetched", () => {
  const user = { name: "jerry", email: "jerry@test.com" };

  useAsync.mockImplementation(() => ({
    isPending: false,
  }));

  const { getByText } = render(<App />, {
    name: "pj",
    user,
  });

  expect(getByText(/hello, pj/i)).toBeInTheDocument();
  expect(getByText(/jerry@test.com/i)).toBeInTheDocument();
});

test("App - navigating around", () => {
  const user = { name: "jerry", email: "jerry@test.com" };

  useAsync.mockImplementation(() => ({
    isPending: false,
  }));

  const { container, getByText } = render(<App />, {
    name: "pj",
    user,
  });

  expect(getByText(/hello, pj/i)).toBeInTheDocument();
  expect(container.innerHTML).toMatch("this is the home page");

  fireEvent.click(getByText(/about/i));
  expect(container.innerHTML).toMatch("this is the about page");

  fireEvent.click(getByText(/users/i));
  expect(container.innerHTML).toMatch("this is the users page");
});

test("Nav - successfully navigates around", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <Nav />
    </Router>
  );

  fireEvent.click(getByText(/about/i));
  expect(history.location.pathname).toBe("/about");
});

test("About - navigate to users page", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <About />
    </Router>
  );

  fireEvent.click(getByText("Go to User Page"));
  expect(history.location.pathname).toBe("/users");
});
