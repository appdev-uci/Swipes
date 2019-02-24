import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  sendAuthRequest = event => {
    console.log("Hello world")
  };

  render() {
    return (
      <div className="App">
        <h2>Hello World</h2>
        <button
          className="btn btn-primary"
          onClick={this.sendAuthRequest} 
        > Sign in with Google</button>
      </div>
    );
  }
}

export default App;
