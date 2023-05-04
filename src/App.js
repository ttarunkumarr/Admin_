import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth } from "./config";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import "./App.css";

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true); // add loading state variable
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    // show loading spinner or splash screen while authentication is in progress
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

        <Route path="/">{user ? <Home /> : <Redirect to="/login" />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
