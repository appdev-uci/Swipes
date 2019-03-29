import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "../styles/Navbar.css";

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    console.log("something");
    axios.get("/auth/logout");
  };
  render() {
    if (this.props.auth) {
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
                <li class="nav-item dropdown">
                  <a
                    class="nav-link"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-user" />
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <div class="dropdown-divider" />
                    <a class="dropdown-item" href="/auth/logout">
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  {}
)(Navbar);
