import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
//import { logout } from "../store/actions/auth";
//import Logo from "../images/warbler-logo.png";

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    console.log("something");
    axios.get("/auth/logout");
  };
  render() {
    console.log(this.props.auth);
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              News Feed
            </Link>
          </div>
          <div>
            <ul className="nav navbar-nav navbar-right">
              <li className="mr-4">
                <a href="/auth/google">Sign in</a>
              </li>
              <li>
                <a href="/auth/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, {})(Navbar);
