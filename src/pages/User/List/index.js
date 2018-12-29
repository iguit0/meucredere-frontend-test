import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  Button,
  CardSubtitle,
  CardText
} from "reactstrap";
import firebase from "../../../firebase";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("customers")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          customer: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such Customer!");
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection("customers")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Customer successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error removing customer: ", error);
      });
  }

  calculateAge(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);

    var age = today.getFullYear() - birthDate.getFullYear();

    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  render() {
    return (
      <Container className="mt-3">
        <h2 className="title">DETALHES</h2>
        <Row>
          <Col>
            <Card body>
              <CardTitle className="text-center">
                {this.state.customer.name}
              </CardTitle>
              <CardSubtitle className="text-center">Cliente</CardSubtitle>
              <CardText>
                <i className="fa fa-birthday-cake mr-2" />
                {this.state.customer.birthday} ·{" "}
                {this.calculateAge(this.state.customer.birthday)} anos
              </CardText>
              <CardText>
                <i className="fa fa-drivers-license mr-2" />
                {this.state.customer.driver_license}
              </CardText>
              <CardText>
                <i className="fa fa-map-marker mr-3" />
                {this.state.customer.city} · {this.state.customer.state}
              </CardText>
              <CardText>
                <i className="fa fa-phone mr-2" />
                {this.state.customer.phones}
              </CardText>
              <CardText>
                <i className="fa fa-envelope mr-2" />
                {this.state.customer.emails}
              </CardText>
              {this.state.customer.parent ? (
                <CardText className="mr-1">
                  <i className="fa fa-shield mr-2" />
                  {this.state.customer.parent}
                </CardText>
              ) : (
                <div />
              )}
              <Link to={`/alterar/${this.state.key}`}>
                <Button color="primary" block>
                  EDITAR
                </Button>
                <Button
                  onClick={this.delete.bind(this, this.state.key)}
                  color="danger"
                  block
                >
                  DELETAR
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default List;
