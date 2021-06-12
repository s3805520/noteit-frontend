import React from "react";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Password from "./components/Password";
import TodoList from "./components/TodoList";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return(
    <Router>
      <Switch>
        <Route path="/list/:id">
          <TodoList />
        </Route>
        <Route path="/reset">
          <Password />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;
