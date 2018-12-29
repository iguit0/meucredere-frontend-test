import React, { Component } from "react";
import Routes from "./routes";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
