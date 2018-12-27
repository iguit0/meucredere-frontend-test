import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import CardDetail from "./CardDetail";

// Data JSON
var show = require("../../data/show.json");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [] };
  }

  componentWillMount() {
    this.setState({ customers: show });
  }

  render() {
    return (
      <Container className="mt-3">
        <Row>
          <Col>
            <h2 className="title">Leitor de Novidades</h2>
            <CardDetail />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
