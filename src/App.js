import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
import Nomatch from "./components/nomatch/Nomatch";
import Salon from "./components/salon/Salon";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
    
    <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">| Home_</Link>
              </li>
              <li>
                <Link to="/salon">| Salon_</Link>
              </li>
              <li>
                <Link to="/nomatch">| Nomatch_</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/salon/:id" component={Salon}>
              <Salon />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <Nomatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
    );
  }
}

export default App;
