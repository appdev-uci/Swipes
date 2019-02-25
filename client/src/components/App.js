import React, {Component} from "react";
import { fetchUser } from "../actions";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';

import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Router>
        <div className="onboarding">
          <Navbar />
          <Main />
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  {fetchUser}
)(App);
