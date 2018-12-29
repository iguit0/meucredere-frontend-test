import React, { Component } from "react";
import { Navbar } from "reactstrap";
import "./style.css";

class FooterComponent extends Component {
  render() {
    return (
      <Navbar color="dark" dark expand="md" className="footer">
        <a
          style={{
            fontFamily: "'Nunito', sans-serif",
            textDecoration: "none",
            color: "white"
          }}
          href="https://github.com/iguit0"
        >
          <i className="fa fa-code" />
          {" by Igor Alves"}
        </a>
      </Navbar>
    );
  }
}

export default FooterComponent;
