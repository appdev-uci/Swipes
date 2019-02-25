import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    componentWillMount() {
      if (this.props.auth === false) {
        this.props.history.push("/");
      }
    }
    componentWillUpdate(nextProps) {
      if (nextProps.auth === false) {
        this.props.history.push("/");
      }
    }
    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(Authenticate);
}
