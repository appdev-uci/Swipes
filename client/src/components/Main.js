import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import withAuth from "../hocs/withAuth";
import Profile from "./Profile"


const Main = props => {
  //   const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" render={props => <div>NewsFeed</div>} />
        <Route exact path="/profile" component={withAuth(Profile)} />
      </Switch>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Main)
);
